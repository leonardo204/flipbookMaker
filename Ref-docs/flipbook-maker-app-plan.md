# FlipbookMaker 앱 개발 플랜

> 플립북(Axure, Figma 등)을 Markdown 스펙 문서로 변환하고 Confluence에 업로드하는 데스크톱 앱

## 0. 프로젝트 정보

| 항목 | 값 |
|------|-----|
| 앱 이름 | FlipbookMaker |
| GitHub | https://github.com/leonardo204/flipbookMaker |
| 기술 스택 | React + TypeScript, Tauri v2 |
| LLM 연동 | Claude Code CLI pipe (`claude --print -p`) |
| MCP 연동 | @modelcontextprotocol/sdk (TypeScript) |
| 배포 | Tauri auto-update via GitHub Releases |
| 플랫폼 | macOS, Windows |

## 1. 핵심 컨셉

rmsFlipbook 프로젝트에서 수작업으로 진행한 파이프라인을 GUI 앱으로 자동화:

```
[플립북 입력] → [분석/검증] → [Markdown 변환] → [Confluence 업로드]
```

### 이 프로젝트에서 검증된 것

- Playwright로 axshare SPA 크롤링 + 사이트맵 추출
- 섹션별 UI-only 크롭 캡처 (Description 제외)
- LLM(Claude)이 raw 데이터를 분석하여 구조화된 Markdown 생성
- MCP를 통한 Confluence 페이지 생성 + 이미지 첨부
- rate limit 대응 (딜레이, incremental 모드)

### 앱이 추가하는 가치

- GUI로 비개발자도 사용 가능
- 진행률 피드백 (progress bar)
- Confluence 설정/연결 테스트 UI
- 다양한 입력 소스 지원 (Axure, Figma, PDF, 파일 업로드)

---

## 2. 앱 기능 흐름

### Phase 1: 입력

1. 플립북 링크 입력 (axshare URL, Figma URL)
2. 또는 파일 직접 업로드 (PDF, Figma 파일, Axure .rp 파일)
3. 입력 유형 자동 감지

### Phase 2: 분석/검증

1. Playwright로 사이트 접속 시도
2. 사이트맵 구조 추출
3. 페이지 수, 섹션 수, 예상 소요 시간 표시
4. 가능/불가능 여부를 GUI로 피드백
   - 인증 필요 시: 비밀번호 입력 UI
   - 접근 불가 시: 에러 메시지

### Phase 3: Markdown 변환

1. "변환 시작" 버튼 클릭
2. 파이프라인 실행:
   a. 사이트맵 크롤링 (crawl)
   b. 페이지별 캡처 + 텍스트 추출 (capture)
   c. 섹션별 UI-only 크롭 (capture-sections)
   d. Claude Code로 각 페이지 Markdown 생성 (`claude --print -p`)
   e. 통합 문서 생성 (README + index)
3. Progress bar로 진행률 피드백
4. 완료 시 결과 폴더 열기

### Phase 4: Confluence 업로드 (선택)

1. 변환 완료 후 "Confluence에 업로드할까요?" 확인
2. Confluence 설정 UI:
   - Atlassian URL
   - 계정 (이메일)
   - API 토큰
   - 대상 Space key
   - 부모 페이지 ID 또는 URL
3. MCP 연결 테스트 버튼
4. 업로드 시작:
   - 페이지 생성 → 이미지 첨부
   - Rate limit 방어 (호출 간 딜레이, 실패 시 재시도)
   - Progress bar + 완료된 페이지 링크 실시간 표시

---

## 3. 기술 아키텍처

### 3.1 전체 구조

```
FlipbookMaker (Tauri v2)
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── pages/         # 메인 페이지 (Input, Analyze, Convert, Upload)
│   │   ├── components/    # UI 컴포넌트
│   │   ├── hooks/         # React hooks
│   │   └── lib/           # 유틸리티
│   └── package.json
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── main.rs
│   │   └── commands.rs    # Tauri commands (파일 시스템, 프로세스 실행)
│   └── Cargo.toml
├── scripts/               # 재사용 스크립트 (이 프로젝트에서 가져옴)
│   ├── crawl.mjs
│   ├── capture.mjs
│   ├── capture-sections.mjs
│   └── lib/slug.mjs
└── flipbook/              # 예제 산출물 (이 프로젝트의 결과물)
```

### 3.2 LLM 연동 — Claude Code pipe

BatteryAgent의 `AITab.swift` 패턴을 TypeScript로 포팅:

```typescript
import { spawn } from 'child_process';

async function callClaude(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn('claude', ['--print', '-p', prompt]);
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => stdout += d);
    proc.stderr.on('data', (d) => stderr += d);
    proc.on('close', (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(stderr || `exit ${code}`));
    });
  });
}
```

Tauri의 Rust backend에서 `Command::new("claude")` 호출 또는 frontend의 `@tauri-apps/plugin-shell`로 실행.

