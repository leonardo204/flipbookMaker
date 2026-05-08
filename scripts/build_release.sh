#!/bin/bash
# FlipMD 릴리즈 빌드 + GitHub Release 업로드 스크립트 (macOS 전용)
# Tauri 빌드 (updater 서명 포함) → latest.json 생성 → GitHub Release 업로드
#
# 사용법:
#   ./scripts/build_release.sh              # 전체 (빌드 + 업로드)
#   ./scripts/build_release.sh --build      # 빌드만
#   ./scripts/build_release.sh --upload     # 업로드만 (이미 빌드된 산출물)
#   ./scripts/build_release.sh --clean      # 빌드 디렉토리 정리
#
# Windows 지원은 추후 별도 빌드 환경 마련 시 추가 예정.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# 색상
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# 버전/이름 읽기
VERSION=$(grep '"version"' "$PROJECT_ROOT/src-tauri/tauri.conf.json" | head -1 | sed 's/.*"\([0-9.]*\)".*/\1/')
TAG="v${VERSION}"
PRODUCT_NAME=$(grep '"productName"' "$PROJECT_ROOT/src-tauri/tauri.conf.json" | head -1 | sed 's/.*": *"\([^"]*\)".*/\1/')

# 산출물 경로 (macOS)
BUNDLE_DIR="$PROJECT_ROOT/src-tauri/target/release/bundle"
DMG_DIR="$BUNDLE_DIR/dmg"
MACOS_DIR="$BUNDLE_DIR/macos"
APP_TAR="$MACOS_DIR/${PRODUCT_NAME}.app.tar.gz"
APP_SIG="$MACOS_DIR/${PRODUCT_NAME}.app.tar.gz.sig"

# GitHub Release 대상 — .env.release에서 override 가능
GITHUB_REPO="${GITHUB_RELEASE_REPO:-leonardo204/flipbookMaker}"

info()  { echo -e "${CYAN}$1${NC}"; }
ok()    { echo -e "${GREEN}✓ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠ $1${NC}"; }
fail()  { echo -e "${RED}✗ $1${NC}"; exit 1; }

# ─── 환경변수 로드 ───
load_env() {
    local env_file="$PROJECT_ROOT/.env.release"
    if [ ! -f "$env_file" ]; then
        fail ".env.release 파일이 없습니다. scripts/.env.release.example 복사해서 생성하세요."
    fi
    set -a
    source "$env_file"
    set +a
    ok ".env.release 로드 완료"
}

# ─── 사전 검증 ───
preflight_check() {
    info "=== 사전 검증 ==="

    [ -z "$TAURI_SIGNING_PRIVATE_KEY" ] && fail "TAURI_SIGNING_PRIVATE_KEY 미설정 (.env.release 확인)"

    if ! gh auth status &>/dev/null; then
        fail "gh CLI 인증 필요: gh auth login"
    fi

    local free_gb=$(df -g "$PROJECT_ROOT" | tail -1 | awk '{print $4}')
    if [ "$free_gb" -lt 5 ]; then
        warn "디스크 여유 공간 부족: ${free_gb}GB (최소 5GB 권장)"
    fi

    ok "사전 검증 통과 (v${VERSION})"
    echo ""
}

