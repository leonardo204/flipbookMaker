import { invoke } from "@tauri-apps/api/core";

export interface FigmaNode {
  id: string;
  name: string;
  type: string; // "CANVAS", "FRAME", "SECTION", "COMPONENT" 등
  children?: FigmaNode[];
}

export interface FigmaFileInfo {
  name: string;
  lastModified: string;
  pages: FigmaNode[];
}

/**
 * Figma 파일 키를 URL에서 추출
 * https://www.figma.com/design/XXXXX/FileName → XXXXX
 * https://www.figma.com/file/XXXXX/FileName → XXXXX
 */
export function extractFileKey(url: string): string | null {
  const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Figma API 토큰 유효성 확인
 */
export async function verifyFigmaToken(token: string): Promise<boolean> {
  try {
    const result = await invoke<string>("figma_api_proxy", {
      endpoint: "/v1/me",
      token,
    });
    const data = JSON.parse(result);
    return !!data.id;
  } catch {
    return false;
  }
}

/**
 * Figma 파일 구조 가져오기 (페이지/프레임 목록)
 */
export async function getFigmaFileStructure(
  fileKey: string,
  token: string,
): Promise<FigmaFileInfo> {
  const result = await invoke<string>("figma_api_proxy", {
    endpoint: `/v1/files/${fileKey}?depth=2`,
    token,
  });
  const data = JSON.parse(result);

  return {
    name: data.name,
    lastModified: data.lastModified,
    pages: (data.document?.children || []).map(simplifyNode),
  };
}

/**
 * Figma 특정 노드의 상세 정보 가져오기
 */
export async function getFigmaNodeDetail(
  fileKey: string,
  nodeId: string,
  token: string,
): Promise<FigmaNode> {
  const result = await invoke<string>("figma_api_proxy", {
    endpoint: `/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}&depth=10`,
    token,
  });
  const data = JSON.parse(result);
  const nodes = data.nodes || {};
  const nodeData = Object.values(nodes)[0] as any;
  return simplifyNode(nodeData?.document || {});
}

function simplifyNode(node: any): FigmaNode {
  const result: FigmaNode = {
    id: node.id || "",
    name: node.name || "",
    type: node.type || "",
  };
  if (node.children && node.children.length > 0) {
    result.children = node.children.map(simplifyNode);
  }
  return result;
}
