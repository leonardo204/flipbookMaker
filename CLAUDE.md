# Claude Code 개발 가이드

> 공통 규칙(Agent Delegation, 커밋 정책, Context DB 등)은 글로벌 설정(`~/.claude/CLAUDE.md`)을 따릅니다.
> 글로벌 미설치 시: `curl -fsSL https://raw.githubusercontent.com/leonardo204/dotclaude/main/install.sh | bash`

---

## Slim 정책

이 파일은 **100줄 이하**를 유지한다. 새 지침 추가 시:
1. 매 턴 참조 필요 → 이 파일에 1줄 추가
2. 상세/예시/테이블 → Ref-docs/claude/*.md에 작성 후 여기서 참조
3. ref-docs 헤더: `# 제목 — 한 줄 설명` (모델이 첫 줄만 보고 필요 여부 판단)

---

## PROJECT

> 아래 섹션을 프로젝트에 맞게 작성하세요.

### 개요

**FlipMD** (이전: FlipbookMaker) — Figma/Axure 플립북을 텍스트+Mermaid Markdown으로 변환하고 Confluence에 업로드하는 **macOS 전용** 데스크톱 앱 (Apple Silicon, 12.0+)

### 목적 / 목표 (구현 판단 시 항상 우선)

- **목적**: Figma UI 플립북을 마크다운으로 변환해 Confluence에 업로드 → 검색/링크/복붙 등 활용성 향상
- **최우선 목표**: 플립북의 내용을 **최대한 충실히** 마크다운으로 옮기는 것
- **콘텐츠 정의 (모두 변환 대상)**:
  - 텍스트(라벨/설명/카피) — TEXT 노드의 `characters`
  - **와이어프레임** — 컴포넌트 계층, 레이아웃, 프레임 구조 (텍스트가 없어도 가치 있음)
  - 인터랙션/플로우/상태 전환 — Mermaid로 표현
- **제외/약화 대상**: 단일 이미지(`RECTANGLE` 1개)만 있고 구조도 텍스트도 없는 섹션 (예: End Page) — 자동 제외하지 말고 "내용 없음" 배지로 표시 (사용자 판단 존중)
- **금지**: 입력에 없는 내용을 추론으로 채우는 것 (LLM hallucination). 빈약하면 빈약한 대로 정직하게 출력

| 항목 | 값 |
|------|-----|
| 기술 스택 | Tauri v2 + React + TypeScript |
| LLM 연동 | Claude Code CLI 상주 세션 (`claude --print -p`) |
| Figma 연동 | REST API (Personal Access Token, Rust 프록시) |
| 빌드 방법 | `npm install && npm run tauri:build` |
| 배포 | GitHub Releases + Tauri auto-update |
| GitHub | git@github.com:leonardo204/flipbookMaker.git (SSH) |
| 상태 | 개발 중 (v1.1) |

### 상세 문서

- [Context DB](Ref-docs/claude/context-db.md) — SQLite 기반 세션/태스크/결정 저장소
- [Context Monitor](Ref-docs/claude/context-monitor.md) — HUD + compaction 감지/복구
- [Hooks](Ref-docs/claude/hooks.md) — 5개 자동 실행 Hook 상세
- [컨벤션](Ref-docs/claude/conventions.md) — 커밋, 주석, 로깅 규칙
- [셋업](Ref-docs/claude/setup.md) — 새 환경 초기 설정
- [Agent Delegation](Ref-docs/claude/agent-delegation.md) — 에이전트 위임/파이프라인 상세
- [변환 플랜](Ref-docs/axshare-to-markdown-plan.md) — axshare→Markdown 변환 로직 레퍼런스 (완료)
- [앱 플랜](Ref-docs/flipbook-maker-app-plan.md) — FlipMD 앱 개발 플랜 (현재 작업, 파일명은 이전 이름 유지)
- [릴리즈 히스토리](Ref-docs/release-history.md) — 버전별 변경 요약 + DEPRECATED 표기 + 재발 방지 원칙
- [Summa-v2 참조](~/work/Summa-v2) — Tauri auto-update, 빌드 설정 패턴

### 핵심 규칙

**일반**
- GitHub push는 SSH URL만 사용 (`git@github.com:`)
- Claude Code 필수 전제: 미설치 시 변환 버튼 비활성화
- Confluence 인증: OS 자격증명 관리자 사용 (macOS Keychain / Windows Credential Manager)
- `scripts/crawl.mjs`만 유지 (capture 스크립트 삭제됨)

**Figma 변환 파이프라인**
- Figma/Axshare URL 자동 감지 — Figma는 PAT(REST) + 프레임 PNG 렌더링
- Figma 메타 API rate limit: Pro 15req/min, 토큰 버킷 12/min로 안전 마진. 429 시 자동 재시도 + 90초 카운트다운
- Figma `/v1/images` rate limit: Pro 6req/min, 토큰 버킷 5/min. 32+ ID 한 번에 보내면 400 → `IMAGE_BATCH_MAX=10` 청크 분할 + 절반 재시도 fallback
- 이미지 `scale=1` 고정 — Anthropic API 이미지 합산 한도(~20MB) 회피 (1920×1080 wireframe도 vision OCR 가능)
- 프레임은 시각 순서(상→하, 좌→우, bbox 기반) 정렬해 LLM에 전달

**Claude CLI 호출**
- argv overflow 회피: Rust `claude_print` 명령이 stdin 기반으로 spawn (큰 프롬프트 안전)
- 섹션마다 새 세션 — 컨텍스트/이미지 누적이 1M window 채우는 image_error 차단
- 동적 timeout: 300s + 20s × image_count
- 변환 전 기존 .md 사전 삭제 — Claude의 "이미 있어 유지" 판단 차단

**프롬프트/출력 규칙**
- 한국어 출력: 소제목/표 헤더 번역, 인용 블록은 원문 + `*(번역)*` 부기, 표 본문 셀 병기
- 의미 그룹 H2 — 프레임 1대1 매핑 금지, 6~8개 기능 그룹으로 통합 + 부록 화면 인덱스 표
- Mermaid 작성 규칙 (Confluence 호환): 노드 라벨 안 괄호 금지, `<br>` 사용, 숫자 리스트 금지 → [컨벤션](Ref-docs/claude/conventions.md)
- 절대 금지: hallucination, 이모지, raw 노드 ID 본문 노출, 메타 누설(visible=false 등)

---

*최종 업데이트: 2026-05-08 (Figma vision 파이프라인 + 의미 그룹 변환 규칙 반영)*
