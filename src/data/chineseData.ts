import { 
  ChineseWord, 
  Radical, 
  DialogueLesson, 
  ExamPaper, 
  MeasureWord, 
  DictationItem, 
  LearningCategory 
} from '../types';

export const LEARNING_CATEGORIES: LearningCategory[] = [
  {
    id: 'hsk',
    title: 'Giáo trình HSK',
    description: 'Học theo chuẩn HSK quốc tế từ cấp độ 1 đến 6, phù hợp với mọi trình độ',
    lessonCount: '150 bài',
    iconBg: 'bg-red-50 text-red-600 border border-red-100',
    iconColor: 'text-red-600',
    iconName: 'BookOpen',
    actionKey: 'hsk'
  },
  {
    id: 'topic_vocab',
    title: 'Từ vựng chủ đề',
    description: 'Hệ thống từ vựng được phân loại theo chủ đề, dễ học và ghi nhớ',
    lessonCount: '80 bài',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    iconColor: 'text-amber-600',
    iconName: 'Layers',
    actionKey: 'topic_vocab'
  },
  {
    id: 'dialogue',
    title: 'Hội thoại',
    description: 'Luyện tập hội thoại thực tế với các tình huống giao tiếp hàng ngày',
    lessonCount: '120 bài',
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    iconColor: 'text-emerald-600',
    iconName: 'MessageCircle',
    actionKey: 'dialogue'
  },
  {
    id: 'reading',
    title: 'Đọc hiểu',
    description: 'Rèn luyện khả năng đọc hiểu với các bài văn từ cơ bản đến nâng cao có dịch nghĩa',
    lessonCount: '60 bài',
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    iconColor: 'text-indigo-600',
    iconName: 'FileText',
    actionKey: 'reading'
  },
  {
    id: 'exam',
    title: 'Luyện thi',
    description: 'Đề thi thử HSK với hệ thống chấm điểm tự động và phân tích chi tiết',
    lessonCount: '35 bài',
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    iconColor: 'text-rose-600',
    iconName: 'Award',
    actionKey: 'exam'
  },
  {
    id: 'radicals',
    title: 'Bộ thủ',
    description: 'Học 214 bộ thủ cơ bản giúp nhận biết và viết chữ Hán chính xác',
    lessonCount: '214 bài',
    iconBg: 'bg-sky-50 text-sky-600 border border-sky-100',
    iconColor: 'text-sky-600',
    iconName: 'Grid',
    actionKey: 'radicals'
  },
  {
    id: 'translate',
    title: 'Dịch',
    description: 'Công cụ dịch thông minh với từ điển tích hợp và ví dụ minh họa',
    lessonCount: '40 bài',
    iconBg: 'bg-orange-50 text-orange-600 border border-orange-100',
    iconColor: 'text-orange-600',
    iconName: 'Languages',
    actionKey: 'translate'
  },
  {
    id: 'patterns',
    title: 'Mẫu câu',
    description: 'Học mẫu câu tiếng Trung qua các chủ đề giao tiếp thông dụng',
    lessonCount: '70 bài',
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    iconColor: 'text-teal-600',
    iconName: 'Mic',
    actionKey: 'patterns'
  },
  {
    id: 'writing',
    title: 'Luyện viết',
    description: 'Luyện viết chữ Hán chuẩn nét, có hướng dẫn và đếm số nét sai',
    lessonCount: '50 bài',
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    iconColor: 'text-purple-600',
    iconName: 'PenTool',
    actionKey: 'writing'
  },
  {
    id: 'measure_words',
    title: 'Lượng từ',
    description: 'Học các loại lượng từ phổ biến trong tiếng Trung kèm ví dụ cụ thể',
    lessonCount: '45 bài',
    iconBg: 'bg-yellow-50 text-yellow-600 border border-yellow-100',
    iconColor: 'text-yellow-600',
    iconName: 'ListOrdered',
    actionKey: 'measure_words'
  },
  {
    id: 'thpt_exam',
    title: 'Luyện đề THPT',
    description: 'Luyện đề thi thử THPT online với hệ thống chấm điểm tự động và giải thích chi tiết',
    lessonCount: '10 bài',
    iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
    iconColor: 'text-cyan-600',
    iconName: 'CalendarCheck',
    actionKey: 'thpt_exam'
  }
];

