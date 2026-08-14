import React from 'react';
import { Rocket, Sparkles, Smartphone, CheckCircle } from 'lucide-react';

interface CallToActionProps {
  onRegister: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onRegister }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-400/30 text-red-300 text-xs font-semibold">
          <Rocket className="w-4 h-4 text-red-400" />
          <span>Bắt đầu học tiếng Trung cùng Hoài Ngô</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Sẵn sàng <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">chinh phục tiếng Trung</span>?
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Tham gia cùng hơn 50,000 học viên đã và đang học tiếng Trung hiệu quả với Tiếng Trung Hoài Ngô. 
          Đăng nhập ngay bằng Gmail hoặc Facebook để mở khóa trọn bộ 100% kho tài liệu miễn phí!
        </p>

        {/* Bullet perks */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 pt-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Mở khóa 11,000+ từ vựng HSK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>AI Gia sư Hoài Ngô 24/7</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Đề thi THPT & HSK có chấm điểm</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
          <button
            onClick={onRegister}
            className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Đăng nhập / Đăng ký mở khóa</span>
          </button>

          <a
            href="#app-download"
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm sm:text-base rounded-xl transition-all"
          >
            <Smartphone className="w-4 h-4 text-slate-400" />
            <span>Tải ứng dụng</span>
          </a>
        </div>

      </div>
    </section>
  );
};