### 3.3 MCP 연동 — Confluence

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function connectConfluence(config: ConfluenceConfig) {
  const transport = new StdioClientTransport({
    command: 'uvx',
    args: [
      'mcp-atlassian',
      '--confluence-url', config.url,
      '--confluence-username', config.username,
      '--confluence-token', config.token,
    ],
  });
  const client = new Client({ name: 'flipbook-maker', version: '1.0.0' });
  await client.connect(transport);
  return client;
}
```

### 3.4 Rate Limit 방어

```typescript
const RATE_LIMITS = {
  free: { callsPerHour: 500, delayMs: 8000 },
  standard: { callsPerHour: 1000, delayMs: 4000 },
  premium: { callsPerHour: 10000, delayMs: 500 },
};

class RateLimiter {
  private callCount = 0;
  private resetTime = Date.now() + 3600000;

  async throttle(plan: keyof typeof RATE_LIMITS) {
    const limit = RATE_LIMITS[plan];
    if (this.callCount >= limit.callsPerHour * 0.8) {
      // 80% 도달 시 경고 + 대기
      await sleep(limit.delayMs * 3);
    }
    await sleep(limit.delayMs);
    this.callCount++;
  }
}
```

---

## 4. UI/UX 설계 (핵심 화면)

### 4.1 메인 화면 — 입력

```
┌─────────────────────────────────────────┐
│  FlipbookMaker                          │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  플립북 URL 또는 파일을 입력하세요   │    │
│  │  https://xxx.axshare.com/...    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  또는 파일 드래그 & 드롭                   │
│  ┌─────────────────────────────────┐    │
│  │        📁 PDF, Figma, Axure     │    │
│  └─────────────────────────────────┘    │
│                                         │
│           [ 분석 시작 ]                  │
└─────────────────────────────────────────┘
```

### 4.2 분석 결과

```
┌─────────────────────────────────────────┐
│  ✅ 분석 완료                            │
│                                         │
│  사이트맵: 40개 노드 (31 페이지)           │
│  섹션 구조:                              │
│    ├── 0. Site Entry (1 페이지)          │
│    ├── 1. Overview (4 페이지)            │
│    ├── 2. Devices (7 페이지)             │
│    └── ... (총 9개 섹션)                 │
│                                         │
│  예상 소요: 약 15분                       │
│                                         │
│     [ Markdown 변환 시작 ]               │
└─────────────────────────────────────────┘
```

### 4.3 변환 진행

```
┌─────────────────────────────────────────┐
│  📝 Markdown 변환 중...                  │
│                                         │
│  ████████████░░░░░░░░  60% (19/31)     │
│                                         │
│  현재: 4.2 Connecting Devices            │
│  완료: 0.1 Log in ✓                     │
│        1.1 Dashboard ✓                  │
│        1.2 Dashboard 2-depth ✓          │
│        ...                              │
│                                         │
│     [ 중지 ]                             │
└─────────────────────────────────────────┘
```

### 4.4 Confluence 업로드

```
┌─────────────────────────────────────────┐
│  ☁️ Confluence 업로드                    │
│                                         │
│  URL:    https://xxx.atlassian.net/wiki │
│  계정:   user@company.com               │
│  토큰:   ●●●●●●●●●●●●                  │
│  Space:  NextARMS                       │
│  부모:   AI-References                   │
│                                         │
│  [ 연결 테스트 ] ✅ 연결 성공             │
│                                         │
│  Plan: [ Standard ▼ ] (1000 calls/hr)   │
│                                         │
│  ████████░░░░░░░░░░░░  40% (16/40)     │
│                                         │
│  ✓ 0.1 Log in — 링크                    │
│  ✓ 1.1 Dashboard — 링크                 │
│  ⏳ 1.2 Dashboard 2-depth (이미지 12/12) │
│                                         │
│     [ 중지 ]                             │
└─────────────────────────────────────────┘
```

---

## 5. 개발 단계

### Phase 1: 프로젝트 셋업 + 기본 UI (1주)

- Tauri v2 + React + TypeScript 프로젝트 초기화
- 메인 화면 4개 (Input → Analyze → Convert → Upload) 라우팅
- 기본 UI 컴포넌트 (Input, Button, ProgressBar, StatusCard)
- 이 프로젝트의 flipbook/ 예제를 프로젝트에 포함

### Phase 2: 크롤링/캡처 엔진 (1주)

- scripts/ 를 TypeScript 모듈로 리팩토링
- Playwright 런타임 번들링 (Tauri에서 실행)
- 입력 유형 감지 (URL 패턴 매칭, 파일 확장자)
- 사이트맵 추출 + 분석 결과 UI 표시
- 캡처 진행률 이벤트 → frontend progress bar

### Phase 3: LLM Markdown 생성 (1주)

- Claude Code pipe 연동 (Tauri shell plugin)
- 페이지별 Markdown 생성 파이프라인
- 섹션별 이미지 삽입 로직
- 결과물 구조화 저장 (flipbook/ 폴더)

### Phase 4: Confluence 연동 (1주)

- MCP SDK TypeScript 클라이언트
- Confluence 설정 UI + 연결 테스트
- 페이지 생성 + 이미지 첨부 파이프라인
- Rate limit 방어 로직
- 업로드 진행률 + 완료 페이지 링크

### Phase 5: 품질 + 배포 (1주)

- UI/UX 전문가 검수 반영
- Tauri auto-update 설정 (GitHub Releases)
- macOS + Windows 빌드 테스트
- Figma / PDF 입력 소스 확장
- 에러 핸들링 + 사용자 가이드

---

## 6. 입력 소스별 처리 전략

| 소스 | 감지 방법 | 처리 방식 |
|------|----------|----------|
| Axure (axshare) | URL에 `axshare.com` 포함 | Playwright로 SPA 크롤링 (검증됨) |
| Figma | URL에 `figma.com` 포함 | Figma API로 프레임 추출 + 이미지 내보내기 |
| PDF | `.pdf` 확장자 | pdf-parse로 텍스트 추출 + pdf2pic으로 이미지 변환 |
| Axure 파일 | `.rp` 확장자 | 로컬 HTML 생성 후 Playwright 크롤링 |
| Figma 파일 | `.fig` 확장자 | Figma API import 후 처리 |

초기 버전은 **Axure(axshare)만 지원**, 이후 Figma/PDF 확장.

---

## 7. Claude Code pipe 연동 상세

### BatteryAgent 참조 패턴 (`AITab.swift`)

```swift
let process = Process()
process.executableURL = URL(fileURLWithPath: claudePath)
process.arguments = ["--print", "-p", prompt]
let pipe = Pipe()
process.standardOutput = pipe
process.standardError = Pipe()
try process.run()
process.waitUntilExit()
let output = String(data: pipe.fileHandleForReading.readDataToEndOfFile(), encoding: .utf8)
```

### TypeScript 포팅 (Tauri shell plugin)

```typescript
import { Command } from '@tauri-apps/plugin-shell';

