use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder},
    Emitter,
};

use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(Serialize)]
struct ClaudeTestResult {
    success: bool,
    path: Option<String>,
    version: Option<String>,
    message: String,
}

#[tauri::command]
fn test_claude_code(custom_path: Option<String>) -> ClaudeTestResult {
    let candidates = if let Some(ref p) = custom_path {
        let trimmed = p.trim();
        if !trimmed.is_empty() {
            vec![expand_tilde(trimmed)]
        } else {
            default_candidates()
        }
    } else {
        default_candidates()
    };

    for path in &candidates {
        if let Ok(output) = Command::new(path).arg("--version").output() {
            if output.status.success() {
                let version = String::from_utf8_lossy(&output.stdout).trim().to_string();
                return ClaudeTestResult {
                    success: true,
                    path: Some(path.clone()),
                    version: Some(version),
                    message: "Claude Code 연결 성공".to_string(),
                };
            }
        }
    }

    ClaudeTestResult {
        success: false,
        path: None,
        version: None,
        message: "Claude Code를 찾을 수 없습니다. 설치 후 경로를 지정하세요.".to_string(),
    }
}

fn default_candidates() -> Vec<String> {
    let mut candidates = Vec::new();

    if let Ok(home) = std::env::var("HOME") {
        // 네이티브 설치
        candidates.push(format!("{}/.local/bin/claude", home));

        // nvm 경로 탐색
        let nvm_root = format!("{}/.nvm/versions/node", home);
        if let Ok(entries) = std::fs::read_dir(&nvm_root) {
            let mut versions: Vec<_> = entries.flatten().collect();
            versions.sort_by_key(|e| e.file_name());
            for entry in versions.into_iter().rev() {
                let p = entry.path().join("bin/claude");
                if p.exists() {
                    if let Some(s) = p.to_str() {
                        candidates.push(s.to_string());
                    }
                }
            }
        }

        // volta
        let volta_path = format!("{}/.volta/bin/claude", home);
        if std::path::Path::new(&volta_path).exists() {
            candidates.push(volta_path);
        }
    }

    // 시스템 경로
    candidates.push("/usr/local/bin/claude".to_string());
    candidates.push("/opt/homebrew/bin/claude".to_string());

    // macOS 앱 번들 내부 (cmux 등)
    candidates.push("/Applications/cmux.app/Contents/Resources/bin/claude".to_string());

    // 최후 수단: PATH에서 탐색
    candidates.push("claude".to_string());

    candidates
}

fn expand_tilde(input: &str) -> String {
    if input.starts_with("~/") {
        if let Ok(home) = std::env::var("HOME") {
            return format!("{}/{}", home.trim_end_matches('/'), &input[2..]);
        }
    }
    input.to_string()
}

/// Node.js 실행 파일 후보 경로 (claude_path 검색 패턴 차용).
/// macOS GUI 앱은 사용자 shell PATH(nvm/homebrew)를 못 받으므로 흔한 위치를 직접 검색.
fn default_node_candidates() -> Vec<String> {
    let mut candidates = Vec::new();

    if let Ok(home) = std::env::var("HOME") {
        // nvm
        let nvm_root = format!("{}/.nvm/versions/node", home);
        if let Ok(entries) = std::fs::read_dir(&nvm_root) {
            let mut versions: Vec<_> = entries.flatten().collect();
            versions.sort_by_key(|e| e.file_name());
            for entry in versions.into_iter().rev() {
                let p = entry.path().join("bin/node");
                if p.exists() {
                    if let Some(s) = p.to_str() {
                        candidates.push(s.to_string());
                    }
                }
            }
        }

        // volta
        let volta_path = format!("{}/.volta/bin/node", home);
        if std::path::Path::new(&volta_path).exists() {
            candidates.push(volta_path);
        }

        // fnm
        let fnm_root = format!("{}/.fnm/aliases/default/bin/node", home);
        if std::path::Path::new(&fnm_root).exists() {
            candidates.push(fnm_root);
        }
    }

    // homebrew (Apple Silicon)
    candidates.push("/opt/homebrew/bin/node".to_string());
    // homebrew (Intel)
    candidates.push("/usr/local/bin/node".to_string());
    // 시스템
    candidates.push("/usr/bin/node".to_string());
    // 최후 — PATH
    candidates.push("node".to_string());

    candidates
}

