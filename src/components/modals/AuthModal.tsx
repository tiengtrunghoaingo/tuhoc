import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { Logo } from '../Logo';
import { UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  if (!isOpen) return null;

  const handleQuickAdminLogin = () => {
    setIsSuccess(true);
    setLoginMessage('Đăng nhập Quản Trị Viên thành công!');
    const adminUser: UserProfile = {
      id: 'ADMIN-001',
      name: 'Cảnh LN (Quản Trị Viên)',
      email: 'canhln1224@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      provider: 'google',
      isVip: true,
      joinedDate: '2026-05-01'
    };

    setTimeout(() => {
      onLoginSuccess(adminUser);
      setIsSuccess(false);
      onClose();
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsSuccess(true);
    setLoginMessage('Đăng nhập bằng Google thành công!');
    const user: UserProfile = {
      id: 'g_' + Date.now(),
      name: 'Học viên Google',
      email: 'user.google@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      provider: 'google',
      isVip: true,
      joinedDate: new Date().toLocaleDateString('vi-VN')
    };

    setTimeout(() => {
      onLoginSuccess(user);
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleFacebookLogin = () => {
    setIsSuccess(true);
    setLoginMessage('Đăng nhập bằng Facebook thành công!');
    const user: UserProfile = {
      id: 'fb_' + Date.now(),
      name: 'Học viên Facebook',
      email: 'user.facebook@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      provider: 'facebook',
      isVip: true,
      joinedDate: new Date().toLocaleDateString('vi-VN')
    };

    setTimeout(() => {
      onLoginSuccess(user);
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    const isAdmin = email.trim().toLowerCase() === 'canhln1224@gmail.com';
    setLoginMessage(
      isAdmin 
        ? 'Đăng nhập Quản Trị Viên Master thành công!' 
        : (mode === 'login' ? 'Đăng nhập thành công!' : 'Tạo tài khoản VIP thành công!')
    );
    
    const user: UserProfile = {
      id: isAdmin ? 'ADMIN-001' : ('u_' + Date.now()),
      name: isAdmin ? 'Cảnh LN (Quản Trị Viên)' : (fullName.trim() || email.split('@')[0] || 'Học viên Hoài Ngô'),
      email: email.trim().toLowerCase(),
      avatar: isAdmin 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        : undefined,
      provider: 'email',
      isVip: true,
      joinedDate: isAdmin ? '2026-05-01' : new Date().toLocaleDateString('vi-VN')
    };

    setTimeout(() => {
      onLoginSuccess(user);
      setIsSuccess(false);
      onClose();
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-red-50 to-rose-50">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <span className="font-extrabold text-slate-900 text-base block">
                {mode === 'login' ? 'Đăng Nhập Hoài Ngô' : 'Đăng Ký Tài Khoản VIP'}
              </span>
              <span className="text-[11px] text-red-600 font-semibold">
                Mở khóa 100% bài học & từ vựng miễn phí
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="font-black text-slate-900 text-lg">
                {loginMessage}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Đã mở khóa toàn bộ 11,000+ từ vựng, đề thi và trợ lý AI cho bạn!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Quick Social & Admin Logins */}
              <div className="space-y-2.5">
                {/* Admin Quick Login */}
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm shadow-amber-500/20 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Đăng nhập Admin (canhln1224@gmail.com)</span>
                  </div>
                  <span className="text-[10px] bg-amber-800/40 px-2 py-0.5 rounded-full font-extrabold">
                    QUẢN TRỊ VIÊN
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-2xs hover:border-slate-400 transition-all active:scale-98"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <span>Đăng nhập với Google (Gmail)</span>
                </button>

                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs shadow-[#1877F2]/20 transition-all active:scale-98"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Đăng nhập với Facebook</span>
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">Hoặc email</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'register' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Họ và tên của bạn</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Địa chỉ Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700">Mật khẩu</label>
                    {mode === 'login' && (
                      <a href="#forgot" className="text-[11px] font-semibold text-red-600 hover:underline">
                        Quên mật khẩu?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all active:scale-98"
                >
                  {mode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Tạo Tài Khoản & Mở Khóa'}
                </button>

                <div className="text-center text-xs text-slate-500 pt-1">
                  {mode === 'login' ? (
                    <span>
                      Chưa có tài khoản?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('register')}
                        className="font-bold text-red-600 hover:underline"
                      >
                        Đăng ký ngay
                      </button>
                    </span>
                  ) : (
                    <span>
                      Đã có tài khoản?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="font-bold text-red-600 hover:underline"
                      >
                        Đăng nhập
                      </button>
                    </span>
                  )}
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
