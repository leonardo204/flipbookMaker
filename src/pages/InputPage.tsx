import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";
import { useWorkflow } from "../contexts/WorkflowContext";
import { checkNodeAvailable } from "../services/scriptRunner";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import StatusCard from "../components/StatusCard";

const styles = {
  page: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    minHeight: "100vh",
    padding: "32px",
    position: "relative" as const,
    backgroundColor: "var(--color-bg)",
  },
  settingsButton: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    background: "none",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-secondary)",
    cursor: "pointer",
    fontSize: "16px",
    padding: "6px 10px",
    borderRadius: "var(--radius-sm)",
    transition: "color var(--transition), background-color var(--transition), border-color var(--transition)",
    lineHeight: 1,
    backgroundColor: "transparent",
  },
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    maxWidth: "520px",
    width: "100%",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "4px",
  },
  title: {
    color: "var(--color-text)",
    fontSize: "26px",
    fontWeight: 700,
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "var(--color-text-secondary)",
    fontSize: "13px",
    lineHeight: 1.6,
  },
  section: {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  },
  sectionTitle: {
    color: "var(--color-text)",
    fontSize: "13px",
    fontWeight: 600,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default function InputPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { setUrl: setWorkflowUrl, setOutputDir, setSourceType } = useWorkflow();
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [nodeAvailable, setNodeAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    checkNodeAvailable()
      .then((result) => setNodeAvailable(result.available))
      .catch(() => setNodeAvailable(false));
  }, []);

  const handleAnalyze = () => {
    if (!url.trim()) return;

    if (!settings.outputPath) {
      setValidationError("결과 폴더를 먼저 설정해주세요.");
      setTimeout(() => navigate("/settings"), 1500);
      return;
    }

    if (!settings.claudeVerified) {
      setValidationError("Claude Code 연결을 먼저 확인해주세요.");
      setTimeout(() => navigate("/settings"), 1500);
      return;
    }

    // URL 패턴 검증: figma.com 또는 axshare.com 포함 여부 확인
    const trimmedUrl = url.trim();
    if (trimmedUrl.includes("figma.com")) {
      if (!settings.figmaToken) {
        setValidationError("Figma Personal Access Token이 없습니다. 설정 페이지에서 먼저 등록해주세요.");
        setTimeout(() => navigate("/settings"), 1500);
        return;
      }
      setSourceType("figma");
    } else if (trimmedUrl.includes("axshare.com")) {
      setSourceType("axshare");
    } else {
      setValidationError("Figma 또는 Axure Share URL을 입력해주세요.");
      return;
    }

    setValidationError(null);

    // WorkflowContext에 URL과 출력 디렉토리 저장
    setWorkflowUrl(trimmedUrl);
    setOutputDir(settings.outputPath);

    navigate("/analyze");
  };

  return (
    <div style={styles.page}>
      <button
        style={styles.settingsButton}
        title="설정"
        onClick={() => navigate("/settings")}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--color-text)";
          e.currentTarget.style.backgroundColor = "var(--color-surface)";
          e.currentTarget.style.borderColor = "var(--color-text-tertiary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--color-text-secondary)";
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "var(--color-border)";
        }}
      >
        &#9881;
      </button>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>FlipbookMaker</h1>
          <p style={styles.subtitle}>
            Figma 또는 Axure 플립북을 Markdown 문서로 변환하고 Confluence에 업로드합니다
          </p>
        </div>

        <div style={styles.section}>
          <span style={styles.sectionTitle}>플립북 URL 입력</span>
          <TextInput
            value={url}
            onChange={setUrl}
            placeholder="https://figma.com/... 또는 https://axshare.com/..."
            label="플립북 URL"
            onEnter={handleAnalyze}
          />

          {nodeAvailable === false && (
            <StatusCard title="Node.js 필요" status="error">
              Markdown 변환에 Node.js가 필요합니다. nodejs.org에서 설치 후 앱을 재시작하세요.
            </StatusCard>
          )}

          {validationError && (
            <StatusCard title="설정 필요" status="warning">
              {validationError}
            </StatusCard>
          )}

          <div style={styles.actions}>
            <Button onClick={handleAnalyze} disabled={!url.trim() || nodeAvailable === false}>
              분석 시작
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
