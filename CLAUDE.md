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

**rmsFlipbook** — axshare 플립북을 Markdown 스펙 문서로 변환하는 프로젝트

| 항목 | 값 |
|------|-----|
| 기술 스택 | Node.js (ESM), Playwright |
| 빌드 방법 | `npm install && npx playwright install chromium` |
| 상태 | 개발 중 |

### 상세 문서

- [Context DB](Ref-docs/claude/context-db.md) — SQLite 기반 세션/태스크/결정 저장소
- [Context Monitor](Ref-docs/claude/context-monitor.md) — HUD + compaction 감지/복구
- [Hooks](Ref-docs/claude/hooks.md) — 5개 자동 실행 Hook 상세
- [컨벤션](Ref-docs/claude/conventions.md) — 커밋, 주석, 로깅 규칙
- [셋업](Ref-docs/claude/setup.md) — 새 환경 초기 설정
- [Agent Delegation](Ref-docs/claude/agent-delegation.md) — 에이전트 위임/파이프라인 상세
- [작업 플랜](Ref-docs/axshare-to-markdown-plan.md) — axshare→Markdown 변환 4-Phase 실행 플랜 (완료)
- [앱 플랜](Ref-docs/flipbook-maker-app-plan.md) — FlipbookMaker 데스크톱 앱 개발 플랜

### 핵심 규칙

- 작업은 Phase 순서(Discovery→Extraction→Authoring→Aggregation)로 진행
- 원본 URL: `https://lsx333.axshare.com/?g=14&id=release_history`
- `flipbook/{section}/` 안에 md+png co-located 배치
- 추론과 확인된 내용을 문서에서 명확히 구분

---

*최종 업데이트: 2026-04-28*
