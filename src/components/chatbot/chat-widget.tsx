import { useState, type FormEvent } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqDataset, searchFaq, type FaqEntry } from "@/data/faq";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  action?: { label: string; href: string } | undefined;
};

const FALLBACK_TEXT =
  "I don't have an answer for that yet. Try asking about the venue, dates, registration, fees, sponsorship or the hackathon — or use the Register section for anything else.";

const QUICK_QUESTIONS: Array<{ label: string; entryId: string }> = [
  { label: "Venue & directions", entryId: "venue" },
  { label: "How do I register?", entryId: "register-org" },
  { label: "Hackathon fee", entryId: "fee-hackathon" },
  { label: "Sponsorship", entryId: "sponsorship" },
];

function entryToMessage(entry: FaqEntry): Message {
  return {
    id: `${entry.id}-${Date.now()}`,
    role: "bot",
    text: entry.answer,
    action: entry.action,
  };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "bot",
      text: "Hi! I'm the Navonmesh Assistant. Ask me about the venue, dates, registration, fees, sponsorship or the hackathon.",
    },
  ]);

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    const match = searchFaq(trimmed);
    const botMessage: Message = match
      ? entryToMessage(match)
      : { id: `b-${Date.now()}`, role: "bot", text: FALLBACK_TEXT };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  function handleQuickQuestion(entryId: string) {
    const entry = faqDataset.find((e) => e.id === entryId);
    if (!entry) return;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: entry.question },
      entryToMessage(entry),
    ]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[480px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-night-foreground/10 bg-night-surface shadow-night">
          <div className="flex items-center justify-between border-b border-night-foreground/10 bg-night-deep px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-signal text-paper">
                <Bot className="size-4" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-night-foreground">
                  Navonmesh Assistant
                </p>
                <p className="text-xs text-night-foreground/50">Venue, registration & more</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-7 cursor-pointer place-items-center rounded-full text-night-foreground/60 transition-colors hover:bg-night-foreground/10 hover:text-night-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-signal text-paper"
                      : "rounded-bl-sm bg-night text-night-foreground/85"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.action && (
                    <a
                      href={message.action.href}
                      target={message.action.href.startsWith("http") ? "_blank" : undefined}
                      rel={message.action.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-2 inline-block rounded-full bg-night-foreground/10 px-3 py-1 text-xs font-semibold text-tech transition-colors hover:bg-night-foreground/20"
                    >
                      {message.action.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-night-foreground/10 px-3 py-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.entryId}
                type="button"
                onClick={() => handleQuickQuestion(q.entryId)}
                className="cursor-pointer rounded-full border border-night-foreground/15 px-2.5 py-1 text-xs text-night-foreground/70 transition-colors hover:border-tech hover:text-tech"
              >
                {q.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-night-foreground/10 p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="border-night-foreground/20 bg-night text-sm text-night-foreground placeholder:text-night-foreground/40"
            />
            <Button
              type="submit"
              size="icon"
              disabled={input.trim().length === 0}
              className="shrink-0 rounded-full bg-signal text-paper hover:bg-signal/90"
              aria-label="Send"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="event-shine grid size-14 cursor-pointer place-items-center rounded-full bg-signal text-paper shadow-signal transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
