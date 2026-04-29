import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import StatusCard from "../components/StatusCard";

const mockDocs = [
  { name: "01-개요.md", status: "done" },
  { name: "02-기능명세-01.md", status: "done" },
  { name: "02-기능명세-02.md", status: "processing" },
  { name: "03-UI가이드-01.md", status: "pending" },
  { name: "04-API연동.md", status: "pending" },
];

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
  docList: {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  },
  docHeader: {
    borderBottom: "1px solid var(--color-border)",
    color: "var(--color-text-secondary)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.03em",
    padding: "10px 16px",
    backgroundColor: "var(--color-bg)",
  },
  docItem: {
    alignItems: "center",
    display: "flex",
    gap: "12px",
    justifyContent: "space-between",
    padding: "10px 16px",
  },
  docName: {
    color: "var(--color-text)",
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
    fontSize: "12px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
};

const statusIndicator = (status: string) => {
  if (status === "done")
    return (
      <span style={{ color: "var(--color-success)", fontSize: "12px", fontWeight: 500 }}>
        완료
      </span>
    );
  if (status === "processing")
    return (
      <span style={{ color: "var(--color-warning)", fontSize: "12px", fontWeight: 500 }}>
        변환 중...
      </span>
    );
  return (
    <span style={{ color: "var(--color-text-tertiary)", fontSize: "12px" }}>
      대기
    </span>
  );
};

export default function ConvertPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(40);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [stopped]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Markdown 변환</h1>
      </div>

      <div style={styles.content}>
        <ProgressBar progress={progress} label="변환 진행률" />

        {progress === 100 && (
          <StatusCard title="변환 완료" status="success">
            총 5개 문서가 성공적으로 변환되었습니다. Confluence에 업로드할 수
            있습니다.
          </StatusCard>
        )}

        <div style={styles.docList}>
          <div style={styles.docHeader}>변환된 문서 ({mockDocs.length}개)</div>
          {mockDocs.map((doc, idx) => (
            <div
              key={doc.name}
              style={{
                ...styles.docItem,
                borderBottom:
                  idx === mockDocs.length - 1
                    ? "none"
                    : "1px solid var(--color-border)",
              }}
            >
              <span style={styles.docName}>{doc.name}</span>
              {statusIndicator(doc.status)}
            </div>
          ))}
        </div>

        <div style={styles.actions}>
          {!stopped && progress < 100 && (
            <Button variant="danger" onClick={() => setStopped(true)}>
              중지
            </Button>
          )}
          {progress === 100 && (
            <Button onClick={() => navigate("/upload")}>
              Confluence 업로드
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
