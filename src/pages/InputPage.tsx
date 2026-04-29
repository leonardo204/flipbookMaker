import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

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
  dropZone: {
    alignItems: "center",
    border: "1px dashed var(--color-border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-text-tertiary)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    fontSize: "13px",
    gap: "6px",
    justifyContent: "center",
    minHeight: "100px",
    padding: "20px",
    textAlign: "center" as const,
    transition: "border-color var(--transition), color var(--transition)",
  },
  dropIcon: {
    fontSize: "24px",
    color: "var(--color-text-tertiary)",
  },
  divider: {
    alignItems: "center",
    color: "var(--color-text-tertiary)",
    display: "flex",
    fontSize: "11px",
    gap: "12px",
  },
  dividerLine: {
    backgroundColor: "var(--color-border-subtle)",
    flex: 1,
    height: "1px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default function InputPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const handleAnalyze = () => {
    if (url.trim()) {
      navigate("/analyze");
    }
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
            Axure 플립북을 Markdown 문서로 변환하고 Confluence에 업로드합니다
          </p>
        </div>

        <div style={styles.section}>
          <span style={styles.sectionTitle}>플립북 URL 입력</span>
          <TextInput
            value={url}
            onChange={setUrl}
            placeholder="https://axshare.com/..."
            label="Axure Share URL"
          />

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span>또는</span>
            <div style={styles.dividerLine} />
          </div>

          <div
            style={styles.dropZone}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-tertiary)";
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-tertiary)";
            }}
          >
            <span style={styles.dropIcon}>+</span>
            <span>파일을 여기에 드래그하거나 클릭하여 선택</span>
            <span style={{ fontSize: "11px" }}>
              .html, .zip 파일 지원 (Phase 2에서 구현 예정)
            </span>
          </div>

          <div style={styles.actions}>
            <Button onClick={handleAnalyze} disabled={!url.trim()}>
              분석 시작
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
