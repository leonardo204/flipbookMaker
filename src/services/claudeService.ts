import { Command } from "@tauri-apps/plugin-shell";
import { claudeSession } from "./claudeSession";

export interface MarkdownResult {
  pageName: string;
  outputPath: string;
  success: boolean;
  error?: string;
}

function buildPrompt(
  pageUrl: string,
  pageName: string,
  textContent: string,
  outputPath: string,
  sourceType: string,
): string {
  return `플립북 페이지를 구조화된 Markdown 스펙 문서로 변환하세요.

페이지: ${pageName}
원본 URL: ${pageUrl}
소스 타입: ${sourceType}

텍스트 내용:
---
${textContent}
---

## 변환 규칙

1. **이미지 없이 텍스트+Mermaid만 사용**합니다.

2. 문서 상단에 다음을 포함:
\`\`\`
> ⚠️ 이 문서는 원본 플립북의 참조용 변환 문서입니다.
> 원본: [${pageName}](${pageUrl})
\`\`\`

3. **UI 화면/와이어프레임**은 Mermaid 다이어그램으로 표현:
   - 화면 레이아웃: \`graph TD\` 또는 \`graph LR\`로 컴포넌트 구조 표현
   - 사용자 플로우: \`flowchart TD\`로 화면 전환 흐름
   - 상호작용 순서: \`sequenceDiagram\`으로 사용자-시스템 간 상호작용
   - 상태 전환: \`stateDiagram-v2\`
   - 적합한 다이어그램 타입을 자유롭게 판단하세요

4. **테이블/목록 데이터**는 Markdown 테이블로 변환

5. **구조**:
   - H1: 페이지 제목
   - H2: 주요 섹션
   - H3: 하위 항목
   - 각 섹션에 간결한 설명 + 관련 Mermaid 다이어그램
   - 인터랙션/동작은 테이블이나 목록으로

6. 결과를 ${outputPath}에 저장하세요.`;
}

export async function generateMarkdown(
  claudePath: string,
  pageUrl: string,
  pageSlug: string,
  pageName: string,
  textContent: string,
  outputDir: string,
  sourceType: string,
): Promise<MarkdownResult> {
  const outputPath = `${outputDir}/${pageSlug}.md`;

  // 상주 세션이 연결되어 있으면 세션 재사용
  const sessionConnected = claudeSession.isConnected();
  console.log(`[claudeService] session=${sessionConnected ? "connected" : claudeSession.getStatus()}, page=${pageName}`);

  if (sessionConnected) {
    const prompt = buildPrompt(pageUrl, pageName, textContent, outputPath, sourceType);
    try {
      const response = await claudeSession.sendPrompt(prompt, 300000);
      console.log(`[claudeService] session response for ${pageName}:`, response.slice(0, 200));
      return { pageName, outputPath, success: true };
    } catch (e) {
      console.error(`[claudeService] session error for ${pageName}:`, e);
      return {
        pageName,
        outputPath: "",
        success: false,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  console.log(`[claudeService] using fallback for ${pageName}`);
  return generateMarkdownFallback(claudePath, pageUrl, pageSlug, pageName, textContent, outputDir, sourceType);
}

/**
 * 기존 단일 프로세스 spawn 방식 (세션 미연결 시 fallback)
 */
async function generateMarkdownFallback(
  claudePath: string,
  pageUrl: string,
  pageSlug: string,
  pageName: string,
  textContent: string,
  outputDir: string,
  sourceType: string,
): Promise<MarkdownResult> {
  const outputPath = `${outputDir}/${pageSlug}.md`;
  const prompt = buildPrompt(pageUrl, pageName, textContent, outputPath, sourceType);

  const nodeScript = `
const fs = require('fs');
const { execFileSync, execSync } = require('child_process');

function findClaude() {
  const candidates = [
    ${JSON.stringify(claudePath)},
    process.env.HOME + '/.local/bin/claude',
    '/usr/local/bin/claude',
    '/opt/homebrew/bin/claude',
    '/Applications/cmux.app/Contents/Resources/bin/claude',
  ].filter(Boolean);
  for (const p of candidates) {
    try { if (fs.existsSync(p)) return p; } catch {}
  }
  try { return execSync('which claude', { encoding: 'utf8' }).trim(); } catch {}
  return 'claude';
}

const claudeCmd = findClaude();
try {
  const result = execFileSync(
    claudeCmd,
    ['--print', '-p', ${JSON.stringify(prompt)}, '--dangerously-skip-permissions', '--allowedTools', 'Write'],
    { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 300000 }
  );
  process.stdout.write(result);
  process.exit(0);
} catch (err) {
  process.stderr.write(String(err.message || err));
  process.exit(1);
}`;

  return new Promise<MarkdownResult>((resolve) => {
    const cmd = Command.create("node", ["-e", nodeScript]);

    let stderr = "";

    cmd.stdout.on("data", (_chunk: string) => {
      // fallback에서는 stdout 내용 무시 (파일에 직접 저장됨)
    });
    cmd.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });

    cmd.on("close", (data: { code: number | null; signal: number | null }) => {
      if (data.code === 0 || data.code === null) {
        resolve({ pageName, outputPath, success: true });
      } else {
        resolve({
          pageName,
          outputPath: "",
          success: false,
          error: stderr.trim() || `claude 응답 없음 (exit ${data.code})`,
        });
      }
    });

    cmd.on("error", (err: string) => {
      resolve({ pageName, outputPath: "", success: false, error: `실행 오류: ${err}` });
    });

    cmd.spawn().catch((err: unknown) => {
      resolve({
        pageName,
        outputPath: "",
        success: false,
        error: `spawn 실패: ${String(err)}`,
      });
    });
  });
}
