import React from 'react';
import { X, Settings, Volume2, Type, Sliders, Check } from 'lucide-react';
import { AppSettings } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Cài Đặt Học Tập Hoài Ngô</h3>
              <p className="text-xs text-slate-500">Tùy chỉnh hiển thị Pinyin, tốc độ đọc và font chữ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-6 space-y-6 bg-white">
          
          {/* Toggle: Hiển thị Pinyin */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-800">Hiển thị Pinyin (Phiên âm)</div>
              <p className="text-xs text-slate-500">Bật/tắt dòng phiên âm trên các thẻ từ vựng</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ showPinyin: !settings.showPinyin })}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                settings.showPinyin ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.showPinyin ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle: Âm Hán Việt */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-800">Hiển thị Âm Hán Việt</div>
              <p className="text-xs text-slate-500">Hỗ trợ nhận diện nghĩa tương đồng trong tiếng Việt</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ showHanViet: !settings.showHanViet })}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                settings.showHanViet ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.showHanViet ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Speech Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-800">Tốc độ phát âm giọng đọc:</span>
              <span className="font-bold text-red-600">{settings.speechRate}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.2"
              step="0.1"
              value={settings.speechRate}
              onChange={(e) => onUpdateSettings({ speechRate: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Chậm (0.6x)</span>
              <span>Chuẩn (0.9x)</span>
              <span>Nhanh (1.2x)</span>
            </div>
          </div>

          {/* Font size picker */}
          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-800">Cỡ chữ Hán tự:</div>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateSettings({ fontSize: size })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    settings.fontSize === size
                      ? 'bg-red-50 text-red-700 border-red-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {size === 'small' ? 'Nhỏ' : size === 'medium' ? 'Vừa' : 'Lớn'}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            Lưu cài đặt
          </button>
        </div>

      </div>
    </div>
  );
};
