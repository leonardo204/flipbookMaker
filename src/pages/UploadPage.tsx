import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { readTextFile, readDir } from "@tauri-apps/plugin-fs";
import { openUrl } from "@tauri-apps/plugin-opener";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import StatusCard from "../components/StatusCard";
import { useSettings } from "../contexts/SettingsContext";
import { useWorkflow } from "../contexts/WorkflowContext";
import {
  uploadToConfluence,
  resolveParentPageId,
  type MdFile,
  type UploadResult,
} from "../services/confluenceService";

// 각 페이지별 업로드 진행 상태
type PageUploadStatus = "waiting" | "uploading" | "success" | "error";

interface PageUploadEntry {
  name: string;
  path: string;
  status: PageUploadStatus;
  result?: UploadResult;
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
    gap: "10px",
    padding: "20px",
  },
  sectionTitle: {
    color: "var(--color-text)",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "2px",
  },
  configRow: {
    display: "flex",
    gap: "8px",
    fontSize: "13px",
  },
  configLabel: {
    color: "var(--color-text-secondary)",
    minWidth: "80px",
  },
  configValue: {
    color: "var(--color-text)",
    flex: 1,
    wordBreak: "break-all" as const,
  },
  pageList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },
  pageRow: {
    alignItems: "center",
    display: "flex",
    gap: "10px",
    padding: "8px 12px",
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
  },
  pageName: {
    flex: 1,
    fontSize: "13px",
    color: "var(--color-text)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  pageStatusBadge: (status: PageUploadStatus) => ({
    fontSize: "11px",
    fontWeight: 500,
    padding: "2px 8px",
    borderRadius: "var(--radius-sm)",
    backgroundColor:
      status === "success"
        ? "rgba(34, 197, 94, 0.12)"
        : status === "error"
          ? "rgba(239, 68, 68, 0.12)"
          : status === "uploading"
            ? "rgba(99, 102, 241, 0.12)"
            : "rgba(148, 163, 184, 0.12)",
    color:
      status === "success"
        ? "var(--color-success)"
        : status === "error"
          ? "var(--color-error)"
          : status === "uploading"
            ? "var(--color-accent)"
            : "var(--color-text-secondary)",
  }),
  pageUrlLink: {
    fontSize: "11px",
    color: "var(--color-accent)",
    cursor: "pointer",
    textDecoration: "underline",
    whiteSpace: "nowrap" as const,
  },
  errorText: {
    fontSize: "11px",
    color: "var(--color-error)",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
};

const PAGE_STATUS_LABELS: Record<PageUploadStatus, string> = {
  waiting: "대기",
  uploading: "업로드 중",
  success: "완료",
  error: "실패",
};

