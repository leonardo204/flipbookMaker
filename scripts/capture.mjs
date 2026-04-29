import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { slugify, sectionSlug } from './lib/slug.mjs';

const BASE = 'https://lsx333.axshare.com/?g=14&id=';
const SITEMAP_PATH = 'raw/sitemap.json';
const MANIFEST_PATH = 'raw/manifest.json';
const REPORT_PATH = 'raw/capture-report.json';

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
    viewport: { width: 1920, height: 900 },
    deviceScaleFactor: 2,
  });

  let iframeStructureLogged = false;

  const manifest = { ...prevManifest };
  const results = { success: [], failed: [], skipped: [], added, deleted, modified: [], unchanged: [] };

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
        const { textHash } = await capturePage(context, p, !iframeStructureLogged);
        iframeStructureLogged = true;

        manifest[p.id] = {
          id: p.id,
          pageName: p.pageName,
          capturedAt: new Date().toISOString(),
          textHash,
          status: 'success',
        };

        results.success.push(p.id);
        console.log('ok');
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

  console.log('\n--- Capture Report ---');
  console.log(`Success:   ${results.success.length}`);
  console.log(`Failed:    ${results.failed.length}`);
  console.log(`Skipped:   ${results.skipped.length}`);
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

async function capturePage(context, p, logIframeStructure) {
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

    await closeCommentsPanel(page);

    let imgDir;
    if (p.isTopLevel) {
      imgDir = 'flipbook';
    } else {
      imgDir = path.join('flipbook', p.sectionSlug);
    }
    await fs.mkdir(imgDir, { recursive: true });

    const bodyHandle = await frame.$('body');
    if (!bodyHandle) throw new Error('iframe body not found');
    await bodyHandle.screenshot({ path: path.join(imgDir, `${p.pageSlug}.png`) });

    const rawDir = p.isTopLevel ? 'raw' : path.join('raw', p.sectionSlug);
    await fs.mkdir(rawDir, { recursive: true });

    const text = await frame.evaluate(() => document.body.innerText);
    const html = await frame.evaluate(() => document.body.innerHTML);
    await fs.writeFile(path.join(rawDir, `${p.pageSlug}.txt`), text);
    await fs.writeFile(path.join(rawDir, `${p.pageSlug}.html`), html);

    const textHash = crypto.createHash('md5').update(text).digest('hex');

    const interactions = await frame.evaluate(() => {
      const els = document.querySelectorAll('a, [onclick], [data-label]');
      return Array.from(els).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 100),
          href: el.getAttribute('href'),
          onclick: el.getAttribute('onclick'),
          dataLabel: el.getAttribute('data-label'),
          position: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        };
      }).filter(i => i.text || i.href);
    });
    await fs.writeFile(
      path.join(rawDir, `${p.pageSlug}.interactions.json`),
      JSON.stringify(interactions, null, 2)
    );

    return { textHash };
  } finally {
    await page.close();
  }
}

async function closeCommentsPanel(page) {
  try {
    await page.evaluate(() => {
      const fb = document.getElementById('feedbackHost');
      if (fb) fb.style.display = 'none';
      const pn = document.getElementById('pageNotesHost');
      if (pn) pn.style.display = 'none';
      const sh = document.getElementById('sitemapHost');
      if (sh) sh.style.display = 'none';
      const mp = document.getElementById('mainPanel');
      if (mp) mp.style.left = '0px';
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
