import React, { useState } from 'react';
import { X, Languages, ArrowRightLeft, Volume2, Copy, Check, Sparkles, Loader2, Lock, Crown } from 'lucide-react';
import { speechService } from '../../utils/speech';
import { UserProfile } from '../../types';

interface TranslatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

export const TranslatorModal: React.FC<TranslatorModalProps> = ({ 
  isOpen, 
  onClose,
  currentUser,
  onRequestAuth
}) => {
  const [inputText, setInputText] = useState('我喜欢在 Hoài Ngô 学习汉语。');
  const [sourceLang, setSourceLang] = useState<'zh' | 'vi'>('zh');
  const [translatedText, setTranslatedText] = useState('Tôi thích học tiếng Hán tại Hoài Ngô.');
  const [pinyinResult, setPinyinResult] = useState('Wǒ xǐhuan zài Hoài Ngô xuéxí Hànyǔ.');
  const [hanziBreakdown, setHanziBreakdown] = useState<Array<{ char: string; pinyin: string; hanViet: string; meaning: string }>>([
    { char: '我', pinyin: 'wǒ', hanViet: 'Ngã', meaning: 'Tôi, mình' },
    { char: '喜', pinyin: 'xǐ', hanViet: 'Hỉ', meaning: 'Vui mừng, thích' },
    { char: '欢', pinyin: 'huan', hanViet: 'Hoan', meaning: 'Hoan hỉ, thích' },
    { char: '在', pinyin: 'zài', hanViet: 'Tại', meaning: 'Ở, tại' },
    { char: '学', pinyin: 'xué', hanViet: 'Học', meaning: 'Học tập' },
    { char: '习', pinyin: 'xí', hanViet: 'Tập', meaning: 'Luyện tập' },
    { char: '汉', pinyin: 'hàn', hanViet: 'Hán', meaning: 'Chữ Hán, tiếng Trung' },
    { char: '语', pinyin: 'yǔ', hanViet: 'Ngữ', meaning: 'Ngôn ngữ' },
  ]);
  const [translateCount, setTranslateCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    if (!currentUser && translateCount >= 2) {
      onRequestAuth();
      return;
    }

    setIsLoading(true);
    setTranslateCount(prev => prev + 1);

    try {
      const res = await fetch('/api/gemini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          from: sourceLang === 'zh' ? 'Tiếng Trung' : 'Tiếng Việt',
          to: sourceLang === 'zh' ? 'Tiếng Việt' : 'Tiếng Trung'
        })
      });
      const data = await res.json();
      if (data.translation) {
        setTranslatedText(data.translation);
        if (data.pinyin) setPinyinResult(data.pinyin);
        if (data.hanziBreakdown && Array.isArray(data.hanziBreakdown)) {
          setHanziBreakdown(data.hanziBreakdown);
        }
      }
    } catch (e) {
      console.error(e);
      setTranslatedText('Dịch mẫu tự động: ' + inputText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(prev => prev === 'zh' ? 'vi' : 'zh');
    const temp = inputText;
    setInputText(translatedText);
    setTranslatedText(temp);
  };

  const handleSpeak = (text: string, isZh: boolean) => {
    if (isZh) {
      speechService.speak(text, 0.85);
    } else {
      speechService.speakVietnamese(text);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                Dịch & Tra Cứu Hoài Ngô (Hán Việt & Pinyin)
              </h3>
              <p className="text-xs text-slate-500">
                Phân tích ngữ nghĩa chi tiết từng chữ Hán, phiên âm chuẩn xác
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Translation workspace */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60 space-y-6">
          
          {/* Top language selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                {sourceLang === 'zh' ? '🇨🇳 Tiếng Trung (Hán tự)' : '🇻🇳 Tiếng Việt'}
              </span>

              <button
                onClick={handleSwap}
                className="p-2 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 rounded-xl shadow-xs transition-colors"
                title="Đổi ngôn ngữ"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-bold px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                {sourceLang === 'zh' ? '🇻🇳 Tiếng Việt' : '🇨🇳 Tiếng Trung (Hán tự)'}
              </span>
            </div>

            {!currentUser && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Miễn phí: {Math.max(0, 2 - translateCount)} / 2 lượt thử
              </span>
            )}
          </div>

          {/* 2-Pane Translation Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input Box */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập văn bản tiếng Trung hoặc tiếng Việt cần tra cứu dịch nghĩa..."
                rows={5}
                className="w-full text-sm sm:text-base font-hanzi text-slate-900 border-0 focus:outline-hidden resize-none"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleSpeak(inputText, sourceLang === 'zh')}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleTranslate}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                  <span>Dịch câu</span>
                </button>
              </div>
            </div>

            {/* Output Box */}
            <div className="bg-red-50/30 rounded-2xl p-4 border border-red-200/80 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  {translatedText}
                </div>

                {sourceLang === 'vi' && pinyinResult && (
                  <div className="text-xs font-bold text-red-600 mt-2">
                    Pinyin: {pinyinResult}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-red-100">
                <button
                  onClick={() => handleSpeak(translatedText, sourceLang === 'vi')}
                  className="p-1.5 text-slate-500 hover:text-red-700 rounded-lg hover:bg-red-100"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-red-700 font-semibold px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-red-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Character-by-character Breakdown (Chiết tự từng chữ) */}
          {hanziBreakdown.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>Chiết tự & Hán Việt chi tiết từng chữ:</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {hanziBreakdown.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSpeak(item.char, true)}
                    className="p-2.5 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl cursor-pointer transition-all text-center group"
                  >
                    <div className="font-hanzi text-2xl font-black text-slate-900 group-hover:text-red-700">
                      {item.char}
                    </div>
                    <div className="text-xs font-bold text-red-600">
                      {item.pinyin}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      {item.hanViet}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