export const HSK_WORDS_SAMPLE: ChineseWord[] = [
  // HSK 1
  {
    id: 'w_1_1',
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    hanViet: 'Nhĩ Hảo',
    meaning: 'Xin chào',
    level: 1,
    category: 'Chào hỏi',
    exampleZh: '你好！很高兴认识你。',
    examplePy: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ.',
    exampleVi: 'Xin chào! Rất vui được làm quen với bạn.',
    radicals: ['亻', '女', '子'],
    strokes: 13
  },
  {
    id: 'w_1_2',
    hanzi: '谢谢',
    pinyin: 'xièxie',
    hanViet: 'Tạ Tạ',
    meaning: 'Cảm ơn',
    level: 1,
    category: 'Xã giao',
    exampleZh: '谢谢你的帮助。',
    examplePy: 'Xièxie nǐ de bāngzhù.',
    exampleVi: 'Cảm ơn sự giúp đỡ của bạn.',
    radicals: ['讠', '身', '寸'],
    strokes: 24
  },
  {
    id: 'w_1_3',
    hanzi: '再见',
    pinyin: 'zàijiàn',
    hanViet: 'Tái Kiến',
    meaning: 'Tạm biệt, hẹn gặp lại',
    level: 1,
    category: 'Chào hỏi',
    exampleZh: '明天见，再见！',
    examplePy: 'Míngtiān jiàn, zàijiàn!',
    exampleVi: 'Hẹn mai gặp, tạm biệt nhé!',
    radicals: ['冂', '见'],
    strokes: 10
  },
  {
    id: 'w_1_4',
    hanzi: '学习',
    pinyin: 'xuéxí',
    hanViet: 'Học Tập',
    meaning: 'Học tập, học',
    level: 1,
    category: 'Học tập',
    exampleZh: '我喜欢学习汉语。',
    examplePy: 'Wǒ xǐhuan xuéxí Hànyǔ.',
    exampleVi: 'Tôi thích học tiếng Hán (tiếng Trung).',
    radicals: ['冖', '子', '习'],
    strokes: 11
  },
  {
    id: 'w_1_5',
    hanzi: '老师',
    pinyin: 'lǎoshī',
    hanViet: 'Lão Sư',
    meaning: 'Thầy cô giáo',
    level: 1,
    category: 'Danh từ',
    exampleZh: '王老师是我的汉语老师。',
    examplePy: 'Wáng lǎoshī shì wǒ de Hànyǔ lǎoshī.',
    exampleVi: 'Thầy Vương là giáo viên tiếng Trung của tôi.',
    radicals: ['老', '巾'],
    strokes: 12
  },
  {
    id: 'w_1_6',
    hanzi: '朋友',
    pinyin: 'péngyou',
    hanViet: 'Bằng Hữu',
    meaning: 'Bạn bè',
    level: 1,
    category: 'Quan hệ',
    exampleZh: '他是我的好朋友。',
    examplePy: 'Tā shì wǒ de hǎo péngyou.',
    exampleVi: 'Anh ấy là người bạn tốt của tôi.',
    radicals: ['月'],
    strokes: 12
  },
  {
    id: 'w_1_7',
    hanzi: '中国',
    pinyin: 'Zhōngguó',
    hanViet: 'Trung Quốc',
    meaning: 'Trung Quốc',
    level: 1,
    category: 'Địa danh',
    exampleZh: '我想去中国旅游。',
    examplePy: 'Wǒ xiǎng qù Zhōngguó lǚyóu.',
    exampleVi: 'Tôi muốn đi du lịch Trung Quốc.',
    radicals: ['丨', '囗', '玉'],
    strokes: 12
  },
  {
    id: 'w_1_8',
    hanzi: '喝水',
    pinyin: 'hē shuǐ',
    hanViet: 'Hát Thủy',
    meaning: 'Uống nước',
    level: 1,
    category: 'Hành động',
    exampleZh: '多喝水对身体好。',
    examplePy: 'Duō hē shuǐ duì shēntǐ hǎo.',
    exampleVi: 'Uống nhiều nước rất tốt cho cơ thể.',
    radicals: ['口', '日', '水'],
    strokes: 16
  },
  // HSK 2
  {
    id: 'w_2_1',
    hanzi: '高兴',
    pinyin: 'gāoxìng',
    hanViet: 'Cao Hứng',
    meaning: 'Vui vẻ, phấn khởi',
    level: 2,
    category: 'Cảm xúc',
    exampleZh: '今天认识你，我很高兴。',
    examplePy: 'Jīntiān rènshí nǐ, wǒ hěn gāoxìng.',
    exampleVi: 'Hôm nay quen biết bạn, tôi rất vui.',
    radicals: ['高', '八'],
    strokes: 16
  },
  {
    id: 'w_2_2',
    hanzi: '准备',
    pinyin: 'zhǔnbèi',
    hanViet: 'Chuẩn Bị',
    meaning: 'Chuẩn bị, dự định',
    level: 2,
    category: 'Động từ',
    exampleZh: '你准备好去考试了吗？',
    examplePy: 'Nǐ zhǔnbèi hǎo qù kǎoshì le ma?',
    exampleVi: 'Bạn đã chuẩn bị xong để đi thi chưa?',
    radicals: ['冫', '隹', '攵', '田'],
    strokes: 18
  },
  {
    id: 'w_2_3',
    hanzi: '时间',
    pinyin: 'shíjiān',
    hanViet: 'Thời Gian',
    meaning: 'Thời gian, lúc',
    level: 2,
    category: 'Thời gian',
    exampleZh: '你有时间和我一起喝咖啡吗？',
    examplePy: 'Nǐ yǒu shíjiān hé wǒ yìqǐ hē kāfēi ma?',
    exampleVi: 'Bạn có thời gian cùng tôi uống cà phê không?',
    radicals: ['日', '门'],
    strokes: 11
  },
  {
    id: 'w_2_4',
    hanzi: '运动',
    pinyin: 'yùndòng',
    hanViet: 'Vận Động',
    meaning: 'Thể thao, vận động',
    level: 2,
    category: 'Đời sống',
    exampleZh: '每天运动一小时，健康生活一辈子。',
    examplePy: 'Měitiān yùndòng yì xiǎoshí, jiànkāng shēnghuó yíbèizi.',
    exampleVi: 'Mỗi ngày vận động một tiếng, cuộc sống khỏe mạnh cả đời.',
    radicals: ['辶', '力'],
    strokes: 13
  },
  // HSK 3
  {
    id: 'w_3_1',
    hanzi: '经常',
    pinyin: 'jīngcháng',
    hanViet: 'Kinh Thường',
    meaning: 'Thường xuyên, hay',
    level: 3,
    category: 'Phó từ',
    exampleZh: '他经常去图书馆看书。',
    examplePy: 'Tā jīngcháng qù túshūguǎn kànshū.',
    exampleVi: 'Anh ấy thường xuyên đến thư viện đọc sách.',
    radicals: ['纟', '巾'],
    strokes: 19
  },
  {
    id: 'w_3_2',
    hanzi: '解决',
    pinyin: 'jiějué',
    hanViet: 'Giải Quyết',
    meaning: 'Giải quyết, xử lý',
    level: 3,
    category: 'Động từ',
    exampleZh: '这个问题我们必须尽快解决。',
    examplePy: 'Zhè ge wèntí wǒmen bìxū jǐnkuài jiějué.',
    exampleVi: 'Vấn đề này chúng ta phải giải quyết càng sớm càng tốt.',
    radicals: ['角', '刀', '牛', '冫'],
    strokes: 19
  },
  {
    id: 'w_3_3',
    hanzi: '热情',
    pinyin: 'rèqíng',
    hanViet: 'Nhiệt Tình',
    meaning: 'Nhiệt tình, hiếu khách',
    level: 3,
    category: 'Tính từ',
    exampleZh: '中国人非常热情好客。',
    examplePy: 'Zhōngguó rén fēicháng rèqíng hàokè.',
    exampleVi: 'Người Trung Quốc vô cùng nhiệt tình và hiếu khách.',
    radicals: ['灬', '忄', '青'],
    strokes: 21
  },
  // HSK 4
  {
    id: 'w_4_1',
    hanzi: '坚持',
    pinyin: 'jiānchí',
    hanViet: 'Kiên Trì',
    meaning: 'Kiên trì, giữ vững',
    level: 4,
    category: 'Phẩm chất',
    exampleZh: '只要坚持努力，就一定能成功。',
    examplePy: 'Zhǐyào jiānchí nǔlì, jiù yídìng néng chénggōng.',
    exampleVi: 'Chỉ cần kiên trì nỗ lực, nhất định sẽ thành công.',
    radicals: ['土', '扌', '寺'],
    strokes: 16
  },
  {
    id: 'w_4_2',
    hanzi: '精彩',
    pinyin: 'jīngcǎi',
    hanViet: 'Tinh Thải',
    meaning: 'Đặc sắc, tuyệt vời',
    level: 4,
    category: 'Tính từ',
    exampleZh: '昨晚的京剧表演非常精彩。',
    examplePy: 'Zuówǎn de jīngjù biǎoyǎn fēicháng jīngcǎi.',
    exampleVi: 'Buổi biểu diễn kinh kịch tối qua vô cùng đặc sắc.',
    radicals: ['米', '青', '采'],
    strokes: 22
  },
  // HSK 5
  {
    id: 'w_5_1',
    hanzi: '珍惜',
    pinyin: 'zhēnxī',
    hanViet: 'Trân Tích',
    meaning: 'Trân trọng, quý trọng',
    level: 5,
    category: 'Tâm lý',
    exampleZh: '我们要珍惜身边的每一个人和当下时光。',
    examplePy: 'Wǒmen yào zhēnxī shēnbiān de měi yí ge rén hé dāngxià shíguāng.',
    exampleVi: 'Chúng ta cần trân trọng từng người bên cạnh và thời khắc hiện tại.',
    radicals: ['王', '忄', '昔'],
    strokes: 21
  },
  // HSK 6
  {
    id: 'w_6_1',
    hanzi: '豁然开朗',
    pinyin: 'huò rán kāi lǎng',
    hanViet: 'Khoát Nhiên Khai Lãng',
    meaning: 'Bừng sáng, thông suốt mọi lẽ',
    level: 6,
    category: 'Thành ngữ',
    exampleZh: '经过老师的一番点拨，我顿时豁然开朗。',
    examplePy: 'Jīngguò lǎoshī de yì fān diǎnbō, wǒ dùnshí huòrán kāilǎng.',
    exampleVi: 'Qua lời chỉ điểm của thầy giáo, tôi lập tức vỡ vạc thông suốt.',
    radicals: ['谷', '灬', '门', '月'],
    strokes: 43
  }
];

