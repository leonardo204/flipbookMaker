import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTextFile } from "@tauri-apps/plugin-fs";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import StatusCard from "../components/StatusCard";
import { useWorkflow, type SitemapNode, type PageEntry } from "../contexts/WorkflowContext";
import { useSettings } from "../contexts/SettingsContext";
import { runCrawl } from "../services/scriptRunner";
import { getFigmaFileStructure, getFigmaNodeDetail, extractFileKey } from "../services/figmaService";

/**
 * scripts/lib/slug.mjs의 slugify 로직을 TypeScript로 포팅
 * capture.mjs / capture-sections.mjs와 동일한 방식으로 파일명 slug를 생성한다.
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[>_\s]+/g, "-")
    .replace(/[^\w가-힣\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}


/**
 * Figma URL에서 node-id 파라미터를 추출
 * https://www.figma.com/design/XXXXX/Name?node-id=7538-22099
 */
function extractNodeId(url: string): string | null {
  try {
    const u = new URL(url);
    return u.searchParams.get("node-id");
  } catch {
    return null;
  }
}


/**
 * Figma 노드 배열을 SitemapNode 트리로 변환.
 * SECTION/CANVAS → 카테고리(폴더), FRAME → 페이지(리프).
 * children이 있는 노드는 재귀적으로 처리.
 */
function buildFigmaTree(nodes: Array<{ id: string; name: string; type: string; children?: Array<{ id: string; name: string; type: string; children?: unknown[] }> }>, baseUrl: string): SitemapNode[] {
  return nodes.map(node => {
    const hasChildren = node.children && node.children.length > 0;
    const isContainer = node.type === "SECTION" || node.type === "CANVAS" || node.type === "GROUP";

    if (isContainer && hasChildren) {
      return {
        id: node.id,
        pageName: node.name,
        type: node.type,
        url: baseUrl,
        children: (node.children as Array<{ id: string; name: string; type: string; children?: Array<{ id: string; name: string; type: string }> }>).map(child => ({
          id: child.id,
          pageName: child.name,
          type: child.type,
          url: baseUrl,
          children: [],
        })),
      };
    }

    return {
      id: node.id,
      pageName: node.name,
      type: node.type,
      url: baseUrl,
      children: [],
    };
  });
}

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
  progressContainer: {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "16px",
  },
  progressPageName: {
    color: "var(--color-text-secondary)",
    fontSize: "12px",
    marginTop: "8px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  leafBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-success)",
    fontSize: "11px",
    fontWeight: 500,
    padding: "2px 8px",
  },
  indent: (depth: number) => ({
    paddingLeft: `${16 + depth * 16}px`,
  }),
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
};

