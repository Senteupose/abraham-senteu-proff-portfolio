import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  Globe,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Loader2,
  Cpu,
  Zap,
} from 'lucide-react';

export type ChatRoleMode = 'general' | 'technical' | 'fast';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  modelUsed?: string;
  sources?: { title: string; uri: string }[];
  searchQueries?: string[];
  timestamp: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrefillInquiry: (topic: string) => void;
}

const STARTER_PROMPTS = [
  'Summarize Abraham’s banking operations achievements at Equity Bank Kenya',
  'Explain the UX & technical architecture of the Smart Study Assistant',
  'What is Abraham’s background in AI model evaluation and RLHF ranking?',
  'Search recent Central Bank of Kenya (CBK) digital banking directives',
];

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  onPrefillInquiry,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        'Hello! I am Abraham Pose Senteu’s official AI Portfolio Assistant & Technical Advisor.\n\nI can answer questions regarding his design projects, full-stack software architecture, 5+ years of banking operations at Equity Bank Kenya, or his international AI data evaluation work. How can I help you today?',
      modelUsed: 'gemini-3.8-flash',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleMode, setRoleMode] = useState<ChatRoleMode>('general');
  const [useSearchGrounding, setUseSearchGrounding] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content:
          'Conversation reset. Feel free to ask any question regarding Abraham’s design deliverables, software architecture, or career milestones!',
        modelUsed: 'gemini-3.8-flash',
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          roleMode,
          useSearchGrounding,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text,
        modelUsed: data.modelUsed,
        sources: data.sources,
        searchQueries: data.searchQueries,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content:
          'I encountered a momentary connection issue. Please verify your connection or try again. You can also reach Abraham directly via sentepose@gmail.com.',
        timestamp: 'Error',
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-sm p-3 sm:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[88vh] bg-[#FAF9F6] border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Chat Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-white flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 id="ai-chat-title" className="text-sm font-bold text-zinc-950 font-display flex items-center gap-2">
                  <span>Abraham’s AI Representative</span>
                  <span className="text-[11px] font-mono-tabular font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live
                  </span>
                </h3>
                <p className="text-xs text-zinc-500">
                  Powered by Gemini with real-time Google Search Grounding
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close AI chat modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Role Mode and Search Grounding Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs">
            {/* Role Mode Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
              <button
                type="button"
                onClick={() => setRoleMode('general')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  roleMode === 'general'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                title="General tasks using gemini-3.8-flash"
              >
                <Bot className="w-3.5 h-3.5 text-blue-600" />
                <span>General (3.8-Flash)</span>
              </button>

              <button
                type="button"
                onClick={() => setRoleMode('technical')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  roleMode === 'technical'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                title="Complex architectural reasoning using gemini-4-argon"
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>Technical (4-Argon)</span>
              </button>

              <button
                type="button"
                onClick={() => setRoleMode('fast')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  roleMode === 'fast'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
                title="Fast tasks using gemini-3.1-flash-lite"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Fast (3.1-Lite)</span>
              </button>
            </div>

            {/* Google Search Grounding Toggle */}
            <button
              type="button"
              onClick={() => setUseSearchGrounding(!useSearchGrounding)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                useSearchGrounding
                  ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${useSearchGrounding ? 'text-blue-600' : 'text-zinc-400'}`} />
              <span>Google Search Grounding: {useSearchGrounding ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isUser ? 'bg-zinc-900 text-white' : 'bg-blue-600 text-white'
                  }`}
                >
                  {isUser ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2 min-w-0">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-zinc-900 text-white rounded-tr-xs'
                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.content}</p>

                    {/* Google Search Grounding Sources */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-zinc-100 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 font-mono-tabular">
                          <Globe className="w-3 h-3 text-blue-600" />
                          <span>Google Search Sources ({m.sources.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {m.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-[11px] text-zinc-700 hover:text-blue-600 transition-colors"
                            >
                              <span className="truncate max-w-[180px]">{src.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bubble Footer & Metadata */}
                  {!isUser && (
                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono-tabular px-1">
                      <span>{m.modelUsed || 'gemini'}</span>
                      <span>·</span>
                      <span>{m.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.content)}
                        className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 transition-colors ml-auto cursor-pointer"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onPrefillInquiry(m.content.slice(0, 80));
                          onClose();
                        }}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Prefill Inquiry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-zinc-600 text-xs sm:text-sm flex items-center gap-2 shadow-xs">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span>
                  {roleMode === 'technical'
                    ? 'Executing technical reasoning (gemini-4-argon)...'
                    : roleMode === 'fast'
                    ? 'Synthesizing response (gemini-3.1-flash-lite)...'
                    : useSearchGrounding
                    ? 'Consulting Gemini with Google Search Grounding...'
                    : 'Thinking...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts */}
        {messages.length <= 2 && (
          <div className="px-6 pb-2 pt-1 border-t border-zinc-100 bg-[#FAF9F6]">
            <p className="text-[11px] font-semibold text-zinc-500 mb-1.5 font-mono-tabular">
              Suggested Questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left text-xs px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span className="truncate max-w-[260px] sm:max-w-none">{prompt}</span>
                  <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Input Box */}
        <div className="p-4 bg-white border-t border-zinc-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about design systems, banking operations, AI projects, or CBK compliance..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:border-blue-600 text-zinc-900 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5 text-xs font-semibold shrink-0 h-[42px]"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono-tabular pt-2">
            <span>Press Enter to send · Shift + Enter for new line</span>
            <span>Grounding: {useSearchGrounding ? 'Google Search Active' : 'Off'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
