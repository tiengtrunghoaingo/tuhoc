export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ChineseWord {
  id: string;
  hanzi: string;
  pinyin: string;
  hanViet: string;
  meaning: string;
  level: HskLevel;
  category: string;
  exampleZh: string;
  examplePy: string;
  exampleVi: string;
  radicals?: string[];
  strokes?: number;
  tags?: string[];
}

export interface Radical {
  number: number;
  radical: string;
  pinyin: string;
  hanViet: string;
  meaning: string;
  strokes: number;
  variants?: string[];
  examples: Array<{
    char: string;
    pinyin: string;
    meaning: string;
  }>;
  mnemonic: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  avatar: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface DialogueLesson {
  id: string;
  title: string;
  topic: string;
  level: string;
  description: string;
  lines: DialogueLine[];
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'fill' | 'listen' | 'arrange';
  questionZh: string;
  questionPy?: string;
  questionVi?: string;
  audioPrompt?: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  level: HskLevel;
}

export interface ExamPaper {
  id: string;
  title: string;
  level: HskLevel | 'THPT';
  durationMinutes: number;
  totalQuestions: number;
  description: string;
  questions: QuizQuestion[];
}

export interface MeasureWord {
  id: string;
  hanzi: string;
  pinyin: string;
  hanViet: string;
  meaning: string;
  usage: string;
  examples: Array<{
    phraseZh: string;
    phrasePy: string;
    meaningVi: string;
  }>;
}

export interface DictationItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  audioHint: string;
  level: HskLevel;
}

export interface LearningCategory {
  id: string;
  title: string;
  description: string;
  lessonCount: string;
  badge?: string;
  iconBg: string;
  iconColor: string;
  iconName: string;
  actionKey: string;
}

export interface AppSettings {
  showPinyin: boolean;
  showHanViet: boolean;
  isTraditional: boolean;
  speechRate: number; // 0.7 - 1.3
  fontSize: 'small' | 'medium' | 'large';
  autoPlayAudio: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
  isVip: boolean;
  joinedDate: string;
}

export interface UserAccountRecord {
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
  currentHskTarget: HskLevel;
  avgScore: number;
  studyTimeHours: number;
  status: 'active' | 'inactive' | 'locked';
  notes?: string;
}

export interface AccountSheetStats {
  totalAccounts: number;
  activeAccounts: number;
  vipAccounts: number;
  totalLessonsCompleted: number;
  totalStudyHours: number;
  avgLessonsPerUser: number;
  providerCounts: {
    google: number;
    facebook: number;
    email: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

