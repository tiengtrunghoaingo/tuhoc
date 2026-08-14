import React, { useState } from 'react';
import { X, Headphones, Volume2, CheckCircle2, RotateCw, Sparkles, AlertCircle, Lock, Crown } from 'lucide-react';
import { DICTATION_ITEMS } from '../../data/chineseData';
import { speechService } from '../../utils/speech';
import { UserProfile } from '../../types';

interface DictationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

export const DictationModal: React.FC<DictationModalProps> = ({ 
  isOpen, 
  onClose,
  currentUser,
  onRequestAuth
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const isLocked = !currentUser && currentIndex >= 2;
  const currentItem = DICTATION_ITEMS[currentIndex % DICTATION_ITEMS.length];

  const handlePlayAudio = () => {
    if (isLocked) return;
    setIsPlaying(true);
    speechService.speak(currentItem.audioHint, 0.8, () => {
      setIsPlaying(false);
    });
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const handleNext = () => {
    if (!currentUser && currentIndex >= 1) {
      setCurrentIndex(2);
      return;
    }
    setIsChecked(false);
    setUserInput('');
    setCurrentIndex(prev => (prev + 1) % DICTATION_ITEMS.length);
  };

  const isExactMatch = userInput.trim() === currentItem.hanzi.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                Chép Chính Tả Hoài Ngô
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-sm">
                  HOT
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Luyện nghe phát âm chuẩn và gõ lại đúng chữ Hán
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

        {/* Practice Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-slate-50/60 text-center">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="uppercase tracking-wider">
              Bài tập {Math.min(currentIndex + 1, DICTATION_ITEMS.length)} / {DICTATION_ITEMS.length}
            </span>
            {!currentUser && (
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Thử miễn phí 2 bài đầu
              </span>
            )}
          </div>

          {isLocked ? (
            /* Locked View */
            <div className="py-8 space-y-4 max-w-sm mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-slate-900">
                Mở khóa toàn bộ bài luyện chép chính tả
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đăng nhập ngay bằng Gmail hoặc Facebook để mở khóa trọn bộ hàng trăm bài nghe và chép chính tả chuẩn Bắc Kinh!
              </p>
              <button
                onClick={onRequestAuth}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl text-xs shadow-md shadow-red-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Đăng nhập mở khóa ngay</span>
              </button>
            </div>
          ) : (
            <>
              {/* Audio trigger button with pulse */}
              <div className="py-2">
                <button
                  onClick={handlePlayAudio}
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all shadow-lg ${
                    isPlaying
                      ? 'bg-red-600 text-white scale-110 shadow-red-500/40 ring-4 ring-red-200'
                      : 'bg-red-50 text-red-600 hover:bg-red-100 shadow-red-500/10'
                  }`}
                >
                  <Volume2 className="w-8 h-8" />
                </button>
                <p className="text-xs text-slate-500 font-semibold mt-3">
                  Nhấp vào loa để nghe giọng đọc bản xứ
                </p>
              </div>

              {/* Input field */}
              <div className="max-w-md mx-auto space-y-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isChecked}
                  placeholder="Gõ chữ Hán hoặc Pinyin bạn nghe được..."
                  className="w-full px-4 py-3 text-center text-lg font-hanzi font-bold bg-white border-2 border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-xs"
                />

                {!isChecked ? (
                  <button
                    onClick={handleCheck}
                    disabled={!userInput.trim()}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-2xl text-sm shadow-md shadow-red-500/20 disabled:opacity-40 transition-all"
                  >
                    Kiểm tra kết quả ✍️
                  </button>
                ) : (
                  <div className="space-y-4 animate-in fade-in">
                    {/* Result Card */}
                    <div className={`p-4 rounded-2xl border text-left ${
                      isExactMatch ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-sm mb-1">
                        {isExactMatch ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span>Chính xác tuyệt đối! +10 Điểm</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            <span>Gần đúng! Hãy xem đáp án mẫu bên dưới:</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-1 text-xs mt-2 pt-2 border-t border-slate-200/60">
                        <p>Chữ Hán chuẩn: <strong className="font-hanzi text-base text-slate-900">{currentItem.hanzi}</strong></p>
                        <p>Phiên âm Pinyin: <strong className="text-red-600">{currentItem.pinyin}</strong></p>
                        <p>Dịch nghĩa: <span className="text-slate-700">{currentItem.meaning}</span></p>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm shadow-md transition-all"
                    >
                      Câu tiếp theo →
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