#[derive(Serialize)]
struct NodeTestResult {
    available: bool,
    path: Option<String>,
    version: Option<String>,
    error: Option<String>,
}

#[tauri::command]
fn test_node_available() -> NodeTestResult {
    for path in default_node_candidates() {
        if let Ok(output) = std::process::Command::new(&path).arg("--version").output() {
            if output.status.success() {
                let version = String::from_utf8_lossy(&output.stdout).trim().to_string();
                eprintln!("[test_node_available] found: {} ({})", path, version);
                return NodeTestResult {
                    available: true,
                    path: Some(path),
                    version: Some(version),
                    error: None,
                };
            }
        }
    }

    NodeTestResult {
        available: false,
        path: None,
        version: None,
        error: Some(
            "Node.js를 찾을 수 없습니다. nvm/homebrew/volta로 설치 후 앱을 재시작하세요."
                .to_string(),
        ),
    }
}

/// node 절대 경로를 찾아 반환 (default_node_candidates 첫 성공).
fn resolve_node_path() -> Option<String> {
    for path in default_node_candidates() {
        if let Ok(output) = std::process::Command::new(&path).arg("--version").output() {
            if output.status.success() {
                return Some(path);
            }
        }
    }
    None
}

/// 글로벌 npm 모듈 디렉토리 후보들 — npm 호출 없이 직접 검색.
/// macOS GUI 앱은 PATH가 비어있어 'npm root -g' 호출 자체가 실패할 수 있으므로
/// 흔한 위치들을 직접 검사하는 방식이 더 견고.
fn npm_global_root_candidates() -> Vec<String> {
    let mut candidates = Vec::new();

    if let Ok(home) = std::env::var("HOME") {
        // nvm — 가장 최신 버전부터
        let nvm_root = format!("{}/.nvm/versions/node", home);
        if let Ok(entries) = std::fs::read_dir(&nvm_root) {
            let mut versions: Vec<_> = entries.flatten().collect();
            versions.sort_by_key(|e| e.file_name());
            for entry in versions.into_iter().rev() {
                let p = entry.path().join("lib/node_modules");
                if let Some(s) = p.to_str() {
                    candidates.push(s.to_string());
                }
            }
        }
        // npm-global (사용자 prefix 설정)
        candidates.push(format!("{}/.npm-global/lib/node_modules", home));
        candidates.push(format!("{}/.npm/lib/node_modules", home));
        // volta
        candidates.push(format!("{}/.volta/tools/image/packages", home));
    }

    // homebrew (Apple Silicon)
    candidates.push("/opt/homebrew/lib/node_modules".to_string());
    // homebrew (Intel) / 시스템
    candidates.push("/usr/local/lib/node_modules".to_string());

    candidates
}

/// (호환성용) node 경로 기반 npm root 후보 — 첫 번째 존재 디렉토리만 반환.
fn resolve_npm_global_root(_node_path: &str) -> Option<String> {
    npm_global_root_candidates()
        .into_iter()
        .find(|p| std::path::Path::new(p).is_dir())
}

/// 글로벌 npm 모듈에서 playwright 디렉토리를 직접 검색.
/// `npm root -g` 호출 없이 후보 위치를 순회해 playwright/package.json 존재 검사.
fn find_playwright_module() -> Option<(String, String)> {
    for root in npm_global_root_candidates() {
        let pw_dir = format!("{}/playwright", root);
        let pkg_json = format!("{}/package.json", pw_dir);
        if std::path::Path::new(&pkg_json).exists() {
            return Some((pw_dir, root));
        }
    }
    None
}

#[derive(Serialize)]
struct PlaywrightTestResult {
    available: bool,
    version: Option<String>,
    module_path: Option<String>,
    npm_global_root: Option<String>,
    error: Option<String>,
}

