import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Tiếng Trung Hoài Ngô" });
  });

  // AI Tutor / Chat Endpoint
  app.post("/api/gemini/tutor", async (req, res) => {
    try {
      const { message, context, mode } = req.body;
      const ai = getGenAI();

      if (!ai) {
        // Fallback intelligent responses when GEMINI_API_KEY is not configured yet
        const sampleResponses: Record<string, string> = {
          default: `Xin chào! Tôi là Trợ lý AI của Tiếng Trung Hoài Ngô 怀吴. 
Tôi có thể hỗ trợ bạn:
- Giải thích ngữ pháp HSK 1 - 6 và HSK 3.0
- Hướng dẫn phát âm, phân biệt thanh điệu và Pinyin
- Phân tích chiết tự và các nét của chữ Hán (214 bộ thủ)
- Dịch và sửa lỗi câu tiếng Trung
- Luyện hội thoại theo chủ đề thực tế.

Bạn đang cần giải đáp phần kiến thức nào hôm nay?`,
          grammar: `Cấu trúc câu chữ "把" (bǎ) trong tiếng Trung:
**Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác**
*Ví dụ:* 
- 我把作业做完了。(Wǒ bǎ zuòyè zuò wán le) - Tôi đã làm xong bài tập rồi.
*Lưu ý:* Tân ngữ phải là đối tượng xác định và động từ phải tạo ra sự thay đổi hoặc kết quả cho đối tượng đó.`,
          hanzi: `Chữ **“好” (Hảo - Tốt, đẹp)**:
- Gồm 2 bộ thủ: Bộ Nữ (女 - Người phụ nữ) bên trái + Bộ Tử (子 - Đứa con) bên phải.
- Ý nghĩa chiết tự: Người phụ nữ có con trai con gái hòa thuận bên nhau là điều tốt lành, trọn vẹn nhất.
- Pinyin: hǎo (Thanh 3), ví dụ: 你好 (nǐ hǎo - Xin chào), 好吃 (hǎochī - Ngon).`
        };

        const reply = mode && sampleResponses[mode] ? sampleResponses[mode] : sampleResponses.default;
        return res.json({ reply });
      }

      const systemPrompt = `Bạn là Trợ lý Giáo viên Tiếng Trung AI tại nền tảng "Tiếng Trung Hoài Ngô" (怀吴汉语). 
Hãy đóng vai một giáo viên tiếng Trung chuẩn mực, tận tâm, giàu kinh nghiệm và phát âm chuẩn Bắc Kinh.
Nhiệm vụ của bạn:
1. Giải đáp thắc mắc về ngữ pháp tiếng Trung, chữ Hán (Hán tự), Pinyin (phiên âm), Hán Việt, cách phát âm, ngữ điệu.
2. Luôn đính kèm Pinyin và dịch nghĩa tiếng Việt rõ ràng, kèm ví dụ thực tế.
3. Khi phân tích chữ Hán, hãy giải thích bộ thủ cấu tạo (chiết tự) và cách nhớ thú vị.
4. Trả lời bằng tiếng Việt thân thiện, khuyến khích học viên, dùng định dạng Markdown dễ đọc (bullet, bold, code block nếu cần).
Chế độ hiện tại: ${mode || 'general'}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nNgữ cảnh bổ sung: ${context || 'Không có'}\n\nCâu hỏi/Yêu cầu của học viên: ${message}` }]
          }
        ],
      });

      const replyText = response.text || "Rất tiếc, đã xảy ra lỗi khi tạo câu trả lời. Bạn hãy thử lại nhé!";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini Tutor Error:", error);
      return res.status(500).json({ 
        error: "Không thể kết nối với gia sư AI lúc này.",
        fallback: "Xin lỗi bạn, trợ lý AI đang bận một chút. Bạn có thể kiểm tra danh mục bài giảng hoặc thử lại sau vài giây!" 
      });
    }
  });

  // AI Translation & Hanzi Breakdown endpoint
  app.post("/api/gemini/translate", async (req, res) => {
    try {
      const { text, from, to } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          translation: `Bản dịch thử nghiệm: ${text}`,
          pinyin: "nǐ hǎo ma",
          hanziBreakdown: [
            { char: "你", pinyin: "nǐ", hanViet: "Nhĩ", meaning: "Bạn, anh, chị" },
            { char: "好", pinyin: "hǎo", hanViet: "Hảo", meaning: "Tốt, an lành" }
          ]
        });
      }

      const prompt = `Bạn là chuyên gia dịch thuật và phân tích ngôn ngữ Trung - Việt tại Tiếng Trung Hoài Ngô.
Hãy dịch đoạn văn bản sau từ ${from || 'tự động'} sang ${to || 'tiếng Việt/tiếng Trung'}:
"${text}"

Trả về JSON duy nhất theo cấu trúc:
{
  "translation": "Nội dung dịch chính xác, tự nhiên",
  "pinyin": "Pinyin đầy đủ có dấu thanh",
  "hanViet": "Âm Hán Việt tương ứng nếu là tiếng Trung",
  "notes": "Lưu ý ngữ pháp hoặc từ vựng quan trọng",
  "hanziBreakdown": [
    { "char": "chữ Hán", "pinyin": "phiên âm", "hanViet": "Hán Việt", "meaning": "nghĩa" }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const resultText = response.text || "{}";
      const parsed = JSON.parse(resultText);
      return res.json(parsed);
    } catch (error) {
      console.error("Translation Error:", error);
      return res.json({
        translation: "Không thể phân tích trực tuyến.",
        pinyin: "",
        hanziBreakdown: []
      });
    }
  });

  // Account Data Store for Sheet Statistics
  interface ServerAccountRecord {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    provider: 'google' | 'facebook' | 'email';
    isVip: boolean;
    joinedDate: string;
    lastLogin: string;
    loginCount: number;
    lessonsCompleted: number;
    hskWordsLearned: number;
    dialoguesLearned: number;
    writingPracticed: number;
    dictationsPassed: number;
    mockExamsDone: number;
    currentHskTarget: number;
    avgScore: number;
    studyTimeHours: number;
    status: 'active' | 'inactive' | 'locked';
    notes?: string;
  }

  // Master Admin Account Email
  const ADMIN_EMAIL = "canhln1224@gmail.com";

  let accountsDatabase: ServerAccountRecord[] = [
    {
      id: "ADMIN-001",
      name: "Cảnh LN (Quản Trị Viên)",
      email: "canhln1224@gmail.com",
      phone: "0988 888 999",
      provider: "google",
      isVip: true,
      joinedDate: "2026-05-01",
      lastLogin: "2026-08-14 14:00",
      loginCount: 150,
      lessonsCompleted: 120,
      hskWordsLearned: 1200,
      dialoguesLearned: 50,
      writingPracticed: 350,
      dictationsPassed: 60,
      mockExamsDone: 15,
      currentHskTarget: 6,
      avgScore: 99,
      studyTimeHours: 120.0,
      status: "active",
      notes: "Tài khoản Quản trị viên Tối cao (Admin Master) của hệ thống Tiếng Trung Hoài Ngô."
    },
    {
      id: "HV-1001",
      name: "Nguyễn Văn Hùng",
      email: "vanhung.nguyen@gmail.com",
      phone: "0912 345 678",
      provider: "google",
      isVip: true,
      joinedDate: "2026-06-15",
      lastLogin: "2026-08-14 10:25",
      loginCount: 48,
      lessonsCompleted: 86,
      hskWordsLearned: 520,
      dialoguesLearned: 24,
      writingPracticed: 180,
      dictationsPassed: 35,
      mockExamsDone: 8,
      currentHskTarget: 4,
      avgScore: 94,
      studyTimeHours: 62.5,
      status: "active",
      notes: "Học viên xuất sắc, đang ôn thi HSK 4 cấp tốc."
    },
    {
      id: "HV-1002",
      name: "Trần Thị Mai Anh",
      email: "maianh.tran99@gmail.com",
      phone: "0987 654 321",
      provider: "google",
      isVip: true,
      joinedDate: "2026-07-02",
      lastLogin: "2026-08-14 09:12",
      loginCount: 36,
      lessonsCompleted: 64,
      hskWordsLearned: 380,
      dialoguesLearned: 18,
      writingPracticed: 120,
      dictationsPassed: 28,
      mockExamsDone: 5,
      currentHskTarget: 3,
      avgScore: 89,
      studyTimeHours: 45.0,
      status: "active",
      notes: "Tiến độ học đều đặn, phát âm chuẩn."
    },
    {
      id: "HV-1003",
      name: "Lê Hoàng Long",
      email: "hoanglong.le@facebook.com",
      phone: "0903 112 233",
      provider: "facebook",
      isVip: true,
      joinedDate: "2026-07-10",
      lastLogin: "2026-08-13 21:40",
      loginCount: 29,
      lessonsCompleted: 52,
      hskWordsLearned: 310,
      dialoguesLearned: 15,
      writingPracticed: 95,
      dictationsPassed: 20,
      mockExamsDone: 4,
      currentHskTarget: 3,
      avgScore: 85,
      studyTimeHours: 38.2,
      status: "active",
      notes: "Đăng ký gói VIP qua Facebook, chăm chỉ làm bài tập chép chính tả."
    },
    {
      id: "HV-1004",
      name: "Phạm Minh Trang",
      email: "minhtrang.pham@gmail.com",
      phone: "0934 556 789",
      provider: "google",
      isVip: true,
      joinedDate: "2026-07-18",
      lastLogin: "2026-08-14 08:30",
      loginCount: 42,
      lessonsCompleted: 78,
      hskWordsLearned: 490,
      dialoguesLearned: 22,
      writingPracticed: 160,
      dictationsPassed: 30,
      mockExamsDone: 6,
      currentHskTarget: 4,
      avgScore: 92,
      studyTimeHours: 54.0,
      status: "active",
      notes: "Mục tiêu du học Trung Quốc mùa thu tới."
    },
    {
      id: "HV-1005",
      name: "Vũ Đức Thắng",
      email: "thang.vuduc@hotmail.com",
      phone: "0977 889 900",
      provider: "email",
      isVip: false,
      joinedDate: "2026-08-01",
      lastLogin: "2026-08-14 07:15",
      loginCount: 12,
      lessonsCompleted: 18,
      hskWordsLearned: 95,
      dialoguesLearned: 6,
      writingPracticed: 35,
      dictationsPassed: 8,
      mockExamsDone: 1,
      currentHskTarget: 2,
      avgScore: 78,
      studyTimeHours: 14.5,
      status: "active",
      notes: "Tài khoản học thử, quan tâm khóa HSK 2."
    },
    {
      id: "HV-1006",
      name: "Đỗ Bích Ngọc",
      email: "bichngoc.do@gmail.com",
      phone: "0918 223 344",
      provider: "google",
      isVip: true,
      joinedDate: "2026-06-20",
      lastLogin: "2026-08-13 18:50",
      loginCount: 55,
      lessonsCompleted: 112,
      hskWordsLearned: 780,
      dialoguesLearned: 32,
      writingPracticed: 240,
      dictationsPassed: 45,
      mockExamsDone: 10,
      currentHskTarget: 5,
      avgScore: 96,
      studyTimeHours: 88.0,
      status: "active",
      notes: "Top 1 bảng xếp hạng tháng 7, hoàn thành khóa HSK 5."
    },
    {
      id: "HV-1007",
      name: "Hoàng Gia Bảo",
      email: "giabao.hoang@facebook.com",
      phone: "0945 667 788",
      provider: "facebook",
      isVip: false,
      joinedDate: "2026-08-05",
      lastLogin: "2026-08-12 14:20",
      loginCount: 8,
      lessonsCompleted: 14,
      hskWordsLearned: 70,
      dialoguesLearned: 4,
      writingPracticed: 25,
      dictationsPassed: 5,
      mockExamsDone: 1,
      currentHskTarget: 1,
      avgScore: 82,
      studyTimeHours: 9.0,
      status: "active",
      notes: "Người mới bắt đầu làm quen Pinyin và nét cơ bản."
    },
    {
      id: "HV-1008",
      name: "Đinh Thị Quỳnh",
      email: "quynh.dinh95@gmail.com",
      phone: "0962 334 455",
      provider: "google",
      isVip: true,
      joinedDate: "2026-07-25",
      lastLogin: "2026-08-14 11:05",
      loginCount: 22,
      lessonsCompleted: 44,
      hskWordsLearned: 260,
      dialoguesLearned: 12,
      writingPracticed: 80,
      dictationsPassed: 18,
      mockExamsDone: 3,
      currentHskTarget: 3,
      avgScore: 88,
      studyTimeHours: 32.0,
      status: "active",
      notes: "Luyện thi HSK 3 đi làm văn phòng công ty Trung Quốc."
    },
    {
      id: "HV-1009",
      name: "Dương Tuấn Kiệt",
      email: "tuankiet.duong@gmail.com",
      phone: "0923 445 566",
      provider: "google",
      isVip: false,
      joinedDate: "2026-08-10",
      lastLogin: "2026-08-13 16:30",
      loginCount: 5,
      lessonsCompleted: 8,
      hskWordsLearned: 45,
      dialoguesLearned: 2,
      writingPracticed: 15,
      dictationsPassed: 3,
      mockExamsDone: 0,
      currentHskTarget: 1,
      avgScore: 75,
      studyTimeHours: 5.5,
      status: "active",
      notes: "Học viên mới đăng ký tuần này."
    },
    {
      id: "HV-1010",
      name: "Bùi Phương Thảo",
      email: "phuongthao.bui@yahoo.com",
      phone: "0909 887 766",
      provider: "email",
      isVip: true,
      joinedDate: "2026-06-28",
      lastLogin: "2026-08-14 06:45",
      loginCount: 40,
      lessonsCompleted: 70,
      hskWordsLearned: 440,
      dialoguesLearned: 20,
      writingPracticed: 150,
      dictationsPassed: 26,
      mockExamsDone: 6,
      currentHskTarget: 4,
      avgScore: 91,
      studyTimeHours: 51.5,
      status: "active",
      notes: "Tích cực tương tác với AI Gia Sư Hoài Ngô để chữa ngữ pháp."
    }
  ];

  // API: Get All Accounts & Computed Statistics for the Sheet (ADMIN ONLY)
  app.get("/api/accounts/stats", (req, res) => {
    try {
      const requesterEmail = (
        (req.query.userEmail as string) ||
        (req.headers["x-user-email"] as string) ||
        ""
      ).trim().toLowerCase();

      // STRICT ACCESS CONTROL: Only admin canhln1224@gmail.com can view accounts statistics
      if (requesterEmail !== ADMIN_EMAIL.toLowerCase()) {
        return res.status(403).json({
          error: "Truy cập bị từ chối: Bảng Sheet thống kê tài khoản chỉ dành riêng cho Quản trị viên (canhln1224@gmail.com).",
          unauthorized: true,
          adminEmail: ADMIN_EMAIL,
          summary: null,
          accounts: []
        });
      }

      const search = (req.query.search as string || "").toLowerCase();
      const provider = req.query.provider as string;
      const vip = req.query.vip as string;
      const hsk = req.query.hsk as string;
      const sortBy = (req.query.sortBy as string) || "lessonsCompleted";
      const sortOrder = (req.query.sortOrder as string) || "desc";

      let filtered = [...accountsDatabase];

      if (search) {
        filtered = filtered.filter(acc => 
          acc.name.toLowerCase().includes(search) ||
          acc.email.toLowerCase().includes(search) ||
          acc.id.toLowerCase().includes(search) ||
          (acc.phone && acc.phone.includes(search))
        );
      }

      if (provider && provider !== 'all') {
        filtered = filtered.filter(acc => acc.provider === provider);
      }

      if (vip && vip !== 'all') {
        filtered = filtered.filter(acc => vip === 'vip' ? acc.isVip : !acc.isVip);
      }

      if (hsk && hsk !== 'all') {
        filtered = filtered.filter(acc => acc.currentHskTarget.toString() === hsk);
      }

      // Sort
      filtered.sort((a, b) => {
        let valA = (a as any)[sortBy];
        let valB = (b as any)[sortBy];

        if (typeof valA === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortOrder === 'asc' ? (valA - valB) : (valB - valA);
      });

      // Compute aggregate statistics
      const totalAccounts = accountsDatabase.length;
      const activeAccounts = accountsDatabase.filter(a => a.status === 'active').length;
      const vipAccounts = accountsDatabase.filter(a => a.isVip).length;
      const totalLessonsCompleted = accountsDatabase.reduce((sum, a) => sum + (a.lessonsCompleted || 0), 0);
      const totalStudyHours = accountsDatabase.reduce((sum, a) => sum + (a.studyTimeHours || 0), 0);
      const avgLessonsPerUser = totalAccounts > 0 ? Math.round((totalLessonsCompleted / totalAccounts) * 10) / 10 : 0;

      const providerCounts = {
        google: accountsDatabase.filter(a => a.provider === 'google').length,
        facebook: accountsDatabase.filter(a => a.provider === 'facebook').length,
        email: accountsDatabase.filter(a => a.provider === 'email').length,
      };

      res.json({
        summary: {
          totalAccounts,
          activeAccounts,
          vipAccounts,
          totalLessonsCompleted,
          totalStudyHours: Math.round(totalStudyHours * 10) / 10,
          avgLessonsPerUser,
          providerCounts
        },
        accounts: filtered
      });
    } catch (err: any) {
      console.error("Account Stats Error:", err);
      res.status(500).json({ error: "Không thể lấy dữ liệu thống kê tài khoản" });
    }
  });

  // API: Sync or Register Current User's Login and Progress
  app.post("/api/accounts/sync", (req, res) => {
    try {
      const { user, lessonDelta = 0, wordsDelta = 0, studyMinutesDelta = 0 } = req.body;
      if (!user || !user.email) {
        return res.status(400).json({ error: "Thông tin người dùng không hợp lệ" });
      }

      const existingIndex = accountsDatabase.findIndex(a => a.email.toLowerCase() === user.email.toLowerCase());
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

      if (existingIndex >= 0) {
        // Update existing account
        const acc = accountsDatabase[existingIndex];
        acc.name = user.name || acc.name;
        acc.avatar = user.avatar || acc.avatar;
        acc.provider = user.provider || acc.provider;
        acc.isVip = user.isVip !== undefined ? user.isVip : acc.isVip;
        acc.lastLogin = nowStr;
        acc.loginCount += 1;
        if (lessonDelta > 0) acc.lessonsCompleted += lessonDelta;
        if (wordsDelta > 0) acc.hskWordsLearned += wordsDelta;
        if (studyMinutesDelta > 0) acc.studyTimeHours = Math.round((acc.studyTimeHours + (studyMinutesDelta / 60)) * 10) / 10;
        acc.status = 'active';

        return res.json({ success: true, account: acc });
      } else {
        // Create new account entry
        const nextId = `HV-${1000 + accountsDatabase.length + 1}`;
        const newAcc: ServerAccountRecord = {
          id: nextId,
          name: user.name || "Học viên Hoài Ngô",
          email: user.email,
          avatar: user.avatar,
          phone: user.phone || "",
          provider: user.provider || "google",
          isVip: user.isVip || false,
          joinedDate: new Date().toISOString().substring(0, 10),
          lastLogin: nowStr,
          loginCount: 1,
          lessonsCompleted: lessonDelta > 0 ? lessonDelta : 2,
          hskWordsLearned: wordsDelta > 0 ? wordsDelta : 15,
          dialoguesLearned: 1,
          writingPracticed: 5,
          dictationsPassed: 1,
          mockExamsDone: 0,
          currentHskTarget: 1,
          avgScore: 80,
          studyTimeHours: Math.round(((studyMinutesDelta || 15) / 60) * 10) / 10,
          status: "active",
          notes: "Tài khoản vừa đăng nhập trên hệ thống"
        };
        accountsDatabase.unshift(newAcc);
        return res.json({ success: true, account: newAcc });
      }
    } catch (err: any) {
      console.error("Sync Error:", err);
      res.status(500).json({ error: "Lỗi đồng bộ tài khoản" });
    }
  });

  // API: Add New Account Directly in Sheet (ADMIN ONLY)
  app.post("/api/accounts/add", (req, res) => {
    try {
      const requesterEmail = (
        (req.body.adminEmail as string) ||
        (req.headers["x-user-email"] as string) ||
        ""
      ).trim().toLowerCase();

      if (requesterEmail !== ADMIN_EMAIL.toLowerCase()) {
        return res.status(403).json({ error: "Truy cập bị từ chối: Chỉ tài khoản admin canhln1224@gmail.com mới có quyền thêm tài khoản." });
      }

      const data = req.body;
      const nextId = `HV-${1000 + accountsDatabase.length + 1}`;
      const newRecord: ServerAccountRecord = {
        id: data.id || nextId,
        name: data.name || "Học viên mới",
        email: data.email,
        phone: data.phone || "",
        provider: data.provider || "email",
        isVip: data.isVip || false,
        joinedDate: data.joinedDate || new Date().toISOString().substring(0, 10),
        lastLogin: data.lastLogin || new Date().toISOString().replace('T', ' ').substring(0, 16),
        loginCount: Number(data.loginCount) || 1,
        lessonsCompleted: Number(data.lessonsCompleted) || 0,
        hskWordsLearned: Number(data.hskWordsLearned) || 0,
        dialoguesLearned: Number(data.dialoguesLearned) || 0,
        writingPracticed: Number(data.writingPracticed) || 0,
        dictationsPassed: Number(data.dictationsPassed) || 0,
        mockExamsDone: Number(data.mockExamsDone) || 0,
        currentHskTarget: Number(data.currentHskTarget) || 1,
        avgScore: Number(data.avgScore) || 80,
        studyTimeHours: Number(data.studyTimeHours) || 1.0,
        status: data.status || "active",
        notes: data.notes || ""
      };

      accountsDatabase.unshift(newRecord);
      res.json({ success: true, account: newRecord });
    } catch (err: any) {
      res.status(500).json({ error: "Không thể thêm tài khoản mới" });
    }
  });

  // API: Update Account (e.g. edit lesson count, VIP status, notes) (ADMIN ONLY)
  app.put("/api/accounts/:id", (req, res) => {
    try {
      const requesterEmail = (
        (req.body.adminEmail as string) ||
        (req.headers["x-user-email"] as string) ||
        ""
      ).trim().toLowerCase();

      if (requesterEmail !== ADMIN_EMAIL.toLowerCase()) {
        return res.status(403).json({ error: "Truy cập bị từ chối: Chỉ tài khoản admin canhln1224@gmail.com mới có quyền cập nhật dữ liệu." });
      }

      const { id } = req.params;
      const updateData = req.body;
      const index = accountsDatabase.findIndex(a => a.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Không tìm thấy tài khoản" });
      }

      accountsDatabase[index] = {
        ...accountsDatabase[index],
        ...updateData,
        lessonsCompleted: updateData.lessonsCompleted !== undefined ? Number(updateData.lessonsCompleted) : accountsDatabase[index].lessonsCompleted,
        hskWordsLearned: updateData.hskWordsLearned !== undefined ? Number(updateData.hskWordsLearned) : accountsDatabase[index].hskWordsLearned,
        studyTimeHours: updateData.studyTimeHours !== undefined ? Number(updateData.studyTimeHours) : accountsDatabase[index].studyTimeHours,
        avgScore: updateData.avgScore !== undefined ? Number(updateData.avgScore) : accountsDatabase[index].avgScore,
        currentHskTarget: updateData.currentHskTarget !== undefined ? Number(updateData.currentHskTarget) : accountsDatabase[index].currentHskTarget,
      };

      res.json({ success: true, account: accountsDatabase[index] });
    } catch (err: any) {
      res.status(500).json({ error: "Lỗi cập nhật tài khoản" });
    }
  });

  // API: Delete Account (ADMIN ONLY)
  app.delete("/api/accounts/:id", (req, res) => {
    try {
      const requesterEmail = (
        (req.query.userEmail as string) ||
        (req.headers["x-user-email"] as string) ||
        ""
      ).trim().toLowerCase();

      if (requesterEmail !== ADMIN_EMAIL.toLowerCase()) {
        return res.status(403).json({ error: "Truy cập bị từ chối: Chỉ tài khoản admin canhln1224@gmail.com mới có quyền xóa tài khoản." });
      }

      const { id } = req.params;
      accountsDatabase = accountsDatabase.filter(a => a.id !== id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: "Lỗi xóa tài khoản" });
    }
  });

  // API: Export Accounts as CSV (Compatible with Google Sheets & Excel UTF-8) (ADMIN ONLY)
  app.get("/api/accounts/export-csv", (req, res) => {
    try {
      const requesterEmail = (
        (req.query.userEmail as string) ||
        (req.headers["x-user-email"] as string) ||
        ""
      ).trim().toLowerCase();

      if (requesterEmail !== ADMIN_EMAIL.toLowerCase()) {
        return res.status(403).send("Truy cập bị từ chối: Chỉ tài khoản admin canhln1224@gmail.com mới có quyền xuất file CSV.");
      }

      const headers = [
        "STT",
        "Mã Học Viên",
        "Họ và Tên",
        "Email Đăng Nhập",
        "Số Điện Thoại",
        "Kênh Đăng Nhập",
        "Gói VIP",
        "Mục Tiêu HSK",
        "Số Bài Học Đã Hoàn Thành",
        "Từ Vựng Đã Thuộc",
        "Bài Hội Thoại",
        "Chữ Hán Đã Tập Viết",
        "Bài Chính Tả Đạt",
        "Đề Thi Thử Đã Làm",
        "Điểm Thi TB (%)",
        "Tổng Giờ Học (h)",
        "Số Lần Đăng Nhập",
        "Đăng Nhập Gần Nhất",
        "Ngày Tham Gia",
        "Trạng Thái",
        "Ghi Chú"
      ];

      const rows = accountsDatabase.map((a, idx) => [
        idx + 1,
        `"${a.id}"`,
        `"${a.name.replace(/"/g, '""')}"`,
        `"${a.email}"`,
        `"${a.phone || ''}"`,
        `"${a.provider}"`,
        a.isVip ? "VIP Mở Khóa" : "Miễn Phí",
        `"HSK ${a.currentHskTarget}"`,
        a.lessonsCompleted,
        a.hskWordsLearned,
        a.dialoguesLearned,
        a.writingPracticed,
        a.dictationsPassed,
        a.mockExamsDone,
        a.avgScore,
        a.studyTimeHours,
        a.loginCount,
        `"${a.lastLogin}"`,
        `"${a.joinedDate}"`,
        `"${a.status}"`,
        `"${(a.notes || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="Thong_Ke_Tai_Khoan_Hoai_Ngo_${new Date().toISOString().substring(0, 10)}.csv"`);
      res.send(csvContent);
    } catch (err: any) {
      res.status(500).json({ error: "Không thể xuất file CSV" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tiếng Trung Hoài Ngô Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
