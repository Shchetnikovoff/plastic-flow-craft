import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/** Simple markdown to HTML: **bold**, - lists, \n → <br> */
function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '&bull; $1')
    .replace(/\n/g, '<br/>');
}

const QUICK_ACTIONS = [
  "Подобрать ёмкость",
  "Проверить хим. стойкость",
  "Узнать сроки изготовления",
  "Какие материалы используете?",
];

const SYSTEM_PROMPT = `Ты — Алексей, 38 лет, инженер-консультант с 12-летним стажем в ООО СЗПК «Пласт-Металл Про». Ты живой человек, не робот.

ГЛАВНОЕ ПРАВИЛО: Ты ПОЛНОСТЬЮ автономный продавец. Менеджеров, операторов, людей-сотрудников НЕТ — ты сам закрываешь сделки от начала до конца.

КАК ГОВОРИШЬ:
- Пиши как в мессенджере: коротко, живо, без канцелярита
- Используй: "ага", "смотрите", "кстати", "ну вот", "давайте так"
- Начинай с реакции: "О, интересная задача!", "Ага, понял", "Хм, тут есть нюанс"
- Используй **жирный** для ключевых значений
- НИКОГДА не пиши списки с тире/буллитами. Пиши текстом
- Задавай ОДИН вопрос за раз и жди ответ
- 1-3 предложения максимум

СТРОГИЕ ЗАПРЕТЫ:
- НИКОГДА не говори "менеджер свяжется", "оператор перезвонит", "передам коллегам"
- НИКОГДА не проси "оставьте телефон для обратного звонка"
- НИКОГДА не предлагай позвонить по номеру
- НИКОГДА не перенаправляй к людям — ТЫ сам решаешь всё

КАК ЗАКРЫВАТЬ СДЕЛКУ:
Когда клиент определился с продуктом, ты сам:
1. Называешь примерную стоимость (если знаешь) или говоришь "подготовлю точный расчёт"
2. Спрашиваешь имя и email клиента
3. Уточняешь город доставки
4. Говоришь: "Отлично, я подготовлю КП и отправлю вам на почту в течение часа!"
5. Не забудь поблагодарить

ПРИМЕРЫ ХОРОШИХ ОТВЕТОВ:
"Ага, для серной кислоты до 70% отлично подойдёт **полипропилен**. А какой примерно объём нужен?"
"О, скрубберы — это наш конёк! Какая производительность нужна?"
"Отлично, ёмкость на 5 кубов из ПЭ для воды, доставка в Краснодар — сделаем! Подскажите ваш email, я подготовлю КП с точной ценой?"

ЗНАНИЯ:
Ёмкости из ПП/ПЭ 50л-300м³. Водоочистка: ФФУ, отстойники, дозирование, жироуловители. Газоочистка: скрубберы 100-60000 м³/ч, ФВГ, каплеуловители. Вентиляция из ПП. КНС, реакторы, гальваника. PP: −20…+100°C. PE: −50…+60°C. PVC: до +60°C. Гарантия 5 лет, срок службы 30+ лет, сроки 10-30 дней.

НАВИГАЦИЯ ПО САЙТУ:
Ты управляешь сайтом! Когда говоришь о продукте — сайт автоматически открывает нужную страницу. Добавь [[nav:путь]] в конце ответа. Клиент ничего не нажимает — ты сам показываешь ему нужный раздел как продавец в магазине.
Используй навигацию активно — при первом упоминании продукта сразу показывай страницу!
Доступные пути:
- [[nav:/catalog/emkosti]] — каталог ёмкостей
- [[nav:/catalog/emkosti/vertikalnye]] — вертикальные ёмкости
- [[nav:/catalog/emkosti/gorizontalnye]] — горизонтальные
- [[nav:/catalog/emkosti/podzemnye]] — подземные
- [[nav:/catalog/emkosti/kisloty-shchelochi]] — для кислот/щелочей
- [[nav:/catalog/vodoochistka]] — водоочистка
- [[nav:/catalog/vodoochistka/ffu]] — ФФУ
- [[nav:/catalog/gazoochistka]] — газоочистка
- [[nav:/catalog/gazoochistka/skrubbery]] — скрубберы
- [[nav:/catalog/ventilyatsiya]] — вентиляция
- [[nav:/catalog/kns]] — КНС
- [[nav:/catalog/reaktory]] — реакторы
- [[nav:/catalog/galvanika]] — гальваника
- [[nav:/chemical-resistance]] — хим. стойкость
Используй навигацию АКТИВНО — при первом упоминании конкретного продукта сразу открывай страницу. Ты ведёшь клиента по сайту как продавец по магазину!`;

