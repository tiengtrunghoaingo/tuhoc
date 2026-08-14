import React, { useState } from 'react';
import { BookOpen, X, ChevronRight, Sparkles } from 'lucide-react';

interface BottomToastBarProps {
  onOpenHsk: () => void;
}

export const BottomToastBar: React.FC<BottomToastBarProps> = ({ onOpenHsk }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40">
      <div className="flex items-center gap-2 bg-slate-900/95 text-white px-3.5 py-2 rounded-xl shadow-xl border border-red-900/40 backdrop-blur-md text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          title="Đóng thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div 
          onClick={onOpenHsk}
          className="flex items-center gap-2 cursor-pointer hover:text-red-300 transition-colors"
        >
          <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center text-white">
            <BookOpen className="w-3 h-3" />
          </div>
          <span>📖 Tiếp tục: Giáo trình HSK 3.0 Hoài Ngô</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
