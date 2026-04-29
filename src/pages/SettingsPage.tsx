import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import StatusCard from "../components/StatusCard";

interface ClaudeTestResult {
  success: boolean;
  path: string | null;
  version: string | null;
  message: string;
}

type UpdateStatus = "idle" | "checking" | "available" | "downloading" | "installing" | "latest" | "error";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    overflowY: "auto" as const,
    backgroundColor: "var(--color-bg)",
  },
  inner: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    padding: "32px 24px 48px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "28px",
    gap: "12px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "var(--color-text-secondary)",
    cursor: "pointer",
    fontSize: "13px",
    padding: "5px 8px",
    borderRadius: "var(--radius-sm)",
    transition: "color var(--transition), background-color var(--transition)",
  },
  title: {
    color: "var(--color-text)",
    fontSize: "20px",
    fontWeight: 600,
  },
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  section: {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  sectionHeader: {
    color: "var(--color-text-secondary)",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  row: {
    display: "flex",
    alignItems: "flex-end" as const,
    gap: "12px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 0",
  },
  infoLabel: {
    color: "var(--color-text-secondary)",
    fontSize: "13px",
  },
  infoValue: {
    color: "var(--color-text)",
    fontSize: "13px",
    fontWeight: 500,
  },
  statusDot: (connected: boolean): React.CSSProperties => ({
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: connected ? "var(--color-success)" : "var(--color-error)",
    marginRight: "6px",
  }),
  statusText: (connected: boolean): React.CSSProperties => ({
    fontSize: "13px",
    color: connected ? "var(--color-success)" : "var(--color-error)",
    fontWeight: 500,
  }),
};

function getUpdateStatusText(status: UpdateStatus): string {
  switch (status) {
    case "checking":
      return "확인 중...";
    case "available":
      return "업데이트 가능";
    case "downloading":
      return "다운로드 중...";
    case "installing":
      return "설치 중...";
    case "latest":
      return "최신 버전입니다";
    case "error":
      return "확인 실패";
    default:
      return "";
  }
}

function getUpdateStatusColor(status: UpdateStatus): string {
  switch (status) {
    case "available":
      return "var(--color-warning, #f59e0b)";
    case "latest":
      return "var(--color-success)";
    case "error":
      return "var(--color-error)";
    default:
      return "var(--color-text-secondary)";
  }
}

export default function SettingsPage() {
  const navigate = useNavigate();

  // Claude Code
  const [claudePath, setClaudePath] = useState("");
  const [claudeConnected, setClaudeConnected] = useState<boolean | null>(null);
  const [claudeVersion, setClaudeVersion] = useState<string | null>(null);
  const [claudeMessage, setClaudeMessage] = useState<string>("");
  const [claudeDetectedPath, setClaudeDetectedPath] = useState<string | null>(null);
  const [claudeTesting, setClaudeTesting] = useState(false);

  // Update
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>("idle");
  const [updateInfo, setUpdateInfo] = useState<Update | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [appVersion, setAppVersion] = useState("...");

  useEffect(() => {
    getVersion().then(setAppVersion).catch(() => setAppVersion("unknown"));
  }, []);

  // Confluence
  const [atlassianUrl, setAtlassianUrl] = useState("");
  const [confluenceEmail, setConfluenceEmail] = useState("");
  const [confluenceToken, setConfluenceToken] = useState("");
  const [spaceKey, setSpaceKey] = useState("");
  const [parentPageUrl, setParentPageUrl] = useState("");
  const [confluenceConnected, setConfluenceConnected] = useState<boolean | null>(null);

  // Output
  const [outputPath, setOutputPath] = useState("");

  const handleClaudeTest = async () => {
    setClaudeTesting(true);
    try {
      const result = await invoke<ClaudeTestResult>("test_claude_code", {
        customPath: claudePath.trim() || null,
      });
      setClaudeConnected(result.success);
      setClaudeMessage(result.message);
      if (result.path) {
        setClaudeDetectedPath(result.path);
        if (!claudePath.trim()) {
          setClaudePath(result.path);
        }
      }
      if (result.version) {
        setClaudeVersion(result.version);
      } else {
        setClaudeVersion(null);
      }
    } catch (e) {
      setClaudeConnected(false);
      setClaudeVersion(null);
      setClaudeMessage("명령 실행 중 오류가 발생했습니다.");
    } finally {
      setClaudeTesting(false);
    }
  };

  const handleCheckUpdate = async () => {
    setUpdateStatus("checking");
    setUpdateInfo(null);
    try {
      const update = await check();
      if (update) {
        setUpdateInfo(update);
        setUpdateStatus("available");
      } else {
        setUpdateStatus("latest");
      }
    } catch {
      setUpdateStatus("error");
    }
  };

  const handleDownloadAndInstall = async () => {
    if (!updateInfo) return;
    setUpdateStatus("downloading");
    setDownloadProgress(0);
    try {
      let downloaded = 0;
      let total = 0;
      await updateInfo.downloadAndInstall((event) => {
        if (event.event === "Started") {
          total = event.data?.contentLength ?? 0;
        } else if (event.event === "Progress") {
          downloaded += event.data?.chunkLength ?? 0;
          if (total > 0) setDownloadProgress(Math.round((downloaded / total) * 100));
        } else if (event.event === "Finished") {
          setDownloadProgress(100);
          setUpdateStatus("installing");
        }
      });
      await relaunch();
    } catch {
      setUpdateStatus("error");
    }
  };

  const handleConfluenceTest = () => {
    // Phase 2+에서 실제 연결 테스트 구현
    setConfluenceConnected(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.topBar}>
          <button
            style={styles.backButton}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-text)";
              e.currentTarget.style.backgroundColor = "var(--color-surface)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-secondary)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            &larr; 뒤로
          </button>
          <span style={styles.title}>설정</span>
        </div>

        <div style={styles.container}>
          {/* 일반 */}
          <div style={styles.section}>
            <span style={styles.sectionHeader}>일반</span>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>앱 버전</span>
              <span style={styles.infoValue}>v{appVersion}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>업데이트</span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {updateStatus !== "idle" && (
                  <span
                    style={{
                      fontSize: "13px",
                      color: getUpdateStatusColor(updateStatus),
                      fontWeight: 500,
                    }}
                  >
                    {getUpdateStatusText(updateStatus)}
                    {updateStatus === "downloading" ? ` ${downloadProgress}%` : ""}
                  </span>
                )}
                {updateStatus === "available" ? (
                  <Button onClick={handleDownloadAndInstall}>
                    업데이트
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={handleCheckUpdate}
                    disabled={updateStatus === "checking" || updateStatus === "downloading" || updateStatus === "installing"}
                  >
                    {updateStatus === "checking" ? "확인 중..." : "확인"}
                  </Button>
                )}
              </div>
            </div>
            {updateStatus === "downloading" && (
              <div style={{ padding: "0 0 4px" }}>
                <div style={{ backgroundColor: "var(--color-surface)", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                  <div style={{ backgroundColor: "var(--color-accent)", height: "100%", width: `${downloadProgress}%`, transition: "width 0.3s ease", borderRadius: "4px" }} />
                </div>
              </div>
            )}
          </div>

          {/* Claude Code */}
          <div style={styles.section}>
            <span style={styles.sectionHeader}>Claude Code</span>
            <TextInput
              value={claudePath}
              onChange={setClaudePath}
              placeholder="/usr/local/bin/claude (자동 감지)"
              label="claude 경로"
            />
            {claudeConnected === null && (
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>상태</span>
                <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
                  테스트 전
                </span>
              </div>
            )}
            {claudeConnected !== null && (
              <>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>상태</span>
                  <span>
                    <span style={styles.statusDot(claudeConnected)} />
                    <span style={styles.statusText(claudeConnected)}>
                      {claudeConnected
                        ? claudeVersion
                          ? `연결됨 — ${claudeVersion}`
                          : "연결됨"
                        : "미연결"}
                    </span>
                  </span>
                </div>
                {claudeConnected && claudeDetectedPath && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>감지된 경로</span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--color-text-secondary)",
                        fontFamily: "monospace",
                        maxWidth: "320px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {claudeDetectedPath}
                    </span>
                  </div>
                )}
                <StatusCard
                  title="연결 상태"
                  status={claudeConnected ? "success" : "error"}
                >
                  {claudeMessage ||
                    (claudeConnected
                      ? "Claude Code에 연결되었습니다."
                      : "Claude Code를 찾을 수 없습니다. 경로를 확인하세요.")}
                </StatusCard>
              </>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="secondary"
                onClick={handleClaudeTest}
                disabled={claudeTesting}
              >
                {claudeTesting ? "테스트 중..." : "연결 테스트"}
              </Button>
            </div>
          </div>

          {/* Confluence */}
          <div style={styles.section}>
            <span style={styles.sectionHeader}>Confluence</span>
            <TextInput
              value={atlassianUrl}
              onChange={setAtlassianUrl}
              placeholder="https://your-domain.atlassian.net"
              label="Atlassian URL"
            />
            <TextInput
              value={confluenceEmail}
              onChange={setConfluenceEmail}
              placeholder="your@email.com"
              label="계정 (이메일)"
            />
            <TextInput
              value={confluenceToken}
              onChange={setConfluenceToken}
              placeholder="API 토큰"
              label="API 토큰"
              type="password"
            />
            <TextInput
              value={spaceKey}
              onChange={setSpaceKey}
              placeholder="MYSPACE"
              label="기본 Space Key"
            />
            <TextInput
              value={parentPageUrl}
              onChange={setParentPageUrl}
              placeholder="https://your-domain.atlassian.net/wiki/... (선택)"
              label="기본 부모 페이지 URL"
            />
            {confluenceConnected !== null && (
              <StatusCard
                title="연결 상태"
                status={confluenceConnected ? "success" : "error"}
              >
                {confluenceConnected
                  ? "Confluence에 연결되었습니다."
                  : "Confluence에 연결할 수 없습니다. 설정을 확인하세요."}
              </StatusCard>
            )}
            {confluenceConnected !== null && (
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>상태</span>
                <span>
                  <span style={styles.statusDot(confluenceConnected)} />
                  <span style={styles.statusText(confluenceConnected)}>
                    {confluenceConnected ? "연결됨" : "미연결"}
                  </span>
                </span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={handleConfluenceTest}>
                연결 테스트
              </Button>
            </div>
          </div>

          {/* 출력 */}
          <div style={styles.section}>
            <span style={styles.sectionHeader}>출력</span>
            <div style={styles.row}>
              <TextInput
                value={outputPath}
                onChange={setOutputPath}
                placeholder="~/Documents/FlipbookMaker"
                label="기본 저장 경로"
              />
              <Button variant="secondary" onClick={() => {}}>
                폴더 선택
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
