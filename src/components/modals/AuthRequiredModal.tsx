import React from 'react';
import { X, Lock, CheckCircle2, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { UserProfile } from '../../types';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginWithGoogle: () => void;
  onLoginWithFacebook: () => void;
  onOpenEmailAuth: (mode: 'login' | 'register') => void;
  featureName?: string;
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  onLoginWithGoogle,
  onLoginWithFacebook,
  onOpenEmailAuth,
  featureName = 'tính năng này'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-red-600 via-red-600 to-rose-600 p-6 text-white text-center relative overflow-hidden">
          
          {/* Decorative background monogram */}
          <div className="absolute -right-6 -bottom-8 text-white/10 text-9xl font-calligraphy select-none pointer-events-none">
            吴
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-950" />
            <span>Mở Khóa Toàn Bộ Kiến Thức</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Đăng Nhập Để Tiếp Tục Học
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-sm mx-auto mt-1 leading-relaxed">
            Bạn đã dùng thử 2 bài học/từ vựng miễn phí. Đăng nhập ngay để mở khóa trọn bộ 100% tài liệu không giới hạn!
          </p>
        </div>

        {/* Action Body */}
        <div className="p-6 sm:p-7 space-y-5 bg-white">
          
          {/* Main Social Login Buttons */}
          <div className="space-y-3">
            
            {/* Google / Gmail Button */}
            <button
              onClick={() => {
                onLoginWithGoogle();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border-2 border-slate-200 shadow-sm hover:border-slate-300 transition-all hover:scale-[1.01] active:scale-[0.99] group"
            >
              {/* Google G SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Tiếp tục với Google (Gmail)</span>
            </button>

            {/* Facebook Button */}
            <button
              onClick={() => {
                onLoginWithFacebook();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm rounded-2xl shadow-md shadow-[#1877F2]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {/* Facebook SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Tiếp tục với Facebook</span>
            </button>

          </div>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink mx-3 text-[11px] font-bold text-slate-400 uppercase">hoặc</span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                onClose();
                onOpenEmailAuth('login');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
            >
              Đăng nhập bằng Email / Mật khẩu
            </button>
          </div>

          {/* Benefits List */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Đặc quyền thành viên sau khi đăng nhập:</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Mở khóa 11,000+ từ vựng HSK 1 - 6 và HSK 3.0</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Không giới hạn luyện thi HSK, THPT & chép chính tả</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Hỏi đáp không giới hạn với AI Gia sư Hoài Ngô</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Lưu sổ tay từ vựng & đồng bộ tiến trình học tập</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