function SitemapTree({
  nodes,
  checkedIds,
  onToggle,
}: {
  nodes: SitemapNode[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <>
      {nodes.map((node, idx) => {
        const isSection = node.children && node.children.length > 0;
        const isLast = idx === nodes.length - 1;
        return (
          <div
            key={node.id}
            style={{
              ...styles.sectionItem,
              borderBottom: isLast ? "none" : "1px solid var(--color-border)",
            }}
          >
            <span style={styles.sectionName}>
              <input
                type="checkbox"
                checked={checkedIds.has(node.id)}
                onChange={() => onToggle(node.id)}
                style={{ marginRight: "8px", cursor: "pointer" }}
              />
              {node.pageName}
            </span>
            <span style={isSection ? styles.sectionBadge : styles.leafBadge}>
              {isSection ? `${node.children.length}개 프레임` : "페이지"}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default function AnalyzePage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { workflow, setSitemap, setPages, setPhase, setError: setWorkflowError } = useWorkflow();

  const [crawlProgress, setCrawlProgress] = useState({ current: 0, total: 0, page: "" });
  const [status, setStatus] = useState<"idle" | "crawling" | "done" | "error">("idle");
  const [localError, setLocalError] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const [sitemapData, setSitemapData] = useState<SitemapNode[]>([]);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  // 중복 실행 방지
  const started = useRef(false);

  const allSectionIds = useMemo(() => sitemapData.map((n) => n.id), [sitemapData]);
  const allChecked = checkedIds.size === allSectionIds.length && allSectionIds.length > 0;

  const handleToggleAll = () => {
    if (allChecked) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(allSectionIds));
    }
  };

  const handleToggle = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!workflow.url) {
      navigate("/");
      return;
    }
    if (started.current) return;
    started.current = true;
    startCrawl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (retryCountdown <= 0) return;
    const timer = setInterval(() => {
      setRetryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          started.current = false;
          startCrawl();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCountdown > 0]);

  const startCrawl = async () => {
    setStatus("crawling");
    setPhase("crawling");
    setLocalError(null);

    const outputDir = workflow.outputDir || settings.outputPath;

    try {
      if (workflow.sourceType === "axshare") {
        // Axshare 경로: runCrawl로 크롤링 후 sitemap.json 읽기
        let resolvedSitemapPath: string | null = null;

        await runCrawl(workflow.url, outputDir, (event) => {
          if (event.event === "progress") {
            setCrawlProgress({
              current: event.current ?? 0,
              total: event.total ?? 0,
              page: event.page ?? "",
            });
          } else if (event.event === "done" && event.type === "crawl") {
            resolvedSitemapPath = (event.sitemapPath as string) ?? null;
          }
        });

        if (!resolvedSitemapPath) {
          throw new Error("크롤링이 완료되었으나 sitemap 경로를 받지 못했습니다.");
        }

        const raw = await readTextFile(resolvedSitemapPath);
        const parsed: SitemapNode[] = JSON.parse(raw);
        setSitemap(parsed);
        setSitemapData(parsed);
        setCheckedIds(new Set(parsed.map((n) => n.id)));
      } else if (workflow.sourceType === "figma") {
        // Figma 경로: Figma API로 파일 구조 가져오기
        const fileKey = extractFileKey(workflow.url);
        if (!fileKey) {
          throw new Error("Figma URL에서 파일 키를 추출할 수 없습니다.");
        }

        const nodeId = extractNodeId(workflow.url);
        let sitemapNodes: SitemapNode[];

        if (nodeId) {
          console.log(`[AnalyzePage] Figma node-id: ${nodeId}, fetching node detail...`);
          const nodeDetail = await getFigmaNodeDetail(fileKey, nodeId, settings.figmaToken);
          console.log(`[AnalyzePage] Node: "${nodeDetail.name}" (${nodeDetail.type}), children: ${nodeDetail.children?.length ?? 0}`);
          sitemapNodes = buildFigmaTree(nodeDetail.children || [], workflow.url);
        } else {
          console.log(`[AnalyzePage] No node-id, fetching full file structure...`);
          const fileInfo = await getFigmaFileStructure(fileKey, settings.figmaToken);
          console.log(`[AnalyzePage] File: "${fileInfo.name}", pages: ${fileInfo.pages.length}`);
          sitemapNodes = buildFigmaTree(fileInfo.pages, workflow.url);
        }

        console.log(`[AnalyzePage] Tree built: ${sitemapNodes.length} top-level sections`);
        sitemapNodes.forEach(s => {
          console.log(`  [Section] ${s.pageName} (${s.type}) — ${s.children?.length ?? 0} frames`);
        });

        setSitemap(sitemapNodes);
        setSitemapData(sitemapNodes);
        setCheckedIds(new Set(sitemapNodes.map((n) => n.id)));
      } else {
        throw new Error(`지원하지 않는 소스 타입입니다: ${workflow.sourceType}`);
      }

      setPhase("idle");
      setStatus("done");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setLocalError(msg);
      setWorkflowError(msg);
      setStatus("error");
      setPhase("idle");
      if (msg.includes("429") || msg.includes("rate limit") || msg.includes("한도 초과")) {
        setRetryCountdown(90);
      }
    }
  };

  const sectionCount = sitemapData.length;
  const frameCount = sitemapData.reduce((sum, n) => sum + (n.children?.length ?? 0), 0);

  const isAxshare = workflow.sourceType === "axshare";

  const handleStartConvert = () => {
    // 선택된 섹션을 PageEntry로 변환 (섹션 1개 = Markdown 1개)
    const selectedSections: PageEntry[] = sitemapData
      .filter((n) => checkedIds.has(n.id))
      .map((n) => ({
        name: n.pageName,
        slug: slugify(n.pageName),
        sectionDir: "",
        path: n.id,
        status: "pending" as const,
      }));
    setSitemap(sitemapData);
    setPages(selectedSections);
    navigate("/convert");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Button variant="secondary" onClick={() => navigate("/")}>
          뒤로
        </Button>
        <h1 style={styles.title}>구조 분석</h1>
      </div>

      <div style={styles.content}>
        {/* 진행 중 */}
        {status === "crawling" && (
          <>
            <StatusCard
              title={isAxshare ? "사이트맵 크롤링 중..." : "Figma 구조 분석 중..."}
              status="info"
            >
              {isAxshare
                ? "Axure Share 사이트맵을 분석하고 있습니다."
                : "Figma 파일의 페이지와 프레임 구조를 가져오고 있습니다."}
            </StatusCard>
            {isAxshare && (
              <div style={styles.progressContainer}>
                <ProgressBar
                  progress={crawlProgress.total > 0 ? Math.round((crawlProgress.current / crawlProgress.total) * 100) : 0}
                  label={
                    crawlProgress.total > 0
                      ? `${crawlProgress.current} / ${crawlProgress.total} 페이지`
                      : "처리 중..."
                  }
                />
                {crawlProgress.page && (
                  <div style={styles.progressPageName}>처리 중: {crawlProgress.page}</div>
                )}
              </div>
            )}
          </>
        )}

        {/* 에러 */}
        {status === "error" && localError && (
          <>
            <StatusCard title="분석 실패" status="error">
              {localError}
            </StatusCard>
            {retryCountdown > 0 && (
              <div style={{
                textAlign: "center",
                padding: "12px",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                fontSize: "13px",
                color: "var(--color-text-secondary)",
              }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-accent)", marginBottom: "4px" }}>
                  {Math.floor(retryCountdown / 60)}:{String(retryCountdown % 60).padStart(2, "0")}
                </div>
                자동 재시도까지 대기 중...
              </div>
            )}
            <div style={styles.actions}>
              <Button variant="secondary" onClick={() => navigate("/")}>
                취소
              </Button>
              <Button
                disabled={retryCountdown > 0}
                onClick={() => {
                  started.current = false;
                  setRetryCountdown(0);
                  startCrawl();
                }}
              >
                {retryCountdown > 0
                  ? `대기 중 (${Math.floor(retryCountdown / 60)}:${String(retryCountdown % 60).padStart(2, "0")})`
                  : "다시 시도"}
              </Button>
            </div>
          </>
        )}

        {/* 완료 */}
        {status === "done" && (
          <>
            <StatusCard title="구조 분석 완료" status="success">
              총 {sectionCount}개 섹션, {frameCount}개 프레임이 발견되었습니다.
              섹션 단위로 Markdown 변환됩니다.
            </StatusCard>

            {sitemapData.length > 0 && (
              <div style={styles.sectionList}>
                <div style={styles.sectionHeader}>
                  <span>발견된 구조 ({sitemapData.length}개 최상위 항목)</span>
                  <span
                    style={{ cursor: "pointer", color: "var(--color-accent)", fontSize: "11px", fontWeight: 500 }}
                    onClick={handleToggleAll}
                  >
                    {allChecked ? "전체 해제" : "전체 선택"}
                  </span>
                </div>
                <SitemapTree
                  nodes={sitemapData}
                  checkedIds={checkedIds}
                  onToggle={handleToggle}
                />
              </div>
            )}

            <div style={styles.actions}>
              <Button variant="secondary" onClick={() => navigate("/")}>
                취소
              </Button>
              <Button onClick={handleStartConvert} disabled={checkedIds.size === 0}>
                Markdown 변환 시작 ({checkedIds.size}개)
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
