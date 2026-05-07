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

**FlipbookMaker** — Figma/Axure 플립북을 텍스트+Mermaid Markdown으로 변환하고 Confluence에 업로드하는 데스크톱 앱

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
- [앱 플랜](Ref-docs/flipbook-maker-app-plan.md) — FlipbookMaker 앱 개발 플랜 (현재 작업)
- [Summa-v2 참조](~/work/Summa-v2) — Tauri auto-update, 빌드 설정 패턴

### 핵심 규칙

- GitHub push는 SSH URL만 사용 (`git@github.com:`)
- Claude Code 필수 전제: 미설치 시 변환 버튼 비활성화
- Confluence 인증: OS 자격증명 관리자 사용 (macOS Keychain / Windows Credential Manager)
- Figma/Axshare URL 자동 감지 — 이미지 캡처 없이 텍스트+Mermaid만 사용
- Figma API rate limit: Pro 15req/min, 429 시 자동 재시도 + 90초 카운트다운
- `scripts/crawl.mjs`만 유지 (capture 스크립트 삭제됨)

---

*최종 업데이트: 2026-05-07*