#[tauri::command]
fn test_playwright_available() -> PlaywrightTestResult {
    // 흔한 글로벌 위치들 직접 검색 (npm root -g 호출 우회 — GUI PATH 한계 회피)
    if let Some((pw_dir, npm_root)) = find_playwright_module() {
        let pkg_json = format!("{}/package.json", pw_dir);
        if let Ok(content) = std::fs::read_to_string(&pkg_json) {
            if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                let version = parsed["version"].as_str().map(|s| s.to_string());
                eprintln!(
                    "[test_playwright_available] found: {} ({})",
                    pw_dir,
                    version.as_deref().unwrap_or("?")
                );
                return PlaywrightTestResult {
                    available: true,
                    version,
                    module_path: Some(pw_dir),
                    npm_global_root: Some(npm_root),
                    error: None,
                };
            }
        }
    }

    // 검색 실패 — fallback npm_root만 표시 (사용자에게 위치 힌트 제공)
    let fallback_root = resolve_npm_global_root("");
    eprintln!(
        "[test_playwright_available] not found. checked candidates: {:?}",
        npm_global_root_candidates()
    );

    PlaywrightTestResult {
        available: false,
        version: None,
        module_path: None,
        npm_global_root: fallback_root,
        error: Some(
            "Playwright가 글로벌 npm 모듈에 없습니다. 'npm install -g playwright' 후 'npx playwright install chromium' 실행이 필요합니다.".to_string(),
        ),
    }
}

#[derive(Deserialize)]
struct RunNodeScriptRequest {
    script_path: String,
    args: Vec<String>,
    /// 추가 환경변수 (PLAYWRIGHT_MODULE_PATH 등)
    #[serde(default)]
    env: std::collections::HashMap<String, String>,
}

#[derive(Serialize)]
struct RunNodeScriptResult {
    exit_code: i32,
    stderr: String,
}

/// Node.js 스크립트를 spawn하고 stdout 라인을 'node-progress' 이벤트로 emit.
/// 종료 코드 + 누적된 stderr를 반환 (실패 시 frontend에서 에러 메시지 노출).
#[tauri::command]
async fn run_node_script(
    app: tauri::AppHandle,
    request: RunNodeScriptRequest,
) -> Result<RunNodeScriptResult, String> {
    use std::process::Stdio;
    use std::sync::{Arc, Mutex};
    use tokio::io::{AsyncBufReadExt, BufReader};
    use tokio::process::Command as TokioCommand;
    use tauri::Emitter;

    let node = resolve_node_path()
        .ok_or_else(|| "Node.js를 찾을 수 없습니다.".to_string())?;

    eprintln!(
        "[run_node_script] node={} script={} args={:?}",
        node, request.script_path, request.args
    );
    eprintln!("[run_node_script] env: {:?}", request.env);

    let mut cmd = TokioCommand::new(&node);
    cmd.arg(&request.script_path)
        .args(&request.args)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    for (k, v) in &request.env {
        cmd.env(k, v);
    }

    let mut child = cmd
        .spawn()
        .map_err(|e| format!("spawn 실패: {} (node={})", e, node))?;

    let stdout = child.stdout.take().ok_or("stdout 핸들 없음")?;
    let stderr = child.stderr.take().ok_or("stderr 핸들 없음")?;

    let app_clone = app.clone();
    tokio::spawn(async move {
        let mut reader = BufReader::new(stdout).lines();
        while let Ok(Some(line)) = reader.next_line().await {
            let _ = app_clone.emit("node-progress", &line);
        }
    });

    // stderr 라인을 누적해서 결과에 포함 — 실패 시 frontend가 사유 노출
    let stderr_buf = Arc::new(Mutex::new(String::new()));
    let stderr_buf_clone = stderr_buf.clone();
    let stderr_handle = tokio::spawn(async move {
        let mut reader = BufReader::new(stderr).lines();
        while let Ok(Some(line)) = reader.next_line().await {
            eprintln!("[node stderr] {}", line);
            if let Ok(mut buf) = stderr_buf_clone.lock() {
                buf.push_str(&line);
                buf.push('\n');
            }
        }
    });

    let status = child.wait().await.map_err(|e| format!("wait 실패: {}", e))?;
    let _ = stderr_handle.await;

    let code = status.code().unwrap_or(-1);
    let stderr_str = stderr_buf
        .lock()
        .map(|b| b.clone())
        .unwrap_or_default();

    eprintln!(
        "[run_node_script] exit code: {} (stderr {} bytes)",
        code,
        stderr_str.len()
    );

    Ok(RunNodeScriptResult {
        exit_code: code,
        stderr: stderr_str,
    })
}

