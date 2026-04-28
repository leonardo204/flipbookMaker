# axshare 플립북 → Markdown 변환 작업 플랜

> Claude Code 환경에서 실행할 수 있도록 작성된 실행 가능한 플랜 문서입니다.
> 이 문서를 프로젝트 루트에 두고 Claude Code에서 참조하며 작업을 진행하세요.

## 0. 프로젝트 정보

| 항목 | 값 |
|------|-----|
| 원본 axshare URL | `https://lsx333.axshare.com/?g=14&id=1akyi4&p=release_history` |
| 베이스 도메인 | `lsx333.axshare.com` |
| 진입 페이지 ID | `release_history` |
| 그룹 파라미터 | `g=14` |
| 작업 목적 | 팀 공유용 스펙 문서 |
| 산출물 | 구조화된 markdown 문서 + 캡처 이미지 |

### 사이트맵 (확인된 구조)

```
- Release History
- IA
- Policy
- 0. Site Entry
  └─ Log in
- 1. Overview
  ├─ Dashboard_1 depth
  ├─ Dashboard_2 depth
  ├─ Quick Operation
  └─ Reports
- 2. Devices                    (하위 페이지 미확인 — 크롤 시 발견)
- 3. VOC Center (For agent)     (하위 페이지 미확인)
- 4. Connecting Devices
  ├─ Connecting Devices Policy
  ├─ Connecting Devices
  ├─ Command > Device Control
  ├─ Command > App Control
  ├─ Command > Advanced Control
  └─ Issue report
- 5. Applications
  ├─ App List
  ├─ App Install
  └─ App Policy
- 6. Firmware                   (하위 페이지 미확인)
- 7. Administration             (하위 페이지 미확인)
- 8. Set-top box UI scenario
  └─ Set-top box UI scenario
```

확인된 페이지: **약 25개 이상** (접혀있는 2/3/6/7번 섹션 하위 포함하면 더 많을 수 있음)

---

## 1. 핵심 전략

axshare는 Axure RP가 생성한 정적 HTML/JS 묶음을 호스팅하는 SPA입니다. 단순 HTTP fetch로는 사이트맵이나 페이지 콘텐츠를 가져올 수 없습니다. **Playwright로 브라우저를 실제 띄워서 JS 실행 후 데이터를 추출**하는 방식이 필수입니다.

핵심 발견:
- Axure는 `$axure.document.sitemap.rootNodes` 객체에 **전체 사이트맵 트리를 JS 변수로 노출**합니다.
- 각 페이지는 `?id={pageId}` URL 파라미터로 직접 접근 가능합니다.
- 페이지 콘텐츠는 iframe 안에 렌더링됩니다 — `frameLocator` 또는 `page.frame()` 필요.

### 작업 단계 (4-Phase)

```
Phase 1: Discovery   → 사이트맵 JSON 확보
Phase 2: Extraction  → 페이지별 스크린샷 + 텍스트 + 인터랙션 추출
Phase 3: Authoring   → markdown 스펙 문서 작성 (Claude Code가 수행)
Phase 4: Aggregation → 통합 README + 섹션별 index 생성
```

---

## 2. 디렉토리 구조

```
project-root/
├── .claude/
│   └── commands/
│       ├── crawl.md            # 사이트맵 크롤
│       ├── capture.md          # 페이지 일괄 캡처
│       ├── document.md         # 페이지 1개 markdown 작성
│       └── aggregate.md        # 통합 문서 생성
├── scripts/
│   ├── crawl.mjs               # 사이트맵 추출
│   ├── capture.mjs             # 스크린샷 + 텍스트 + 인터랙션 추출
│   └── lib/
│       ├── slug.mjs            # 페이지명 → 안전한 파일명 변환
│       └── axshare-helpers.mjs # iframe 핸들링, 대기 로직 등
├── raw/                        # Phase 2 산출물 (재실행 시 덮어쓰기)
│   ├── sitemap.json            # 마스터 인덱스
│   ├── 0-site-entry/
│   │   ├── log-in.txt
│   │   └── log-in.interactions.json
│   ├── 1-overview/
│   │   └── ...
│   └── ...
├── images/                     # 캡처 이미지 (docs와 1:1 미러)
│   ├── 0-site-entry/
│   │   └── log-in.png
│   ├── 1-overview/
│   │   ├── dashboard-1depth.png
│   │   ├── dashboard-2depth.png
│   │   └── ...
│   └── ...
├── docs/                       # 최종 markdown 산출물
│   ├── README.md               # 전체 개요 + 사이트맵 트리
│   ├── 00-release-history.md
│   ├── 00-ia.md
│   ├── 00-policy.md
│   ├── 0-site-entry/
│   │   ├── index.md            # 섹션 개요
│   │   └── log-in.md
│   ├── 1-overview/
│   │   ├── index.md
│   │   ├── dashboard-1depth.md
│   │   ├── dashboard-2depth.md
│   │   ├── quick-operation.md
│   │   └── reports.md
│   └── ...
├── package.json
├── playwright.config.mjs
└── PLAN.md                     # 이 문서
```

