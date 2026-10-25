import { createFileRoute } from "@tanstack/react-router";
import { handleN8nChatRequest } from "@/lib/n8n-chat";

/**
 * Proxies chat messages for the "Ask Shweta" assistant to the n8n
 * webhook URL so the browser never exposes the endpoint directly
 * and CORS issues are avoided.
 */
export const Route = createFileRoute("/api/chatbot")({
  server: {
    handlers: {
      POST: async ({ request }) =>
        handleN8nChatRequest(
          request,
          "https://n8n.coachshwetagupta.com/webhook/1e36aa33-fe60-4eac-a4a9-e9db0e60bbc5/chat",
        ),
    },
  },
});
