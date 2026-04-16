import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const SESSION_STORAGE_KEY = "plastic-flow-chat-session-id";
const HISTORY_STORAGE_KEY = "plastic-flow-chat-history";
const MAX_HISTORY = 20;
const RATE_LIMIT_MS = 2000;
const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Здравствуйте. Я инженер-консультант ООО СЗПК «Пласт-Металл Про». Опишите задачу, рабочую среду, температуру, объём и давление. Я предложу подходящее оборудование или укажу, какие данные необходимо уточнить.",
};

function cleanMarkers(text: string) {
  return text.replace(/^\[(LEAD|KP:[^\]]+|ESCALATE:[^\]]+)\]\s*$/gm, "").trim();
}

function clampMessages(messages: ChatMessage[]) {
  return messages.slice(-MAX_HISTORY);
}

function getSessionId() {
  if (typeof window === "undefined") {
    return "server-session";
  }

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated = window.crypto?.randomUUID?.() ?? `session-${Date.now()}`;
  window.localStorage.setItem(SESSION_STORAGE_KEY, generated);
  return generated;
}

function getStoredMessages() {
  if (typeof window === "undefined") {
    return [WELCOME_MESSAGE];
  }

  const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!raw) {
    return [WELCOME_MESSAGE];
  }

  try {
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return clampMessages(parsed);
    }
  } catch {
    return [WELCOME_MESSAGE];
  }

  return [WELCOME_MESSAGE];
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => getStoredMessages());
  const [sessionId] = useState(() => getSessionId());
  const [streaming, setStreaming] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [lastSentAt, setLastSentAt] = useState(0);

  const endRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(clampMessages(messages)));
    }
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streaming, showLeadForm]);

  function updateAssistantMessage(chunk: string) {
    setMessages((current) => {
      const next = [...current];
      const cleanedChunk = cleanMarkers(chunk);
      const lastMessage = next[next.length - 1];

      if (!lastMessage || lastMessage.role !== "assistant") {
        next.push({ role: "assistant", content: cleanedChunk });
        return clampMessages(next);
      }

      lastMessage.content = cleanMarkers(`${lastMessage.content}${cleanedChunk}`);
      return clampMessages(next);
    });
  }

  function setAssistantFallback(text: string) {
    setMessages((current) => {
      const next = [...current];
      const cleanedText = cleanMarkers(text);
      const lastMessage = next[next.length - 1];

      if (!lastMessage || lastMessage.role !== "assistant") {
        next.push({ role: "assistant", content: cleanedText });
        return clampMessages(next);
      }

      lastMessage.content = cleanedText;
      return clampMessages(next);
    });
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || streaming) {
      return;
    }

    const now = Date.now();
    if (now - lastSentAt < RATE_LIMIT_MS) {
      return;
    }

    setLastSentAt(now);
    setStreaming(true);
    setShowLeadForm(false);

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setMessages((current) => clampMessages([...current, userMessage, { role: "assistant", content: "" }]));
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          session_id: sessionId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to start chat stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const eventChunk of events) {
          if (!eventChunk.trim()) {
            continue;
          }

          let eventName = "message";
          let data = "";

          for (const line of eventChunk.split("\n")) {
            if (line.startsWith("event:")) {
              eventName = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              data += line.slice(5).trimStart();
            }
          }

          if (!data) {
            continue;
          }

          if (eventName === "lead") {
            setShowLeadForm(true);
            continue;
          }

          if (eventName === "kp" || eventName === "escalate") {
            continue;
          }

          updateAssistantMessage(data);
        }
      }
    } catch {
      setAssistantFallback("Не удалось получить ответ. Повторите запрос позже.");
    } finally {
      setStreaming(false);
    }
  }

  async function submitLead() {
    if (!leadName.trim() || !leadPhone.trim()) {
      return;
    }

    const lastUserMessage = [...messagesRef.current].reverse().find((message) => message.role === "user")?.content ?? "";

    await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
        name: leadName.trim(),
        phone: leadPhone.trim(),
        email: leadEmail.trim(),
        query_summary: lastUserMessage,
        chat_history: messagesRef.current,
      }),
    });

    setMessages((current) =>
      clampMessages([
        ...current,
        {
          role: "assistant",
          content: "Заявка принята. Специалист свяжется с Вами после обработки запроса.",
        },
      ]),
    );
    setShowLeadForm(false);
    setLeadName("");
    setLeadPhone("");
    setLeadEmail("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <Card className="flex h-[550px] w-[calc(100vw-2rem)] max-w-[400px] flex-col border-blue-200 shadow-2xl">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b bg-blue-600 px-4 py-3 text-white">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold leading-snug">
                Пласт-Металл Про / Инженер-консультант
              </CardTitle>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-blue-500 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col gap-3 p-0">
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="space-y-3">
                {messages.map((message, index) => {
                  const isStreamingMessage = streaming && index === messages.length - 1 && message.role === "assistant";

                  return (
                    <div
                      key={`${message.role}-${index}`}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900",
                        )}
                      >
                        {message.content || (isStreamingMessage ? "" : " ")}
                        {isStreamingMessage && <span className="ml-1 inline-block animate-pulse">|</span>}
                      </div>
                    </div>
                  );
                })}

                {showLeadForm && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                    <p className="mb-3 text-sm font-medium text-slate-900">Оставьте контакты для связи с инженером</p>
                    <div className="space-y-2">
                      <Input placeholder="Имя" value={leadName} onChange={(event) => setLeadName(event.target.value)} />
                      <Input placeholder="Телефон" value={leadPhone} onChange={(event) => setLeadPhone(event.target.value)} />
                      <Input placeholder="Email" value={leadEmail} onChange={(event) => setLeadEmail(event.target.value)} />
                      <Button type="button" className="w-full" onClick={submitLead}>
                        Отправить заявку
                      </Button>
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>
            </ScrollArea>

            <div className="border-t px-4 py-3">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  placeholder="Опишите задачу"
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                  disabled={streaming}
                />
                <Button type="button" size="icon" onClick={() => void sendMessage()} disabled={streaming || !input.trim()}>
                  {streaming ? <Loader2 className="animate-spin" /> : <Send />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          type="button"
          size="icon"
          className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