**핵심 원칙**: `images/`와 `docs/`의 폴더 구조를 1:1로 미러링. 그러면 markdown에서 `../images/1-overview/dashboard-1depth.png`처럼 깔끔한 상대경로로 참조됩니다.

---

## 3. Phase 1: Discovery (사이트맵 추출)

### 3.1 목표

axshare의 `$axure.document.sitemap.rootNodes`를 읽어서 전체 페이지 트리를 JSON으로 저장합니다. 이 JSON이 이후 모든 작업의 마스터 인덱스가 됩니다.

### 3.2 `scripts/crawl.mjs`

```javascript
// scripts/crawl.mjs
import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://lsx333.axshare.com/?g=14&id=release_history';
const OUTPUT = 'raw/sitemap.json';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // axshare는 메인 페이지에 사이트맵 패널이 있고, 콘텐츠는 iframe에 있음
  // $axure는 메인 페이지의 window 객체에 노출됨
  await page.waitForFunction(() => window.$axure?.document?.sitemap, { timeout: 30000 });

  const sitemap = await page.evaluate(() => {
    // rootNodes를 직렬화 가능한 형태로 변환
    function serialize(node) {
      return {
        id: node.id,
        pageName: node.pageName,
        type: node.type,             // 'Page' | 'Folder'
        url: node.url,               // 페이지 URL 또는 null
        children: (node.children || []).map(serialize),
      };
    }
    return window.$axure.document.sitemap.rootNodes.map(serialize);
  });

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(sitemap, null, 2));

  // 통계 출력
  function countNodes(nodes) {
    return nodes.reduce((acc, n) => acc + 1 + countNodes(n.children || []), 0);
  }
  console.log(`✓ Sitemap saved to ${OUTPUT}`);
  console.log(`  Total nodes: ${countNodes(sitemap)}`);

  await browser.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
```

### 3.3 실행

```bash
npm install playwright
npx playwright install chromium
node scripts/crawl.mjs
```

### 3.4 검증 체크리스트

- [ ] `raw/sitemap.json`이 생성됨
- [ ] 노드 개수가 첨부 사이트맵 이미지와 일치 (Release History/IA/Policy + 0~8번 섹션)
- [ ] 접혀있던 2/3/6/7번 섹션의 하위 페이지가 드러남
- [ ] 각 노드에 `id`와 `pageName`이 모두 존재

---

## 4. Phase 2: Extraction (페이지별 추출)

### 4.1 목표

사이트맵의 모든 페이지를 순회하면서 다음 3가지를 추출합니다:

1. **풀페이지 스크린샷** (PNG) → `images/{section-slug}/{page-slug}.png`
2. **텍스트 덤프** (innerText) → `raw/{section-slug}/{page-slug}.txt`
3. **인터랙션 메타데이터** (JSON) → `raw/{section-slug}/{page-slug}.interactions.json`

### 4.2 슬러그 규칙

`scripts/lib/slug.mjs`:

```javascript
// 한글·공백·특수문자를 처리하는 안전한 파일명 변환
export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[>_\s]+/g, '-')          // "Command>Device Control" → "command-device-control"
    .replace(/[^\w가-힣\-]/g, '')      // 영숫자, 한글, 하이픈만 유지
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 섹션 폴더명: "0. Site Entry" → "0-site-entry"
export function sectionSlug(name) {
  return slugify(name);
}
```

### 4.3 `scripts/capture.mjs`

