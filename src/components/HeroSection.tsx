import React, { useState } from 'react';
import { 
  Rocket, 
  BookOpen, 
  Volume2, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  RotateCw, 
  Bookmark,
  TrendingUp,
  ShieldCheck,
  Lock,
  Crown
} from 'lucide-react';
import { HSK_WORDS_SAMPLE } from '../data/chineseData';
import { speechService } from '../utils/speech';
import { HskLevel, ChineseWord, UserProfile } from '../types';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
  onOpenWordDetail: (word: ChineseWord) => void;
  onToggleSaveWord: (word: ChineseWord) => void;
  isSaved: (wordId: string) => boolean;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreCourses,
  onOpenWordDetail,
  onToggleSaveWord,
  isSaved,
  currentUser,
  onOpenAuth
}) => {
  const [selectedLevel, setSelectedLevel] = useState<HskLevel>(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter words by selected level
  const wordsForLevel = HSK_WORDS_SAMPLE.filter(w => w.level === selectedLevel);
  const activeWord = wordsForLevel[currentWordIndex % (wordsForLevel.length || 1)] || HSK_WORDS_SAMPLE[0];

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    speechService.speak(activeWord.hanzi, 0.85, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleNextWord = () => {
    setCurrentWordIndex(prev => (prev + 1) % wordsForLevel.length);
  };

  const handleSelectLevel = (lvl: HskLevel) => {
    setSelectedLevel(lvl);
    setCurrentWordIndex(0);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-white via-red-50/20 to-white">
      
      {/* Subtle Chinese background calligraphy decorative characters */}
      <div className="absolute top-12 left-6 text-red-900/5 text-9xl font-calligraphy select-none pointer-events-none -z-0">
        汉
      </div>
      <div className="absolute bottom-10 right-10 text-red-900/5 text-[180px] font-calligraphy select-none pointer-events-none -z-0">
        字
      </div>
      <div className="absolute top-1/3 right-1/4 text-red-900/5 text-8xl font-calligraphy select-none pointer-events-none -z-0">
        吴
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-red-600 animate-pulse" />
              <span>Nền tảng học tiếng Trung Hoài Ngô • HSK 3.0 Chuẩn Quốc Tế</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Chinh phục <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                Tiếng Trung Hoài Ngô
              </span>{' '}
              dễ dàng & hiệu quả
            </h1>

            {/* Subtitle description */}
            <p className="text-sm sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Hệ thống học tiếng Trung toàn diện từ phát âm, 214 bộ thủ, 11,000+ từ vựng HSK 1 - 6, 
              luyện đề thi THPT và AI Gia Sư thông minh 24/7.
            </p>

            {/* Membership status notice */}
            {!currentUser ? (
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Chế độ học thử (2 bài/chức năng).</span>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-red-700 underline font-bold hover:text-red-800"
                >
                  Đăng nhập để mở toàn bộ
                </button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <span>Tài khoản VIP {currentUser.name} - Đã mở khóa 100% tài liệu học tập!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onStartLearning}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.98] rounded-xl shadow-lg shadow-red-600/25 transition-all min-h-[44px]"
              >
                <Rocket className="w-4 h-4 text-red-100" />
                <span>Bắt đầu học ngay</span>
              </button>

              <button
                onClick={onExploreCourses}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-all min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Khám phá 9+ chuyên đề</span>
              </button>
            </div>

            {/* Social Proof Avatars */}
            <div className="flex items-center gap-3 pt-3">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                  吴
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                  T
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                  L
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">
                  M
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                Hơn <strong className="text-slate-900 font-bold">50,000+</strong> học viên tin dùng Tiếng Trung Hoài Ngô
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Widget */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Top Interactive Hanzi Flashcard Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-red-100 shadow-xl shadow-red-500/10 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-500/15 transition-all duration-300 ease-out will-change-transform">
              
              {/* Background gradient decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-2xl -z-0 pointer-events-none" />

              {/* Card Header Actions */}
              <div className="flex items-center justify-between relative z-10 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-red-50 text-red-700 rounded-md border border-red-200">
                  HSK {activeWord.level} • {activeWord.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleSaveWord(activeWord)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isSaved(activeWord.id)
                        ? 'text-amber-500 bg-amber-50'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50'
                    }`}
                    title="Lưu vào sổ tay"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={handleNextWord}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Đổi từ khác"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Centered Hanzi, Pinyin, Meaning */}
              <div className="text-center py-4 relative z-10 space-y-1">
                <div className="font-hanzi text-5xl sm:text-6xl font-black text-slate-900 tracking-wide hover:scale-105 transition-transform inline-block">
                  {activeWord.hanzi}
                </div>
                
                <div className="text-base sm:text-lg font-bold text-red-600">
                  {activeWord.pinyin}
                </div>

                <div className="text-sm font-medium text-slate-600">
                  {activeWord.meaning} <span className="text-xs text-slate-400">({activeWord.hanViet})</span>
                </div>

                {/* Animated Audio Wave Button */}
                <div className="pt-3 flex justify-center">
                  <button
                    onClick={handlePlayAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      isPlayingAudio
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-500/30'
                        : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:-translate-y-0.5'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <div className="flex items-center gap-1 h-4 px-1">
                        <span className="w-1 bg-white rounded-full animate-wave-1" />
                        <span className="w-1 bg-white rounded-full animate-wave-2" />
                        <span className="w-1 bg-white rounded-full animate-wave-3" />
                        <span className="w-1 bg-white rounded-full animate-wave-4" />
                      </div>
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    <span className="text-xs font-bold">
                      {isPlayingAudio ? 'Đang phát âm...' : 'Nghe giọng chuẩn Bắc Kinh'}
                    </span>
                  </button>
                </div>

                {/* Example sentence */}
                <div className="mt-3 pt-3 border-t border-slate-100 text-left text-xs text-slate-500 bg-slate-50/70 p-2.5 rounded-lg">
                  <p className="font-hanzi font-medium text-slate-800">{activeWord.exampleZh}</p>
                  <p className="text-slate-600">{activeWord.exampleVi}</p>
                </div>
              </div>

            </div>

            {/* Bottom Row Grid: HSK Level Switcher & Streak & Stats */}
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              
              {/* Level Tabs & Progress */}
              <div className="col-span-7 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-red-200 transition-all duration-300 ease-out will-change-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">Cấp độ HSK</span>
                  <span className="text-[11px] text-red-600 font-semibold">Cấp {selectedLevel}</span>
                </div>

                {/* Level Buttons [1] [2] [3] [4] [5] [6] */}
                <div className="grid grid-cols-6 gap-1">
                  {([1, 2, 3, 4, 5, 6] as HskLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleSelectLevel(lvl)}
                      className={`h-8 rounded-lg text-xs font-bold transition-all ${
                        selectedLevel === lvl
                          ? 'bg-red-600 text-white shadow-sm shadow-red-500/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:-translate-y-0.5'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                  <div 
                    className="bg-red-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(selectedLevel / 6) * 100}%` }}
                  />
                </div>
              </div>

              {/* Streak Card */}
              <div className="col-span-5 bg-amber-50/70 rounded-2xl p-4 border border-amber-200/60 shadow-xs flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-md hover:border-amber-300 transition-all duration-300 ease-out will-change-transform">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-xl font-black text-slate-900 leading-none">
                  5
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mt-1">
                  ngày liên tiếp
                </div>
              </div>

              {/* 11,000+ Big stat card matching screenshot */}
              <div className="col-span-12 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-md shadow-red-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 ease-out will-change-transform">
                <div>
                  <div className="text-2xl font-black">
                    11,000+
                  </div>
                  <div className="text-xs font-bold text-red-100">
                    Từ vựng HSK 1 - 6 & HSK 3.0 Chuẩn
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-white text-red-600 text-xs font-extrabold rounded-xl shadow-xs">
                  Hoài Ngô 2026
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
