import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { slugify, sectionSlug } from './lib/slug.mjs';

const BASE = 'https://lsx333.axshare.com/?g=14&id=';
const SITEMAP_PATH = 'raw/sitemap.json';
const MANIFEST_PATH = 'raw/manifest-sections.json';
const REPORT_PATH = 'raw/capture-sections-report.json';

const SECTION_PATTERN = /^\d+\.\d+(\.\d+)*\s+[A-Za-z]/;
const VIEWPORT_WIDTH = 1920;
const MAX_CROP_WIDTH = 1400;
const SECTION_DEDUP_THRESHOLD = 30; // px 이내 중복 제거

const args = process.argv.slice(2);
const isUpdateMode = args.includes('--update');

async function main() {
  const sitemap = JSON.parse(await fs.readFile(SITEMAP_PATH, 'utf-8'));
  const pages = flattenPages(sitemap);
  console.log(`Found ${pages.length} pages to capture.${isUpdateMode ? ' (--update mode)' : ''}`);

  let prevManifest = {};
  if (isUpdateMode) {
    try {
      prevManifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf-8'));
    } catch {
      console.log('No previous manifest found, running full capture.');
    }
  }

  const prevIds = new Set(Object.keys(prevManifest));
  const currIds = new Set(pages.map(p => p.id));

  const added = pages.filter(p => !prevIds.has(p.id)).map(p => p.id);
  const deleted = [...prevIds].filter(id => !currIds.has(id));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: 900 },
    deviceScaleFactor: 2,
  });

  let iframeStructureLogged = false;

  const manifest = { ...prevManifest };
  const results = {
    success: [],
    failed: [],
    skipped: [],
    added,
    deleted,
    modified: [],
    unchanged: [],
    totalSections: 0,
    pagesWithSections: 0,
  };

  for (const [i, p] of pages.entries()) {
    process.stdout.write(`[${i + 1}/${pages.length}] ${p.pageName} (${p.id}) ... `);

    if (isUpdateMode && prevManifest[p.id]) {
      const prev = prevManifest[p.id];
      const rawDir = p.isTopLevel ? 'raw' : path.join('raw', p.sectionSlug);
      let currentText = null;
      try {
        currentText = await fs.readFile(path.join(rawDir, `${p.pageSlug}.txt`), 'utf-8');
      } catch { }

      if (currentText !== null) {
        const currentHash = crypto.createHash('md5').update(currentText).digest('hex');
        if (currentHash === prev.textHash) {
          console.log('unchanged');
          results.skipped.push(p.id);
          results.unchanged.push(p.id);
          manifest[p.id] = prev;
          continue;
        } else {
          results.modified.push(p.id);
        }
      }
    }

    let success = false;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const { textHash, sectionCount } = await capturePageWithSections(context, p, !iframeStructureLogged);
        iframeStructureLogged = true;

        manifest[p.id] = {
          id: p.id,
          pageName: p.pageName,
          capturedAt: new Date().toISOString(),
          textHash,
          sectionCount,
          status: 'success',
        };

        if (sectionCount > 0) {
          results.pagesWithSections++;
          results.totalSections += sectionCount;
          console.log(`ok (${sectionCount} sections)`);
        } else {
          console.log('ok (no sections)');
        }

        results.success.push(p.id);
        success = true;
        break;
      } catch (err) {
        if (attempt < 2) {
          process.stdout.write(`retry... `);
          await new Promise(r => setTimeout(r, 2000));
        } else {
          console.log(`FAILED: ${err.message}`);
          results.failed.push({ id: p.id, pageName: p.pageName, error: err.message });
          manifest[p.id] = {
            id: p.id,
            pageName: p.pageName,
            capturedAt: new Date().toISOString(),
            textHash: null,
            sectionCount: 0,
            status: 'failed',
          };
        }
      }
    }
  }

  await browser.close();

  await fs.mkdir('raw', { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  await fs.writeFile(REPORT_PATH, JSON.stringify(results, null, 2));

  console.log('\n--- Capture Sections Report ---');
  console.log(`Success:           ${results.success.length}`);
  console.log(`Failed:            ${results.failed.length}`);
  console.log(`Skipped:           ${results.skipped.length}`);
  console.log(`Pages w/ sections: ${results.pagesWithSections}`);
  console.log(`Total sections:    ${results.totalSections}`);
  if (isUpdateMode) {
    console.log(`Added:     ${results.added.length}`);
    console.log(`Modified:  ${results.modified.length}`);
    console.log(`Deleted:   ${results.deleted.length}`);
    console.log(`Unchanged: ${results.unchanged.length}`);
  }
  if (results.failed.length > 0) {
    console.log('\nFailed pages:');
    results.failed.forEach(f => console.log(`  - ${f.pageName} (${f.id}): ${f.error}`));
  }

  if (results.failed.length > 0 && results.success.length === 0) {
    process.exit(1);
  } else if (results.failed.length > 0) {
    process.exit(2);
  } else {
    process.exit(0);
  }
}

function flattenPages(nodes, parentSection = null, acc = []) {
  for (const node of nodes) {
    const isFolder = node.type === 'Folder' || (node.children && node.children.length > 0 && !node.id);
    const isTopLevelFolder = !parentSection && isFolder;
    const currentSection = isTopLevelFolder ? sectionSlug(node.pageName) : parentSection;

    const isPage = node.id && node.id.length > 0;
    if (isPage) {
      const isTopLevel = !currentSection;
      acc.push({
        id: node.id,
        pageName: node.pageName,
        sectionSlug: currentSection || null,
        pageSlug: slugify(node.pageName),
        isTopLevel,
      });
    }
    if (node.children) flattenPages(node.children, currentSection, acc);
  }
  return acc;
}

async function capturePageWithSections(context, p, logIframeStructure) {
  const page = await context.newPage();
  const url = BASE + p.id;

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    const frame = await waitForContentFrame(page, logIframeStructure);

    try {
      await frame.waitForSelector('body *', { timeout: 5000 });
    } catch {
      await page.waitForTimeout(1500);
    }

    // 1단계: 패널 숨기기
    await closeCommentsPanel(page);

    // 2단계: 전체 콘텐츠 높이 측정
    const totalHeight = await frame.evaluate(() => {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    });

    // 3단계: viewport를 전체 높이로 확장
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: totalHeight + 200 });
    await page.waitForTimeout(300);

    // 4단계: resize 후 패널 다시 숨기기
    await closeCommentsPanel(page);

    // 이미지 저장 디렉토리 준비
    let imgDir;
    if (p.isTopLevel) {
      imgDir = 'flipbook';
    } else {
      imgDir = path.join('flipbook', p.sectionSlug);
    }
    await fs.mkdir(imgDir, { recursive: true });

    // raw 디렉토리 준비
    const rawDir = p.isTopLevel ? 'raw' : path.join('raw', p.sectionSlug);
    await fs.mkdir(rawDir, { recursive: true });

    // 5단계: 전체 스크린샷 (iframe body)
    const bodyHandle = await frame.$('body');
    if (!bodyHandle) throw new Error('iframe body not found');
    await bodyHandle.screenshot({ path: path.join(imgDir, `${p.pageSlug}.png`) });

    // 텍스트/HTML 저장 (manifest용 hash 포함)
    const text = await frame.evaluate(() => document.body.innerText);
    const html = await frame.evaluate(() => document.body.innerHTML);
    await fs.writeFile(path.join(rawDir, `${p.pageSlug}.txt`), text);
    await fs.writeFile(path.join(rawDir, `${p.pageSlug}.html`), html);

    const textHash = crypto.createHash('md5').update(text).digest('hex');

    // 6단계: 섹션 헤더 감지
    const rawSections = await frame.evaluate((pattern) => {
      const re = new RegExp(pattern);
      const results = [];

      // 텍스트 노드를 포함하는 모든 요소를 순회
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null
      );

      let node;
      while ((node = walker.nextNode())) {
        const text = (node.innerText || node.textContent || '').trim();
        // 직접 자식 텍스트만 확인 (중첩 방지)
        const directText = Array.from(node.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent.trim())
          .join(' ')
          .trim();

        const matchText = directText || text;
        if (re.test(matchText) && matchText.length < 200) {
          const rect = node.getBoundingClientRect();
          if (rect.height > 0 && rect.width > 0) {
            results.push({
              text: matchText.split('\n')[0].trim(),
              y: Math.round(rect.top),
              height: Math.round(rect.height),
              right: Math.round(rect.right),
            });
          }
        }
      }

      return results;
    }, SECTION_PATTERN.source);

    // iframe의 body box offset 가져오기 (parent frame 기준)
    const bodyBox = await frame.evaluate(() => {
      const rect = document.body.getBoundingClientRect();
      return { x: Math.round(rect.left), y: Math.round(rect.top) };
    });

    // iframe 자체의 parent frame 내 위치 오프셋
    const iframeElement = await page.$('iframe');
    let iframeOffset = { x: 0, y: 0 };
    if (iframeElement) {
      const iframeBox = await iframeElement.boundingBox();
      if (iframeBox) {
        iframeOffset = { x: Math.round(iframeBox.x), y: Math.round(iframeBox.y) };
      }
    }

    // 콘텐츠 실제 너비 계산 (maxRight)
    const maxRight = await frame.evaluate(() => {
      let max = 0;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
      let node;
      while ((node = walker.nextNode())) {
        const rect = node.getBoundingClientRect();
        if (rect.right > max) max = Math.round(rect.right);
      }
      return max;
    });

    // Description 컬럼 경계 감지
    const descriptionX = await frame.evaluate(() => {
      const descElements = [];
      document.querySelectorAll('*').forEach(el => {
        const text = (el.textContent || '').trim();
        if (text === 'Description' && el.children.length === 0) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 30 && rect.width < 300 && rect.height > 0) {
            descElements.push({ x: Math.round(rect.x), y: Math.round(rect.y) });
          }
        }
      });

      if (descElements.length === 0) return null;

      // 가장 많이 등장하는 X좌표(±20px 허용) 찾기
      const clusters = [];
      for (const el of descElements) {
        let found = false;
        for (const cluster of clusters) {
          if (Math.abs(el.x - cluster.x) <= 20) {
            cluster.count++;
            cluster.x = Math.round((cluster.x * (cluster.count - 1) + el.x) / cluster.count);
            found = true;
            break;
          }
        }
        if (!found) clusters.push({ x: el.x, count: 1 });
      }

      clusters.sort((a, b) => b.count - a.count);
      return clusters[0].x;
    });

    // UI 크롭 너비 결정
    let uiCropWidth;
    if (descriptionX !== null && descriptionX > 100) {
      uiCropWidth = Math.max(50, descriptionX - 20);
    } else {
      uiCropWidth = Math.min(maxRight || VIEWPORT_WIDTH, MAX_CROP_WIDTH);
    }
    const cropWidth = Math.min(maxRight || VIEWPORT_WIDTH, MAX_CROP_WIDTH);

    // Y좌표 기준 정렬
    rawSections.sort((a, b) => a.y - b.y);

    // 중복 제거 (Y 차이 SECTION_DEDUP_THRESHOLD px 이내)
    const dedupedSections = [];
    for (const s of rawSections) {
      const last = dedupedSections[dedupedSections.length - 1];
      if (last && Math.abs(s.y - last.y) <= SECTION_DEDUP_THRESHOLD) {
        // 더 짧은 텍스트(헤더일 가능성 높음)를 우선
        if (s.text.length < last.text.length) {
          dedupedSections[dedupedSections.length - 1] = s;
        }
      } else {
        dedupedSections.push(s);
      }
    }

    const sectionCount = dedupedSections.length;
    let sectionsInfo = [];

    if (sectionCount > 0) {
      // 각 섹션 크롭 캡처
      for (let si = 0; si < dedupedSections.length; si++) {
        const sec = dedupedSections[si];
        const nextSec = dedupedSections[si + 1];

        // 섹션 번호 추출 (예: "1.2.3.1 Total Devices" → "1-2-3-1")
        const numMatch = sec.text.match(/^(\d+\.\d+(?:\.\d+)*)/);
        const secNum = numMatch ? numMatch[1] : `section-${si + 1}`;
        const secId = secNum.replace(/\./g, '-');

        // 크롭 Y 좌표 (parent page 기준)
        const cropY = iframeOffset.y + sec.y - 10; // 상단 10px 패딩
        const safeY = Math.max(0, cropY);

        // 크롭 height: 현재 섹션 ~ 다음 섹션
        let cropHeight;
        if (nextSec) {
          cropHeight = (iframeOffset.y + nextSec.y) - safeY;
        } else {
          // 마지막 섹션: 페이지 하단까지
          cropHeight = iframeOffset.y + totalHeight - safeY;
        }
        cropHeight = Math.max(50, cropHeight);

        // 섹션 내 UI 요소 존재 여부 감지
        const sectionYStart = sec.y;
        const sectionYEnd = nextSec ? nextSec.y : totalHeight;
        const effectiveUiWidth = descriptionX !== null && descriptionX > 100 ? descriptionX : (maxRight || VIEWPORT_WIDTH);

        const hasUI = await frame.evaluate(
          ({ yStart, yEnd, uiMaxX }) => {
            const UI_TAGS = new Set(['rect', 'input', 'button', 'select', 'img', 'svg', 'canvas', 'table', 'video']);
            let uiElementCount = 0;
            let totalArea = 0;

            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
            let node;
            while ((node = walker.nextNode())) {
              const rect = node.getBoundingClientRect();
              // 섹션 Y 범위 내에 있는지 확인 (중앙 기준)
              const centerY = rect.top + rect.height / 2;
              if (centerY < yStart || centerY >= yEnd) continue;
              // Description 컬럼 왼쪽 영역에 있는지 확인
              if (rect.left >= uiMaxX) continue;
              if (rect.width <= 0 || rect.height <= 0) continue;

              const tag = node.tagName.toLowerCase();
              if (UI_TAGS.has(tag)) {
                uiElementCount++;
                totalArea += rect.width * rect.height;
              } else if ((tag === 'div' || tag === 'span') && rect.width > 100 && rect.height > 50) {
                // 와이어프레임 박스로 볼 수 있는 크기
                uiElementCount++;
                totalArea += rect.width * rect.height;
              }
            }

            // UI 요소가 2개 이상이거나 총 면적이 5000px² 이상이면 UI 있음
            return uiElementCount >= 2 || totalArea >= 5000;
          },
          { yStart: sectionYStart, yEnd: sectionYEnd, uiMaxX: effectiveUiWidth }
        );

        const sectionFileName = hasUI ? `${p.pageSlug}.${secId}.png` : null;

        if (hasUI) {
          try {
            await page.screenshot({
              path: path.join(imgDir, sectionFileName),
              clip: {
                x: iframeOffset.x,
                y: safeY,
                width: uiCropWidth,
                height: cropHeight,
              },
            });
          } catch (cropErr) {
            console.warn(`\n  [warn] Section crop failed for ${secId}: ${cropErr.message}`);
          }
        }

        sectionsInfo.push({
          id: secId,
          title: sec.text.split('\n')[0].trim(),
          y: sec.y,
          height: cropHeight,
          image: sectionFileName,
          hasUI,
          cropWidth: hasUI ? uiCropWidth : null,
        });
      }

      // 섹션 정보 JSON 저장
      if (sectionsInfo.length > 0) {
        await fs.writeFile(
          path.join(rawDir, `${p.pageSlug}.sections.json`),
          JSON.stringify(sectionsInfo, null, 2)
        );
      }
    }

    return { textHash, sectionCount: sectionsInfo.length };
  } finally {
    await page.close();
  }
}