```javascript
// scripts/capture.mjs
import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { slugify, sectionSlug } from './lib/slug.mjs';

const BASE = 'https://lsx333.axshare.com/?g=14&id=';
const SITEMAP_PATH = 'raw/sitemap.json';

async function main() {
  const sitemap = JSON.parse(await fs.readFile(SITEMAP_PATH, 'utf-8'));
  const pages = flattenPages(sitemap); // [{ id, pageName, sectionSlug, pageSlug }, ...]
  console.log(`Found ${pages.length} pages to capture.`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // 레티나 품질
  });

  for (const [i, p] of pages.entries()) {
    console.log(`[${i + 1}/${pages.length}] ${p.pageName} (${p.id})`);
    try {
      await capturePage(context, p);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  await browser.close();
}

function flattenPages(nodes, parentSection = null, acc = []) {
  for (const node of nodes) {
    const isTopLevelFolder = !parentSection && node.type === 'Folder';
    const currentSection = isTopLevelFolder ? sectionSlug(node.pageName) : parentSection;

    if (node.type === 'Page' && node.id) {
      acc.push({
        id: node.id,
        pageName: node.pageName,
        sectionSlug: currentSection || 'root', // 섹션에 안 속한 페이지(Release History 등)는 'root'
        pageSlug: slugify(node.pageName),
      });
    }
    if (node.children) flattenPages(node.children, currentSection, acc);
  }
  return acc;
}

async function capturePage(context, p) {
  const page = await context.newPage();
  const url = BASE + p.id;
  await page.goto(url, { waitUntil: 'networkidle' });

  // axshare는 #base 또는 비슷한 ID의 iframe에 콘텐츠를 렌더링
  // iframe이 로드되고 콘텐츠가 그려질 때까지 대기
  const frame = await waitForContentFrame(page);
  await page.waitForTimeout(1500); // 페이지 전환 애니메이션 여유

  // 1) 스크린샷
  const imgDir = path.join('images', p.sectionSlug);
  await fs.mkdir(imgDir, { recursive: true });
  await page.screenshot({
    path: path.join(imgDir, `${p.pageSlug}.png`),
    fullPage: true,
    clip: await getContentClip(page), // 사이드바 제외하고 콘텐츠 영역만
  });

  // 2) 텍스트 덤프
  const text = await frame.evaluate(() => document.body.innerText);
  const rawDir = path.join('raw', p.sectionSlug);
  await fs.mkdir(rawDir, { recursive: true });
  await fs.writeFile(path.join(rawDir, `${p.pageSlug}.txt`), text);

  // 3) 인터랙션 추출
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

  await page.close();
}

async function waitForContentFrame(page) {
  // axshare 콘텐츠 iframe 식별 (보통 id="base" 또는 첫 번째 iframe)
  await page.waitForSelector('iframe', { timeout: 15000 });
  const frames = page.frames();
  // 메인 프레임이 아닌 첫 콘텐츠 프레임
  const contentFrame = frames.find(f => f !== page.mainFrame() && f.url().includes('axshare')) || frames[1];
  await contentFrame.waitForLoadState('networkidle');
  return contentFrame;
}

async function getContentClip(page) {
  // 사이드바를 제외한 콘텐츠 영역의 좌표 반환 (선택적)
  // 일단 null 반환 → fullPage 캡처 그대로 사용
  return undefined;
}

main().catch((err) => { console.error(err); process.exit(1); });
```

### 4.4 실행

```bash
node scripts/capture.mjs
```

페이지가 25개 정도면 5~10분 소요 예상.

### 4.5 검증 체크리스트

- [ ] `images/` 하위에 모든 페이지의 PNG가 생성됨
- [ ] `raw/` 하위에 텍스트 + 인터랙션 JSON이 생성됨
- [ ] 빈 PNG(흰색만 있는 파일)나 0바이트 파일이 없는지 확인
- [ ] 한글 텍스트가 깨지지 않고 추출됨

### 4.6 흔한 문제와 해결

| 문제 | 원인 | 해결 |
|------|------|------|
| 페이지가 빈 화면으로 캡처됨 | iframe 로드 전 스크린샷 | `waitForTimeout` 늘리기 또는 특정 셀렉터 대기 |
| 호버/클릭으로 나타나는 패널이 안 찍힘 | 동적 상태 미재현 | 2차 캡처 라운드에서 `page.hover()` 후 별도 캡처 |
| 사이드바도 같이 찍힘 | clip 미설정 | 콘텐츠 iframe만 캡처하거나 clip 좌표 설정 |
| 한글 페이지명이 파일명에서 깨짐 | 슬러그 규칙 부재 | `slugify` 함수에 한글 보존 규칙 추가 |
| 비밀번호 보호 프로토타입 | 인증 필요 | `page.fill('input[type=password]', PASSWORD)` 후 진행 |

---

## 5. Phase 3: Authoring (markdown 작성)

### 5.1 페이지 markdown 템플릿

