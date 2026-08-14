import React from 'react';
import { 
  Home, 
  BookOpen, 
  Headphones, 
  Bot, 
  User, 
  Crown, 
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import { UserProfile } from '../types';

interface MobileBottomNavProps {
  activeModal: string | null;
  currentUser: UserProfile | null;
  onGoHome: () => void;
  onOpenHsk: () => void;
  onOpenDictation: () => void;
  onOpenAiTutor: () => void;
  onOpenAuthOrProfile: () => void;
  onOpenAccountSheet: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModal,
  currentUser,
  onGoHome,
  onOpenHsk,
  onOpenDictation,
  onOpenAiTutor,
  onOpenAuthOrProfile,
  onOpenAccountSheet
}) => {
  const isAdmin = currentUser?.email?.toLowerCase() === 'canhln1224@gmail.com';

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 pt-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-all"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        
        {/* 1. Trang chủ */}
        <button
          onClick={onGoHome}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-90 min-h-[48px] ${
            !activeModal 
              ? 'text-red-600 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {!activeModal && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Trang chủ</span>
        </button>

        {/* 2. Học HSK */}
        <button
          onClick={onOpenHsk}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-90 min-h-[48px] ${
            activeModal === 'hsk' 
              ? 'text-red-600 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {activeModal === 'hsk' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Học HSK</span>
        </button>

        {/* 3. Chép Chính Tả (HOT Feature) */}
        <button
          onClick={onOpenDictation}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-90 min-h-[48px] ${
            activeModal === 'dictation' 
              ? 'text-red-600 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Headphones className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-red-600 text-white text-[8px] font-black rounded-xs animate-pulse leading-tight">
              HOT
            </span>
            {activeModal === 'dictation' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">Chép CT</span>
        </button>

        {/* 4. AI Gia Sư Hoài Ngô (Centerpiece Floating Look) */}
        <button
          onClick={onOpenAiTutor}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-90 min-h-[48px] ${
            activeModal === 'aitutor' 
              ? 'text-red-600 font-bold' 
              : 'text-slate-600 hover:text-red-600'
          }`}
        >
          <div className="relative p-1 rounded-lg bg-gradient-to-tr from-red-600 to-rose-600 text-white shadow-sm shadow-red-500/30">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
          </div>
          <span className="text-[10px] mt-1 font-bold text-red-600 tracking-tight leading-none">
            AI Gia Sư
          </span>
        </button>

        {/* 5. Tài khoản / Quản trị Admin */}
        <button
          onClick={isAdmin ? onOpenAccountSheet : onOpenAuthOrProfile}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-90 min-h-[48px] ${
            activeModal === 'auth' || activeModal === 'account_sheet'
              ? 'text-red-600 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            {currentUser ? (
              currentUser.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className={`w-5 h-5 rounded-full object-cover ring-1.5 ${isAdmin ? 'ring-amber-500' : 'ring-red-500'}`}
                />
              ) : (
                <div className={`w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center ${isAdmin ? 'bg-amber-600' : 'bg-red-600'}`}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )
            ) : (
              <User className="w-5 h-5" />
            )}
            
            {isAdmin && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-1 ring-white" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none truncate max-w-[56px]">
            {isAdmin ? 'Admin' : currentUser ? 'Hồ sơ VIP' : 'Tài khoản'}
          </span>
        </button>

      </div>
    </nav>
  );
};
