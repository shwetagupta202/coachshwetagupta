import { createFileRoute } from "@tanstack/react-router";
import { handleN8nChatRequest } from "@/lib/n8n-chat";

/**
 * Proxies chat messages for the second assistant to its own n8n
 * webhook URL so the browser never exposes the endpoint directly
 * and CORS issues are avoided.
 */
export const Route = createFileRoute("/api/ai-agent-chat")({
  server: {
    handlers: {
      POST: async ({ request }) =>
        handleN8nChatRequest(
          request,
          "https://shwetagupta17oct.app.n8n.cloud/webhook/ed3b43bb-1dbe-4042-a293-3ee3fcefee1b/chat",
        ),
    },
  },
});
