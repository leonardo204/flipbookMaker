# 릴리즈 히스토리 — FlipMD 버전별 변경 요약

> GitHub Releases: https://github.com/leonardo204/flipbookMaker/releases
>
> 릴리즈 명명/배포 컨벤션은 [컨벤션](claude/conventions.md) + `scripts/build_release.sh` 참조.

---

## v1.3.9 — 2026-05-26

**[Docs] Figma 토큰 발급 경로 안내 문구 수정**

- SettingsPage의 Figma 연결 섹션 안내 문구를 최신 Figma UI에 맞게 갱신
- 기존: `Figma → Settings → Personal access tokens`
- 변경: `Figma → Help and account → Account settings → Security`

**관련 커밋**: `[Docs] Figma 토큰 발급 경로 안내 문구 수정`

---

## v1.3.8 — 2026-05-21

**[Feature] Children Page 제목 정책 (Auto / Prefix / Suffix)**

- Confluence Space 내 page title 고유성 보장을 위해 업로드 시 children page 제목에 구분 문자열을 자동/수동으로 부착
- Auto 모드: 오늘 날짜(`YYYY-MM-DD`)를 Suffix로 자동 추가 (기본값)
- Prefix / Suffix 모드: 사용자 입력 문자열 (입력 필수, 빈 값이면 [업로드 시작] 비활성화)
- 라디오 선택에 따라 입력창 노출/숨김, 미리보기 즉시 갱신
- `TextInput` 컴포넌트에 `disabled` prop 추가

**관련 커밋**: `[Feature] Children Page 제목 정책 — Auto/Prefix/Suffix`, `[Fix] Cargo.lock version 1.3.8 동기화`

---

## v1.3.7 — 2026-05-21 [DEPRECATED]

> ⚠ **사용 금지** — release tag(`v1.3.7`)가 잘못된 commit(v1.3.6 코드)을 가리키는 mismatch가 발생.
> 동일 기능을 **v1.3.8**로 재발행했으니 v1.3.8를 사용할 것.
> Release asset(`.dmg`/`.app.tar.gz`) 자체는 v1.3.7 코드로 빌드되어 다운로드/auto-update 동작은 정상이었으나, tag→source code traceability가 깨져 폐기.

**원인**: 코드 변경을 commit하지 않은 상태에서 `build_release.sh`를 먼저 실행 → `gh release create`가 main의 HEAD(이전 commit)에 tag를 생성. 이후 commit + push했으나 tag는 이전 commit을 그대로 가리킴.

**재발 방지 원칙**: 빌드 직전 반드시 `git status`로 working tree가 clean한지 확인 후 빌드. 또는 commit + push → 빌드 순서를 강제.

---

## v1.3.6 — 이전 릴리즈

**[Fix] 다른 URL 분석 시 stale sitemap 재사용 버그**

- 이전 분석 결과가 다른 URL에 재사용되는 버그 수정
- Cargo.lock 버전 동기화

---

## v1.3.5 — 이전 릴리즈

**[Fix] Axshare sitemap Folder 펼치기 — 각 Wireframe을 별도 섹션으로**

---

## v1.3.4 — 이전 릴리즈

**[Fix] resolveResource '_up_/scripts' 경로 해결**

---

## v1.3.3 — 이전 릴리즈

**[Fix] stderr 가시성 강화 + crawl.mjs 진단 출력**

---

*이전 버전(v1.3.2 이하)의 상세 내역은 `git log v1.3.2 -- .` 참조.*
