import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Bookmark, 
  Bot, 
  ArrowUp, 
  MessageSquareText, 
  Sparkles,
  Headphones,
  FileSpreadsheet
} from 'lucide-react';

interface FloatingSidebarProps {
  onOpenSettings: () => void;
  onOpenNotebook: () => void;
  onOpenAiTutor: () => void;
  onOpenDictation: () => void;
  onOpenAccountSheet: () => void;
  savedCount: number;
  isAdmin?: boolean;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({
  onOpenSettings,
  onOpenNotebook,
  onOpenAiTutor,
  onOpenDictation,
  onOpenAccountSheet,
  savedCount,
  isAdmin = false
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick Actions" className="fixed right-3 sm:right-5 bottom-20 sm:bottom-6 z-30 flex flex-col items-center gap-2 sm:gap-2.5">
      
      {/* AI Tutor Floating Button with Glow (Desktop only, mobile has it in BottomNav) */}
      <button
        onClick={onOpenAiTutor}
        className="hidden md:flex relative group p-3 bg-gradient-to-tr from-red-600 to-rose-600 text-white rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-200"
        title="Trợ lý AI Hoài Ngô"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
          </span>
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          🤖 AI Gia Sư Hoài Ngô
        </span>
      </button>

      {/* Chép chính tả Quick Button */}
      <button
        onClick={onOpenDictation}
        className="hidden md:flex relative group p-2.5 bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl shadow-md hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
        title="Luyện Chép chính tả"
      >
        <Headphones className="w-5 h-5 text-red-600" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          🎧 Chép chính tả
        </span>
      </button>

      {/* Sổ tay từ vựng Notebook */}
      <button
        onClick={onOpenNotebook}
        className="relative group p-2.5 sm:p-2.5 bg-white text-slate-700 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-xl shadow-md hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
        title="Sổ tay từ vựng"
      >
        <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
        {savedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {savedCount}
          </span>
        )}
        <span className="hidden md:inline-block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          📖 Sổ tay từ vựng ({savedCount})
        </span>
      </button>

      {/* Sheet Thống Kê Quick Button (Admin Only) */}
      {isAdmin && (
        <button
          onClick={onOpenAccountSheet}
          className="relative group p-2.5 bg-white text-slate-700 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl shadow-md hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
          title="Bảng Sheet Thống kê tài khoản & tiến độ học (Admin)"
        >
          <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          <span className="hidden md:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none items-center gap-1.5">
            📊 Sheet Thống Kê (Admin)
          </span>
        </button>
      )}

      {/* Settings Modal */}
      <button
        onClick={onOpenSettings}
        className="relative group p-2.5 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-xl shadow-md hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
        title="Cài đặt hiển thị"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden md:inline-block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ⚙️ Cài đặt học tập
        </span>
      </button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-2 sm:p-2.5 bg-slate-900 text-white rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition-all animate-in fade-in zoom-in-75 min-w-[40px] min-h-[40px] flex items-center justify-center"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
