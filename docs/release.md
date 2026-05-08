# 릴리즈 가이드 — macOS 전용

FlipMD는 현재 **macOS Apple Silicon 전용**으로 빌드/배포됩니다. Windows 지원은 추후 별도 빌드 환경 마련 시 검토 예정.

## 사전 준비

### 1. minisign signing key

자동업데이트 검증용. 분실하면 사용자가 자동업데이트를 받지 못합니다.

```bash
# 키 생성 (1회만)
npx @tauri-apps/cli signer generate -w ~/.tauri/flipmd.key --ci

# pubkey 확인 (tauri.conf.json의 plugins.updater.pubkey와 일치해야 함)
cat ~/.tauri/flipmd.key.pub
```

키 파일은 안전한 곳(1Password, 외장 디스크 등)에 백업.

### 2. `.env.release` 파일

프로젝트 루트(`flipbookMaker/.env.release`)에 다음 내용:

```bash
TAURI_SIGNING_PRIVATE_KEY="$HOME/.tauri/flipmd.key"
TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
APPLE_SIGNING_IDENTITY="Developer ID Application: YONGSUB LEE (XU8HS9JUTS)"
```

`scripts/.env.release.example`에서 복사 후 값 채움. **.gitignore로 보호되어 커밋되지 않음.**

### 3. gh CLI 인증

```bash
gh auth login
```

---

## 릴리즈 진행

```bash
cd /path/to/flipbookMaker
./scripts/build_release.sh
```

다음 순서로 자동 진행됩니다:
1. 사전 검증 (서명키, gh 인증)
2. Tauri 빌드 (`npm run tauri:build`) — `.app`, `.dmg`, `.app.tar.gz`, `.app.tar.gz.sig` 생성
3. `latest.json` 생성 (darwin-aarch64 + darwin-x86_64)
4. GitHub Release `v{version}` 생성 + 모든 산출물 업로드
5. 빌드 디렉토리 정리

산출물:
- `FlipMD_{version}_aarch64.dmg`
- `FlipMD.app.tar.gz` + `.sig`
- `latest.json`

---

## 자동업데이트 동작 검증

릴리즈 직후 사용자 측에서 앱 실행 시 자동으로 `latest.json` 폴링, `.app.tar.gz` 다운로드 + 검증 + 교체.

`latest.json`이 정확한 형식인지 수동 확인:

```bash
gh release view v1.2.0 --repo leonardo204/flipbookMaker --json assets | jq '.assets[].name'
curl -sL https://github.com/leonardo204/flipbookMaker/releases/latest/download/latest.json | jq
```

---

## 자주 묻는 사항

### Q1. private key를 분실했어요
- 새로 키 페어 생성 → `tauri.conf.json` pubkey 갱신
- 기존 사용자는 자동업데이트 안 됨 → 안내 후 수동 재설치 필요

### Q2. macOS notarization은 안 되어 있나요?
- 현재 스크립트는 notarization 미포함. 사용자에게 "확인되지 않은 개발자" 경고 노출
- 첫 실행 시 Cmd+클릭 → 열기로 우회 가능
- 필요 시 `.env.release`에 `APPLE_ID` / `APPLE_PASSWORD` / `APPLE_TEAM_ID` 추가하고 `npm run tauri:build`에 notarize 옵션 추가

### Q3. 같은 버전 재업로드
- `gh release upload --clobber`로 기존 에셋 덮어씀
- 단, 사용자가 이미 이전 빌드를 받았다면 같은 버전으로 자동업데이트 안 됨 (버전 비교)

### Q4. Apple Silicon 외 Intel Mac도 지원?
- `latest.json`에 `darwin-x86_64`도 같은 aarch64 binary URL을 가리키도록 설정됨
- Apple Silicon Mac은 Rosetta 2로 x86_64 binary를 실행 가능하지만, 현재 빌드는 aarch64 native만
- Intel Mac에서도 동작하지만 Rosetta 의존

---

## 단축 명령

```bash
# 전체 (빌드 + 업로드)
./scripts/build_release.sh

# 빌드만 (업로드 안 함)
./scripts/build_release.sh --build

# 이미 빌드된 산출물로 업로드만
./scripts/build_release.sh --upload

# 빌드 폴더 정리
./scripts/build_release.sh --clean
```

---

## Windows 지원 (추후)

Windows 빌드는 cross-compile이 불가능해 Windows 머신/VM 또는 GitHub Actions가 필요합니다. 현재는 미지원이며, 사용자 수가 충분히 늘면 다음 옵션 중 하나로 추가 검토:

- **GitHub Actions (windows-latest 러너)**: tag push 시 자동 빌드 + 같은 release에 추가
- **Windows VM (Parallels 등)**: 매 릴리즈마다 수동 빌드