#[tauri::command]
fn open_path(path: String) -> Result<(), String> {
    let expanded = expand_tilde(&path);
    let p = std::path::Path::new(&expanded);
    if !p.exists() {
        return Err(format!("파일이 존재하지 않습니다: {}", expanded));
    }
    let output = Command::new("open").arg(&expanded).output().map_err(|e| e.to_string())?;
    if !output.status.success() {
        return Err(format!("열기 실패: {}", String::from_utf8_lossy(&output.stderr)));
    }
    Ok(())
}

#[tauri::command]
fn save_credential(service: String, key: String, value: String) -> Result<(), String> {
    let entry = keyring::Entry::new(&service, &key).map_err(|e| e.to_string())?;
    entry.set_password(&value).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn load_credential(service: String, key: String) -> Result<Option<String>, String> {
    let entry = keyring::Entry::new(&service, &key).map_err(|e| e.to_string())?;
    match entry.get_password() {
        Ok(pw) => Ok(Some(pw)),
        Err(keyring::Error::NoEntry) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn delete_credential(service: String, key: String) -> Result<(), String> {
    let entry = keyring::Entry::new(&service, &key).map_err(|e| e.to_string())?;
    match entry.delete_credential() {
        Ok(()) => Ok(()),
        Err(keyring::Error::NoEntry) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

/// Confluence base URL을 정규화한다.
/// 사용자가 `/wiki`를 포함했든 안 했든 결과는 항상 `https://xxx.atlassian.net/wiki`.
/// 이후 endpoint는 `${base}/rest/api/...` 형태로만 호출 — `/wiki` 중복 방지.
fn normalize_confluence_base(url: &str) -> String {
    let trimmed = url.trim().trim_end_matches('/');
    if trimmed.ends_with("/wiki") {
        trimmed.to_string()
    } else {
        format!("{}/wiki", trimmed)
    }
}

#[tauri::command]
async fn test_confluence_connection(
    url: String,
    email: String,
    token: String,
) -> Result<String, String> {
    let client = reqwest::Client::new();
    let base = normalize_confluence_base(&url);
    // Space Key는 업로드 시 부모 페이지 URL에서 자동 추출하므로, 여기선 인증/URL만 검증.
    // /rest/api/user/current → 토큰이 유효한 사용자의 정보 반환 (인증 검증용 표준 endpoint)
    let api_url = format!("{}/rest/api/user/current", base);
    eprintln!("[test_confluence_connection] GET {}", api_url);

    let response = client
        .get(&api_url)
        .basic_auth(&email, Some(&token))
        .header("Accept", "application/json")
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if response.status().is_success() {
        Ok("연결 성공".to_string())
    } else {
        let status = response.status();
        let text = response.text().await.unwrap_or_default();
        let snippet = text.chars().take(200).collect::<String>();
        Err(format!(
            "HTTP {}: 인증 또는 URL 확인 필요. 응답: {}",
            status, snippet
        ))
    }
}

// ─── Confluence Upload ────────────────────────────────────────────────────────

#[derive(Deserialize)]
struct ConfluenceUploadRequest {
    base_url: String,
    email: String,
    token: String,
    space_key: String,
    parent_page_id: Option<String>,
    title: String,
    content: String,
    image_paths: Vec<String>,
}

#[derive(Serialize)]
struct ConfluenceUploadResult {
    success: bool,
    page_id: Option<String>,
    page_url: Option<String>,
    message: String,
}

#[tauri::command]
async fn confluence_upload_page(
    request: ConfluenceUploadRequest,
) -> Result<ConfluenceUploadResult, String> {
    let client = reqwest::Client::new();
    let base = normalize_confluence_base(&request.base_url);

    // 1. 페이지 생성
    let create_url = format!("{}/rest/api/content", base);
    eprintln!(
        "[confluence_upload_page] POST {} space={} title={} parent={:?} images={}",
        create_url,
        request.space_key,
        request.title,
        request.parent_page_id,
        request.image_paths.len()
    );

    let ancestors: Vec<serde_json::Value> = request
        .parent_page_id
        .as_ref()
        .filter(|id| !id.is_empty())
        .map(|id| vec![serde_json::json!({ "id": id })])
        .unwrap_or_default();

    let body = serde_json::json!({
        "type": "page",
        "title": request.title,
        "space": { "key": request.space_key },
        "body": {
            "storage": {
                "value": request.content,
                "representation": "storage"
            }
        },
        "ancestors": ancestors
    });

    let response = client
        .post(&create_url)
        .basic_auth(&request.email, Some(&request.token))
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("페이지 생성 요청 실패: {}", e))?;

    if !response.status().is_success() {
        let status = response.status();
        let text = response.text().await.unwrap_or_default();
        let snippet = text.chars().take(400).collect::<String>();
        eprintln!(
            "[confluence_upload_page] FAILED status={} body={}",
            status, snippet
        );
        return Ok(ConfluenceUploadResult {
            success: false,
            page_id: None,
            page_url: None,
            message: format!("페이지 생성 실패 HTTP {}: {}", status, snippet),
        });
    }

    let page_data: serde_json::Value = response
        .json()
        .await
        .map_err(|e| format!("페이지 생성 응답 파싱 실패: {}", e))?;
    let page_id = page_data["id"].as_str().unwrap_or("").to_string();
    let page_url = format!("{}/spaces/{}/pages/{}", base, request.space_key, page_id);
    eprintln!("[confluence_upload_page] page created id={} url={}", page_id, page_url);

    // 1-1. ancestors 검증 + 자동 이동
    // Confluence Cloud는 같은 space에 같은 제목의 페이지가 있으면 ancestors 지정을 무시하고
    // 다른 위치로 페이지를 만들 수 있음. 의도한 부모와 실제 부모가 다르면 PUT으로 정정.
    let mut move_note = String::new();
    if let Some(expected_parent) = request
        .parent_page_id
        .as_ref()
        .filter(|id| !id.is_empty())
        .cloned()
    {
        let check_url = format!(
            "{}/rest/api/content/{}?expand=ancestors,version,space",
            base, page_id
        );
        match client
            .get(&check_url)
            .basic_auth(&request.email, Some(&request.token))
            .header("Accept", "application/json")
            .send()
            .await
        {
            Ok(check_resp) if check_resp.status().is_success() => {
                if let Ok(check_data) = check_resp.json::<serde_json::Value>().await {
                    let actual_parent = check_data["ancestors"]
                        .as_array()
                        .and_then(|a| a.last())
                        .and_then(|p| p["id"].as_str())
                        .unwrap_or("");

                    if actual_parent != expected_parent {
                        eprintln!(
                            "[confluence_upload_page] 부모 불일치 감지: expected={} actual={} → 자동 이동 시도",
                            expected_parent, actual_parent
                        );
                        let version_num = check_data["version"]["number"]
                            .as_i64()
                            .unwrap_or(1);
                        let title_actual = check_data["title"]
                            .as_str()
                            .unwrap_or(&request.title)
                            .to_string();
                        let space_key_actual = check_data["space"]["key"]
                            .as_str()
                            .unwrap_or(&request.space_key)
                            .to_string();

                        let move_body = serde_json::json!({
                            "id": page_id,
                            "type": "page",
                            "title": title_actual,
                            "space": { "key": space_key_actual },
                            "version": { "number": version_num + 1 },
                            "ancestors": [{ "id": expected_parent }],
                            "body": {
                                "storage": {
                                    "value": request.content,
                                    "representation": "storage"
                                }
                            }
                        });

                        let move_url = format!("{}/rest/api/content/{}", base, page_id);
                        match client
                            .put(&move_url)
                            .basic_auth(&request.email, Some(&request.token))
                            .header("Content-Type", "application/json")
                            .header("Accept", "application/json")
                            .json(&move_body)
                            .send()
                            .await
                        {
                            Ok(mv) if mv.status().is_success() => {
                                eprintln!(
                                    "[confluence_upload_page] 자동 이동 성공 → 부모 {}",
                                    expected_parent
                                );
                                move_note = format!(
                                    " (부모 {}로 자동 이동됨 — 원래 부모: {})",
                                    expected_parent, actual_parent
                                );
                            }
                            Ok(mv) => {
                                let s = mv.status();
                                let body = mv.text().await.unwrap_or_default();
                                let snip = body.chars().take(150).collect::<String>();
                                eprintln!(
                                    "[confluence_upload_page] 자동 이동 실패 HTTP {}: {}",
                                    s, snip
                                );
                                move_note = format!(
                                    " (⚠️ 부모가 {} 이지만 의도한 {} 으로 이동 실패: HTTP {})",
                                    actual_parent, expected_parent, s
                                );
                            }
                            Err(e) => {
                                eprintln!("[confluence_upload_page] 자동 이동 요청 실패: {}", e);
                                move_note = format!(
                                    " (⚠️ 부모 {} 이지만 이동 실패: {})",
                                    actual_parent, e
                                );
                            }
                        }
                    }
                }
            }
            Ok(check_resp) => {
                eprintln!(
                    "[confluence_upload_page] ancestors 검증 GET 실패 status={}",
                    check_resp.status()
                );
            }
            Err(e) => {
                eprintln!("[confluence_upload_page] ancestors 검증 요청 실패: {}", e);
            }
        }
    }

    // 2. 이미지 첨부 — 실패도 수집해서 메시지에 포함
    let mut attach_failures: Vec<String> = Vec::new();
    let mut attach_success = 0usize;

    for image_path in &request.image_paths {
        let path = std::path::Path::new(image_path);
        if !path.exists() {
            attach_failures.push(format!("(파일 없음) {}", image_path));
            continue;
        }

        let file_name = path
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("image.png")
            .to_string();

        let file_bytes = match std::fs::read(path) {
            Ok(b) => b,
            Err(e) => {
                attach_failures.push(format!("(읽기 실패: {}) {}", e, file_name));
                continue;
            }
        };

        let attach_url = format!("{}/rest/api/content/{}/child/attachment", base, page_id);

        let part = match reqwest::multipart::Part::bytes(file_bytes)
            .file_name(file_name.clone())
            .mime_str("image/png")
        {
            Ok(p) => p,
            Err(e) => {
                attach_failures.push(format!("(MIME 설정 실패: {}) {}", e, file_name));
                continue;
            }
        };

        let form = reqwest::multipart::Form::new().part("file", part);

        match client
            .post(&attach_url)
            .basic_auth(&request.email, Some(&request.token))
            .header("X-Atlassian-Token", "nocheck")
            .multipart(form)
            .send()
            .await
        {
            Ok(resp) => {
                if resp.status().is_success() {
                    attach_success += 1;
                } else {
                    let s = resp.status();
                    let body = resp.text().await.unwrap_or_default();
                    let snip = body.chars().take(150).collect::<String>();
                    attach_failures.push(format!("(HTTP {}: {}) {}", s, snip, file_name));
                }
            }
            Err(e) => {
                attach_failures.push(format!("(요청 실패: {}) {}", e, file_name));
            }
        }

        // Rate limit 방어: 이미지 첨부 간 1초 대기
        tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    }

    let summary = if attach_failures.is_empty() {
        format!(
            "페이지 생성 성공 — 이미지 {}개 첨부 완료{}",
            attach_success, move_note
        )
    } else {
        let preview = attach_failures.iter().take(3).cloned().collect::<Vec<_>>().join("; ");
        let extra = if attach_failures.len() > 3 {
            format!(" 외 {}건", attach_failures.len() - 3)
        } else {
            String::new()
        };
        format!(
            "페이지 생성 성공 — 이미지 {}개 첨부, {}건 실패{}: {}{}",
            attach_success,
            attach_failures.len(),
            extra,
            preview,
            move_note
        )
    };

    eprintln!("[confluence_upload_page] {}", summary);

    Ok(ConfluenceUploadResult {
        success: true,
        page_id: Some(page_id),
        page_url: Some(page_url),
        message: summary,
    })
}

// ─── HTTP 다운로드 (Figma S3 PNG 등) ─────────────────────────────────────────

#[tauri::command]
async fn download_to_file(url: String, dest_path: String) -> Result<u64, String> {
    let expanded = expand_tilde(&dest_path);

    if let Some(parent) = std::path::Path::new(&expanded).parent() {
        std::fs::create_dir_all(parent)
            .map_err(|e| format!("디렉토리 생성 실패: {} ({})", e, parent.display()))?;
    }

    let client = reqwest::Client::new();
    let response = client
        .get(&url)
        .send()
        .await
        .map_err(|e| format!("다운로드 요청 실패: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("HTTP {} 다운로드 실패", response.status()));
    }

    let bytes = response
        .bytes()
        .await
        .map_err(|e| format!("응답 읽기 실패: {}", e))?;

    let len = bytes.len() as u64;
    std::fs::write(&expanded, &bytes).map_err(|e| format!("파일 쓰기 실패: {} ({})", e, expanded))?;

    Ok(len)
}

// ─── Claude Code CLI (stdin-based, argv overflow 회피) ───────────────────────

#[derive(Deserialize)]
struct ClaudePrintRequest {
    prompt: String,
    claude_path: Option<String>,
    session_id: Option<String>,
    timeout_secs: Option<u64>,
    cwd: Option<String>,
}

#[derive(Serialize)]
struct ClaudePrintResult {
    success: bool,
    stdout: String,
    stderr: String,
    exit_code: Option<i32>,
    elapsed_ms: u64,
}

fn resolve_claude_path(custom: &Option<String>) -> String {
    if let Some(p) = custom {
        let trimmed = p.trim();
        if !trimmed.is_empty() {
            let expanded = expand_tilde(trimmed);
            if std::path::Path::new(&expanded).exists() {
                return expanded;
            }
        }
    }
    for cand in default_candidates() {
        if std::path::Path::new(&cand).exists() {
            return cand;
        }
    }
    "claude".to_string()
}

#[tauri::command]
async fn claude_print(request: ClaudePrintRequest) -> Result<ClaudePrintResult, String> {
    use std::process::Stdio;
    use tokio::io::AsyncWriteExt;
    use tokio::process::Command as TokioCommand;

    let claude_path = resolve_claude_path(&request.claude_path);
    let timeout_secs = request.timeout_secs.unwrap_or(300);
    let started = std::time::Instant::now();
    let prompt_bytes = request.prompt.len();

    eprintln!(
        "[claude_print] path={} prompt_bytes={} timeout={}s session={:?}",
        claude_path, prompt_bytes, timeout_secs, request.session_id
    );

    let mut cmd = TokioCommand::new(&claude_path);
    cmd.arg("-p")
        .arg("--output-format")
        .arg("json")
        .arg("--dangerously-skip-permissions")
        .arg("--allowedTools")
        .arg("Read,Write,Bash");

    if let Some(sid) = request.session_id.as_ref().filter(|s| !s.is_empty()) {
        cmd.arg("--resume").arg(sid);
    }

    if let Some(cwd) = request.cwd.as_ref().filter(|s| !s.is_empty()) {
        cmd.current_dir(cwd);
    }

    cmd.stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    let mut child = cmd
        .spawn()
        .map_err(|e| format!("claude spawn 실패: {} ({})", e, claude_path))?;

    if let Some(mut stdin) = child.stdin.take() {
        stdin
            .write_all(request.prompt.as_bytes())
            .await
            .map_err(|e| format!("stdin write 실패: {}", e))?;
        stdin
            .shutdown()
            .await
            .map_err(|e| format!("stdin close 실패: {}", e))?;
    } else {
        return Err("claude stdin 핸들 획득 실패".to_string());
    }

    let output_fut = child.wait_with_output();
    let output = tokio::time::timeout(
        std::time::Duration::from_secs(timeout_secs),
        output_fut,
    )
    .await
    .map_err(|_| format!("claude 응답 timeout ({}s)", timeout_secs))?
    .map_err(|e| format!("claude wait 실패: {}", e))?;

    let elapsed_ms = started.elapsed().as_millis() as u64;
    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    eprintln!(
        "[claude_print] done success={} exit={:?} elapsed={}ms stdout_bytes={} stderr_bytes={}",
        output.status.success(),
        output.status.code(),
        elapsed_ms,
        stdout.len(),
        stderr.len()
    );

    Ok(ClaudePrintResult {
        success: output.status.success(),
        stdout,
        stderr,
        exit_code: output.status.code(),
        elapsed_ms,
    })
}

#[tauri::command]
async fn figma_api_proxy(endpoint: String, token: String) -> Result<String, String> {
    let url = format!("https://api.figma.com{}", endpoint);
    let client = reqwest::Client::new();

    // 최대 3회 재시도 (429 rate limit 대응)
    for attempt in 1..=3 {
        let response = client
            .get(&url)
            .header("X-Figma-Token", &token)
            .send()
            .await
            .map_err(|e| format!("Figma API 요청 실패: {}", e))?;

        let status = response.status();

        if status.as_u16() == 429 {
            let retry_after = response
                .headers()
                .get("Retry-After")
                .and_then(|v| v.to_str().ok())
                .and_then(|v| v.parse::<u64>().ok())
                .unwrap_or(30);

            // Figma는 때때로 비정상적으로 큰 Retry-After(수일)를 반환함 — 실제로는 1~2분이면 풀림
            let wait_secs = retry_after.min(30);

            if attempt < 3 {
                eprintln!(
                    "[figma_api_proxy] 429 rate limited, retry {}/{} after {}s (raw Retry-After: {}s)",
                    attempt, 3, wait_secs, retry_after
                );
                tokio::time::sleep(std::time::Duration::from_secs(wait_secs)).await;
                continue;
            }

            return Err(
                "Figma API 요청 한도 초과 (429). 1~2분 후 다시 시도하세요.".to_string()
            );
        }

        if !status.is_success() {
            return Err(format!("Figma API 에러: {}", status));
        }

        return response
            .text()
            .await
            .map_err(|e| format!("응답 읽기 실패: {}", e));
    }

    Err("Figma API 재시도 초과".to_string())
}

#[tauri::command]
async fn resolve_parent_page_id(
    _base_url: String,
    _email: String,
    _token: String,
    page_url_or_title: String,
) -> Result<Option<String>, String> {
    let trimmed = page_url_or_title.trim();

    if trimmed.is_empty() {
        return Ok(None);
    }

    // 순수 숫자이면 ID로 간주
    if trimmed.chars().all(|c| c.is_ascii_digit()) {
        return Ok(Some(trimmed.to_string()));
    }

    // URL에서 /pages/{id} 패턴 추출
    if let Some(idx) = trimmed.find("/pages/") {
        let after = &trimmed[idx + 7..];
        let id: String = after.chars().take_while(|c| c.is_ascii_digit()).collect();
        if !id.is_empty() {
            return Ok(Some(id));
        }
    }

    // 추출 실패 → None (space root에 생성)
    Ok(None)
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let settings_item = MenuItemBuilder::with_id("settings", "Settings...")
                .accelerator("CmdOrCtrl+,")
                .build(app)?;

            let app_submenu = SubmenuBuilder::new(app, "FlipMD")
                .about(None)
                .item(&PredefinedMenuItem::separator(app)?)
                .item(&settings_item)
                .item(&PredefinedMenuItem::separator(app)?)
                .quit()
                .build()?;

            let edit_submenu = SubmenuBuilder::new(app, "Edit")
                .undo()
                .redo()
                .item(&PredefinedMenuItem::separator(app)?)
                .cut()
                .copy()
                .paste()
                .select_all()
                .build()?;

            let window_submenu = SubmenuBuilder::new(app, "Window")
                .minimize()
                .close_window()
                .build()?;

            let menu = MenuBuilder::new(app)
                .item(&app_submenu)
                .item(&edit_submenu)
                .item(&window_submenu)
                .build()?;

            app.set_menu(menu)?;

            Ok(())
        })
        .on_menu_event(|app_handle, event| {
            if event.id() == "settings" {
                let _ = app_handle.emit("navigate", "/settings");
            }
        })
        .invoke_handler(tauri::generate_handler![
            test_claude_code,
            open_path,
            save_credential,
            load_credential,
            delete_credential,
            test_confluence_connection,
            confluence_upload_page,
            resolve_parent_page_id,
            figma_api_proxy,
            claude_print,
            download_to_file,
            test_node_available,
            test_playwright_available,
            run_node_script
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