export const RADICALS_SAMPLE: Radical[] = [
  {
    number: 1,
    radical: '一',
    pinyin: 'yī',
    hanViet: 'Nhất',
    meaning: 'Số một, nét ngang đầu tiên',
    strokes: 1,
    examples: [
      { char: '三', pinyin: 'sān', meaning: 'Số 3' },
      { char: '下', pinyin: 'xià', meaning: 'Dưới' },
      { char: '不', pinyin: 'bù', meaning: 'Không' }
    ],
    mnemonic: 'Nét ngang cơ bản nhất, biểu thị khởi nguyên của vạn vật.'
  },
  {
    number: 9,
    radical: '人 (亻)',
    pinyin: 'rén',
    hanViet: 'Nhân',
    meaning: 'Người, con người',
    strokes: 2,
    variants: ['亻'],
    examples: [
      { char: '你', pinyin: 'nǐ', meaning: 'Bạn, anh' },
      { char: '他', pinyin: 'tā', meaning: 'Anh ấy' },
      { char: '休', pinyin: 'xiū', meaning: 'Nghỉ ngơi (người tựa vào cây)' }
    ],
    mnemonic: 'Hình ảnh người đứng hai chân vững chãi hoặc đứng nghiêng (bộ nhân đứng 亻).'
  },
  {
    number: 30,
    radical: '口',
    pinyin: 'kǒu',
    hanViet: 'Khẩu',
    meaning: 'Miệng, lối vào, cửa',
    strokes: 3,
    examples: [
      { char: '吃', pinyin: 'chī', meaning: 'Ăn' },
      { char: '喝', pinyin: 'hē', meaning: 'Uống' },
      { char: '问', pinyin: 'wèn', meaning: 'Hỏi' }
    ],
    mnemonic: 'Hình vẽ chiếc miệng mở vuông vức, liên quan đến ăn uống, nói năng.'
  },
  {
    number: 38,
    radical: '女',
    pinyin: 'nǚ',
    hanViet: 'Nữ',
    meaning: 'Phụ nữ, con gái',
    strokes: 3,
    examples: [
      { char: '好', pinyin: 'hǎo', meaning: 'Tốt (phụ nữ có con)' },
      { char: '妈', pinyin: 'mā', meaning: 'Mẹ' },
      { char: '妹', pinyin: 'mèi', meaning: 'Em gái' }
    ],
    mnemonic: 'Hình ảnh người phụ nữ đoan trang, dịu dàng.'
  },
  {
    number: 61,
    radical: '心 (忄, ⺗)',
    pinyin: 'xīn',
    hanViet: 'Tâm',
    meaning: 'Trái tim, tâm tư, cảm xúc',
    strokes: 4,
    variants: ['忄', '⺗'],
    examples: [
      { char: '想', pinyin: 'xiǎng', meaning: 'Nghĩ, nhớ, muốn' },
      { char: '情', pinyin: 'qíng', meaning: 'Tình cảm' },
      { char: '快', pinyin: 'kuài', meaning: 'Nhanh, vui vẻ' }
    ],
    mnemonic: 'Hình ảnh quả tim đang đập, liên quan đến suy nghĩ, xúc cảm và tấm lòng.'
  },
  {
    number: 64,
    radical: '手 (扌)',
    pinyin: 'shǒu',
    hanViet: 'Thủ',
    meaning: 'Bàn tay, động tác tay',
    strokes: 4,
    variants: ['扌'],
    examples: [
      { char: '打', pinyin: 'dǎ', meaning: 'Đánh, gọi điện' },
      { char: '拿', pinyin: 'ná', meaning: 'Cầm, lấy' },
      { char: '提', pinyin: 'tí', meaning: 'Nhắc tới, xách' }
    ],
    mnemonic: 'Bàn tay với 5 ngón vươn ra để cầm nắm đồ vật.'
  },
  {
    number: 85,
    radical: '水 (氵, 氺)',
    pinyin: 'shuǐ',
    hanViet: 'Thủy',
    meaning: 'Nước, chất lỏng (bộ 3 chấm thủy)',
    strokes: 4,
    variants: ['氵', '氺'],
    examples: [
      { char: '江', pinyin: 'jiāng', meaning: 'Sông lớn' },
      { char: '海', pinyin: 'hǎi', meaning: 'Biển' },
      { char: '洗', pinyin: 'xǐ', meaning: 'Rửa, giặt' }
    ],
    mnemonic: 'Ba giọt nước bắn tung tóe hoặc dòng suối chảy cuồn cuộn.'
  },
  {
    number: 86,
    radical: '火 (灬)',
    pinyin: 'huǒ',
    hanViet: 'Hỏa',
    meaning: 'Lửa, nhiệt độ (bộ 4 chấm hỏa)',
    strokes: 4,
    variants: ['灬'],
    examples: [
      { char: '热', pinyin: 'rè', meaning: 'Nóng' },
      { char: '烧', pinyin: 'shāo', meaning: 'Nấu, đốt' },
      { char: '点', pinyin: 'diǎn', meaning: 'Chấm, giờ' }
    ],
    mnemonic: 'Ngọn lửa bốc cháy bập bùng hoặc than củi đỏ rực dưới đáy.'
  },
  {
    number: 96,
    radical: '玉 (王)',
    pinyin: 'yù',
    hanViet: 'Ngọc / Vương',
    meaning: 'Ngọc quý, đá quý, vua chúa',
    strokes: 5,
    variants: ['王'],
    examples: [
      { char: '珍', pinyin: 'zhēn', meaning: 'Quý báu' },
      { char: '现', pinyin: 'xiàn', meaning: 'Hiện tại' },
      { char: '环', pinyin: 'huán', meaning: 'Chiếc vòng' }
    ],
    mnemonic: 'Ba thanh ngọc xâu qua một sợi dây, có thêm chấm ngọc óng ánh.'
  },
  {
    number: 149,
    radical: '言 (讠)',
    pinyin: 'yán',
    hanViet: 'Ngôn',
    meaning: 'Lời nói, ngôn ngữ',
    strokes: 7,
    variants: ['讠'],
    examples: [
      { char: '说', pinyin: 'shuō', meaning: 'Nói' },
      { char: '话', pinyin: 'huà', meaning: 'Lời nói' },
      { char: '请', pinyin: 'qǐng', meaning: 'Mời, xin vui lòng' }
    ],
    mnemonic: 'Âm thanh phát ra từ vòm miệng tạo thành ngôn ngữ giao tiếp.'
  },
  {
    number: 162,
    radical: '辵 (辶)',
    pinyin: 'chuò',
    hanViet: 'Sước',
    meaning: 'Bước đi, đường đi, di chuyển',
    strokes: 7,
    variants: ['辶'],
    examples: [
      { char: '这', pinyin: 'zhè', meaning: 'Đây, này' },
      { char: '进', pinyin: 'jìn', meaning: 'Vào' },
      { char: '边', pinyin: 'biān', meaning: 'Bên, cạnh' }
    ],
    mnemonic: 'Hình ảnh bàn chân vừa đi vừa dừng lại quan sát phương hướng.'
  }
];

