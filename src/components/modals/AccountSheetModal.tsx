import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw, 
  Users, 
  BookOpen, 
  Crown, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronDown,
  ArrowUpDown,
  Filter,
  Layers,
  Sparkles,
  Flame,
  ShieldCheck,
  ShieldAlert,
  Lock
} from 'lucide-react';
import { UserAccountRecord, AccountSheetStats, HskLevel } from '../../types';

export const ADMIN_EMAIL = 'canhln1224@gmail.com';

interface AccountSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail?: string;
  onRequestAdminLogin?: () => void;
}

export const AccountSheetModal: React.FC<AccountSheetModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail,
  onRequestAdminLogin
}) => {
  const isAdmin = currentUserEmail?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const [accounts, setAccounts] = useState<UserAccountRecord[]>([]);
  const [stats, setStats] = useState<AccountSheetStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  const [vipFilter, setVipFilter] = useState('all');
  const [hskFilter, setHskFilter] = useState('all');
  const [sortBy, setSortBy] = useState<string>('lessonsCompleted');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Copy state
  const [copied, setCopied] = useState(false);

  // Edit / Add Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Partial<UserAccountRecord> | null>(null);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Fetch data (Admin Only)
  const fetchData = async () => {
    if (!isAdmin) {
      setAccounts([]);
      setStats(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (currentUserEmail) params.append('userEmail', currentUserEmail);
      if (searchQuery) params.append('search', searchQuery);
      if (providerFilter !== 'all') params.append('provider', providerFilter);
      if (vipFilter !== 'all') params.append('vip', vipFilter);
      if (hskFilter !== 'all') params.append('hsk', hskFilter);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const res = await fetch(`/api/accounts/stats?${params.toString()}`, {
        headers: {
          'x-user-email': currentUserEmail || ''
        }
      });
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error('Chỉ tài khoản admin canhln1224@gmail.com mới có quyền xem thông tin bảng Sheet thống kê.');
        }
        throw new Error('Không thể tải dữ liệu từ máy chủ');
      }
      const data = await res.json();
      setAccounts(data.accounts || []);
      setStats(data.summary || null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchData();
    }
  }, [isOpen, isAdmin, searchQuery, providerFilter, vipFilter, hskFilter, sortBy, sortOrder]);

  if (!isOpen) return null;

  // Export CSV (Admin Only)
  const handleExportCsv = () => {
    if (!isAdmin) return;
    window.open(`/api/accounts/export-csv?userEmail=${encodeURIComponent(currentUserEmail || '')}`, '_blank');
  };

  // Copy as TSV (Tab-Separated Values) for direct paste into Google Sheets / Excel
  const handleCopyTableToClipboard = () => {
    if (accounts.length === 0) return;

    const headers = [
      'STT',
      'Mã HV',
      'Họ và Tên',
      'Email',
      'Số Điện Thoại',
      'Kênh Đăng Nhập',
      'Gói VIP',
      'Mục Tiêu HSK',
      'Số Bài Học Đã Học',
      'Từ Vựng Đã Thuộc',
      'Bài Hội Thoại',
      'Chữ Hán Đã Viết',
      'Chính Tả Đạt',
      'Đề Thi Đã Làm',
      'Điểm TB (%)',
      'Tổng Giờ Học (h)',
      'Số Lần Đăng Nhập',
      'Đăng Nhập Gần Nhất',
      'Ngày Tạo'
    ];

    const rows = accounts.map((acc, index) => [
      index + 1,
      acc.id,
      acc.name,
      acc.email,
      acc.phone || '',
      acc.provider,
      acc.isVip ? 'VIP' : 'Miễn phí',
      `HSK ${acc.currentHskTarget}`,
      acc.lessonsCompleted,
      acc.hskWordsLearned,
      acc.dialoguesLearned,
      acc.writingPracticed,
      acc.dictationsPassed,
      acc.mockExamsDone,
      `${acc.avgScore}%`,
      acc.studyTimeHours,
      acc.loginCount,
      acc.lastLogin,
      acc.joinedDate
    ]);

    const tsvContent = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');

    navigator.clipboard.writeText(tsvContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Open Edit Modal
  const handleOpenEdit = (acc: UserAccountRecord) => {
    setEditingAccount({ ...acc });
    setIsNewAccount(false);
    setIsEditing(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingAccount({
      name: '',
      email: '',
      phone: '',
      provider: 'email',
      isVip: false,
      currentHskTarget: 1,
      lessonsCompleted: 0,
      hskWordsLearned: 0,
      dialoguesLearned: 0,
      writingPracticed: 0,
      dictationsPassed: 0,
      mockExamsDone: 0,
      avgScore: 80,
      studyTimeHours: 1.0,
      status: 'active',
      notes: ''
    });
    setIsNewAccount(true);
    setIsEditing(true);
  };

  // Save Account (Admin Only)
  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !editingAccount || !editingAccount.name || !editingAccount.email) return;

    setSaveLoading(true);
    try {
      if (isNewAccount) {
        const res = await fetch('/api/accounts/add', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-user-email': currentUserEmail || ''
          },
          body: JSON.stringify({ ...editingAccount, adminEmail: currentUserEmail })
        });
        if (!res.ok) throw new Error('Không thể thêm tài khoản');
      } else {
        const res = await fetch(`/api/accounts/${editingAccount.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'x-user-email': currentUserEmail || ''
          },
          body: JSON.stringify({ ...editingAccount, adminEmail: currentUserEmail })
        });
        if (!res.ok) throw new Error('Không thể cập nhật tài khoản');
      }

      setIsEditing(false);
      setEditingAccount(null);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi lưu dữ liệu');
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete Account (Admin Only)
  const handleDeleteAccount = async (id: string, name: string) => {
    if (!isAdmin) return;
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}" (${id}) khỏi bảng thống kê?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/accounts/${id}?userEmail=${encodeURIComponent(currentUserEmail || '')}`, { 
        method: 'DELETE',
        headers: { 'x-user-email': currentUserEmail || '' }
      });
      if (!res.ok) throw new Error('Không thể xóa tài khoản');
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa');
    }
  };

  // Toggle VIP status directly (Admin Only)
  const handleToggleVip = async (acc: UserAccountRecord) => {
    if (!isAdmin) return;
    try {
      const res = await fetch(`/api/accounts/${acc.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-email': currentUserEmail || ''
        },
        body: JSON.stringify({ isVip: !acc.isVip, adminEmail: currentUserEmail })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-7xl max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-800 to-rose-900 text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md">
              <FileSpreadsheet className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Bảng Sheet Thống Kê Tài Khoản & Tiến Độ Học Viên
                </h2>
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Mode (canhln1224@gmail.com)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-950/80 text-rose-300 border border-rose-400/30">
                    <Lock className="w-3 h-3" />
                    Bảo Mật Quyền Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-red-100/90 font-medium">
                Theo dõi số lượng tài khoản, thông tin người đăng nhập và tổng số bài học của từng học viên Hoài Ngô
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Đóng bảng thống kê"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ACCESS DENIED VIEW FOR NON-ADMIN USERS */}
        {!isAdmin ? (
          <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-slate-50 overflow-y-auto">
            <div className="w-20 h-20 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mb-5 shadow-inner ring-8 ring-red-50">
              <ShieldAlert className="w-10 h-10" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100/80 text-red-800 text-xs font-bold mb-3 border border-red-200">
              <Lock className="w-3.5 h-3.5" />
              Chế Độ Bảo Mật Dữ Liệu Học Viên
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Quyền Truy Cập Dành Riêng Cho Quản Trị Viên
            </h3>

            <p className="text-sm text-slate-600 max-w-lg mb-6 leading-relaxed">
              Theo quy định phân quyền hệ thống, bảng Sheet thống kê tài khoản, thông tin người đăng nhập và tổng số bài học chỉ hiển thị duy nhất cho tài khoản quản trị <strong className="text-red-700 font-bold">canhln1224@gmail.com</strong>.
              Tất cả các tài khoản học viên khác sẽ hoàn toàn không hiển thị thông tin này.
            </p>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs max-w-md w-full mb-6 text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tài khoản hiện tại:</span>
                <span className="font-bold text-slate-900 truncate max-w-[200px]">
                  {currentUserEmail || '(Chưa đăng nhập)'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Trạng thái phân quyền:</span>
                <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 text-[11px]">
                  Không có quyền Quản trị
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tài khoản Admin hợp lệ:</span>
                <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[11px]">
                  canhln1224@gmail.com
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onRequestAdminLogin && (
                <button
                  onClick={() => {
                    onClose();
                    onRequestAdminLogin();
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Đăng nhập Admin (canhln1224@gmail.com)</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top KPI Metrics Cards */}
            {stats && (
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 shrink-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  
                  {/* Tổng tài khoản */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100 text-red-700">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Tổng tài khoản</p>
                      <p className="text-lg font-black text-slate-900">{stats.totalAccounts}</p>
                    </div>
                  </div>

                  {/* Đang hoạt động */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Đang hoạt động</p>
                      <p className="text-lg font-black text-emerald-600">{stats.activeAccounts}</p>
                    </div>
                  </div>

                  {/* Tài khoản VIP */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Tài khoản VIP</p>
                      <p className="text-lg font-black text-amber-600">{stats.vipAccounts}</p>
                    </div>
                  </div>

                  {/* Tổng số bài học đã học */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Tổng số bài đã học</p>
                      <p className="text-lg font-black text-blue-700">{stats.totalLessonsCompleted}</p>
                    </div>
                  </div>

                  {/* TB bài / học viên */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">TB bài / học viên</p>
                      <p className="text-lg font-black text-purple-700">{stats.avgLessonsPerUser} bài</p>
                    </div>
                  </div>

                  {/* Tổng giờ học */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Tổng giờ học</p>
                      <p className="text-lg font-black text-rose-700">{stats.totalStudyHours}h</p>
                    </div>
                  </div>

                </div>
              </div>
            )}

        {/* Toolbar & Filters (Google Sheets Style) */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Left search & filter controls */}
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[300px]">
            
            {/* Search Input */}
            <div className="relative min-w-[220px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tên, email, mã HV, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Filter by Provider */}
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-700 font-medium"
            >
              <option value="all">Kênh: Tất cả</option>
              <option value="google">Google (Gmail)</option>
              <option value="facebook">Facebook</option>
              <option value="email">Email</option>
            </select>

            {/* Filter by VIP */}
            <select
              value={vipFilter}
              onChange={(e) => setVipFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-700 font-medium"
            >
              <option value="all">Hạng: Tất cả</option>
              <option value="vip">VIP Mở Khóa</option>
              <option value="free">Học thử / Miễn phí</option>
            </select>

            {/* Filter by HSK */}
            <select
              value={hskFilter}
              onChange={(e) => setHskFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-700 font-medium"
            >
              <option value="all">Cấp độ: Tất cả</option>
              <option value="1">HSK 1</option>
              <option value="2">HSK 2</option>
              <option value="3">HSK 3</option>
              <option value="4">HSK 4</option>
              <option value="5">HSK 5</option>
              <option value="6">HSK 6</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-');
                setSortBy(by);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-700 font-medium"
            >
              <option value="lessonsCompleted-desc">Số bài học (Nhiều nhất)</option>
              <option value="lessonsCompleted-asc">Số bài học (Ít nhất)</option>
              <option value="lastLogin-desc">Đăng nhập mới nhất</option>
              <option value="avgScore-desc">Điểm thi cao nhất</option>
              <option value="studyTimeHours-desc">Giờ học nhiều nhất</option>
              <option value="name-asc">Tên học viên (A-Z)</option>
            </select>

          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            
            {/* Copy to Clipboard (Format Google Sheet) */}
            <button
              onClick={handleCopyTableToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
              title="Sao chép toàn bộ bảng dữ liệu để dán trực tiếp vào Google Sheets hoặc Excel"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Dán vào Google Sheet</span>
                </>
              )}
            </button>

            {/* Export CSV / Excel */}
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg shadow-xs transition-colors"
              title="Tải tệp CSV tương thích hoàn toàn với Excel và Google Sheets (UTF-8 tiếng Việt chuẩn)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Xuất Excel / CSV</span>
            </button>

            {/* Add Account Button */}
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-lg shadow-sm shadow-red-500/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm tài khoản</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchData}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Làm mới bảng tính"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-600' : ''}`} />
            </button>

          </div>

        </div>

        {/* Main Spreadsheet Table Container */}
        <div className="flex-1 overflow-auto bg-slate-100 p-3 sm:p-4">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              
              {/* Spreadsheet Headers */}
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold select-none sticky top-0 z-10">
                  <th className="py-3 px-3 w-12 text-center border-r border-slate-200 bg-slate-100">STT</th>
                  <th className="py-3 px-3 w-24 border-r border-slate-200 bg-slate-100">Mã HV</th>
                  <th className="py-3 px-4 min-w-[200px] border-r border-slate-200 bg-slate-100">Học viên & Đăng nhập</th>
                  <th className="py-3 px-3 w-28 text-center border-r border-slate-200 bg-slate-100">Kênh</th>
                  <th className="py-3 px-3 w-24 text-center border-r border-slate-200 bg-slate-100">Mục tiêu</th>
                  <th className="py-3 px-4 min-w-[170px] border-r border-slate-200 bg-slate-100 text-red-900">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-red-600" />
                      <span>Số bài học đã học</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 min-w-[200px] border-r border-slate-200 bg-slate-100">Tiến độ chi tiết</th>
                  <th className="py-3 px-3 w-24 text-center border-r border-slate-200 bg-slate-100">Điểm TB</th>
                  <th className="py-3 px-3.5 min-w-[150px] border-r border-slate-200 bg-slate-100">Đăng nhập gần nhất</th>
                  <th className="py-3 px-3 w-24 text-center border-r border-slate-200 bg-slate-100">Hạng VIP</th>
                  <th className="py-3 px-3 w-24 text-center border-r border-slate-200 bg-slate-100">Trạng thái</th>
                  <th className="py-3 px-3 w-24 text-center bg-slate-100">Thao tác</th>
                </tr>
              </thead>

              {/* Spreadsheet Body Rows */}
              <tbody className="divide-y divide-slate-200">
                {loading && accounts.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-red-600" />
                        <p className="font-semibold text-slate-700">Đang đồng bộ dữ liệu bảng Sheet...</p>
                      </div>
                    </td>
                  </tr>
                ) : accounts.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="py-16 text-center text-slate-500">
                      <p className="font-semibold text-slate-700">Không tìm thấy tài khoản nào phù hợp bộ lọc.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setProviderFilter('all'); setVipFilter('all'); setHskFilter('all'); }}
                        className="mt-2 text-xs text-red-600 font-bold hover:underline"
                      >
                        Đặt lại bộ lọc
                      </button>
                    </td>
                  </tr>
                ) : (
                  accounts.map((acc, idx) => {
                    const isCurrent = currentUserEmail && acc.email.toLowerCase() === currentUserEmail.toLowerCase();
                    const lessonProgressPct = Math.min(100, Math.round((acc.lessonsCompleted / 120) * 100));

                    return (
                      <tr 
                        key={acc.id} 
                        className={`hover:bg-red-50/40 transition-colors ${isCurrent ? 'bg-amber-50/60 font-medium' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        {/* STT */}
                        <td className="py-2.5 px-3 text-center text-slate-400 font-mono border-r border-slate-100">
                          {idx + 1}
                        </td>

                        {/* Mã Học Viên */}
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-700 border-r border-slate-100">
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[11px] border border-slate-200">
                            {acc.id}
                          </span>
                        </td>

                        {/* Học viên & Email */}
                        <td className="py-2.5 px-4 border-r border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                              {acc.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="font-bold text-slate-900 truncate">{acc.name}</p>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black rounded-sm">
                                    BẠN
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                              {acc.phone && (
                                <p className="text-[10px] text-slate-400 font-mono">{acc.phone}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Kênh Đăng Nhập */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          {acc.provider === 'google' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              Google
                            </span>
                          )}
                          {acc.provider === 'facebook' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              Facebook
                            </span>
                          )}
                          {acc.provider === 'email' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Email VIP
                            </span>
                          )}
                        </td>

                        {/* Mục tiêu HSK */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          <span className="px-2 py-0.5 rounded-md font-bold text-xs bg-red-50 text-red-700 border border-red-200">
                            HSK {acc.currentHskTarget}
                          </span>
                        </td>

                        {/* SỐ BÀI HỌC ĐÃ HỌC (Key Requirement Highlight) */}
                        <td className="py-2.5 px-4 border-r border-slate-100 bg-red-50/20">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-black text-red-700">
                                {acc.lessonsCompleted} <span className="text-[11px] font-medium text-slate-500">bài</span>
                              </span>
                              <span className="text-[10px] font-bold text-slate-600">
                                {lessonProgressPct}%
                              </span>
                            </div>
                            {/* Visual Progress Bar */}
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-all"
                                style={{ width: `${lessonProgressPct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Tiến độ chi tiết */}
                        <td className="py-2.5 px-4 border-r border-slate-100">
                          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-slate-600">
                            <div>• 📖 Từ vựng: <span className="font-bold text-slate-800">{acc.hskWordsLearned}</span></div>
                            <div>• 💬 Hội thoại: <span className="font-bold text-slate-800">{acc.dialoguesLearned}</span></div>
                            <div>• ✍️ Tập viết: <span className="font-bold text-slate-800">{acc.writingPracticed}</span></div>
                            <div>• 🎧 Chính tả: <span className="font-bold text-slate-800">{acc.dictationsPassed}</span></div>
                          </div>
                        </td>

                        {/* Điểm TB */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          <span className={`font-black text-xs ${acc.avgScore >= 90 ? 'text-emerald-600' : acc.avgScore >= 80 ? 'text-blue-600' : 'text-amber-600'}`}>
                            {acc.avgScore}%
                          </span>
                        </td>

                        {/* Đăng nhập gần nhất */}
                        <td className="py-2.5 px-3.5 border-r border-slate-100">
                          <p className="text-slate-800 font-medium text-[11px]">{acc.lastLogin}</p>
                          <p className="text-[10px] text-slate-400">{acc.loginCount} lần đăng nhập • {acc.studyTimeHours}h học</p>
                        </td>

                        {/* Hạng VIP */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          <button
                            onClick={() => handleToggleVip(acc)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors inline-flex items-center gap-1 ${
                              acc.isVip 
                                ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' 
                                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            }`}
                            title="Click để thay đổi gói VIP"
                          >
                            {acc.isVip ? (
                              <>
                                <Crown className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                                VIP
                              </>
                            ) : (
                              'Miễn phí'
                            )}
                          </button>
                        </td>

                        {/* Trạng thái */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            acc.status === 'active' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {acc.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                          </span>
                        </td>

                        {/* Thao tác */}
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(acc)}
                              className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Chỉnh sửa số bài học & thông tin"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(acc.id, acc.name)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Xóa tài khoản khỏi bảng"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-800">
              Hiển thị: {accounts.length} / {stats?.totalAccounts || accounts.length} tài khoản học viên
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-500">
              Dữ liệu được cập nhật thời gian thực mỗi khi học viên đăng nhập và học tập
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              Đóng bảng Sheet
            </button>
          </div>
        </div>
      </>
    )}

      </div>

      {/* SUB-MODAL: Add / Edit Account */}
      {isEditing && editingAccount && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            
            <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                {isNewAccount ? 'Thêm tài khoản học viên mới' : `Chỉnh sửa: ${editingAccount.name} (${editingAccount.id})`}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAccount} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ và Tên *</label>
                  <input
                    type="text"
                    required
                    value={editingAccount.name || ''}
                    onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email đăng nhập *</label>
                  <input
                    type="email"
                    required
                    value={editingAccount.email || ''}
                    onChange={(e) => setEditingAccount({ ...editingAccount, email: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={editingAccount.phone || ''}
                    onChange={(e) => setEditingAccount({ ...editingAccount, phone: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="0912 345 678"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kênh đăng nhập</label>
                  <select
                    value={editingAccount.provider || 'email'}
                    onChange={(e) => setEditingAccount({ ...editingAccount, provider: e.target.value as any })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="google">Google (Gmail)</option>
                    <option value="facebook">Facebook</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              {/* Progress & Lessons */}
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <span>Cập nhật số bài học & tiến độ:</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tổng số bài học đã học:
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editingAccount.lessonsCompleted || 0}
                      onChange={(e) => setEditingAccount({ ...editingAccount, lessonsCompleted: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-xs font-bold text-red-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Từ vựng HSK đã thuộc:
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editingAccount.hskWordsLearned || 0}
                      onChange={(e) => setEditingAccount({ ...editingAccount, hskWordsLearned: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Bài hội thoại</label>
                    <input
                      type="number"
                      min={0}
                      value={editingAccount.dialoguesLearned || 0}
                      onChange={(e) => setEditingAccount({ ...editingAccount, dialoguesLearned: Number(e.target.value) })}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Chữ Hán đã viết</label>
                    <input
                      type="number"
                      min={0}
                      value={editingAccount.writingPracticed || 0}
                      onChange={(e) => setEditingAccount({ ...editingAccount, writingPracticed: Number(e.target.value) })}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">Chính tả đạt</label>
                    <input
                      type="number"
                      min={0}
                      value={editingAccount.dictationsPassed || 0}
                      onChange={(e) => setEditingAccount({ ...editingAccount, dictationsPassed: Number(e.target.value) })}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mục tiêu HSK</label>
                  <select
                    value={editingAccount.currentHskTarget || 1}
                    onChange={(e) => setEditingAccount({ ...editingAccount, currentHskTarget: Number(e.target.value) as HskLevel })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(lvl => (
                      <option key={lvl} value={lvl}>HSK {lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gói thành viên</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingAccount.isVip || false}
                      onChange={(e) => setEditingAccount({ ...editingAccount, isVip: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                      Mở khóa VIP (Toàn bộ bài học)
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú học viên</label>
                <textarea
                  rows={2}
                  value={editingAccount.notes || ''}
                  onChange={(e) => setEditingAccount({ ...editingAccount, notes: e.target.value })}
                  placeholder="Ghi chú về mục tiêu, tiến trình hoặc hỗ trợ đặc biệt..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
                >
                  {saveLoading ? 'Đang lưu...' : 'Lưu dữ liệu'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
