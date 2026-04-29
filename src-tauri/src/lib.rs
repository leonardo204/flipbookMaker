use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder},
    Emitter,
};

use serde::Serialize;
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
        .invoke_handler(tauri::generate_handler![test_claude_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