export const DIALOGUE_LESSONS: DialogueLesson[] = [
  {
    id: 'dlg_1',
    title: 'Gặp gỡ lần đầu & Làm quen',
    topic: 'Chào hỏi & Giao tiếp',
    level: 'HSK 1 - 2',
    description: 'Học cách chào hỏi, hỏi tên, quốc tịch và nghề nghiệp trong lần đầu gặp gỡ.',
    lines: [
      {
        id: 'l1',
        speaker: 'Vương Bình (王平)',
        avatar: '👨‍💼',
        hanzi: '你好！请问你叫什么名字？',
        pinyin: 'Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzi?',
        meaning: 'Xin chào! Xin hỏi bạn tên là gì?'
      },
      {
        id: 'l2',
        speaker: 'Tiểu Mai (小梅)',
        avatar: '👩‍🎓',
        hanzi: '你好！我叫阮氏梅，我是越南人。你呢？',
        pinyin: 'Nǐ hǎo! Wǒ jiào Ruǎn Shì Méi, wǒ shì Yuènán rén. Nǐ ne?',
        meaning: 'Chào bạn! Tôi tên là Nguyễn Thị Mai, tôi là người Việt Nam. Còn bạn?'
      },
      {
        id: 'l3',
        speaker: 'Vương Bình (王平)',
        avatar: '👨‍💼',
        hanzi: '我叫王平，我是中国人。很高兴认识你！',
        pinyin: 'Wǒ jiào Wáng Píng, wǒ shì Zhōngguó rén. Hěn gāoxìng rènshí nǐ!',
        meaning: 'Tôi tên là Vương Bình, tôi là người Trung Quốc. Rất vui được quen biết bạn!'
      },
      {
        id: 'l4',
        speaker: 'Tiểu Mai (小梅)',
        avatar: '👩‍🎓',
        hanzi: '认识你我也很高兴。你的汉语发音真标准！',
        pinyin: 'Rènshí nǐ wǒ yě hěn gāoxìng. Nǐ de Hànyǔ fāyīn zhēn biāozhǔn!',
        meaning: 'Quen bạn tôi cũng rất vui. Bạn phát âm tiếng Trung thật là chuẩn!'
      }
    ]
  },
  {
    id: 'dlg_2',
    title: 'Gọi món tại nhà hàng Trung Hoa',
    topic: 'Ẩm thực & Đời sống',
    level: 'HSK 2 - 3',
    description: 'Học các mẫu câu gọi món, hỏi giá và thanh toán trong nhà hàng.',
    lines: [
      {
        id: 'l2_1',
        speaker: 'Phục vụ (服务员)',
        avatar: '👨‍🍳',
        hanzi: '您好！欢迎光临，请问几位？',
        pinyin: 'Nín hǎo! Huānyíng guānglín, qǐngwèn jǐ wèi?',
        meaning: 'Kính chào quý khách! Hoan nghênh ghé quán, xin hỏi có mấy vị ạ?'
      },
      {
        id: 'l2_2',
        speaker: 'Hoài Ngô (怀吴)',
        avatar: '👨‍🏫',
        hanzi: '我们两位。请给我们看菜单。',
        pinyin: 'Wǒmen liǎng wèi. Qǐng gěi wǒmen kàn càidān.',
        meaning: 'Chúng tôi có hai người. Xin cho chúng tôi xem thực đơn.'
      },
      {
        id: 'l2_3',
        speaker: 'Phục vụ (服务员)',
        avatar: '👨‍🍳',
        hanzi: '好的，这是菜单。我们店的北京烤鸭很有名！',
        pinyin: 'Hǎo de, zhè shì càidān. Wǒmen diàn de Běijīng kǎoyā hěn yǒumíng!',
        meaning: 'Dạ vâng, đây là thực đơn. Món vịt quay Bắc Kinh quán em rất nổi tiếng ạ!'
      },
      {
        id: 'l2_4',
        speaker: 'Hoài Ngô (怀吴)',
        avatar: '👨‍🏫',
        hanzi: '那给我们来一份烤鸭，一碗牛肉面，不要太辣。',
        pinyin: 'Nà gěi wǒmen lái yí fèn kǎoyā, yì wǎn niúròumiàn, bú yào tài là.',
        meaning: 'Vậy cho chúng tôi một phần vịt quay, một bát mì bò, đừng cay quá nhé.'
      }
    ]
  }
];

