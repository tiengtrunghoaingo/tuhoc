import React, { useState } from 'react';
import { X, MessageCircle, Volume2, Play, Pause, RotateCw, Eye, EyeOff, Sparkles, Lock, Crown } from 'lucide-react';
import { DIALOGUE_LESSONS } from '../../data/chineseData';
import { DialogueLesson, UserProfile } from '../../types';
import { speechService } from '../../utils/speech';

interface DialogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({ 
  isOpen, 
  onClose,
  currentUser,
  onRequestAuth 
}) => {
  const [activeLesson, setActiveLesson] = useState<DialogueLesson>(DIALOGUE_LESSONS[0]);
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  if (!isOpen) return null;

  const playLine = (hanzi: string, id: string, onDone?: () => void) => {
    setActiveLineId(id);
    speechService.speak(hanzi, 0.85, () => {
      setActiveLineId(null);
      if (onDone) onDone();
    });
  };

  const handlePlayAll = async () => {
    if (isAutoPlaying) {
      speechService.stop();
      setIsAutoPlaying(false);
      setActiveLineId(null);
      return;
    }

    setIsAutoPlaying(true);
    const lines = activeLesson.lines;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      await new Promise<void>((resolve) => {
        playLine(line.hanzi, line.id, () => {
          setTimeout(() => resolve(), 600);
        });
      });
    }
    setIsAutoPlaying(false);
    setActiveLineId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                Hội Thoại Giao Tiếp Hoài Ngô
                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full border border-red-200">
                  {activeLesson.level}
                </span>
              </h3>
              <p className="text-xs text-slate-500">{activeLesson.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lesson selector & playback controls */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {DIALOGUE_LESSONS.map((lesson, idx) => {
              const isLocked = !currentUser && idx >= 2;
              const isSelected = activeLesson.id === lesson.id;

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    if (isLocked) {
                      onRequestAuth();
                      return;
                    }
                    setActiveLesson(lesson);
                    setActiveLineId(null);
                    setIsAutoPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm shadow-red-500/20'
                      : isLocked
                      ? 'bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600 border border-dashed border-red-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isLocked && <Lock className="w-3 h-3 text-red-500" />}
                  <span>{lesson.title}</span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setShowPinyin(!showPinyin)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                showPinyin ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              {showPinyin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Pinyin</span>
            </button>

            <button
              onClick={() => setShowVietnamese(!showVietnamese)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                showVietnamese ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              <span>Dịch nghĩa</span>
            </button>

            <button
              onClick={handlePlayAll}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-white font-bold transition-all ${
                isAutoPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700 shadow-xs'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isAutoPlaying ? 'Tạm dừng' : 'Nghe toàn bài'}</span>
            </button>
          </div>
        </div>

        {/* Conversation Line Flow */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60 space-y-4">
          {activeLesson.lines.map((line, idx) => {
            const isActive = activeLineId === line.id;
            const isRight = idx % 2 !== 0;

            return (
              <div
                key={line.id}
                className={`flex gap-3 max-w-2xl ${isRight ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xl shrink-0">
                  {line.avatar}
                </div>

                {/* Speech bubble */}
                <div 
                  onClick={() => playLine(line.hanzi, line.id)}
                  className={`p-4 rounded-3xl cursor-pointer transition-all shadow-xs border relative group ${
                    isActive
                      ? 'bg-red-50 border-red-400 ring-2 ring-red-300'
                      : isRight
                      ? 'bg-gradient-to-br from-red-600 to-rose-600 text-white border-red-600'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[11px] mb-1 opacity-80">
                    <span className="font-bold">{line.speaker}</span>
                    <Volume2 className={`w-3.5 h-3.5 ${isActive ? 'animate-bounce text-red-700' : ''}`} />
                  </div>

                  {/* Hanzi */}
                  <div className={`font-hanzi text-lg sm:text-xl font-bold ${isActive ? 'text-red-950' : ''}`}>
                    {line.hanzi}
                  </div>

                  {/* Pinyin */}
                  {showPinyin && (
                    <div className={`text-xs font-semibold mt-1 ${isRight && !isActive ? 'text-red-100' : 'text-red-600'}`}>
                      {line.pinyin}
                    </div>
                  )}

                  {/* Meaning */}
                  {showVietnamese && (
                    <div className={`text-xs mt-1.5 pt-1.5 border-t ${
                      isRight && !isActive ? 'border-red-500/50 text-red-50' : 'border-slate-100 text-slate-600'
                    }`}>
                      {line.meaning}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
