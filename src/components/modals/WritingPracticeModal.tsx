import React, { useState, useRef, useEffect } from 'react';
import { X, PenTool, RotateCcw, Volume2, Sparkles, Check, ChevronRight, Lock, Crown } from 'lucide-react';
import { speechService } from '../../utils/speech';
import { UserProfile } from '../../types';

interface WritingPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestAuth: () => void;
}

const PRACTICE_WORDS = [
  { hanzi: '好', pinyin: 'hǎo', meaning: 'Tốt, đẹp', strokes: 6, breakdown: '女 (Nữ) + 子 (Tử)' },
  { hanzi: '学', pinyin: 'xué', meaning: 'Học tập', strokes: 8, breakdown: '冖 + 子' },
  { hanzi: '中', pinyin: 'zhōng', meaning: 'Trung tâm, ở giữa', strokes: 4, breakdown: 'Bộ Khẩu 口 xuyên qua nét sổ 丨' },
  { hanzi: '国', pinyin: 'guó', meaning: 'Đất nước', strokes: 8, breakdown: 'Bộ Vi 囗 + Bộ Ngọc 玉' },
  { hanzi: '人', pinyin: 'rén', meaning: 'Con người', strokes: 2, breakdown: 'Nét phẩy 丿 + Nét mác ㇏' },
  { hanzi: '家', pinyin: 'jiā', meaning: 'Gia đình, nhà', strokes: 10, breakdown: 'Bộ Miên 宀 + Bộ Thỉ 豕' },
];

export const WritingPracticeModal: React.FC<WritingPracticeModalProps> = ({ 
  isOpen, 
  onClose,
  currentUser,
  onRequestAuth
}) => {
  const [selectedWordIdx, setSelectedWordIdx] = useState(0);
  const [brushColor, setBrushColor] = useState('#1e293b');
  const [brushSize, setBrushSize] = useState(12);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeWord = PRACTICE_WORDS[selectedWordIdx];

  // Initialize Canvas Grid
  useEffect(() => {
    if (!isOpen) return;
    drawGrid();
  }, [isOpen, selectedWordIdx, showGuide]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution
    const size = 320;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Background
    ctx.fillStyle = '#fffdfa';
    ctx.fillRect(0, 0, size, size);

    // Red Grid Lines (Mễ tự cách 米字格)
    ctx.strokeStyle = '#fecaca';
    ctx.lineWidth = 1.5;

    // Outer box
    ctx.strokeRect(4, 4, size - 8, size - 8);

    // Cross lines
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    // Horizontal
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    // Vertical
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    // Diagonals
    ctx.moveTo(0, 0);
    ctx.lineTo(size, size);
    ctx.moveTo(size, 0);
    ctx.lineTo(0, size);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Watermark character guide
    if (showGuide) {
      ctx.fillStyle = '#fca5a5';
      ctx.globalAlpha = 0.35;
      ctx.font = '220px "Noto Sans SC", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(activeWord.hanzi, size / 2, size / 2 + 15);
      ctx.globalAlpha = 1.0;
    }
  };

  const handleClear = () => {
    drawGrid();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text, 0.85);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-red-100 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-gradient-to-r from-red-50/80 to-rose-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                Luyện Viết Chữ Hán Ô Mễ Tự Hoài Ngô
              </h3>
              <p className="text-xs text-slate-500">
                Tập viết chữ Hán trên ô kẻ chuẩn, luyện thứ tự nét và thư pháp số
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Word Select Tabs */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
          {PRACTICE_WORDS.map((w, idx) => {
            const isLocked = !currentUser && idx >= 2;
            const isSelected = selectedWordIdx === idx;

            return (
              <button
                key={w.hanzi}
                onClick={() => {
                  if (isLocked) {
                    onRequestAuth();
                    return;
                  }
                  setSelectedWordIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm shadow-red-500/20'
                    : isLocked
                    ? 'bg-slate-100 text-slate-400 border border-dashed border-red-200 hover:text-red-600'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isLocked && <Lock className="w-3 h-3 text-red-500" />}
                <span className="font-hanzi text-sm font-bold">{w.hanzi}</span>
                <span>({w.pinyin})</span>
              </button>
            );
          })}
        </div>

        {/* Canvas & Controls Workspace */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60 flex flex-col md:flex-row items-center justify-center gap-8">
          
          {/* Interactive Canvas Box */}
          <div className="flex flex-col items-center">
            <div className="bg-red-50 p-2 rounded-3xl shadow-xl border-2 border-red-200">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl cursor-crosshair touch-none bg-[#fffdfa]"
              />
            </div>

            {/* Brush & Control Bar */}
            <div className="flex items-center gap-3 mt-4 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={handleClear}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                title="Xóa làm lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa bảng</span>
              </button>

              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  showGuide ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {showGuide ? 'Ẩn nét mờ' : 'Hiện nét mờ'}
              </button>

              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                {['#1e293b', '#dc2626', '#b91c1c'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      brushColor === c ? 'scale-110 border-white ring-2 ring-red-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Word Analysis & Stroke guide details */}
          <div className="max-w-sm w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="text-center p-4 bg-red-50/60 rounded-2xl border border-red-100">
              <div className="font-hanzi text-5xl font-black text-slate-900">
                {activeWord.hanzi}
              </div>
              <div className="text-base font-bold text-red-700 mt-1">
                {activeWord.pinyin}
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                Nghĩa: {activeWord.meaning}
              </div>
              <button
                onClick={() => handleSpeak(activeWord.hanzi)}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full text-xs font-bold hover:from-red-700 hover:to-rose-700 shadow-xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe phát âm</span>
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Số nét viết:</span>
                <span className="font-bold text-red-700">{activeWord.strokes} nét</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Cấu tạo / Chiết tự:</span>
                <span className="font-semibold text-slate-800">{activeWord.breakdown}</span>
              </div>
              <div className="py-2 bg-slate-50 p-2.5 rounded-xl text-slate-600 italic border border-slate-100">
                💡 Quy tắc viết chữ Hán cơ bản: Ngang trước sổ sau, trên trước dưới sau, trái trước phải sau, ngoài trước trong sau, vào trước đóng sau.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
