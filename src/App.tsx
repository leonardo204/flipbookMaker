import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { SettingsProvider, useSettings } from "./contexts/SettingsContext";
import { WorkflowProvider } from "./contexts/WorkflowContext";
import ErrorBoundary from "./components/ErrorBoundary";
import InputPage from "./pages/InputPage";
import AnalyzePage from "./pages/AnalyzePage";
import ConvertPage from "./pages/ConvertPage";
import UploadPage from "./pages/UploadPage";
import SettingsPage from "./pages/SettingsPage";
import { claudeSession } from "./services/claudeSession";
import "./App.css";

interface ClaudeTestResult {
  success: boolean;
  path: string | null;
  version: string | null;
  message: string;
}

// Claude 미연결 경고 배너
const bannerStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  backgroundColor: "var(--color-error, #ef4444)",
  color: "#fff",
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
};

function ClaudeWarningBanner({ onGoSettings }: { onGoSettings: () => void }) {
  return (
    <div style={bannerStyles}>
      <span>Claude Code가 연결되지 않았습니다. 변환 기능을 사용하려면 설정에서 Claude를 연결하세요.</span>
      <button
        onClick={onGoSettings}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.5)",
          color: "#fff",
          borderRadius: "4px",
          padding: "3px 10px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        설정으로 이동
      </button>
    </div>
  );
}

// 초기 로딩 스피너
const loadingStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "var(--color-bg)",
  gap: "16px",
  color: "var(--color-text-secondary)",
  fontSize: "14px",
};

function AppRoutes() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

  // null = 확인 중, true = 연결됨, false = 미연결
  const [claudeReady, setClaudeReady] = useState<boolean | null>(null);
  const [sessionStarting, setSessionStarting] = useState(false);

  // 앱 시작 시 Claude 연결 확인 + 상주 세션 시작
  useEffect(() => {
    checkAndStartClaude();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAndStartClaude = async () => {
    setClaudeReady(null);
    try {
      const result = await invoke<ClaudeTestResult>("test_claude_code", {
        customPath: settings.claudePath || null,
      });

      if (result.success) {
        const resolvedPath = result.path || settings.claudePath;
        updateSettings({ claudeVerified: true, claudePath: resolvedPath });

        // 상주 세션 시작
        if (!claudeSession.isConnected()) {
          setSessionStarting(true);
          try {
            await claudeSession.start(resolvedPath);
            console.log("[App] Claude session started successfully");
          } catch (sessionErr) {
            console.error("[App] Claude session start failed:", sessionErr);
          } finally {
            setSessionStarting(false);
          }
        }

        setClaudeReady(true);
      } else {
        updateSettings({ claudeVerified: false });
        setClaudeReady(false);
        navigate("/settings");
      }
    } catch {
      updateSettings({ claudeVerified: false });
      setClaudeReady(false);
      navigate("/settings");
    }
  };

  // 자동 업데이트 체크
  useEffect(() => {
    if (!settings.autoUpdate) return;

    const checkForUpdate = async () => {
      try {
        const update = await check();
        if (update) {
          const confirmed = window.confirm(
            `새 버전 ${update.version}이 있습니다. 업데이트하시겠습니까?`
          );
          if (confirmed) {
            await update.downloadAndInstall();
            await relaunch();
          }
        }
      } catch {
        // 실패 시 무시
      }
    };

    checkForUpdate();
    const interval = setInterval(checkForUpdate, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [settings.autoUpdate]);

  // Tauri navigate 이벤트
  useEffect(() => {
    const unlisten = listen<string>("navigate", (event) => {
      navigate(event.payload);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, [navigate]);

  // 확인 중: 로딩 표시
  if (claudeReady === null) {
    return (
      <div style={loadingStyles}>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "3px solid var(--color-border)",
            borderTopColor: "var(--color-accent)",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span>
          {sessionStarting ? "Claude 세션 초기화 중..." : "Claude 연결 확인 중..."}
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      {/* 미연결 경고 배너 (설정 페이지 제외) */}
      {claudeReady === false && (
        <ClaudeWarningBanner onGoSettings={() => navigate("/settings")} />
      )}

      {/* 배너 높이만큼 콘텐츠 밀어내기 */}
      <div style={claudeReady === false ? { paddingTop: "40px" } : undefined}>
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/convert" element={<ConvertPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route
            path="/settings"
            element={
              <SettingsPage
                onClaudeConnected={checkAndStartClaude}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <WorkflowProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </WorkflowProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;