각 페이지는 동일한 구조로 작성합니다. 일관성이 팀 가독성에 결정적입니다.

```markdown
# {페이지명}

> **경로**: {섹션} > {페이지}
> **원본 ID**: `{id}`
> **원본 링크**: [axshare에서 보기](https://lsx333.axshare.com/?g=14&id={id})

## 스크린샷

![{페이지명}](../images/{section-slug}/{page-slug}.png)

## 목적

(이 화면이 존재하는 이유를 1~2줄로)

## 진입 경로

- (어디서 어떻게 이 화면에 도달하는지)

## 화면 구성

| 영역 | 요소 | 내용/규칙 |
|------|------|-----------|
| 헤더 | 로고 | 클릭 시 대시보드로 이동 |
| ... | ... | ... |

## 인터랙션

| 트리거 | 동작 | 결과 |
|--------|------|------|
| `[버튼명]` 클릭 | 모달 열림 | (모달 화면 참조) |
| `[입력 필드]` 빈 값 제출 | 검증 | 에러 메시지 "..." |

## 상태 / 분기

- **로딩 상태**: ...
- **빈 상태**: ...
- **에러 상태**: ...
- **권한별 분기**: ...

## 연결된 화면

- → [{다음 화면}](../{section-slug}/{page-slug}.md)
- ← [{이전 화면}](../{section-slug}/{page-slug}.md)

## 비고

(디자이너 코멘트, 미확정 항목, TODO 등)
```

### 5.2 `.claude/commands/document.md` (슬래시 커맨드)

Claude Code의 슬래시 커맨드로 정의합니다. 한 페이지를 markdown으로 만드는 작업을 자동화합니다.

```markdown
---
description: 한 페이지의 raw 데이터를 읽어 markdown 스펙 문서로 작성
argument-hint: <section-slug>/<page-slug>
---

다음 작업을 수행하세요:

1. 인자: $ARGUMENTS (예: `1-overview/dashboard-1depth`)

2. 입력 파일 확인:
   - `raw/$ARGUMENTS.txt` (텍스트 덤프)
   - `raw/$ARGUMENTS.interactions.json` (인터랙션 메타데이터)
   - `images/$ARGUMENTS.png` (스크린샷, 시각 분석용)

3. `raw/sitemap.json`을 읽고 해당 페이지의 메타데이터(id, pageName, 부모 섹션) 추출

4. 다음 템플릿으로 `docs/$ARGUMENTS.md` 작성:
   - 페이지 제목, 경로, 원본 링크
   - 스크린샷 임베드 (`../images/$ARGUMENTS.png`)
   - 목적: 텍스트 덤프와 스크린샷을 분석해 추론
   - 진입 경로: interactions.json에서 이 페이지로 들어오는 다른 페이지의 링크 추적
   - 화면 구성: 텍스트 덤프를 영역별로 정리한 표
   - 인터랙션: interactions.json의 클릭 가능한 요소를 표로 정리
   - 상태/분기: 텍스트에서 발견되는 상태 키워드(로딩, 에러, 빈) 정리
   - 연결된 화면: interactions.json의 href와 sitemap.json을 매칭해 상대경로 링크 생성
   - 비고: 불확실한 부분은 명시적으로 표시

5. 작성 후 파일 경로 출력
```

### 5.3 배치 작성 전략

페이지 25개를 한 번에 다 만들지 말고 **섹션 단위로 진행**하는 게 좋습니다:

```
Round 1: 0. Site Entry (1페이지) — 템플릿 검증
Round 2: 1. Overview (4페이지)
Round 3: 4. Connecting Devices (6페이지)
Round 4: 5. Applications (3페이지)
Round 5: 메타 페이지 + 나머지 섹션
```

각 라운드 후 사람이 검수하고 템플릿을 보강합니다.

### 5.4 검증 체크리스트 (페이지당)

- [ ] 스크린샷이 올바른 상대경로로 임베드됨
- [ ] 다른 화면으로의 링크가 실제 존재하는 markdown 파일을 가리킴
- [ ] 인터랙션 표에 모든 클릭 가능 요소가 누락 없이 들어감
- [ ] 추론한 부분과 확인된 부분이 구별되어 표시됨

---

## 6. Phase 4: Aggregation (통합 문서)

### 6.1 `docs/README.md` (전체 개요)

