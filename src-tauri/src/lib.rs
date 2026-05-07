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

#[tauri::command]
async fn test_confluence_connection(
    url: String,
    email: String,
    token: String,
    space_key: String,
) -> Result<String, String> {
    let client = reqwest::Client::new();
    let api_url = format!(
        "{}/wiki/rest/api/space/{}",
        url.trim_end_matches('/'),
        space_key
    );
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
        Err(format!(
            "HTTP {}: 인증 또는 Space Key를 확인하세요",
            response.status()
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

    // 1. 페이지 생성
    let create_url = format!(
        "{}/wiki/rest/api/content",
        request.base_url.trim_end_matches('/')
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
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !response.status().is_success() {
        let status = response.status();
        let text = response.text().await.unwrap_or_default();
        return Ok(ConfluenceUploadResult {
            success: false,
            page_id: None,
            page_url: None,
            message: format!("페이지 생성 실패 HTTP {}: {}", status, text),
        });
    }

    let page_data: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
    let page_id = page_data["id"].as_str().unwrap_or("").to_string();
    let page_url = format!(
        "{}/wiki/spaces/{}/pages/{}",
        request.base_url.trim_end_matches('/'),
        request.space_key,
        page_id
    );

    // 2. 이미지 첨부
    for image_path in &request.image_paths {
        let path = std::path::Path::new(image_path);
        if !path.exists() {
            continue;
        }

        let file_name = path
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("image.png")
            .to_string();

        let file_bytes = std::fs::read(path).map_err(|e| e.to_string())?;

        let attach_url = format!(
            "{}/wiki/rest/api/content/{}/child/attachment",
            request.base_url.trim_end_matches('/'),
            page_id
        );

        let part = reqwest::multipart::Part::bytes(file_bytes)
            .file_name(file_name)
            .mime_str("image/png")
            .map_err(|e| e.to_string())?;

        let form = reqwest::multipart::Form::new().part("file", part);

        let _ = client
            .post(&attach_url)
            .basic_auth(&request.email, Some(&request.token))
            .header("X-Atlassian-Token", "nocheck")
            .multipart(form)
            .send()
            .await;

        // Rate limit 방어: 이미지 첨부 간 1초 대기
        tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    }

    Ok(ConfluenceUploadResult {
        success: true,
        page_id: Some(page_id),
        page_url: Some(page_url),
        message: "페이지 생성 성공".to_string(),
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

            let app_submenu = SubmenuBuilder::new(app, "FlipbookMaker")
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
            figma_api_proxy
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
