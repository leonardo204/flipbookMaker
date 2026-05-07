import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { useSettings } from "../contexts/SettingsContext";
import { useWorkflow } from "../contexts/WorkflowContext";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import StatusCard from "../components/StatusCard";
import { generateMarkdown } from "../services/claudeService";
import { extractFileKey, getFigmaNodeDetail } from "../services/figmaService";

const FALLBACK_OUTPUT_DIR = "~/Documents/FlipbookMaker/output";

type StageStatus = "idle" | "converting" | "done" | "error";

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
  stageLabel: {
    color: "var(--color-text-secondary)",
    fontSize: "12px",
    marginTop: "6px",
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
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  openLink: {
    color: "var(--color-accent)",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    marginLeft: "8px",
    textDecoration: "none" as const,
  },
  statusGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
};

function stageLabelText(stage: StageStatus): string {
  switch (stage) {
    case "converting":
      return "Markdown 생성 중...";
    case "done":
      return "변환 완료";
    case "error":
      return "오류 발생";
    default:
      return "변환 준비 중...";
  }
}

export default function ConvertPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { workflow, setPhase, updatePageStatus } = useWorkflow();

  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<StageStatus>("idle");
  const [localError, setLocalError] = useState<string | null>(null);
  const [stopped, setStopped] = useState(false);

  // 완료된 페이지 수 (Markdown 생성 완료 기준)
  const [doneCount, setDoneCount] = useState(0);
  const [pageErrors, setPageErrors] = useState<Record<string, string>>({});

  // 중복 실행 방지
  const started = useRef(false);
  const stoppedRef = useRef(false);

  const outputDir = workflow.outputDir || settings.outputPath || FALLBACK_OUTPUT_DIR;
  const pages = workflow.pages;

  useEffect(() => {
    if (!workflow.url) {
      navigate("/");
      return;
    }
    if (started.current) return;
    started.current = true;
    stoppedRef.current = false;
    startPipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPipeline = async () => {
    setLocalError(null);
    setStopped(false);
    setStage("converting");
    setPhase("converting");

    const claudePath = settings.claudePath || "claude";
    const pageList = pages.length > 0 ? pages : [];
    const perPageProgress = pageList.length > 0 ? 100 / pageList.length : 0;
    let completedCount = 0;

    const isFigma = workflow.sourceType === "figma";
    const fileKey = isFigma ? extractFileKey(workflow.url) : null;

    for (let pi = 0; pi < pageList.length; pi++) {
      const page = pageList[pi];
      if (stoppedRef.current) break;
      updatePageStatus(page.name, "converting");

      // Figma rate limit 방지: 섹션 간 5초 딜레이 (첫 번째 제외)
      if (isFigma && pi > 0) {
        console.log(`[ConvertPage] Rate limit delay: 5s before "${page.name}"`);
        await new Promise(r => setTimeout(r, 5000));
      }

      let textContent = "";
      let pageUrl = workflow.url;

      if (isFigma) {
        try {
          if (fileKey) {
            console.log(`[ConvertPage] Fetching Figma section: "${page.name}" (${page.path})`);
            const nodeDetail = await getFigmaNodeDetail(fileKey, page.path, settings.figmaToken);
            const frameCount = nodeDetail.children?.length ?? 0;
            console.log(`[ConvertPage] Section "${page.name}": ${frameCount} frames`);
            textContent = JSON.stringify(nodeDetail, null, 2);
            pageUrl = `${workflow.url}?node-id=${encodeURIComponent(page.path)}`;
          }
        } catch (e) {
          console.error(`[ConvertPage] Figma data fetch failed for "${page.name}":`, e);
          textContent = `(Figma 노드 데이터 수집 실패: ${e})`;
        }
      } else {
        // Axshare: 크롤링 시 저장된 텍스트 파일 읽기
        const pageDataDir = page.sectionDir ? `${outputDir}/${page.sectionDir}` : outputDir;
        try {
          textContent = await readTextFile(`${pageDataDir}/${page.slug}.txt`);
        } catch {
          textContent = `(텍스트 파일 없음: ${page.slug}.txt)`;
        }
      }

      const result = await generateMarkdown(
        claudePath,
        pageUrl,
        page.slug,
        page.name,
        textContent,
        outputDir,
        workflow.sourceType,
      );

      if (result.success) {
        updatePageStatus(page.name, "done");
        completedCount += 1;
        setDoneCount(completedCount);
      } else {
        updatePageStatus(page.name, "error");
        setPageErrors((prev) => ({ ...prev, [page.name]: result.error || "알 수 없는 오류" }));
      }

      setProgress(Math.round(perPageProgress * completedCount));
    }

    if (!stoppedRef.current) {
      setProgress(100);
      setStage("done");
      setPhase("done");
    }
  };

  const handleStop = () => {
    // stoppedRef를 true로 설정하면 startPipeline 루프가 다음 페이지 처리를 시작하지 않는다.
    // 현재 진행 중인 작업이 완료된 후 루프를 빠져나온다.
    stoppedRef.current = true;
    setStopped(true);
    setStage("error");
    setPhase("idle");
  };

  const handleRetry = () => {
    setProgress(0);
    setDoneCount(0);
    setLocalError(null);
    setStage("idle");
    started.current = false;
    stoppedRef.current = false;
    startPipeline();
    started.current = true;
  };

  const totalPages = pages.length;
  const displayDone = doneCount;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Markdown 변환</h1>
      </div>

      <div style={styles.content}>
        <ProgressBar progress={progress} label="변환 진행률" />
        <div style={styles.stageLabel}>{stageLabelText(stage)}</div>

        {/* 완료 상태 */}
        {stage === "done" && (
          <StatusCard title="변환 완료" status="success">
            총 {totalPages}개 문서가 성공적으로 변환되었습니다. Confluence에 업로드할 수 있습니다.
          </StatusCard>
        )}

        {/* 에러 상태 */}
        {stage === "error" && localError && (
          <StatusCard title="변환 실패" status="error">
            {localError}
          </StatusCard>
        )}

        {/* 중지 상태: 현재 진행 중인 작업이 완료된 후 루프가 종료됨 */}
        {stopped && !localError && (
          <StatusCard title="변환 중지됨" status="error">
            사용자가 변환을 중지했습니다. 현재 진행 중인 작업이 완료된 후 중지됩니다.
          </StatusCard>
        )}

        {/* 문서 목록 */}
        {totalPages > 0 && (
          <div style={styles.docList}>
            <div style={styles.docHeader}>
              변환된 문서 ({displayDone}/{totalPages}개)
            </div>
            {pages.map((page, idx) => (
              <div
                key={page.name}
                style={{
                  ...styles.docItem,
                  borderBottom:
                    idx === pages.length - 1 ? "none" : "1px solid var(--color-border)",
                }}
              >
                <span style={styles.docName}>{page.name}.md</span>
                <div style={styles.statusGroup}>
                  {page.status === "done" && (
                    <>
                      <span
                        style={{ color: "var(--color-success)", fontSize: "12px", fontWeight: 500 }}
                      >
                        완료
                      </span>
                      <span
                        style={styles.openLink}
                        onClick={() =>
                          invoke("open_path", { path: `${outputDir}/${page.slug}.md` }).catch((e) => alert(`파일 열기 실패: ${e}`))
                        }
                      >
                        열기
                      </span>
                    </>
                  )}
                  {page.status === "converting" && (
                    <span
                      style={{ color: "var(--color-warning)", fontSize: "12px", fontWeight: 500 }}
                    >
                      변환 중...
                    </span>
                  )}
                  {page.status === "error" && (
                    <span
                      style={{ color: "var(--color-error, #ef4444)", fontSize: "12px", fontWeight: 500, maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}
                      title={pageErrors[page.name] || "오류"}
                    >
                      {pageErrors[page.name] ? `오류: ${pageErrors[page.name].slice(0, 50)}` : "오류"}
                    </span>
                  )}
                  {page.status === "pending" && (
                    <span
                      style={{ color: "var(--color-text-tertiary)", fontSize: "12px" }}
                    >
                      대기
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 문서 목록이 없는 경우 (workflow.pages가 비어있을 때) */}
        {totalPages === 0 && stage !== "done" && stage !== "error" && (
          <StatusCard title="페이지 목록 없음" status="info">
            분석 단계에서 페이지를 불러오지 못했습니다. 처음으로 돌아가서 다시 시도하세요.
          </StatusCard>
        )}

        {/* 액션 버튼 */}
        <div style={styles.actions}>
          {stage !== "done" && stage !== "error" && !stopped && (
            <Button variant="danger" onClick={handleStop}>
              중지
            </Button>
          )}

          {(stage === "error" || stopped) && (
            <>
              <Button variant="secondary" onClick={() => navigate("/")}>
                처음으로
              </Button>
              <Button onClick={handleRetry}>다시 시도</Button>
            </>
          )}

          {stage === "done" && (
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Button
                variant="secondary"
                onClick={() => invoke("open_path", { path: outputDir }).catch((e) => alert(`폴더 열기 실패: ${e}`))}
              >
                결과 폴더 열기
              </Button>
              <Button onClick={() => navigate("/upload")}>Confluence 업로드</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