```markdown
# {프로젝트명} 스펙 문서

> 원본 프로토타입: https://lsx333.axshare.com/?g=14&id=release_history
> 마지막 업데이트: YYYY-MM-DD

## 메타 문서
- [Release History](./00-release-history.md)
- [IA](./00-ia.md)
- [Policy](./00-policy.md)

## 섹션
- [0. Site Entry](./0-site-entry/index.md)
- [1. Overview](./1-overview/index.md)
- [2. Devices](./2-devices/index.md)
- [3. VOC Center](./3-voc-center/index.md)
- [4. Connecting Devices](./4-connecting-devices/index.md)
- [5. Applications](./5-applications/index.md)
- [6. Firmware](./6-firmware/index.md)
- [7. Administration](./7-administration/index.md)
- [8. Set-top box UI scenario](./8-set-top-box-ui-scenario/index.md)

## 전체 사이트맵 트리

(sitemap.json을 마크다운 트리로 변환해 표시)

## 화면 흐름 다이어그램

(Mermaid 다이어그램으로 주요 동선 표시 — 선택적)
```

### 6.2 `docs/{section}/index.md` (섹션별 개요)

```markdown
# {섹션명}

## 섹션 목적

(이 섹션이 다루는 기능 영역을 2~3줄로)

## 페이지 목록

| 순서 | 페이지 | 목적 |
|------|--------|------|
| 1 | [Dashboard 1 depth](./dashboard-1depth.md) | ... |
| 2 | [Dashboard 2 depth](./dashboard-2depth.md) | ... |
| ... | ... | ... |

## 섹션 내 화면 흐름

(섹션 내부 동선 — Mermaid 또는 텍스트로)
```

### 6.3 `.claude/commands/aggregate.md`

```markdown
---
description: 통합 README와 섹션별 index.md 생성
---

다음 작업을 수행하세요:

1. `raw/sitemap.json`과 `docs/` 하위 모든 .md 파일 분석

2. 각 섹션 폴더(`docs/{section-slug}/`)에서:
   - 그 섹션 내 모든 .md 파일을 읽어 "목적" 섹션 추출
   - `index.md` 작성: 페이지 목록 표 + 섹션 내 흐름

3. `docs/README.md` 작성:
   - 메타 문서 링크 (Release History, IA, Policy)
   - 섹션 목록 링크
   - 전체 사이트맵을 마크다운 트리로 표시
   - 주요 화면 흐름 Mermaid 다이어그램 (대시보드 → 주요 기능 진입점)
```

---

## 7. Claude Code 실행 시나리오

전체 작업을 Claude Code로 실행하는 권장 순서:

```bash
# 사전 준비
npm init -y
npm install playwright
npx playwright install chromium

# Phase 1: Discovery (1회 실행, 사람이 결과 확인)
node scripts/crawl.mjs
# → raw/sitemap.json 생성됨, 페이지 개수 확인

# Phase 2: Extraction (백그라운드 실행)
node scripts/capture.mjs
# → images/, raw/{section}/ 하위 파일들 생성됨

# Phase 2 검증 (Claude Code에게 위임 가능)
# "raw/sitemap.json의 모든 페이지에 대해 images/와 raw/에 산출물이 있는지 확인해줘"

# Phase 3: Authoring (Claude Code 슬래시 커맨드)
/document 0-site-entry/log-in       # 1페이지 검증
# 결과 검토 후 템플릿 보강

/document 1-overview/dashboard-1depth
/document 1-overview/dashboard-2depth
/document 1-overview/quick-operation
/document 1-overview/reports
# ... 섹션 단위로 진행

# Phase 4: Aggregation
/aggregate
# → docs/README.md, docs/{section}/index.md 생성됨
```

---

## 8. 주의사항 및 함정

### 8.1 axshare 특성

- **iframe 구조**: 콘텐츠는 `#base` iframe에 렌더링됨. `page.frame()` 또는 `frameLocator` 필수.
- **JS 렌더링**: 모든 콘텐츠가 JS로 그려짐. `waitUntil: 'networkidle'`로도 부족할 수 있음 → 추가 `waitForTimeout` 또는 셀렉터 대기.
- **사이트맵 패널**: 메인 페이지 좌측 사이트맵은 부모 프레임에서 보이지만, 캡처 시 사이드바를 제외하려면 iframe만 캡처하거나 clip 사용.
- **인증**: 비밀번호 보호된 프로토타입이면 첫 페이지 진입 시 인증 처리 필요. `crawl.mjs`와 `capture.mjs` 양쪽에 동일하게.

### 8.2 동적 콘텐츠 누락

