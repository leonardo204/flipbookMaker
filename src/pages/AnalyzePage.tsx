import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import StatusCard from "../components/StatusCard";

const mockSections = [
  { id: 1, name: "개요", pageCount: 3 },
  { id: 2, name: "기능 명세", pageCount: 12 },
  { id: 3, name: "UI 가이드", pageCount: 8 },
  { id: 4, name: "API 연동", pageCount: 5 },
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
    display: "flex",
    alignItems: "center",
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
    gap: "12px",
    maxWidth: "680px",
    width: "100%",
    margin: "0 auto",
    flex: 1,
  },
  sectionList: {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  },
  sectionHeader: {
    color: "var(--color-text-secondary)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.03em",
    padding: "10px 16px",
    borderBottom: "1px solid var(--color-border)",
    backgroundColor: "var(--color-bg)",
  },
  sectionItem: {
    alignItems: "center",
    borderBottom: "1px solid var(--color-border)",
    display: "flex",
    justifyContent: "space-between",
    padding: "11px 16px",
  },
  sectionName: {
    color: "var(--color-text)",
    fontSize: "13px",
  },
  sectionBadge: {
    backgroundColor: "var(--color-accent-subtle)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-accent)",
    fontSize: "11px",
    fontWeight: 500,
    padding: "2px 8px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
};

export default function AnalyzePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Button variant="secondary" onClick={() => navigate("/")}>
          뒤로
        </Button>
        <h1 style={styles.title}>분석 결과</h1>
      </div>

      <div style={styles.content}>
        <StatusCard title="분석 완료" status="success">
          총 4개 섹션, 28개 페이지가 발견되었습니다. Markdown으로 변환할 준비가
          되었습니다.
        </StatusCard>

        <StatusCard title="Claude Code CLI" status="info">
          Claude Code CLI가 설치되어 있습니다. 변환 기능을 사용할 수 있습니다.
        </StatusCard>

        <div style={styles.sectionList}>
          <div style={styles.sectionHeader}>발견된 섹션 ({mockSections.length}개)</div>
          {mockSections.map((section, idx) => (
            <div
              key={section.id}
              style={{
                ...styles.sectionItem,
                borderBottom:
                  idx === mockSections.length - 1
                    ? "none"
                    : "1px solid var(--color-border)",
              }}
            >
              <span style={styles.sectionName}>{section.name}</span>
              <span style={styles.sectionBadge}>{section.pageCount}페이지</span>
            </div>
          ))}
        </div>

        <div style={styles.actions}>
          <Button variant="secondary" onClick={() => navigate("/")}>
            취소
          </Button>
          <Button onClick={() => navigate("/convert")}>Markdown 변환 시작</Button>
        </div>
      </div>
    </div>
  );
}
