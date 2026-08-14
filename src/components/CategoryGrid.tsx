import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  MessageCircle, 
  FileText, 
  Award, 
  Grid, 
  Languages, 
  Mic, 
  PenTool, 
  ListOrdered, 
  CalendarCheck,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { LEARNING_CATEGORIES } from '../data/chineseData';
import { LearningCategory, UserProfile } from '../types';

interface CategoryGridProps {
  onSelectCategory: (actionKey: string) => void;
  currentUser: UserProfile | null;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, currentUser }) => {
  
  // Icon mapper helper
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'MessageCircle': return <MessageCircle className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Grid': return <Grid className={className} />;
      case 'Languages': return <Languages className={className} />;
      case 'Mic': return <Mic className={className} />;
      case 'PenTool': return <PenTool className={className} />;
      case 'ListOrdered': return <ListOrdered className={className} />;
      case 'CalendarCheck': return <CalendarCheck className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-white border-t border-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Nội dung đa dạng & toàn diện</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tất cả những gì bạn cần <br className="hidden sm:block" />
            để <span className="text-red-600">thành thạo tiếng Trung Hoài Ngô</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            11 chuyên mục học tập được thiết kế khoa học, từ vựng chuẩn HSK 3.0, phát âm Bắc Kinh và phân tích ngữ pháp
          </p>

          {!currentUser && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-lg text-amber-800 text-xs font-medium border border-amber-200">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Chưa đăng nhập: Học thử miễn phí 2 bài/chức năng. Đăng nhập Gmail/Facebook để mở toàn bộ.</span>
            </div>
          )}
        </div>

        {/* 11 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.actionKey)}
              className="group relative bg-white hover:bg-red-50/20 rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 hover:-translate-y-2 transition-all duration-300 ease-out will-change-transform cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Icon Box & Free badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                    {renderIcon(category.iconName, `w-6 h-6 ${category.iconColor}`)}
                  </div>
                  
                  {!currentUser ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Thử 2 bài
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Đã mở khóa
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Bottom Row: Lesson count & Arrow */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-red-600 transition-colors">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500" />
                  {category.lessonCount}
                </span>

                <span className="flex items-center gap-1 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">
                  <span>Học ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
