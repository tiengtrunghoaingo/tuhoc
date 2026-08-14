import React from 'react';
import { BookOpen, PenTool, MessageSquare, Award } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: BookOpen,
      count: '11,000+',
      label: 'Từ vựng HSK',
      description: 'Hệ thống từ vựng đầy đủ từ HSK 1 đến HSK 6 & HSK 3.0',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    {
      icon: PenTool,
      count: '300+',
      label: 'Bộ thủ & Chiết tự',
      description: '214 bộ thủ và các biến thể chữ Hán thông dụng nhất',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    },
    {
      icon: MessageSquare,
      count: '1,000+',
      label: 'Hội thoại mẫu',
      description: 'Tình huống giao tiếp thực tế với audio phát âm chuẩn bản xứ',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: Award,
      count: '500+',
      label: 'Bài đọc & Đề thi THPT',
      description: 'Đa dạng chủ đề, hệ thống chấm điểm và giải thích tức thì',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100'
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-slate-50 border-t border-b border-red-100/60">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-xl hover:border-red-200 hover:-translate-y-1.5 transition-all duration-300 ease-out will-change-transform cursor-default group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                    {stat.count}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {stat.label}
                  </div>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-none mt-1">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