async function callClaude(prompt: string): Promise<string> {
  const cmd = Command.create('claude', ['--print', '-p', prompt]);
  const output = await cmd.execute();
  if (output.code !== 0) throw new Error(output.stderr);
  return output.stdout;
}
```

### 프롬프트 설계

각 페이지의 raw 데이터(txt + html + interactions.json + 스크린샷)를 Claude에 전달하여 Markdown 생성:

```
다음 axshare 페이지의 raw 데이터를 읽고 구조화된 Markdown 스펙 문서를 작성하세요.

[페이지 메타데이터]
[텍스트 덤프]
[인터랙션 JSON]
[스크린샷 이미지 (base64)]

출력 형식: (템플릿)
```

---

## 8. Tauri 배포 설정

### GitHub Releases Auto-Update

```toml
# src-tauri/tauri.conf.json
{
  "plugins": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://github.com/leonardo204/flipbookMaker/releases/latest/download/latest.json"
      ]
    }
  }
}
```

### CI/CD (GitHub Actions)

```yaml
# .github/workflows/release.yml
on:
  push:
    tags: ['v*']
jobs:
  release:
    strategy:
      matrix:
        platform: [macos-latest, windows-latest]
    steps:
      - uses: tauri-apps/tauri-action@v0
        with:
          tagName: ${{ github.ref_name }}
          releaseName: 'FlipbookMaker ${{ github.ref_name }}'
```

---

## 9. 질문/확인 사항

### 확인 필요

1. **Figma 지원 우선순위**: 초기 버전에서 Figma도 지원해야 하는지, 아니면 Axure 먼저 완성 후 확장?
2. **인증 정보 저장**: Confluence 토큰을 앱 내에 저장할지 (keychain/credential manager) 매번 입력할지?
3. **오프라인 모드**: Confluence 업로드 없이 Markdown만 생성하는 것도 주요 유스케이스인지?
4. **다국어**: 현재 한국어 UI만 필요한지, 영어도 필요한지?
5. **Claude Code 필수**: 사용자 PC에 Claude Code가 설치되어 있어야 하는 전제 조건이 맞는지?

---

## 10. 기존 프로젝트 자산 활용

이 프로젝트(`rmsFlipbook`)에서 직접 가져갈 것:

| 자산 | 경로 | 용도 |
|------|------|------|
| 크롤링 스크립트 | `scripts/crawl.mjs` | 사이트맵 추출 엔진 |
| 캡처 스크립트 | `scripts/capture.mjs` | 페이지 캡처 엔진 |
| 섹션 캡처 | `scripts/capture-sections.mjs` | UI-only 크롭 엔진 |
| 슬러그 유틸 | `scripts/lib/slug.mjs` | 파일명 변환 |
| MCP 업로드 | `scripts/confluence-mcp-upload.mjs` | Confluence 업로드 패턴 |
| 예제 산출물 | `flipbook/` | 앱 데모/테스트용 |
| 변환 플랜 | `Ref-docs/axshare-to-markdown-plan.md` | 변환 로직 레퍼런스 |