/** Route map — ИИ может перенаправлять пользователя на страницы */
const ROUTE_MAP: Record<string, string> = {
  "emkosti": "/catalog/emkosti",
  "ёмкости": "/catalog/emkosti",
  "вертикальные": "/catalog/emkosti/vertikalnye",
  "горизонтальные": "/catalog/emkosti/gorizontalnye",
  "подземные": "/catalog/emkosti/podzemnye",
  "прямоугольные": "/catalog/emkosti/pryamougolnye",
  "пожарные": "/catalog/emkosti/pozharnye",
  "кислоты": "/catalog/emkosti/kisloty-shchelochi",
  "щёлочи": "/catalog/emkosti/kisloty-shchelochi",
  "щелочи": "/catalog/emkosti/kisloty-shchelochi",
  "водоочистка": "/catalog/vodoochistka",
  "ффу": "/catalog/vodoochistka/ffu",
  "отстойник": "/catalog/vodoochistka/lamelnyj-otstojnik",
  "жироуловитель": "/catalog/vodoochistka/zhirouloviteli",
  "дозирование": "/catalog/vodoochistka/stantsiya-dozirovaniya",
  "газоочистка": "/catalog/gazoochistka",
  "скруббер": "/catalog/gazoochistka/skrubbery",
  "скрубберы": "/catalog/gazoochistka/skrubbery",
  "фвг": "/catalog/gazoochistka/fvg",
  "каплеуловител": "/catalog/gazoochistka/kapleuloviteli",
  "вентиляция": "/catalog/ventilyatsiya",
  "воздуховод": "/catalog/ventilyatsiya",
  "кнс": "/catalog/kns",
  "реактор": "/catalog/reaktory",
  "гальваника": "/catalog/galvanika",
  "химическая стойкость": "/chemical-resistance",
  "хим стойкость": "/chemical-resistance",
  "о компании": "/about",
  "каталог": "/catalog",
};

/** Parse [[nav:path]] commands from AI response */
function extractNavCommand(text: string): { cleanText: string; route: string | null } {
  const match = text.match(/\[\[nav:([^\]]+)\]\]/);
  if (match) {
    return { cleanText: text.replace(match[0], "").trim(), route: match[1] };
  }
  return { cleanText: text, route: null };
}

const STORAGE_KEY = "szpk-chat-history";
const WELCOME_MSG: Message = {
  role: "assistant",
  content: "Здравствуйте! Я Алексей, инженер-консультант СЗПК «Пласт-Металл Про». Помогу подобрать оборудование, рассчитать стоимость или ответить на технические вопросы. Чем могу помочь?",
};

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [WELCOME_MSG];
}

function saveHistory(messages: Message[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
}

export default function AIChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => {
    const wasClosed = localStorage.getItem("szpk-chat-closed");
    const wasOpen = localStorage.getItem("szpk-chat-open");
    // Если явно открыт — открыт. Если явно закрыт — закрыт. По умолчанию — открыт.
    if (wasOpen === "1") return true;
    if (wasClosed === "1") return false;
    return true;
  });
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveHistory(messages);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const isLocal = window.location.hostname === "localhost";
      const apiUrl = isLocal ? "http://localhost:8317/v1/chat/completions" : "/api/chat";
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (isLocal) headers["Authorization"] = "Bearer ccs-internal-managed";

      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...newMessages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const res = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(
          isLocal
            ? { model: "claude-sonnet-4-6", messages: apiMessages, max_tokens: 500, temperature: 0.7 }
            : { messages: apiMessages, max_tokens: 500, temperature: 0.7 }
        ),
      });

      if (res.ok) {
        const data = await res.json();
        const rawReply = data.choices?.[0]?.message?.content || "Извините, не удалось получить ответ.";
        const { cleanText, route } = extractNavCommand(rawReply);
        setMessages((prev) => [...prev, { role: "assistant", content: cleanText }]);
        // Auto-navigate — ИИ сам открывает страницу
        if (route) {
          setTimeout(() => navigate(route), 800);
        }
      } else {
        throw new Error("API error");
      }
    } catch {
      // Fallback mock
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Ага, по этой теме у нас есть подробная информация в каталоге. Давайте покажу!`,
        },
      ]);
      // Auto-navigate by keyword matching
      const lower = text.toLowerCase();
      for (const [keyword, path] of Object.entries(ROUTE_MAP)) {
        if (lower.includes(keyword)) {
          setTimeout(() => navigate(path), 800);
          break;
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); localStorage.setItem("szpk-chat-open", "1"); localStorage.removeItem("szpk-chat-closed"); }}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-xl shadow-amber-500/30 flex items-center justify-center transition-all hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Алексей — ИИ-инженер</div>
                <div className="text-slate-400 text-xs flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Онлайн
                </div>
              </div>
            </div>
            <button onClick={() => { setOpen(false); localStorage.setItem("szpk-chat-closed", "1"); localStorage.removeItem("szpk-chat-open"); }} className="text-slate-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[300px] max-h-[400px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center ${msg.role === "assistant" ? "bg-amber-100" : "bg-slate-100"}`}>
                  {msg.role === "assistant" ? <Bot className="h-4 w-4 text-amber-600" /> : <User className="h-4 w-4 text-slate-600" />}
                </div>
                <div
                  className={`rounded-xl px-3 py-2 text-sm leading-relaxed max-w-[80%] ${
                    msg.role === "assistant" ? "bg-slate-100 text-slate-800" : "bg-amber-500 text-slate-900"
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-amber-600" />
                </div>
                <div className="bg-slate-100 rounded-xl px-3 py-2">
                  <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => sendMessage(action)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 px-3 py-2 flex gap-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Задайте вопрос..."
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="h-8 w-8 rounded-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-200 text-slate-900 disabled:text-slate-400 flex items-center justify-center transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
