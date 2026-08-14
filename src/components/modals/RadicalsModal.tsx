import React, { useState } from 'react';
import { X, Grid, Search, Volume2, Sparkles, BookOpen, Lightbulb, Lock, Crown } from 'lucide-react';
import { RADICALS_SAMPLE } from '../../data/chineseData';
import { Radical, UserProfile } from '../../types';
import { speechService } from '../../utils/speech';

interface RadicalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

export const RadicalsModal: React.FC<RadicalsModalProps> = ({ 
  isOpen, 
  onClose,
  currentUser,
  onRequestAuth
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStroke, setSelectedStroke] = useState<number | null>(null);
  const [activeRadical, setActiveRadical] = useState<Radical>(RADICALS_SAMPLE[0]);

  if (!isOpen) return null;

  const filteredRadicals = RADICALS_SAMPLE.filter((rad) => {
    const matchesStroke = selectedStroke === null || rad.strokes === selectedStroke;
    if (!searchQuery.trim()) return matchesStroke;
    const q = searchQuery.toLowerCase();
    return (
      (rad.radical.includes(q) ||
       rad.pinyin.toLowerCase().includes(q) ||
       rad.hanViet.toLowerCase().includes(q) ||
       rad.meaning.toLowerCase().includes(q)) &&
      matchesStroke
    );
  });

  const handleSpeak = (text: string) => {
    speechService.speak(text.split(' ')[0], 0.85);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                214 Bộ Thủ Hán Tự & Chiết Tự Hoài Ngô
                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full border border-red-200">
                  Cơ bản đến nâng cao
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Gốc rễ nhận diện chữ Hán, số nét, âm Hán Việt và mẹo ghi nhớ nhanh
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

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
          {/* Stroke count filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedStroke(null)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedStroke === null ? 'bg-red-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả nét
            </button>
            {[1, 2, 3, 4, 5, 6, 7].map((stroke) => (
              <button
                key={stroke}
                onClick={() => setSelectedStroke(stroke)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedStroke === stroke ? 'bg-red-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {stroke} nét
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm bộ thủ, âm Hán Việt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Content: 2 Columns (Left Grid List, Right Detail Panel) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-slate-50/60">
          
          {/* Left Grid List */}
          <div className="md:col-span-7 p-6 overflow-y-auto border-r border-slate-200/80">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredRadicals.map((rad, idx) => {
                const isLocked = !currentUser && idx >= 2;

                return (
                  <div
                    key={rad.number}
                    onClick={() => {
                      if (isLocked) {
                        onRequestAuth();
                        return;
                      }
                      setActiveRadical(rad);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 ease-out will-change-transform flex flex-col justify-between ${
                      isLocked
                        ? 'bg-slate-50/80 border-dashed border-red-200 hover:border-red-400 hover:-translate-y-0.5'
                        : activeRadical.number === rad.number
                        ? 'bg-red-50 border-red-400 shadow-md ring-2 ring-red-300 -translate-y-0.5'
                        : 'bg-white border-slate-200 hover:border-red-300 hover:shadow-md hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400">
                        #{rad.number} • {rad.strokes} nét
                      </span>
                      {isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-red-500" />
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(rad.radical);
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 rounded"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="font-hanzi text-3xl font-black text-slate-900 my-1">
                      {rad.radical}
                    </div>

                    <div className="text-xs font-bold text-red-700">
                      {rad.hanViet} <span className="text-[10px] text-slate-500 font-normal">({rad.pinyin})</span>
                    </div>

                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {isLocked ? '🔒 Đăng nhập để mở khóa' : rad.meaning}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="md:col-span-5 p-6 bg-white overflow-y-auto space-y-5">
            <div className="text-center p-6 bg-red-50/60 rounded-3xl border border-red-100 space-y-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200">
                Bộ thủ số #{activeRadical.number} • {activeRadical.strokes} nét
              </span>

              <div className="font-hanzi text-6xl font-black text-slate-900 pt-2">
                {activeRadical.radical}
              </div>

              <div className="text-xl font-bold text-red-700">
                {activeRadical.hanViet} • {activeRadical.pinyin}
              </div>

              <div className="text-sm font-semibold text-slate-700">
                Ý nghĩa: {activeRadical.meaning}
              </div>

              <button
                onClick={() => handleSpeak(activeRadical.radical)}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-full text-xs font-bold shadow-md shadow-red-500/20"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe phát âm</span>
              </button>
            </div>

            {/* Mẹo ghi nhớ (Mnemonic) */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Mẹo nhớ chữ Hán (Chiết tự)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeRadical.mnemonic}
              </p>
            </div>

            {/* Sample Characters with this radical */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Chữ Hán tiêu biểu chứa bộ này:
              </h4>
              <div className="space-y-2">
                {activeRadical.examples.map((ex, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-hanzi text-2xl font-bold text-slate-900">
                        {ex.char}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-red-700">{ex.pinyin}</div>
                        <div className="text-xs text-slate-600">{ex.meaning}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(ex.char)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