# ─── 빌드 (macOS) ───
do_build() {
    info "=== FlipMD ${TAG} 릴리즈 빌드 (macOS) ==="
    echo ""

    info "[1/1] Tauri 빌드 (updater 서명 포함)"
    cd "$PROJECT_ROOT"
    npm run tauri:build || {
        warn "Tauri 빌드 일부 실패 (DMG 패키징 등) — 산출물 확인 후 수동 복구"
    }
    echo ""

    local app_dir="$MACOS_DIR/${PRODUCT_NAME}.app"

    if [ ! -d "$app_dir" ]; then
        fail ".app 번들이 생성되지 않았습니다: $app_dir"
    fi
    ok ".app 번들 존재: $app_dir"

    # Updater 번들 (.app.tar.gz + .sig)
    if [ ! -f "$APP_TAR" ]; then
        warn "Updater 번들 미생성 — 수동 생성 중..."
        cd "$MACOS_DIR"
        tar czf "${PRODUCT_NAME}.app.tar.gz" "${PRODUCT_NAME}.app"
        ok "Updater 번들 수동 생성 완료"
    fi

    if [ ! -f "$APP_SIG" ]; then
        warn "서명 파일 미생성 — 수동 서명 중..."
        local sign_args=(-k "$TAURI_SIGNING_PRIVATE_KEY")
        if [ -n "$TAURI_SIGNING_PRIVATE_KEY_PASSWORD" ]; then
            sign_args+=(-p "$TAURI_SIGNING_PRIVATE_KEY_PASSWORD")
        fi
        npx @tauri-apps/cli signer sign "$APP_TAR" "${sign_args[@]}"
        ok "수동 서명 완료"
    fi

    # DMG — 없으면 hdiutil로 수동 생성
    local dmg_file="$DMG_DIR/${PRODUCT_NAME}_${VERSION}_aarch64.dmg"
    if [ ! -f "$dmg_file" ]; then
        warn "DMG 미생성 — hdiutil로 수동 생성 중..."
        mkdir -p "$DMG_DIR"
        local staging=$(mktemp -d)
        cp -R "$app_dir" "$staging/"
        ln -s /Applications "$staging/Applications"
        hdiutil create -volname "${PRODUCT_NAME}" -srcfolder "$staging" -ov -format UDZO "$dmg_file"
        rm -rf "$staging"
        ok "DMG 수동 생성 완료"
    fi

    # DMG notarize + staple (Tauri는 .app만 notarize함 — DMG에도 ticket 첨부해야 spctl 통과)
    if [ -f "$dmg_file" ] && [ -n "$APPLE_ID" ] && [ -n "$APPLE_PASSWORD" ] && [ -n "$APPLE_TEAM_ID" ]; then
        info "DMG notarize + staple 중..."
        if xcrun stapler validate "$dmg_file" >/dev/null 2>&1; then
            ok "DMG 이미 stapled 상태"
        else
            xcrun notarytool submit "$dmg_file" \
                --apple-id "$APPLE_ID" \
                --password "$APPLE_PASSWORD" \
                --team-id "$APPLE_TEAM_ID" \
                --wait | tail -5
            xcrun stapler staple "$dmg_file" || warn "DMG staple 실패 (notarize 자체는 OK일 수 있음)"
            ok "DMG notarize + staple 완료"
        fi
    else
        warn "DMG notarize 스킵 — APPLE_ID/PASSWORD/TEAM_ID 환경변수 확인"
    fi

    info "=== 빌드 산출물 (macOS) ==="
    ok "Updater 번들: $APP_TAR ($(du -h "$APP_TAR" | cut -f1))"
    ok "서명 파일: $APP_SIG"
    ok "DMG: $dmg_file ($(du -h "$dmg_file" | cut -f1))"
    echo ""
}

# ─── latest.json 생성 (macOS 전용) ───
generate_latest_json() {
    info "=== latest.json 생성 ==="

    local pub_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local mac_url="https://github.com/${GITHUB_REPO}/releases/download/${TAG}/${PRODUCT_NAME}.app.tar.gz"

    if [ ! -f "$APP_SIG" ]; then
        fail "macOS 서명 파일 없음: $APP_SIG — 먼저 빌드를 실행하세요"
    fi
    local mac_signature=$(cat "$APP_SIG")

    cat > "$BUNDLE_DIR/latest.json" <<LATEST_EOF
{
  "version": "${VERSION}",
  "notes": "FlipMD v${VERSION} 릴리즈",
  "pub_date": "${pub_date}",
  "platforms": {
    "darwin-aarch64": {
      "signature": "${mac_signature}",
      "url": "${mac_url}"
    },
    "darwin-x86_64": {
      "signature": "${mac_signature}",
      "url": "${mac_url}"
    }
  }
}
LATEST_EOF

    ok "latest.json 생성 완료: $BUNDLE_DIR/latest.json"
    echo ""
}

