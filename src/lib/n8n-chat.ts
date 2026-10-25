/**
 * Shared server-side proxy for n8n chat webhooks.
 * Kept in a plain module (not *.functions.ts) so it never enters the client bundle.
 */
import { z } from "zod";

export const ChatBodySchema = z.object({
  message: z.string().min(1).max(4000),
  sessionId: z.string().min(1).max(128),
});

export interface N8nChatResult {
  ok: boolean;
  reply: string;
  status: number;
}

export async function proxyN8nChat(
  webhookUrl: string,
  message: string,
  sessionId: string,
): Promise<N8nChatResult> {
  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId, chatInput: message }),
    });
  } catch {
    return {
      ok: true,
      status: 200,
      reply:
        "I'm offline right now — please try again in a little while, or reach Shweta on WhatsApp.",
    };
  }

  const raw = await upstream.text();

  if (!upstream.ok) {
    // The webhook is unreachable or its workflow is inactive upstream.
    // Return a graceful chat reply instead of an error response so the
    // widget degrades cleanly for visitors.
    console.warn(`n8n chat webhook returned ${upstream.status}: ${raw.slice(0, 300)}`);
    return {
      ok: true,
      status: 200,
      reply:
        "I'm offline right now — please try again in a little while, or reach Shweta on WhatsApp.",
    };
  }

  const contentType = upstream.headers.get("content-type") || "";
  let data: unknown = raw;

  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(raw);
    } catch {
      // fall back to the raw text
    }
  }

  let reply = "";
  if (typeof data === "string") {
    reply = data;
  } else if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const candidate =
      (typeof obj["output"] === "string" && obj["output"]) ||
      (typeof obj["response"] === "string" && obj["response"]) ||
      (typeof obj["message"] === "string" && obj["message"]) ||
      (typeof obj["text"] === "string" && obj["text"]) ||
      (typeof obj["answer"] === "string" && obj["answer"]) ||
      (typeof obj["textResponse"] === "string" && obj["textResponse"]) ||
      (typeof obj["reply"] === "string" && obj["reply"]) ||
      "";
    reply = candidate || raw;
  }

  return { ok: true, status: 200, reply };
}

/** Parses the request body and returns the proxy result as a Response. */
export async function handleN8nChatRequest(
  request: Request,
  webhookUrl: string,
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const parseResult = ChatBodySchema.safeParse(body);
  if (!parseResult.success) {
    return new Response("Invalid request body", { status: 400 });
  }

  const { message, sessionId } = parseResult.data;

  try {
    const result = await proxyN8nChat(webhookUrl, message, sessionId);
    if (!result.ok) {
      return new Response(result.reply, { status: result.status });
    }
    return Response.json({ reply: result.reply, sessionId });
  } catch (error) {
    console.error("n8n chat proxy failed:", error);
    return Response.json({
      reply:
        "I'm offline right now — please try again in a little while, or reach Shweta on WhatsApp.",
      sessionId,
    });
  }
}
