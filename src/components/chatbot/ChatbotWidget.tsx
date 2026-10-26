import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/components/site/content";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type BotKey = "shweta";

interface BotConfig {
  key: BotKey;
  endpoint: string;
  launcherLabel: string;
  panelTitle: string;
  panelSubtitle: string;
  welcome: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
}

const BOTS: BotConfig[] = [
  {
    key: "shweta",
    endpoint: "/api/chatbot",
    launcherLabel: "Ask Shweta",
    panelTitle: "AI Assistant",
    panelSubtitle: "Ask about Shweta's work",
    welcome:
      "Hi! I'm Shweta's AI assistant. Ask me about AI agents, workshops, coaching, or her book.",
    icon: Bot,
  },
];

function ChatPanel({
  bot,
  sessionId,
  onClose,
}: {
  bot: BotConfig;
  sessionId: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: bot.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(bot.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = (await res.json()) as { reply?: string };
      const reply =
        typeof data.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "Sorry, I didn't catch that. Could you rephrase?";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
        "h-[28rem] w-[min(22rem,calc(100vw-2rem))]",
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-gold text-primary-foreground shadow-glow">
            <bot.icon className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold">{bot.panelTitle}</p>
            <p className="text-xs text-muted-foreground">{bot.panelSubtitle}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onClose}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md",
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex w-full justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.3s]" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border bg-surface/60 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-input bg-background/60 px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Your message"
            maxLength={4000}
          />
          <Button
            size="icon"
            type="submit"
            disabled={loading || !input.trim()}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ChatbotWidget() {
  const [mounted, setMounted] = useState(false);
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `chat-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`,
  );
  const [openBot, setOpenBot] = useState<BotKey | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {openBot && (
        <ChatPanel
          bot={BOTS.find((b) => b.key === openBot)!}
          sessionId={`${sessionId}-${openBot}`}
          onClose={() => setOpenBot(null)}
        />
      )}

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="h-12 rounded-full border-primary/40 bg-background px-4 shadow-card">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <MessageCircle />
            WhatsApp
          </a>
        </Button>
        {BOTS.map((bot) => (
          <Button
            key={bot.key}
            type="button"
            onClick={() => setOpenBot((v) => (v === bot.key ? null : bot.key))}
            className={cn(
              "h-12 rounded-full px-4",
              bot.key === "shweta" && "shadow-glow",
            )}
            aria-label={openBot === bot.key ? `Close ${bot.launcherLabel} chat` : bot.launcherLabel}
            aria-expanded={openBot === bot.key}
          >
            {openBot === bot.key ? <X /> : <bot.icon />}
            {bot.launcherLabel}
          </Button>
        ))}
      </div>
    </div>
  );
}