# ─── GitHub Release 업로드 ───
do_upload() {
    info "=== GitHub Release 업로드 (${GITHUB_REPO}) ==="

    [ ! -f "$APP_TAR" ] && fail "Updater 번들 없음: $APP_TAR — 먼저 빌드하세요"
    [ ! -f "$APP_SIG" ] && fail "서명 파일 없음: $APP_SIG"
    [ ! -f "$BUNDLE_DIR/latest.json" ] && fail "latest.json 없음 — 먼저 빌드를 실행하세요"

    local dmg_file=$(ls "$DMG_DIR"/*.dmg 2>/dev/null | head -1)

    # 기존 release 확인
    if gh release view "$TAG" --repo "$GITHUB_REPO" &>/dev/null; then
        warn "Release ${TAG} 이미 존재 — 에셋을 덮어씁니다"
    else
        info "Release ${TAG} 생성 중..."
        gh release create "$TAG" \
            --repo "$GITHUB_REPO" \
            --title "FlipMD v${VERSION}" \
            --notes "FlipMD v${VERSION} 릴리즈" \
            --latest
        ok "Release ${TAG} 생성 완료"
    fi

    # 에셋 업로드 (--clobber로 덮어쓰기)
    info "에셋 업로드 중..."
    gh release upload "$TAG" "$APP_TAR" --repo "$GITHUB_REPO" --clobber
    ok "업로드: ${PRODUCT_NAME}.app.tar.gz"

    gh release upload "$TAG" "$APP_SIG" --repo "$GITHUB_REPO" --clobber
    ok "업로드: ${PRODUCT_NAME}.app.tar.gz.sig"

    gh release upload "$TAG" "$BUNDLE_DIR/latest.json" --repo "$GITHUB_REPO" --clobber
    ok "업로드: latest.json"

    if [ -n "$dmg_file" ]; then
        gh release upload "$TAG" "$dmg_file" --repo "$GITHUB_REPO" --clobber
        ok "업로드: $(basename "$dmg_file")"
    fi

    echo ""
    ok "GitHub Release 업로드 완료: https://github.com/${GITHUB_REPO}/releases/tag/${TAG}"
    echo ""
}

# ─── 빌드 정리 ───
cleanup_build_artifacts() {
    info "=== 빌드 아티팩트 정리 ==="

    if [ -d "$PROJECT_ROOT/src-tauri/target/debug" ]; then
        local size=$(du -sm "$PROJECT_ROOT/src-tauri/target/debug" 2>/dev/null | cut -f1)
        if [ "$size" -gt 100 ]; then
            rm -rf "$PROJECT_ROOT/src-tauri/target/debug"
            ok "target/debug 삭제 (${size}MB)"
        fi
    fi

    ok "정리 완료"
}

# ─── 메인 ───
case "${1:-}" in
    --clean)
        cleanup_build_artifacts
        ;;
    --build)
        load_env
        preflight_check
        do_build
        generate_latest_json
        info "빌드 완료. 업로드하려면: ./scripts/build_release.sh --upload"
        ;;
    --upload)
        load_env
        generate_latest_json
        do_upload
        ;;
    *)
        load_env
        preflight_check
        do_build
        generate_latest_json
        do_upload
        cleanup_build_artifacts

        echo ""
        info "════════════════════════════════════════"
        ok "FlipMD ${TAG} 릴리즈 완료!"
        info "릴리즈: https://github.com/${GITHUB_REPO}/releases/tag/${TAG}"
        info "════════════════════════════════════════"
        ;;
esac
