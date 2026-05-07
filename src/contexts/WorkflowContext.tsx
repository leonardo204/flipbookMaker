import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export interface SitemapNode {
  id: string;
  pageName: string;
  type: string;
  url: string;
  children: SitemapNode[];
}

export type PageStatus = "pending" | "capturing" | "converting" | "done" | "error";
export type SourceType = "axshare" | "figma";
export type WorkflowPhase =
  | "idle"
  | "crawling"
  | "capturing"
  | "converting"
  | "uploading"
  | "done";

export interface PageEntry {
  name: string;
  slug: string;       // 파일명용 slug (예: scenario-architecture)
  sectionDir: string; // 섹션 디렉토리명 (예: 1-scenario-architecture). 최상위 페이지는 빈 문자열
  path: string;
  status: PageStatus;
}

export interface WorkflowState {
  url: string;
  outputDir: string;
  sourceType: SourceType;
  sitemap: SitemapNode[];
  totalPages: number;
  pages: PageEntry[];
  currentPhase: WorkflowPhase;
  error: string | null;
}

interface WorkflowContextValue {
  workflow: WorkflowState;
  setUrl: (url: string) => void;
  setOutputDir: (dir: string) => void;
  setSourceType: (sourceType: SourceType) => void;
  setSitemap: (sitemap: SitemapNode[]) => void;
  setPages: (pages: PageEntry[]) => void;
  updatePageStatus: (name: string, status: PageStatus) => void;
  setPhase: (phase: WorkflowPhase) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultState: WorkflowState = {
  url: "",
  outputDir: "",
  sourceType: "axshare",
  sitemap: [],
  totalPages: 0,
  pages: [],
  currentPhase: "idle",
  error: null,
};

const WorkflowContext = createContext<WorkflowContextValue>({
  workflow: defaultState,
  setUrl: () => {},
  setOutputDir: () => {},
  setSourceType: () => {},
  setSitemap: () => {},
  setPages: () => {},
  updatePageStatus: () => {},
  setPhase: () => {},
  setError: () => {},
  reset: () => {},
});

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [workflow, setWorkflow] = useState<WorkflowState>(defaultState);

  const setUrl = useCallback((url: string) => {
    setWorkflow((prev) => ({ ...prev, url }));
  }, []);

  const setOutputDir = useCallback((outputDir: string) => {
    setWorkflow((prev) => ({ ...prev, outputDir }));
  }, []);

  const setSourceType = useCallback((sourceType: SourceType) => {
    setWorkflow((prev) => ({ ...prev, sourceType }));
  }, []);

  const setSitemap = useCallback((sitemap: SitemapNode[]) => {
    setWorkflow((prev) => ({
      ...prev,
      sitemap,
      totalPages: sitemap.length,
    }));
  }, []);

  const setPages = useCallback((pages: PageEntry[]) => {
    setWorkflow((prev) => ({ ...prev, pages, totalPages: pages.length }));
  }, []);

  const updatePageStatus = useCallback((name: string, status: PageStatus) => {
    setWorkflow((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.name === name ? { ...p, status } : p
      ),
    }));
  }, []);

  const setPhase = useCallback((currentPhase: WorkflowPhase) => {
    setWorkflow((prev) => ({ ...prev, currentPhase }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setWorkflow((prev) => ({ ...prev, error }));
  }, []);

  const reset = useCallback(() => {
    setWorkflow(defaultState);
  }, []);

  // useMemo로 context value 메모이제이션 — 불필요한 리렌더 방지
  const value = useMemo<WorkflowContextValue>(
    () => ({
      workflow,
      setUrl,
      setOutputDir,
      setSourceType,
      setSitemap,
      setPages,
      updatePageStatus,
      setPhase,
      setError,
      reset,
    }),
    [workflow, setUrl, setOutputDir, setSourceType, setSitemap, setPages, updatePageStatus, setPhase, setError, reset]
  );

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  return useContext(WorkflowContext);
}
