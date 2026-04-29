import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import ProgressBar from "../components/ProgressBar";
import StatusCard from "../components/StatusCard";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    padding: "32px",
    backgroundColor: "var(--color-bg)",
  },
  header: {
    alignItems: "center",
    display: "flex",
    gap: "16px",
    marginBottom: "28px",
  },
  title: {
    color: "var(--color-text)",
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
    gap: "12px",
    margin: "0 auto",
    maxWidth: "680px",
    width: "100%",
  },
  section: {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
    padding: "20px",
  },
  sectionTitle: {
    color: "var(--color-text)",
    fontSize: "13px",
    fontWeight: 600,
  },
  testRow: {
    alignItems: "flex-end",
    display: "flex",
    gap: "12px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
};

export default function UploadPage() {
  const navigate = useNavigate();
  const [baseUrl, setBaseUrl] = useState("");
  const [spaceKey, setSpaceKey] = useState("");
  const [parentPage, setParentPage] = useState("");
  const [token, setToken] = useState("");
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleTest = () => {
    setTestStatus(baseUrl && token ? "success" : "error");
  };

  const handleUpload = () => {
    setUploading(true);
    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Button variant="secondary" onClick={() => navigate("/convert")}>
          뒤로
        </Button>
        <h1 style={styles.title}>Confluence 업로드</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <span style={styles.sectionTitle}>Confluence 설정</span>

          <TextInput
            value={baseUrl}
            onChange={setBaseUrl}
            label="Confluence URL"
            placeholder="https://your-domain.atlassian.net"
          />

          <TextInput
            value={spaceKey}
            onChange={setSpaceKey}
            label="Space Key"
            placeholder="PROJ"
          />

          <TextInput
            value={parentPage}
            onChange={setParentPage}
            label="상위 페이지 제목 (선택)"
            placeholder="상위 페이지가 없으면 비워두세요"
          />

          <TextInput
            value={token}
            onChange={setToken}
            label="API 토큰"
            placeholder="Atlassian API 토큰"
            type="password"
          />

          <div style={styles.testRow}>
            <div style={{ flex: 1 }}>
              {testStatus === "success" && (
                <StatusCard title="연결 성공" status="success">
                  Confluence에 성공적으로 연결되었습니다.
                </StatusCard>
              )}
              {testStatus === "error" && (
                <StatusCard title="연결 실패" status="error">
                  URL 또는 API 토큰을 확인하세요.
                </StatusCard>
              )}
            </div>
            <Button variant="secondary" onClick={handleTest}>
              연결 테스트
            </Button>
          </div>
        </div>

        {(uploading || uploadProgress > 0) && (
          <ProgressBar progress={uploadProgress} label="업로드 진행률" />
        )}

        {uploadProgress === 100 && (
          <StatusCard title="업로드 완료" status="success">
            5개 문서가 Confluence에 성공적으로 업로드되었습니다.
          </StatusCard>
        )}

        <div style={styles.actions}>
          <Button
            onClick={handleUpload}
            disabled={testStatus !== "success" || uploading || uploadProgress === 100}
          >
            {uploading ? "업로드 중..." : "업로드 시작"}
          </Button>
        </div>
      </div>
    </div>
  );
}