export const MEASURE_WORDS_SAMPLE: MeasureWord[] = [
  {
    id: 'mw_1',
    hanzi: '个 (gè)',
    pinyin: 'gè',
    hanViet: 'Cá',
    meaning: 'Cái, con, người (lượng từ phổ biến nhất)',
    usage: 'Dùng cho người, quả, đồ vật hình khối hoặc khái niệm trừu tượng khi không có lượng từ riêng.',
    examples: [
      { phraseZh: '一个人', phrasePy: 'yí gè rén', meaningVi: 'Một người' },
      { phraseZh: '三个苹果', phrasePy: 'sān gè píngguǒ', meaningVi: 'Ba quả táo' },
      { phraseZh: '一个问题', phrasePy: 'yí gè wèntí', meaningVi: 'Một câu hỏi / vấn đề' }
    ]
  },
  {
    id: 'mw_2',
    hanzi: '本 (běn)',
    pinyin: 'běn',
    hanViet: 'Bản',
    meaning: 'Quyển, cuốn',
    usage: 'Dùng cho sách vở, tạp chí, từ điển, hộ chiếu.',
    examples: [
      { phraseZh: '一本书', phrasePy: 'yì běn shū', meaningVi: 'Một cuốn sách' },
      { phraseZh: '这本词典', phrasePy: 'zhè běn cídiǎn', meaningVi: 'Cuốn từ điển này' }
    ]
  },
  {
    id: 'mw_3',
    hanzi: '张 (zhāng)',
    pinyin: 'zhāng',
    hanViet: 'Trương',
    meaning: 'Tấm, tờ, chiếc, bức',
    usage: 'Dùng cho vật có mặt phẳng rộng mỏng (giấy, vé, ảnh, bàn, giường, mặt).',
    examples: [
      { phraseZh: '一张纸', phrasePy: 'yì zhāng zhǐ', meaningVi: 'Một tờ giấy' },
      { phraseZh: '两张机票', phrasePy: 'liǎng zhāng jīpiào', meaningVi: 'Hai vé máy bay' },
      { phraseZh: '一张桌子', phrasePy: 'yì zhāng zhuōzi', meaningVi: 'Một cái bàn' }
    ]
  },
  {
    id: 'mw_4',
    hanzi: '件 (jiàn)',
    pinyin: 'jiàn',
    hanViet: 'Kiện',
    meaning: 'Chiếc (áo), sự việc, món đồ',
    usage: 'Dùng cho quần áo thân trên, áo khoác, sự việc, hành lý.',
    examples: [
      { phraseZh: '一件衣服', phrasePy: 'yí jiàn yīfu', meaningVi: 'Một bộ / chiếc áo' },
      { phraseZh: '这件事', phrasePy: 'zhè jiàn shì', meaningVi: 'Chuyện này' }
    ]
  },
  {
    id: 'mw_5',
    hanzi: '杯 (bēi)',
    pinyin: 'bēi',
    hanViet: 'Bôi',
    meaning: 'Cốc, ly, chén',
    usage: 'Dùng cho đồ uống chứa trong cốc/ly.',
    examples: [
      { phraseZh: '一杯水', phrasePy: 'yì bēi shuǐ', meaningVi: 'Một cốc nước' },
      { phraseZh: '一杯奶茶', phrasePy: 'yì bēi nǎichá', meaningVi: 'Một ly trà sữa' }
    ]
  }
];

