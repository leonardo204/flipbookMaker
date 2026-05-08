# FlipMD

> Figma/Axshare UI 플립북을 한국어 마크다운(텍스트 + Mermaid)으로 변환해 Confluence에 업로드하는 **macOS** 데스크톱 앱 (Apple Silicon)
> (이전 이름: FlipbookMaker)
>
> Windows 지원은 추후 검토. 현재는 macOS Monterey(12.0)+ 만 지원합니다.

[![Tauri](https://img.shields.io/badge/Tauri-v2-24C8DB)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](#)

## 무엇을 하나요

Figma 플립북(UI 시나리오 문서)을 분석해 **각 섹션별로 한국어 마크다운 문서**를 생성합니다. 생성된 문서는 그대로 Confluence에 업로드 가능합니다.

- Figma 프레임을 PNG로 렌더링 → Claude vision이 이미지 + 메타데이터를 함께 분석
- 같은 카테고리의 여러 프레임은 **의미 그룹 단위**로 통합된 한국어 문서로 작성 (프레임 1대1 매핑 X)
- Mermaid 다이어그램은 Confluence 호환 규칙으로 출력
- Confluence REST API로 페이지 직접 생성 + 이미지 첨부

## 핵심 특징

| 특징 | 설명 |
|------|------|
| Vision 기반 변환 | Figma `/v1/images` PNG + 노드 메타를 Claude에 함께 전달 |
| Rate limit 안전 | 토큰 버킷 — 메타 12/min, 이미지 5/min. 청크 분할(10ids) + 자동 재시도 |
| Hallucination 차단 | 입력에 없는 내용 추론 금지, 출처 인용 강제, 빈약 입력은 정직하게 짧게 |
| 한국어 출력 | 소제목/표 헤더 번역, 원문 인용은 보존 + `*(번역)*` 부기 |
| 개별/일괄 변환 | 섹션 단위 체크박스 + 행별 [변환]/[재시도]/[재변환] |
| 세부 진행 표시 | 노드 트리 수집 → 이미지 다운로드 m/n → Claude 분석 단계 노출 |

## 사전 요구사항

| 도구 | 버전 | 용도 |
|------|------|------|
| Node.js | 18+ | 빌드 |
| Rust | 1.70+ | Tauri 빌드 |
| [Claude Code CLI](https://docs.claude.com/claude-code) | 최신 | 변환 엔진 — 미설치 시 변환 버튼 비활성 |
| Figma Personal Access Token | — | 설정 화면에서 입력 |
| Confluence API Token | — | 업로드용 (선택) |

## 설치 / 빌드

```bash
git clone git@github.com:leonardo204/flipbookMaker.git
cd flipbookMaker
npm install

# 개발 모드
npm run tauri:dev

# 프로덕션 빌드 (DMG/MSI 생성)
npm run tauri:build
```

빌드 산출물은 `src-tauri/target/release/bundle/`에 생성됩니다.

## 사용 흐름

1. **설정 화면** (`Cmd+,`): Claude Code 경로, Figma PAT, Confluence 정보 입력
2. **홈 화면**: Figma 디자인 URL 붙여넣기 → 출력 폴더 지정
3. **분석 화면**: 섹션 목록에서 변환할 항목 체크 (자동 시각 순서 정렬)
4. **변환 화면**:
   - 일괄 변환 자동 시작 (선택된 섹션만)
   - 행별 [변환]/[재시도]/[재변환] 가능
   - 실패 시 에러 메시지 클릭 → 상세 사유 펼치기
   - 헤더 [분석 화면] 으로 돌아가 추가 선택 가능 (체크 상태/완료 상태 보존)
5. **업로드 화면**: 부모 페이지 ID/URL 지정 → Confluence에 일괄 업로드

## 프로젝트 구조

```
flipbookMaker/
├── src/                    # React + TypeScript 프론트엔드
│   ├── pages/              # 화면 (Home / Analyze / Convert / Upload / Settings)
│   ├── services/           # claudeService, figmaService, claudeSession
│   └── contexts/           # WorkflowContext, SettingsContext
├── src-tauri/              # Rust 백엔드
│   └── src/lib.rs          # claude_print, figma_api_proxy, confluence_upload_page 등
├── scripts/crawl.mjs       # Axshare 크롤링 (보조)
├── Ref-docs/               # 개발 가이드 / 변환 플랜
└── CLAUDE.md               # AI 페어 프로그래밍 가이드
```

## 기술 스택

- **프론트엔드**: React 18, TypeScript, Vite, React Router
- **백엔드 (Tauri 2)**:
  - `claude_print` — stdin 기반 Claude CLI 호출 (argv overflow 회피)
  - `figma_api_proxy` — Figma REST API 프록시 + 429 재시도
  - `download_to_file` — Figma S3 PNG 다운로드
  - `confluence_upload_page` — Confluence REST API 페이지 생성 + 이미지 첨부
  - `keyring` 크레이트 — OS Keychain/Credential Manager 연동
- **변환 엔진**: Claude Code CLI (vision)

## 변환 파이프라인 (Figma)

```
1. /v1/files/.../nodes (메타 트리)        ← rate limit 12/min
2. collectFrameIds (시각 순서 정렬)
3. /v1/images (PNG batch, 10ids 청크)    ← rate limit 5/min
4. download_to_file × N                   ← Figma rate limit 미적용
5. claude_print (stdin)                   ← prompt + image paths
   └ Claude가 Read 도구로 이미지 모두 읽기
   └ 의미 그룹 단위로 한국어 마크다운 생성
6. /{outputDir}/{section-slug}.md 저장
```

## 알려진 제약

- Anthropic API의 한 요청 이미지 합산 한도 ~20MB → `scale=1`로 고정
- 매우 큰 섹션(36+ 프레임)은 17분까지 timeout 확장
- Confluence는 페이지당 표/이미지 수가 많으면 렌더 지연. 큰 섹션은 분할 업로드 권장

## 문서

- [CLAUDE.md](CLAUDE.md) — 프로젝트 규칙 / AI 협업 가이드
- [컨벤션](Ref-docs/claude/conventions.md) — 커밋, 주석, Mermaid 작성 규칙
- [앱 플랜](Ref-docs/flipbook-maker-app-plan.md) — 개발 계획
- [변환 플랜](Ref-docs/axshare-to-markdown-plan.md) — 이전 Axshare 변환 레퍼런스

## 라이선스

MIT
