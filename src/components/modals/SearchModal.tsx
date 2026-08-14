import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Volume2, ArrowRight, BookOpen } from 'lucide-react';
import { HSK_WORDS_SAMPLE, RADICALS_SAMPLE, COMMON_SENTENCES } from '../../data/chineseData';
import { ChineseWord } from '../../types';
import { speechService } from '../../utils/speech';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord: (word: ChineseWord) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectWord
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matchedWords = HSK_WORDS_SAMPLE.filter((w) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      w.hanzi.includes(q) ||
      w.pinyin.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      w.hanViet.toLowerCase().includes(q)
    );
  });

  const matchedRadicals = RADICALS_SAMPLE.filter((r) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return r.radical.includes(q) || r.hanViet.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q);
  });

  const handleSpeak = (text: string) => {
    speechService.speak(text, 0.85);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-red-100 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm chữ Hán, Pinyin, Hán Việt, ý nghĩa..."
            className="w-full text-base sm:text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          
          {/* Words section */}
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-400 px-2 mb-2 tracking-wider">
              Từ vựng HSK ({matchedWords.length})
            </div>

            <div className="space-y-2">
              {matchedWords.slice(0, 8).map((w) => (
                <div
                  key={w.id}
                  onClick={() => {
                    onSelectWord(w);
                    onClose();
                  }}
                  className="p-3 bg-white hover:bg-red-50/70 rounded-2xl border border-slate-200/80 hover:border-red-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-hanzi text-2xl font-bold text-slate-900 group-hover:text-red-600">
                      {w.hanzi}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-600">{w.pinyin}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-red-50 text-red-700 border border-red-100 rounded font-semibold">
                          HSK {w.level}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">
                        {w.meaning} • {w.hanViet}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(w.hanzi);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radicals section */}
          {matchedRadicals.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400 px-2 mb-2 tracking-wider">
                Bộ thủ ({matchedRadicals.length})
              </div>
              <div className="grid grid-cols-2 gap-2">
                {matchedRadicals.map((r) => (
                  <div
                    key={r.number}
                    className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2"
                  >
                    <span className="font-hanzi text-xl font-bold text-red-600">{r.radical}</span>
                    <div className="text-xs">
                      <div className="font-bold text-slate-800">{r.hanViet}</div>
                      <div className="text-slate-500 text-[11px]">{r.meaning}</div>
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