export const MOCK_EXAM_PAPERS: ExamPaper[] = [
  {
    id: 'exam_hsk1',
    title: 'Đề Thi Thử HSK 1 Chuẩn Quốc Tế - Đề 01',
    level: 1,
    durationMinutes: 35,
    totalQuestions: 5,
    description: 'Đề thi trắc nghiệm đánh giá kiến thức 150 từ vựng và ngữ pháp nền tảng HSK 1.',
    questions: [
      {
        id: 'q1',
        type: 'listen',
        questionZh: 'Nghe phát âm và chọn nghĩa tiếng Việt đúng:',
        questionPy: 'nǐ hǎo',
        audioPrompt: '你好',
        options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'],
        correctAnswer: 1,
        explanation: '你好 (nǐ hǎo) có nghĩa là "Xin chào".',
        level: 1
      },
      {
        id: 'q2',
        type: 'single',
        questionZh: 'Điền từ thích hợp vào chỗ trống: 我想去商店___苹果。',
        questionPy: 'Wǒ xiǎng qù shāngdiàn ___ píngguǒ.',
        questionVi: 'Tôi muốn đi cửa hàng ... táo.',
        options: ['买 (mǎi)', '看 (kàn)', '听 (tīng)', '住 (zhù)'],
        correctAnswer: 0,
        explanation: '买 (mǎi) có nghĩa là "mua". Câu hoàn chỉnh: Tôi muốn đến cửa hàng mua táo.',
        level: 1
      },
      {
        id: 'q3',
        type: 'single',
        questionZh: 'Chọn Pinyin đúng cho chữ Hán: “谢谢”',
        questionPy: 'xièxie',
        options: ['zàijiàn', 'bú kèqi', 'xièxie', 'duìbuqǐ'],
        correctAnswer: 2,
        explanation: 'Chữ Hán 谢谢 có phiên âm pinyin chuẩn là "xièxie" (Cảm ơn).',
        level: 1
      },
      {
        id: 'q4',
        type: 'single',
        questionZh: 'Chọn câu có trật tự từ đúng:',
        options: [
          '我是中国人。',
          '人中国是我。',
          '中国我是人。',
          '是我中国。'
        ],
        correctAnswer: 0,
        explanation: 'Cấu trúc Chủ ngữ + 是 + Danh từ: 我 (Tôi) + 是 (là) + 中国人 (người Trung Quốc).',
        level: 1
      },
      {
        id: 'q5',
        type: 'single',
        questionZh: '“八” trong tiếng Trung là số mấy?',
        questionPy: 'bā',
        options: ['Số 6', 'Số 7', 'Số 8', 'Số 9'],
        correctAnswer: 2,
        explanation: '八 (bā) là số 8 trong tiếng Trung.',
        level: 1
      }
    ]
  },
  {
    id: 'exam_thpt',
    title: 'Đề Thi Thử THPT Quốc Gia Môn Tiếng Trung - Mã Đề 102',
    level: 'THPT',
    durationMinutes: 50,
    totalQuestions: 5,
    description: 'Đề thi trắc nghiệm bám sát cấu trúc đề thi tốt nghiệp THPT của Bộ Giáo dục & Đào tạo.',
    questions: [
      {
        id: 'thpt_1',
        type: 'single',
        questionZh: 'Chọn từ điền vào chỗ trống: 他工作很努力，___得到了领导的表扬。',
        questionPy: 'Tā gōngzuò hěn nǔlì, ___ dédàole lǐngdǎo de biǎoyáng.',
        options: ['所以 (suǒyǐ)', '虽然 (suīrán)', '但是 (dànshì)', '即使 (jíshǐ)'],
        correctAnswer: 0,
        explanation: 'Cặp liên từ chỉ nguyên nhân - kết quả: Anh ấy làm việc rất chăm chỉ, NÊN (所以) đã nhận được lời khen ngợi của lãnh đạo.',
        level: 3
      },
      {
        id: 'thpt_2',
        type: 'single',
        questionZh: 'Chọn từ đồng nghĩa với từ gạch chân: 这里的风景非常“美丽”。',
        options: ['漂亮 (piàoliang)', '难看 (nánkàn)', '普通 (pǔtōng)', '复杂 (fùzá)'],
        correctAnswer: 0,
        explanation: '美丽 (měilì - Đẹp) đồng nghĩa với 漂亮 (piàoliang - Đẹp/Xinh xắn).',
        level: 2
      },
      {
        id: 'thpt_3',
        type: 'single',
        questionZh: 'Xác định lượng từ chính xác cho câu: 我买了一___新电脑。',
        options: ['台 (tái)', '张 (zhāng)', '条 (tiáo)', '把 (bǎ)'],
        correctAnswer: 0,
        explanation: '台 (tái) là lượng từ dùng cho máy móc, đồ điện tử (máy vi tính 电脑, tivi 电视机).',
        level: 3
      },
      {
        id: 'thpt_4',
        type: 'single',
        questionZh: 'Chọn vị trí đúng của phó từ “又”: 他 (A) 昨天来了，今天 (B) 怎么 (C) 来了 (D)？',
        options: ['Vị trí (A)', 'Vị trí (B)', 'Vị trí (C)', 'Vị trí (D)'],
        correctAnswer: 1,
        explanation: 'Phó từ 又 đứng trước vị ngữ biểu thị sự lặp lại: 今天他又怎么来了? hoặc 今天怎么又来了?',
        level: 4
      },
      {
        id: 'thpt_5',
        type: 'single',
        questionZh: 'Thành ngữ “塞翁失马” (Tái ông thất mã) khuyên chúng ta điều gì?',
        options: [
          'Họa phúc khôn lường, trong rủi có may',
          'Nên cẩn thận khi cưỡi ngựa',
          'Phải biết tiết kiệm tiền bạc',
          'Đừng tin người lạ'
        ],
        correctAnswer: 0,
        explanation: '塞翁失马，焉知非福 (Tái ông mất ngựa, biết đâu là phúc): khuyên con người đối diện trước biến cố một cách lạc quan, trong cái rủi có thể ẩn chứa cái may.',
        level: 5
      }
    ]
  }
];

