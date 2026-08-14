import React from 'react';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Facebook, 
  Youtube, 
  Globe,
  GraduationCap
} from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onSelectCategory: (key: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-red-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showText={true} textColor="text-white" />

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Nền tảng e-learning học tiếng Trung trực tuyến hàng đầu, cung cấp lộ trình từ con số 0 đến HSK 6, 
              luyện thi HSK 3.0, 214 bộ thủ chiết tự, luyện phát âm và trợ lý AI thông minh Hoài Ngô.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://tiengtrunghoaingo.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Khóa học */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Khóa Học HSK
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('hsk')} className="hover:text-red-400 transition-colors">
                  Giáo trình HSK 1 - 6
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hsk')} className="hover:text-red-400 transition-colors">
                  Chuẩn HSK 3.0 mới nhất
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('topic_vocab')} className="hover:text-red-400 transition-colors">
                  Từ vựng theo chủ đề
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('dialogue')} className="hover:text-red-400 transition-colors">
                  Hội thoại giao tiếp thực tế
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('radicals')} className="hover:text-red-400 transition-colors">
                  214 Bộ thủ Hán tự & Chiết tự
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Công cụ & Luyện thi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Công Cụ Học Tập
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('translate')} className="hover:text-red-400 transition-colors">
                  Tra cứu Hán Việt & Dịch câu
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('writing')} className="hover:text-red-400 transition-colors">
                  Luyện viết ô Mễ tự
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('exam')} className="hover:text-red-400 transition-colors">
                  Thi thử HSK Online
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('thpt_exam')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đề thi THPT Quốc Gia</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('measure_words')} className="hover:text-red-400 transition-colors">
                  Tra cứu Lượng từ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Liên hệ & Tải App */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>tiengtrunghoaingo@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>0988.668.xxx (Hotline)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>Hà Nội & TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Tiếng Trung Hoài Ngô (怀吴汉语). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#privacy" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#guide" className="hover:text-white transition-colors">Hướng dẫn học</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
