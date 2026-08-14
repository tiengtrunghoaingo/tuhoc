import React, { useState } from 'react';
import { BookOpen, X, ChevronRight, Sparkles } from 'lucide-react';

interface BottomToastBarProps {
  onOpenHsk: () => void;
}

export const BottomToastBar: React.FC<BottomToastBarProps> = ({ onOpenHsk }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-18 sm:bottom-5 left-3 sm:left-6 z-30 max-w-[calc(100vw-5rem)] sm:max-w-md">
      <div className="flex items-center gap-2 bg-slate-900/95 text-white px-3 py-2 rounded-xl shadow-xl border border-red-900/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0"
          title="Đóng thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div 
          onClick={onOpenHsk}
          className="flex items-center gap-2 cursor-pointer hover:text-red-300 transition-colors truncate"
        >
          <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-3 h-3" />
          </div>
          <span className="truncate">📖 HSK 3.0 Hoài Ngô</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
        </div>
      </div>
    </div>
  );
};