플립북에는 호버/클릭으로 나타나는 메뉴, 모달, 툴팁이 있을 수 있습니다. 자동 캡처는 기본 상태만 잡습니다. **2차 캡처 라운드**가 필요합니다:

- `interactions.json`에서 트리거 요소 식별
- 각 트리거에 `page.hover()` 또는 `page.click()` 후 별도 PNG 캡처
- 파일명 규칙: `{page-slug}.{state}.png` (예: `dashboard-1depth.menu-open.png`)

### 8.3 이미지 용량

페이지 25개 × 풀페이지 PNG @ 2x → **수십~수백 MB** 가능. 옵션:

- WebP 변환: `sharp` 라이브러리로 일괄 변환 (용량 70~80% 감소)
- Git LFS 사용 (대형 리포)
- 또는 PNG 그대로 두고 `.gitignore`에서 `images/` 제외, 별도 저장소/CDN 업로드

### 8.4 인터랙션 정확도

`interactions.json`의 `href`와 `onclick`은 **Axure가 생성한 내부 코드**라 사람 친화적이지 않습니다. 텍스트(`[버튼명] 클릭`)와 좌표(`position`)를 함께 사용해 사람이 이해하는 형태로 변환해야 합니다. Claude Code가 이 변환을 잘 해줍니다.

### 8.5 프로토타입 vs 실제 스펙

플립북은 디자이너의 의도이지 최종 스펙이 아닙니다. **추론한 부분과 확인된 부분을 구별**하세요. 템플릿의 "비고" 섹션에 `TODO: 확인 필요`를 명시적으로 남기는 게 좋습니다.

---

## 9. 산출물 체크리스트

작업 완료 시 다음이 모두 갖춰져야 합니다:

### 자동 생성물
- [ ] `raw/sitemap.json` — 마스터 인덱스
- [ ] `raw/{section}/{page}.txt` — 모든 페이지의 텍스트 덤프
- [ ] `raw/{section}/{page}.interactions.json` — 모든 페이지의 인터랙션 메타
- [ ] `images/{section}/{page}.png` — 모든 페이지의 스크린샷

### 작성된 문서
- [ ] `docs/README.md` — 전체 개요 + 사이트맵 + 흐름 다이어그램
- [ ] `docs/00-release-history.md`, `docs/00-ia.md`, `docs/00-policy.md` — 메타 문서
- [ ] `docs/{section}/index.md` — 9개 섹션별 개요
- [ ] `docs/{section}/{page}.md` — 모든 페이지의 스펙 문서 (약 25개)

### 품질
- [ ] 모든 markdown의 이미지 경로가 유효 (깨진 링크 없음)
- [ ] 페이지 간 상호 링크가 유효
- [ ] 한글 깨짐 없음
- [ ] 추론과 확인이 구별됨
- [ ] TODO 항목이 명시됨

---

## 10. 다음 단계

이 플랜 문서를 Claude Code 환경의 프로젝트 루트에 `PLAN.md`로 저장한 뒤, 다음과 같이 시작하세요:

```
Claude Code에게 전달할 첫 메시지 예시:

"PLAN.md를 읽고 Phase 1 작업을 진행해줘.
package.json 초기화 → playwright 설치 → scripts/crawl.mjs 작성 → 실행까지.
실행 결과로 나온 raw/sitemap.json을 보여주고 다음 단계 진행 여부를 물어봐줘."
```

이후 단계마다 검증 → 다음 단계 지시 패턴으로 진행하면 안전합니다.

---

## 부록 A: package.json 예시

```json
{
  "name": "axshare-spec-extractor",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "crawl": "node scripts/crawl.mjs",
    "capture": "node scripts/capture.mjs",
    "all": "npm run crawl && npm run capture"
  },
  "dependencies": {
    "playwright": "^1.48.0"
  }
}
```

## 부록 B: 시간 예상

| Phase | 자동화 | 사람 개입 | 예상 시간 |
|-------|--------|-----------|-----------|
| 1. Discovery | 스크립트 1회 실행 | 결과 검증 | 30분 |
| 2. Extraction | 스크립트 1회 실행 | 캡처 품질 검증 + 동적 상태 2차 캡처 | 1~2시간 |
| 3. Authoring | Claude Code 페이지별 작성 | 페이지별 검수 | 3~5시간 |
| 4. Aggregation | Claude Code 통합 작성 | 최종 검수 | 1시간 |
| **합계** | | | **5~9시간** |

페이지 25개 기준. 동적 상태가 많거나 비밀번호 보호 등 복잡도가 추가되면 늘어납니다.