export default function UploadPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { workflow } = useWorkflow();

  const [pageEntries, setPageEntries] = useState<PageUploadEntry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // workflow.pages에서 done 상태인 페이지만 필터
  const donePages = workflow.pages.filter((p) => p.status === "done");

  // 설정 미완료 여부
  const settingsIncomplete = !settings.confluenceVerified;
  // 변환된 페이지 없음
  const noDonePages = donePages.length === 0;

  // 각 페이지 .md 파일 + 이미지 수집 후 MdFile 목록 반환
  const collectMdFiles = useCallback(async (): Promise<MdFile[]> => {
    const mdFiles: MdFile[] = [];

    for (const page of donePages) {
      // page.path 는 해당 페이지 디렉토리 경로
      const dirPath = page.path;

      // 디렉토리 내 파일 목록
      let entries: Awaited<ReturnType<typeof readDir>> = [];
      try {
        entries = await readDir(dirPath);
      } catch {
        // 디렉토리 읽기 실패 시 스킵
        continue;
      }

      // .md 파일 찾기
      const mdEntry = entries.find(
        (e) => e.name && e.name.endsWith(".md"),
      );
      if (!mdEntry || !mdEntry.name) continue;

      const mdPath = `${dirPath}/${mdEntry.name}`;
      let content = "";
      try {
        content = await readTextFile(mdPath);
      } catch {
        continue;
      }

      // .png 이미지 파일 수집
      const imagePaths = entries
        .filter((e) => e.name && e.name.endsWith(".png"))
        .map((e) => `${dirPath}/${e.name}`);

      mdFiles.push({
        title: page.name,
        content,
        imagePaths,
      });
    }

    return mdFiles;
  }, [donePages]);

  const handleUpload = useCallback(async () => {
    setGlobalError(null);
    setUploadDone(false);
    setUploadProgress(0);

    // 초기 pageEntries 세팅 (waiting 상태)
    const initialEntries: PageUploadEntry[] = donePages.map((p) => ({
      name: p.name,
      path: p.path,
      status: "waiting",
    }));
    setPageEntries(initialEntries);
    setUploading(true);

    try {
      // 1. Keychain에서 API 토큰 로드
      // key는 SettingsPage의 save_credential 호출과 일치해야 한다: "confluence-token"
      let token: string;
      try {
        token = await invoke<string>("load_credential", {
          service: "flipbookmaker",
          key: "confluence-token",
        });
      } catch (e) {
        throw new Error(
          `API 토큰을 불러올 수 없습니다: ${e instanceof Error ? e.message : String(e)}`,
        );
      }

      // 2. parentPageUrl에서 pageId 해석
      let parentPageId: string | null = null;
      if (settings.parentPageUrl) {
        parentPageId = await resolveParentPageId(
          settings.atlassianUrl,
          settings.confluenceEmail,
          token,
          settings.parentPageUrl,
        );
      }

      // 3. .md 파일 목록 수집
      const mdFiles = await collectMdFiles();
      if (mdFiles.length === 0) {
        throw new Error("업로드할 Markdown 파일을 찾을 수 없습니다.");
      }

      // 4. 진행 콜백: current=0일 때 해당 파일 uploading, current=i+1일 때 결과 반영
      const onProgress = (
        current: number,
        total: number,
        title: string,
        result?: UploadResult,
      ) => {
        const pct = Math.round((current / total) * 100);
        setUploadProgress(pct);

        setPageEntries((prev) => {
          const next = [...prev];
          const idx = next.findIndex((e) => e.name === title);
          if (idx === -1) return prev;

          if (result) {
            // 완료 (current = i+1)
            next[idx] = {
              ...next[idx],
              status: result.success ? "success" : "error",
              result,
            };
          } else {
            // 시작 (current = i)
            next[idx] = { ...next[idx], status: "uploading" };
          }
          return next;
        });
      };

      // 5. 업로드 실행
      await uploadToConfluence(
        {
          baseUrl: settings.atlassianUrl,
          email: settings.confluenceEmail,
          token,
          spaceKey: settings.spaceKey,
          parentPageId: parentPageId ?? undefined,
        },
        mdFiles,
        onProgress,
        4000,
      );

      setUploadDone(true);
    } catch (e) {
      setGlobalError(e instanceof Error ? e.message : String(e));
    } finally {
      setUploading(false);
    }
  }, [settings, donePages, collectMdFiles]);

  // 설정 미완료 화면
  if (settingsIncomplete) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <Button variant="secondary" onClick={() => navigate("/convert")}>
            뒤로
          </Button>
          <h1 style={styles.title}>Confluence 업로드</h1>
        </div>
        <div style={styles.content}>
          <StatusCard title="Confluence 설정 필요" status="warning">
            Confluence 연결이 확인되지 않았습니다. 설정에서 Confluence 정보를
            입력하고 연결 테스트를 완료해주세요.
          </StatusCard>
          <div style={styles.actions}>
            <Button
              onClick={() =>
                navigate("/settings", { state: { from: "/upload" } })
              }
            >
              설정으로 이동
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 변환 완료 페이지 없음
  if (noDonePages) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <Button variant="secondary" onClick={() => navigate("/convert")}>
            뒤로
          </Button>
          <h1 style={styles.title}>Confluence 업로드</h1>
        </div>
        <div style={styles.content}>
          <StatusCard title="변환된 문서 없음" status="warning">
            업로드할 변환 완료 페이지가 없습니다. 먼저 변환 단계를
            완료해주세요.
          </StatusCard>
          <div style={styles.actions}>
            <Button onClick={() => navigate("/convert")}>변환 페이지로 이동</Button>
          </div>
        </div>
      </div>
    );
  }

  const successCount = pageEntries.filter((e) => e.status === "success").length;
  const failCount = pageEntries.filter((e) => e.status === "error").length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Button
          variant="secondary"
          onClick={() => navigate("/convert")}
          disabled={uploading}
        >
          뒤로
        </Button>
        <h1 style={styles.title}>Confluence 업로드</h1>
      </div>

      <div style={styles.content}>
        {/* 설정 요약 (읽기 전용) */}
        <div style={styles.section}>
          <span style={styles.sectionTitle}>Confluence 설정</span>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>URL</span>
            <span style={styles.configValue}>{settings.atlassianUrl}</span>
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>Space</span>
            <span style={styles.configValue}>{settings.spaceKey}</span>
          </div>
          <div style={styles.configRow}>
            <span style={styles.configLabel}>계정</span>
            <span style={styles.configValue}>{settings.confluenceEmail}</span>
          </div>
          {settings.parentPageUrl && (
            <div style={styles.configRow}>
              <span style={styles.configLabel}>상위 페이지</span>
              <span style={styles.configValue}>{settings.parentPageUrl}</span>
            </div>
          )}
        </div>

        {/* 문서 목록 */}
        <div style={styles.section}>
          <span style={styles.sectionTitle}>
            업로드 대상 ({donePages.length}개)
          </span>
          <div style={styles.pageList}>
            {(pageEntries.length > 0
              ? pageEntries
              : donePages.map<PageUploadEntry>((p) => ({
                  name: p.name,
                  path: p.path,
                  status: "waiting",
                }))
            ).map((entry: PageUploadEntry) => (
              <div key={entry.name} style={styles.pageRow}>
                <span style={styles.pageName}>{entry.name}</span>

                {/* 업로드 상태 배지 */}
                <span style={styles.pageStatusBadge(entry.status)}>
                  {PAGE_STATUS_LABELS[entry.status]}
                </span>

                {/* 성공 시 URL 링크 */}
                {entry.result?.success && entry.result.page_url && (
                  <span
                    style={styles.pageUrlLink}
                    onClick={() => openUrl(entry.result!.page_url!).catch((e) => alert(`링크 열기 실패: ${e}`))}
                  >
                    Confluence에서 열기
                  </span>
                )}

                {/* 실패 시 에러 메시지 */}
                {entry.result && !entry.result.success && entry.result.message && (
                  <span
                    style={styles.errorText}
                    title={entry.result.message}
                  >
                    {entry.result.message}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 진행률 바 (업로드 중 또는 완료 후) */}
        {(uploading || uploadProgress > 0) && (
          <ProgressBar
            progress={uploadProgress}
            label={
              uploading
                ? `업로드 중... (${successCount + failCount}/${donePages.length})`
                : "업로드 완료"
            }
          />
        )}

        {/* 글로벌 에러 */}
        {globalError && (
          <StatusCard title="업로드 실패" status="error">
            {globalError}
          </StatusCard>
        )}

        {/* 완료 결과 요약 */}
        {uploadDone && !globalError && (
          <StatusCard
            title={failCount === 0 ? "업로드 완료" : "업로드 부분 완료"}
            status={failCount === 0 ? "success" : "warning"}
          >
            {successCount}개 성공
            {failCount > 0 && `, ${failCount}개 실패`}
          </StatusCard>
        )}

        <div style={styles.actions}>
          <Button
            onClick={handleUpload}
            disabled={uploading || uploadDone}
          >
            {uploading ? "업로드 중..." : uploadDone ? "업로드 완료" : "업로드 시작"}
          </Button>
        </div>
      </div>
    </div>
  );
}
