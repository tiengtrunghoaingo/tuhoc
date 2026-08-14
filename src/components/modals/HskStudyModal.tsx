import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Volume2, 
  Bookmark, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Search,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  Lock,
  Crown
} from 'lucide-react';
import { HSK_WORDS_SAMPLE } from '../../data/chineseData';
import { ChineseWord, HskLevel, AppSettings, UserProfile } from '../../types';
import { speechService } from '../../utils/speech';

interface HskStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: HskLevel;
  onToggleSaveWord: (word: ChineseWord) => void;
  isSaved: (wordId: string) => boolean;
  settings: AppSettings;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

export const HskStudyModal: React.FC<HskStudyModalProps> = ({
  isOpen,
  onClose,
  initialLevel = 1,
  onToggleSaveWord,
  isSaved,
  settings,
  currentUser,
  onRequestAuth
}) => {
  const [activeLevel, setActiveLevel] = useState<HskLevel>(initialLevel);
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPinyinLocal, setShowPinyinLocal] = useState(settings.showPinyin);

  if (!isOpen) return null;

  const words = HSK_WORDS_SAMPLE.filter(w => {
    const matchLevel = w.level === activeLevel;
    if (!searchQuery.trim()) return matchLevel;
    const q = searchQuery.toLowerCase();
    return (
      (w.hanzi.includes(q) || 
       w.pinyin.toLowerCase().includes(q) || 
       w.meaning.toLowerCase().includes(q) || 
       w.hanViet.toLowerCase().includes(q)) &&
      (matchLevel || true)
    );
  });

  const isCurrentLocked = !currentUser && currentIndex >= 2;
  const currentWord = words[currentIndex % (words.length || 1)] || HSK_WORDS_SAMPLE[0];

  const handleSpeak = (text: string) => {
    setIsPlayingAudio(true);
    speechService.speak(text, settings.speechRate, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleNext = () => {
    if (!currentUser && currentIndex >= 1) {
      // Trying to go beyond 2 free words
      setCurrentIndex(2);
      return;
    }
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % words.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + words.length) % words.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-lg flex items-center gap-1.5 sm:gap-2">
                <span>HSK Hoài Ngô</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full border border-red-200">
                  Cấp {activeLevel}
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Luyện flashcard, phát âm giọng chuẩn Bắc Kinh, ví dụ câu thực tế
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View mode toggle */}
            <div className="bg-slate-200/70 p-0.5 sm:p-1 rounded-xl flex items-center text-[11px] sm:text-xs font-semibold">
              <button
                onClick={() => setViewMode('flashcard')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all min-h-[32px] ${
                  viewMode === 'flashcard' ? 'bg-white text-red-600 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Thẻ
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all min-h-[32px] ${
                  viewMode === 'list' ? 'bg-white text-red-600 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                DS
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Level Navigation Tabs & Search */}
        <div className="px-3 sm:px-6 py-2.5 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {([1, 2, 3, 4, 5, 6] as HskLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveLevel(lvl);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[36px] ${
                  activeLevel === lvl
                    ? 'bg-red-600 text-white shadow-sm shadow-red-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                HSK {lvl}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo chữ Hán, pinyin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          {viewMode === 'flashcard' ? (
            <div className="max-w-xl mx-auto flex flex-col items-center">
              
              {/* Progress counter */}
              <div className="w-full flex items-center justify-between text-xs text-slate-500 font-semibold mb-4 px-2">
                <span>
                  Từ {Math.min(currentIndex + 1, words.length)} / {words.length || 1}
                  {!currentUser && (
                    <span className="ml-2 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Học thử 2 từ miễn phí
                    </span>
                  )}
                </span>
                <button
                  onClick={() => setShowPinyinLocal(!showPinyinLocal)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  {showPinyinLocal ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPinyinLocal ? 'Ẩn Pinyin' : 'Hiện Pinyin'}</span>
                </button>
              </div>

              {/* Flashcard Component */}
              {isCurrentLocked ? (
                /* Locked Flashcard Overlay */
                <div className="w-full min-h-[340px] bg-white rounded-3xl p-8 border-2 border-red-200 shadow-xl relative flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-inner">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="text-lg font-black text-slate-900">
                      Mở khóa toàn bộ từ vựng HSK {activeLevel}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Bạn đã hoàn thành 2 từ vựng học thử miễn phí. Đăng nhập ngay với Gmail hoặc Facebook để mở khóa toàn bộ 11,000+ từ vựng miễn phí!
                    </p>
                  </div>
                  <button
                    onClick={onRequestAuth}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-600/25 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-amber-300" />
                    <span>Đăng nhập mở khóa ngay</span>
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full min-h-[340px] bg-white rounded-3xl p-8 border border-slate-200 shadow-xl cursor-pointer relative flex flex-col justify-between hover:border-red-300 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out will-change-transform select-none group"
                >
                  {/* Top card bar */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 bg-red-50 text-red-700 font-bold rounded-lg border border-red-100">
                      HSK {currentWord.level} • {currentWord.category}
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleSaveWord(currentWord)}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved(currentWord.id)
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-slate-100 text-slate-400 hover:text-amber-600'
                        }`}
                        title="Lưu vào sổ tay"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => handleSpeak(currentWord.hanzi)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                        title="Phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Center Content */}
                  <div className="text-center py-6 space-y-2">
                    <div className="font-hanzi text-6xl sm:text-7xl font-black text-slate-900 tracking-wider group-hover:scale-105 transition-transform">
                      {currentWord.hanzi}
                    </div>

                    {showPinyinLocal && (
                      <div className="text-xl font-bold text-red-600">
                        {currentWord.pinyin}
                      </div>
                    )}

                    <div className="text-sm font-semibold text-slate-500">
                      Âm Hán Việt: <span className="text-slate-800 font-bold">{currentWord.hanViet}</span>
                    </div>

                    {/* Flipped info or Hint */}
                    {isFlipped ? (
                      <div className="pt-4 border-t border-slate-100 animate-in fade-in">
                        <div className="text-lg font-bold text-emerald-700 mb-2">
                          {currentWord.meaning}
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl text-left text-xs space-y-1 border border-slate-100">
                          <p className="font-hanzi font-semibold text-slate-800">{currentWord.exampleZh}</p>
                          <p className="text-red-600 font-medium">{currentWord.examplePy}</p>
                          <p className="text-slate-600">{currentWord.exampleVi}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-6 text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Nhấp thẻ để xem nghĩa & ví dụ câu</span>
                      </div>
                    )}
                  </div>

                  {/* Card footer */}
                  <div className="text-center text-[11px] text-slate-400">
                    {currentWord.radicals && `Bộ thủ: ${currentWord.radicals.join(', ')}`}
                  </div>
                </div>
              )}

              {/* Flashcard navigation controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Từ trước</span>
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  disabled={isCurrentLocked}
                  className="px-5 py-2 bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50 rounded-xl text-xs font-bold border border-red-200 transition-all"
                >
                  Lật thẻ (Space)
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-500/20 transition-all"
                >
                  <span>Từ tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* List View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((w, idx) => {
                const isLockedItem = !currentUser && idx >= 2;

                if (isLockedItem) {
                  return (
                    <div
                      key={w.id}
                      onClick={onRequestAuth}
                      className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-dashed border-red-200 hover:border-red-400 cursor-pointer transition-all flex items-center justify-between text-slate-400 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-hanzi text-lg font-bold text-slate-500 group-hover:text-red-600">
                            {w.hanzi}
                          </span>
                          <p className="text-xs text-slate-400">Đăng nhập để xem nghĩa & pinyin</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-red-600 group-hover:underline">
                        Mở khóa
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={w.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-red-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out will-change-transform flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-hanzi text-2xl font-bold text-slate-900">
                            {w.hanzi}
                          </span>
                          <span className="text-sm font-bold text-red-600">
                            {w.pinyin}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSpeak(w.hanzi)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onToggleSaveWord(w)}
                            className={`p-1.5 rounded-lg ${
                              isSaved(w.id) ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-amber-500'
                            }`}
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 mb-2">
                        <strong className="text-slate-800">{w.meaning}</strong> • Hán Việt: {w.hanViet}
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 space-y-0.5 border border-slate-100">
                        <p className="font-hanzi font-medium text-slate-800">{w.exampleZh}</p>
                        <p className="text-slate-500">{w.exampleVi}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
