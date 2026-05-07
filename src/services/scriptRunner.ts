import { Command } from "@tauri-apps/plugin-shell";

export interface ProgressEvent {
  event: string;
  type?: string;
  current?: number;
  total?: number;
  page?: string;
  sitemapPath?: string;
  [key: string]: unknown;
}

export type ProgressCallback = (event: ProgressEvent) => void;

/**
 * Node.js 설치 여부 확인
 */
export async function checkNodeAvailable(): Promise<{ available: boolean; version?: string; error?: string }> {
  try {
    const cmd = Command.create("node", ["--version"]);
    const output = await cmd.execute();
    if (output.code === 0) {
      return { available: true, version: output.stdout.trim() };
    }
    return { available: false, error: `exit code ${output.code}` };
  } catch (err) {
    return { available: false, error: String(err) };
  }
}

/**
 * Playwright 설치 여부 확인
 */
export async function checkPlaywrightAvailable(): Promise<{ available: boolean; version?: string; error?: string }> {
  try {
    const cmd = Command.create("node", [
      "-e",
      "const p = require('playwright'); console.log(require('playwright/package.json').version);",
    ]);
    const output = await cmd.execute();
    if (output.code === 0) {
      return { available: true, version: output.stdout.trim() };
    }
    return { available: false, error: output.stderr.trim() || `exit code ${output.code}` };
  } catch (err) {
    return { available: false, error: String(err) };
  }
}

/**
 * 스크립트 실행 핵심 래퍼.
 * stdout에서 JSON 라인을 파싱하여 onProgress 콜백을 호출한다.
 * stderr는 로그용으로 수집한다.
 */
export async function runScript(
  scriptPath: string,
  args: string[],
  onProgress?: ProgressCallback
): Promise<void> {
  return new Promise((resolve, reject) => {
    const cmd = Command.create("node", [scriptPath, ...args]);

    let stdoutBuffer = "";
    const stderrLines: string[] = [];

    cmd.stdout.on("data", (chunk: string) => {
      stdoutBuffer += chunk;
      // 줄 단위로 분리하여 JSON 파싱
      const lines = stdoutBuffer.split("\n");
      // 마지막 불완전한 줄은 버퍼에 보관
      stdoutBuffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const parsed = JSON.parse(trimmed) as ProgressEvent;
          onProgress?.(parsed);
        } catch {
          // JSON이 아닌 stdout 라인은 무시
        }
      }
    });

    cmd.stderr.on("data", (chunk: string) => {
      stderrLines.push(chunk);
    });

    cmd.on("close", (data: { code: number | null; signal: number | null }) => {
      // 버퍼에 남은 데이터 처리
      if (stdoutBuffer.trim()) {
        try {
          const parsed = JSON.parse(stdoutBuffer.trim()) as ProgressEvent;
          onProgress?.(parsed);
        } catch {
          // 무시
        }
      }

      if (data.code === 0 || data.code === null) {
        resolve();
      } else {
        const stderrText = stderrLines.join("");
        reject(
          new Error(
            `Script exited with code ${data.code}.\nstderr: ${stderrText}`
          )
        );
      }
    });

    cmd.on("error", (err: string) => {
      reject(new Error(`Failed to spawn script: ${err}`));
    });

    cmd.spawn().catch((err: unknown) => {
      reject(new Error(`Failed to spawn: ${String(err)}`));
    });
  });
}

/**
 * crawl.mjs 실행 — Axure Share URL에서 sitemap을 크롤링한다.
 */
export async function runCrawl(
  url: string,
  outputDir: string,
  onProgress?: ProgressCallback
): Promise<void> {
  return runScript(
    "../scripts/crawl.mjs",
    ["--url", url, "--output", outputDir],
    onProgress
  );
}