export const DICTATION_ITEMS: DictationItem[] = [
  {
    id: 'dt_1',
    hanzi: '今天天气很好',
    pinyin: 'jīntiān tiānqì hěn hǎo',
    meaning: 'Thời tiết hôm nay rất đẹp',
    audioHint: '今天天气很好',
    level: 1
  },
  {
    id: 'dt_2',
    hanzi: '我想喝一杯中国茶',
    pinyin: 'wǒ xiǎng hē yì bēi Zhōngguó chá',
    meaning: 'Tôi muốn uống một tách trà Trung Quốc',
    audioHint: '我想喝一杯中国茶',
    level: 2
  },
  {
    id: 'dt_3',
    hanzi: '学汉语需要每天坚持',
    pinyin: 'xué Hànyǔ xūyào měitiān jiānchí',
    meaning: 'Học tiếng Trung cần kiên trì mỗi ngày',
    audioHint: '学汉语需要每天坚持',
    level: 3
  }
];

export const COMMON_SENTENCES = [
  {
    id: 's_1',
    hanzi: '请问，洗手间在哪里？',
    pinyin: 'Qǐngwèn, xǐshǒujiān zài nǎlǐ?',
    hanViet: 'Thỉnh vấn, tẩy thủ gian tại nả lý?',
    meaning: 'Xin hỏi, nhà vệ sinh ở đâu ạ?',
    category: 'Hỏi đường'
  },
  {
    id: 's_2',
    hanzi: '这个多少钱一件？',
    pinyin: 'Zhè ge duōshǎo qián yí jiàn?',
    hanViet: 'Giá cá đa thiểu tiền nhất kiện?',
    meaning: 'Cái này bao nhiêu tiền một chiếc?',
    category: 'Mua sắm'
  },
  {
    id: 's_3',
    hanzi: '我可以加一下你的微信吗？',
    pinyin: 'Wǒ kěyǐ jiā yíxià nǐ de Wēixìn ma?',
    hanViet: 'Ngã khả dĩ gia nhất hạ nhĩ đích Vi Tín ma?',
    meaning: 'Tôi có thể kết bạn WeChat với bạn được không?',
    category: 'Kết bạn'
  },
  {
    id: 's_4',
    hanzi: '祝你生日快乐，心想事成！',
    pinyin: 'Zhù nǐ shēngrì kuàilè, xīnxǐang shì chéng!',
    hanViet: 'Chúc nhĩ sinh nhật khoái lạc, tâm tưởng sự thành!',
    meaning: 'Chúc bạn sinh nhật vui vẻ, vạn sự như ý!',
    category: 'Chúc mừng'
  }
];
