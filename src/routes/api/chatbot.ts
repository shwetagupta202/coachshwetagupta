import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ChatBodySchema = z.object({
  message: z.string().min(1).max(4000),
  sessionId: z.string().min(1).max(128),
});

/**
 * Proxies chat messages from the lower-corner widget to the n8n
 * webhook URL so the browser never exposes the endpoint directly
 * and CORS issues are avoided.
 */
export const Route = createFileRoute("/api/chatbot")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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

        const webhookUrl =
          "https://n8n.coachshwetagupta.com/webhook/1e36aa33-fe60-4eac-a4a9-e9db0e60bbc5/chat";

        const upstream = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, sessionId }),
        });

        const raw = await upstream.text();

        if (!upstream.ok) {
          return new Response(`Webhook error: ${raw}`, { status: 502 });
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
            (typeof obj.output === "string" && obj.output) ||
            (typeof obj.response === "string" && obj.response) ||
            (typeof obj.message === "string" && obj.message) ||
            (typeof obj.text === "string" && obj.text) ||
            (typeof obj.answer === "string" && obj.answer) ||
            (typeof obj.textResponse === "string" && obj.textResponse) ||
            (typeof obj.reply === "string" && obj.reply) ||
            "";
          reply = candidate || raw;
        }

        return Response.json({ reply, sessionId });
      },
    },
  },
});
