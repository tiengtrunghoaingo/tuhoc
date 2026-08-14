import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ChevronDown, 
  Crown, 
  Headphones, 
  BookOpen, 
  Languages, 
  GraduationCap, 
  UserCheck,
  Smartphone,
  PhoneCall,
  Flame,
  Bookmark,
  LogOut,
  User,
  CheckCircle2,
  Lock,
  FileSpreadsheet
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfile } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenDictation: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenCategory: (key: string) => void;
  onOpenNotebook: () => void;
  onOpenAccountSheet: () => void;
  savedCount: number;
  currentUser: UserProfile | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenDictation,
  onOpenAuth,
  onOpenCategory,
  onOpenNotebook,
  onOpenAccountSheet,
  savedCount,
  currentUser,
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isAdmin = currentUser?.email?.toLowerCase() === 'canhln1224@gmail.com';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-xs">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group select-none shrink-0"
          >
            <Logo size="md" showText={true} />
          </div>

          {/* Quick Action: Chép chính tả & Search */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-md justify-end md:justify-center">
            <button
              onClick={onOpenDictation}
              className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-red-600" />
              <span>Chép chính tả</span>
              <span className="px-1 py-0.2 bg-red-600 text-white text-[9px] font-bold rounded-sm animate-pulse">
                HOT
              </span>
            </button>

            {/* Search Input Button */}
            <div 
              onClick={onOpenSearch}
              className="relative w-full max-w-[220px] cursor-pointer group"
            >
              <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-all">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600" />
                <span className="truncate">Tìm kiếm từ vựng, ngữ pháp...</span>
                <kbd className="hidden lg:inline-block ml-auto text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* App Download link */}
            <div className="hidden xl:flex items-center gap-1.5 text-slate-600">
              <a 
                href="#app-download" 
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 text-white rounded-md text-[11px] font-medium hover:bg-slate-800 transition-colors"
              >
                <Smartphone className="w-3 h-3 text-emerald-400" />
                <span>Tải App</span>
              </a>
            </div>

            {/* Saved notebook */}
            <button
              onClick={onOpenNotebook}
              className="relative p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sổ tay từ vựng của bạn"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Bảng Sheet Thống Kê (Direct Button - ONLY FOR ADMIN canhln1224@gmail.com) */}
            {isAdmin && (
              <button
                onClick={onOpenAccountSheet}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all shadow-2xs animate-in fade-in"
                title="Mở bảng Sheet thống kê số tài khoản và bài học (Admin canhln1224@gmail.com)"
              >
                <FileSpreadsheet className="w-4 h-4 text-red-600" />
                <span className="hidden md:inline">Sheet Thống Kê</span>
                <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-extrabold tracking-wide">
                  ADMIN
                </span>
              </button>
            )}

            {/* Contact */}
            <a
              href="mailto:tiengtrunghoaingo@gmail.com"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-red-600 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Liên hệ</span>
            </a>

            {/* User Account / Auth Section */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all border ${
                    isAdmin 
                      ? 'bg-amber-50/80 hover:bg-amber-100/80 border-amber-300 ring-2 ring-amber-400/30' 
                      : 'bg-red-50 hover:bg-red-100 border-red-200'
                  }`}
                >
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className={`w-7 h-7 rounded-full object-cover ring-2 ${isAdmin ? 'ring-amber-500' : 'ring-red-400'}`}
                    />
                  ) : (
                    <div className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs ${isAdmin ? 'bg-amber-600' : 'bg-red-600'}`}>
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[110px]">
                      {currentUser.name}
                    </p>
                    {isAdmin ? (
                      <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                        <Crown className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
                        Admin Master
                      </span>
                    ) : (
                      <span className="text-[10px] text-red-600 font-semibold flex items-center gap-0.5">
                        <Crown className="w-2.5 h-2.5 fill-red-600" />
                        VIP Mở khóa
                      </span>
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                        {isAdmin && (
                          <span className="px-1.5 py-0.5 bg-amber-500 text-white font-extrabold text-[9px] rounded-full">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      
                      {isAdmin ? (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          <Crown className="w-3 h-3 text-amber-600 fill-amber-600" />
                          Quyền Quản Trị Hệ Thống
                        </div>
                      ) : (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã mở khóa 100% tài liệu
                        </div>
                      )}
                    </div>

                    {/* Sheet Thống Kê (ONLY IN MENU IF ADMIN) */}
                    {isAdmin && (
                      <button
                        onClick={onOpenAccountSheet}
                        className="w-full px-4 py-2.5 text-left text-xs text-red-700 font-bold bg-red-50/50 hover:bg-red-100 flex items-center justify-between transition-colors border-b border-slate-100"
                      >
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-red-600" />
                          <span>Bảng Sheet Thống Kê</span>
                        </div>
                        <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded">
                          ADMIN
                        </span>
                      </button>
                    )}

                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 font-semibold hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-white hover:bg-red-50 border border-red-300 rounded-lg transition-all"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-lg shadow-sm shadow-red-500/20 hover:shadow-md transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Đăng ký</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Sub-Navigation Ribbon (Horizontal Menu Matching Design) */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white border-t border-red-800/40 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 py-2 text-xs font-medium whitespace-nowrap min-w-max">
            
            <button
              onClick={() => onOpenCategory('hsk')}
              className="flex items-center gap-1.5 px-3 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
              <span>GT Hán ngữ</span>
            </button>

            {/* HSK 3.0 Highlight badge */}
            <button
              onClick={() => onOpenCategory('hsk')}
              className="flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-colors shadow-xs"
            >
              <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>HSK 3.0 Mới</span>
            </button>

            {/* Luyện tập */}
            <button
              onClick={() => onOpenCategory('exam')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <span>Luyện tập</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Từ vựng */}
            <button
              onClick={() => onOpenCategory('topic_vocab')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <span>Từ vựng</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Hội thoại */}
            <button
              onClick={() => onOpenCategory('dialogue')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <span>Hội thoại</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Đọc hiểu */}
            <button
              onClick={() => onOpenCategory('reading')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <span>Đọc hiểu</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Bộ thủ */}
            <button
              onClick={() => onOpenCategory('radicals')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <span>214 Bộ thủ</span>
            </button>

            {/* Luyện thi */}
            <button
              onClick={() => onOpenCategory('exam')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <span>Luyện thi HSK</span>
            </button>

            {/* Luyện đề THPT */}
            <button
              onClick={() => onOpenCategory('thpt_exam')}
              className="flex items-center gap-1 px-2.5 py-1 text-amber-200 bg-amber-500/20 border border-amber-400/30 rounded-md hover:bg-amber-500/30 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Luyện đề THPT</span>
            </button>

            {/* Dịch */}
            <button
              onClick={() => onOpenCategory('translate')}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-rose-400" />
              <span>Dịch & Tra từ</span>
            </button>

            {/* VIP Crown Button */}
            <div className="ml-auto pl-2">
              <button
                onClick={() => currentUser ? null : onOpenAuth('register')}
                className="flex items-center gap-1 px-3 py-1 text-amber-900 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 rounded-md font-extrabold hover:brightness-105 transition-all shadow-xs"
              >
                <Crown className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                <span>{currentUser ? 'VIP Thành Viên' : 'Mở Khóa VIP'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
