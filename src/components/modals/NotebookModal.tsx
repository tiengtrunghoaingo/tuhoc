import React from 'react';
import { X, Bookmark, Volume2, Trash2, BookOpen } from 'lucide-react';
import { ChineseWord } from '../../types';
import { speechService } from '../../utils/speech';

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: ChineseWord[];
  onRemoveWord: (wordId: string) => void;
  onOpenStudy: () => void;
}

export const NotebookModal: React.FC<NotebookModalProps> = ({
  isOpen,
  onClose,
  savedWords,
  onRemoveWord,
  onOpenStudy
}) => {
  if (!isOpen) return null;

  const handleSpeak = (text: string) => {
    speechService.speak(text, 0.85);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                Sổ Tay Từ Vựng Hoài Ngô ({savedWords.length})
              </h3>
              <p className="text-xs text-slate-500">Danh sách các từ vựng và mẫu câu bạn đã đánh dấu lưu lại</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          {savedWords.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                <Bookmark className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Chưa có từ vựng nào được lưu</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Trong khi học từ vựng HSK, hãy bấm vào biểu tượng dấu trang để lưu lại các từ cần ôn tập nhé!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenStudy();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 transition-all"
              >
                Khám phá từ vựng HSK ngay
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedWords.map((w) => (
                <div
                  key={w.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out will-change-transform flex flex-col justify-between"
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
                          onClick={() => onRemoveWord(w.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          title="Xóa khỏi sổ tay"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 font-semibold mb-2">
                      {w.meaning} <span className="text-slate-400">({w.hanViet})</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 border border-slate-100">
                      <p className="font-hanzi font-medium text-slate-800">{w.exampleZh}</p>
                      <p className="text-slate-500">{w.exampleVi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