async function closeCommentsPanel(page) {
  try {
    await page.evaluate(() => {
      document.getElementById('feedbackHost').style.display = 'none';
      document.getElementById('pageNotesHost').style.display = 'none';
      document.getElementById('sitemapHost').style.display = 'none';
      document.getElementById('mainPanel').style.left = '0px';
      window.dispatchEvent(new Event('resize'));
    });
    await page.waitForTimeout(400);
  } catch { }
}

async function waitForContentFrame(page, logStructure) {
  await page.waitForSelector('iframe', { timeout: 15000 });

  if (logStructure) {
    const frames = page.frames();
    console.log(`\niframe structure (${frames.length} frames total):`);
    for (const f of frames) {
      if (f !== page.mainFrame()) {
        console.log(`  name="${f.name()}" url="${f.url()}"`);
      }
    }
  }

  const frames = page.frames();
  let contentFrame = frames.find(f => f !== page.mainFrame() && f.url().includes('axshare.com'));
  if (!contentFrame) {
    contentFrame = frames.find(f => f !== page.mainFrame());
  }
  if (!contentFrame) throw new Error('Content frame not found');

  await contentFrame.waitForLoadState('domcontentloaded');
  return contentFrame;
}

main().catch((err) => { console.error(err); process.exit(1); });
