import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, Send, Sparkles, User, Loader2, Volume2, HelpCircle, Lock, Crown } from 'lucide-react';
import { ChatMessage, UserProfile } from '../../types';
import { speechService } from '../../utils/speech';

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

const PRESET_PROMPTS = [
  'Giải thích ngữ pháp câu chữ 把 (bǎ)',
  'Phân tích chiết tự và cách nhớ chữ "爱"',
  'Phân biệt cách dùng "二" và "两"',
  'Mẫu câu gọi món tại nhà hàng Trung Quốc',
  'Cách phân biệt thanh 2 và thanh 3 trong Pinyin',
];

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({ 
  isOpen, 
  onClose,
  currentUser,
  onRequestAuth 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Xin chào bạn! Tôi là **AI Gia sư Tiếng Trung Hoài Ngô** (怀吴 AI 助教). 🎓

Tôi sẵn sàng hỗ trợ bạn 24/7:
- Giải thích ngữ pháp HSK 1 - 6 và HSK 3.0
- Hướng dẫn phân tích chữ Hán, bộ thủ và mẹo nhớ
- Sửa lỗi câu văn và gợi ý cách diễn đạt chuẩn bản xứ
- Luyện đàm thoại theo chủ đề thực tế.

Hôm nay bạn cần trợ giúp kiến thức nào?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [userQueryCount, setUserQueryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim() || isLoading) return;

    if (!currentUser && userQueryCount >= 2) {
      onRequestAuth();
      return;
    }

    setUserQueryCount(prev => prev + 1);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      
      const aiReplyText = data.reply || data.fallback || 'Xin lỗi, tôi chưa thể trả lời lúc này.';
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Tutor Error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Cấu trúc câu chữ "把": Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác. Ví dụ: 我把作业做完了。(Tôi đã làm xong bài tập rồi).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    const chineseChars = text.match(/[\u4e00-\u9fa5]+/g);
    if (chineseChars && chineseChars.length > 0) {
      speechService.speak(chineseChars.join(' '), 0.85);
    } else {
      speechService.speak(text.slice(0, 100), 0.85);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-red-100 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-600 to-rose-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-1.5">
                AI Gia Sư Tiếng Trung Hoài Ngô
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-red-100">Giải đáp ngữ pháp, phát âm, chữ Hán 24/7</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest trial banner */}
        {!currentUser && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-800 font-semibold">
            <span>Hỏi thử miễn phí: {Math.max(0, 2 - userQueryCount)} / 2 câu</span>
            <button
              onClick={onRequestAuth}
              className="text-red-700 font-bold hover:underline"
            >
              Đăng nhập mở khóa vô hạn
            </button>
          </div>
        )}

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 overflow-x-auto flex items-center gap-2">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-semibold rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'} max-w-[88%]`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                  isAi ? 'bg-red-600' : 'bg-slate-800'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isAi 
                    ? 'bg-white text-slate-900 border border-slate-200 rounded-tl-none' 
                    : 'bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-tr-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/50 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="hover:text-red-600 flex items-center gap-1 font-semibold"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Phát âm</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                <span>AI Hoài Ngô đang chuẩn bị giải đáp cho bạn...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Đặt câu hỏi về ngữ pháp, chữ Hán..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-40 text-white rounded-xl shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
