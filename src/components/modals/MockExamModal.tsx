import React, { useState, useEffect } from 'react';
import { 
  X, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCw, 
  ChevronRight, 
  Volume2,
  Sparkles,
  HelpCircle,
  Lock,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_EXAM_PAPERS } from '../../data/chineseData';
import { ExamPaper, QuizQuestion, UserProfile } from '../../types';
import { speechService } from '../../utils/speech';

interface MockExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examType?: 'hsk' | 'thpt';
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

export const MockExamModal: React.FC<MockExamModalProps> = ({ 
  isOpen, 
  onClose,
  examType = 'hsk',
  currentUser,
  onRequestAuth
}) => {
  const [selectedPaperIndex, setSelectedPaperIndex] = useState(examType === 'thpt' ? 1 : 0);
  const activePaper = MOCK_EXAM_PAPERS[selectedPaperIndex] || MOCK_EXAM_PAPERS[0];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(activePaper.durationMinutes * 60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const currentQ = activePaper.questions[currentQuestionIdx];
  const isQuestionLocked = !currentUser && currentQuestionIdx >= 2;

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted || isQuestionLocked) return;
    setUserAnswers({ ...userAnswers, [currentQuestionIdx]: optIndex });
  };

  const handlePlayPrompt = () => {
    if (currentQ.audioPrompt) {
      speechService.speak(currentQ.audioPrompt, 0.85);
    }
  };

  const handleSubmit = () => {
    if (!currentUser && activePaper.questions.length > 2) {
      onRequestAuth();
      return;
    }

    setIsSubmitted(true);
    setTimerActive(false);

    // Calculate score
    let score = 0;
    activePaper.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });

    if (score >= activePaper.questions.length * 0.7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    activePaper.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: activePaper.questions.length,
      percentage: Math.round((correct / activePaper.questions.length) * 100)
    };
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scoreResult = isSubmitted ? calculateScore() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                {activePaper.title}
              </h3>
              <p className="text-xs text-slate-500">{activePaper.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper switcher tab */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            {MOCK_EXAM_PAPERS.map((paper, idx) => (
              <button
                key={paper.id}
                onClick={() => {
                  setSelectedPaperIndex(idx);
                  setCurrentQuestionIdx(0);
                  setUserAnswers({});
                  setIsSubmitted(false);
                  setTimeLeft(paper.durationMinutes * 60);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  selectedPaperIndex === idx
                    ? 'bg-red-600 text-white shadow-sm shadow-red-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {paper.title.split('-')[0]}
              </button>
            ))}
          </div>

          {!currentUser && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 shrink-0">
              Làm thử 2 câu đầu miễn phí
            </span>
          )}
        </div>

        {/* Exam Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          {isSubmitted ? (
            /* Result Summary Screen */
            <div className="max-w-xl mx-auto text-center p-8 bg-white rounded-3xl border border-red-100 shadow-lg space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
                {scoreResult?.percentage}%
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {scoreResult && scoreResult.percentage >= 60 ? 'Chúc mừng bạn đã hoàn thành xuất sắc!' : 'Hãy tiếp tục cố gắng nhé!'}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Bạn trả lời đúng <strong className="text-emerald-600">{scoreResult?.correct}</strong> / {scoreResult?.total} câu hỏi.
                </p>
              </div>

              {/* Review detailed answers */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Chi tiết từng câu hỏi:
                </h4>
                {activePaper.questions.map((q, idx) => {
                  const isCorrect = userAnswers[idx] === q.correctAnswer;
                  return (
                    <div 
                      key={q.id}
                      className={`p-3.5 rounded-2xl border ${
                        isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-red-50/70 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between text-xs font-bold mb-1">
                        <span className={isCorrect ? 'text-emerald-800' : 'text-red-800'}>
                          Câu {idx + 1}: {q.questionZh}
                        </span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Đáp án đúng: <strong>{q.options[Number(q.correctAnswer)]}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500 italic mt-0.5">
                        Giải thích: {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setUserAnswers({});
                    setIsSubmitted(false);
                    setCurrentQuestionIdx(0);
                    setTimeLeft(activePaper.durationMinutes * 60);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 transition-all"
                >
                  Làm lại bài thi
                </button>
              </div>
            </div>
          ) : isQuestionLocked ? (
            /* Locked Question View */
            <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl border-2 border-red-200 shadow-xl space-y-4 my-8">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Mở Khóa Toàn Bộ Đề Thi & Chấm Điểm
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bạn đã hoàn thành 2 câu hỏi miễn phí. Đăng nhập ngay với Gmail hoặc Facebook để mở khóa trọn bộ 100% đề thi HSK và THPT Quốc Gia có giải thích chi tiết!
              </p>
              <button
                onClick={onRequestAuth}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl text-xs shadow-md shadow-red-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Đăng nhập mở khóa trọn bộ đề thi</span>
              </button>
            </div>
          ) : (
            /* Active Question Screen */
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Question numbers pagination pills */}
              <div className="flex flex-wrap items-center gap-2">
                {activePaper.questions.map((q, idx) => {
                  const answered = userAnswers[idx] !== undefined;
                  const isCurrent = currentQuestionIdx === idx;
                  const isItemLocked = !currentUser && idx >= 2;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'bg-red-600 text-white ring-2 ring-red-300 shadow-xs'
                          : isItemLocked
                          ? 'bg-slate-100 text-slate-400 border border-dashed border-red-200 hover:text-red-600'
                          : answered
                          ? 'bg-slate-800 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isItemLocked ? <Lock className="w-3 h-3 text-red-500" /> : idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
                
                {/* Question title */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    Câu hỏi {currentQuestionIdx + 1} / {activePaper.questions.length}
                  </span>

                  <h3 className="font-hanzi text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {currentQ.questionZh}
                  </h3>

                  {currentQ.questionPy && (
                    <p className="text-sm font-semibold text-red-600">{currentQ.questionPy}</p>
                  )}

                  {currentQ.audioPrompt && (
                    <button
                      onClick={handlePlayPrompt}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-xs font-bold hover:bg-red-100 transition-colors mt-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe audio câu hỏi</span>
                    </button>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-red-50 border-red-500 text-red-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-red-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-sm font-medium">{opt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    Câu trước
                  </button>

                  {currentQuestionIdx < activePaper.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center gap-1"
                    >
                      <span>Câu tiếp</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
                    >
                      Nộp bài & Chấm điểm
                    </button>
                  )}
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
