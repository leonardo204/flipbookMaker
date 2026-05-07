import { Command } from "@tauri-apps/plugin-shell";

export type SessionStatus = "idle" | "connecting" | "connected" | "busy" | "error";
type StatusListener = (status: SessionStatus) => void;

/**
 * Claude Code headless 세션 관리.
 *
 * 공식 문서 권장 패턴 사용:
 * - 첫 호출: `claude -p "prompt" --bare --output-format json --allowedTools "Read,Write,Bash" --dangerously-skip-permissions`
 * - 이후: `claude -p "prompt" --resume <session_id>` 로 컨텍스트 유지
 *
 * stream-json 상주 프로세스 대신, 매 호출마다 프로세스를 spawn하되 세션을 이어감.
 * --bare로 hooks/MCP 건너뛰어 빠른 시작.
 */
class ClaudeSession {
  private status: SessionStatus = "idle";
  private sessionId: string | null = null;
  private claudePath: string = "";
  private listeners: StatusListener[] = [];

  onStatusChange(listener: StatusListener): () => void {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  private setStatus(s: SessionStatus) {
    this.status = s;
    this.listeners.forEach(l => l(s));
  }

  getStatus(): SessionStatus { return this.status; }
  getSessionId(): string | null { return this.sessionId; }
  isConnected(): boolean { return this.status === "connected" || this.status === "busy"; }

  async start(claudePath: string): Promise<void> {
    if (this.status === "connecting" || this.status === "connected" || this.status === "busy") return;
    this.setStatus("connecting");
    this.claudePath = claudePath;

    // 초기 핑으로 세션 ID 획득
    try {
      const result = await this.runClaude("OK", false);
      console.log("[claudeSession] init response:", result.text?.slice(0, 100));
      if (result.sessionId) {
        this.sessionId = result.sessionId;
        this.setStatus("connected");
        console.log("[claudeSession] connected, session:", this.sessionId);
      } else {
        throw new Error("session_id를 받지 못함");
      }
    } catch (e) {
      this.setStatus("error");
      throw e;
    }
  }

  async sendPrompt(prompt: string, _timeoutMs = 300000): Promise<string> {
    if (this.status !== "connected") {
      throw new Error(`Claude 세션이 연결되지 않았습니다 (상태: ${this.status})`);
    }
    this.setStatus("busy");
    try {
      const result = await this.runClaude(prompt, true);
      this.setStatus("connected");
      return result.text || "";
    } catch (e) {
      this.setStatus("connected"); // 에러 후에도 세션은 유지
      throw e;
    }
  }

  private runClaude(prompt: string, _useResume: boolean): Promise<{ text: string; sessionId: string | null }> {
    return new Promise((resolve, reject) => {
      // Node에서 spawn(비동기)으로 claude 실행 — execFileSync 타임아웃 문제 회피
      const nodeScript = `
const { spawn, execSync } = require('child_process');
const fs = require('fs');

function findClaude() {
  const candidates = [
    ${JSON.stringify(this.claudePath)},
    process.env.HOME + '/.local/bin/claude',
    '/usr/local/bin/claude',
    '/opt/homebrew/bin/claude',
    '/Applications/cmux.app/Contents/Resources/bin/claude',
  ].filter(Boolean);
  for (const p of candidates) { try { if (fs.existsSync(p)) return p; } catch {} }
  try { return execSync('which claude', { encoding: 'utf8' }).trim(); } catch {}
  return 'claude';
}

const claudeCmd = findClaude();
const child = spawn(claudeCmd, [
  '-p', ${JSON.stringify(prompt)},
  '--output-format', 'json',
  '--dangerously-skip-permissions',
  '--allowedTools', 'Read,Write,Bash',
], { stdio: ['ignore', 'pipe', 'pipe'] });

child.stdout.on('data', (d) => process.stdout.write(d));
child.stderr.on('data', (d) => process.stderr.write(d));
child.on('close', (code) => process.exit(code || 0));
child.on('error', (e) => { process.stderr.write(e.message); process.exit(1); });
`;

      const cmd = Command.create("node", ["-e", nodeScript]);
      let stdout = "";
      let stderr = "";

      cmd.stdout.on("data", (chunk: string) => { stdout += chunk; });
      cmd.stderr.on("data", (chunk: string) => { stderr += chunk; });

      cmd.on("close", (data: { code: number | null }) => {
        if (data.code === 0 || data.code === null) {
          try {
            const json = JSON.parse(stdout.trim());
            resolve({
              text: json.result || "",
              sessionId: json.session_id || null,
            });
          } catch {
            resolve({ text: stdout.trim(), sessionId: null });
          }
        } else {
          reject(new Error(stderr.trim() || `exit ${data.code}`));
        }
      });

      cmd.on("error", (err: string) => reject(new Error(err)));
      cmd.spawn().catch((e: unknown) => reject(new Error(String(e))));
    });
  }

  async stop(): Promise<void> {
    this.sessionId = null;
    this.setStatus("idle");
  }
}

export const claudeSession = new ClaudeSession();
