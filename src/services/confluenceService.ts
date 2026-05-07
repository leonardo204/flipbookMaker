import { invoke } from "@tauri-apps/api/core";

export interface ConfluenceConfig {
  baseUrl: string;
  email: string;
  token: string;
  spaceKey: string;
  parentPageId?: string;
}

export interface UploadResult {
  success: boolean;
  page_id: string | null;
  page_url: string | null;
  message: string;
}

export interface MdFile {
  title: string;
  content: string;
  imagePaths: string[];
}

/** Markdown을 Confluence Storage Format(HTML subset)으로 변환 */
export function mdToConfluenceStorage(md: string): string {
  const html = md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<ac:image><ri:attachment ri:filename="$2" /></ac:image>',
    )
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />");
  return `<p>${html}</p>`;
}

/**
 * 부모 페이지 URL 또는 ID 문자열에서 실제 Confluence page ID를 추출한다.
 * - 순수 숫자: ID로 간주
 * - URL: /pages/{id} 패턴에서 추출
 * - 나머지: null 반환 (space root에 생성)
 */
export async function resolveParentPageId(
  baseUrl: string,
  email: string,
  token: string,
  pageUrlOrTitle: string,
): Promise<string | null> {
  return invoke<string | null>("resolve_parent_page_id", {
    baseUrl,
    email,
    token,
    pageUrlOrTitle,
  });
}

/**
 * Confluence에 Markdown 파일 목록을 순차 업로드한다.
 *
 * @param config     Confluence 접속 설정
 * @param files      업로드할 파일 목록
 * @param onProgress 진행 콜백 (current, total, 현재 제목, 결과?)
 * @param delayMs    페이지 간 Rate-limit 방어 대기 시간 (기본 4000ms)
 */
export async function uploadToConfluence(
  config: ConfluenceConfig,
  files: MdFile[],
  onProgress: (
    current: number,
    total: number,
    title: string,
    result?: UploadResult,
  ) => void,
  delayMs = 4000,
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress(i, files.length, file.title);

    const content = mdToConfluenceStorage(file.content);

    let retries = 0;
    let result: UploadResult | null = null;

    while (retries < 3) {
      try {
        result = await invoke<UploadResult>("confluence_upload_page", {
          request: {
            base_url: config.baseUrl,
            email: config.email,
            token: config.token,
            space_key: config.spaceKey,
            parent_page_id: config.parentPageId ?? null,
            title: file.title,
            content,
            image_paths: file.imagePaths,
          },
        });

        if (result.success) break;
        retries++;
      } catch (e) {
        retries++;
        if (retries >= 3) {
          result = {
            success: false,
            page_id: null,
            page_url: null,
            message: e instanceof Error ? e.message : String(e),
          };
        }
      }

      // Rate limit 방어: 재시도 전 대기
      if (retries < 3) {
        await new Promise<void>((r) => setTimeout(r, delayMs * 2));
      }
    }

    results.push(result!);
    onProgress(i + 1, files.length, file.title, result!);

    // Rate limit 방어: 페이지 간 대기
    if (i < files.length - 1) {
      await new Promise<void>((r) => setTimeout(r, delayMs));
    }
  }

  return results;
}
