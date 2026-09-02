export const ORG = {
  name: "Дари Добро",
  full: "Автономная некоммерческая организация «Дари Добро»",
  short: "АНО · Октябрьский, РБ",
  city: "г. Октябрьский, Республика Башкортостан",
  address: "г. Октябрьский, ул. Островского, 5б, ТЦ «РИО», цокольный этаж",
  phone: "+7 (937) 830-44-82",
  phoneHref: "tel:+79378304482",
  email: "daridobro.okt@yandex.ru",
  inn: "1234567890",
  ogrn: "1234567890123",
  kpp: "—",
  account: "—",
  bank: "—",
  bik: "—",
  hours: "Пн–Вс",
};

export const SOCIALS = [
  {
    label: "ВКонтакте",
    short: "VK",
    href: "https://vk.ru/daridobrookt",
    icon: "1447",
  },
  { label: "Telegram", short: "TG", href: "#", icon: "Send" },
  { label: "YouTube", short: "YT", href: "#", icon: "Youtube" },
  { label: "Одноклассники", short: "OK", href: "#", icon: "Smile" },
];

export const NAV = [
  { label: "Главная", href: "#hero" },
  { label: "Об организации", href: "#about" },
  { label: "Проекты", href: "#projects" },
  { label: "Каталог", href: "#catalog" },
  { label: "Новости", href: "#news" },
  { label: "Документы", href: "#documents" },
  { label: "Контакты", href: "#contacts" },
];

export type CatalogItem = {
  icon: string;
  title: string;
  text: string;
  category: string;
};

export const CATALOG: CatalogItem[] = [
  {
    icon: "Shirt",
    title: "Одежда и обувь",
    text: "Сезонная одежда, обувь для детей и взрослых в хорошем состоянии.",
    category: "Вещи",
  },
  {
    icon: "ShoppingBasket",
    title: "Продукты питания",
    text: "Крупы, консервы, детское питание с длительным сроком хранения.",
    category: "Продукты",
  },
  {
    icon: "Pill",
    title: "Лекарства и гигиена",
    text: "Средства первой необходимости, предметы личной гигиены, медикаменты.",
    category: "Медицина",
  },
  {
    icon: "BookOpen",
    title: "Книги и канцелярия",
    text: "Учебники, тетради, письменные принадлежности для школьников.",
    category: "Образование",
  },
  {
    icon: "Baby",
    title: "Детские товары",
    text: "Игрушки, коляски, кроватки и другие вещи для малышей.",
    category: "Дети",
  },
  {
    icon: "Sofa",
    title: "Мебель и техника",
    text: "Бытовая техника и мебель в рабочем состоянии для нуждающихся семей.",
    category: "Быт",
  },
];

export type Fundraiser = {
  title: string;
  desc: string;
  raised: number;
  goal: number;
  deadline: string;
  hot?: boolean;
};

export const FUNDRAISERS: Fundraiser[] = [
  {
    title: "Дети-сироты",
    desc: "Сбор средств на одежду, учебники и развивающие занятия для детей из детских домов.",
    raised: 0,
    goal: 350000,
    deadline: "идёт сбор",
  },
  {
    title: "Пожилые люди",
    desc: "Доставка продуктов, лекарств и организация досуга для одиноких пенсионеров.",
    raised: 0,
    goal: 210000,
    deadline: "идёт сбор",
  },
  {
    title: "Бездомные животные",
    desc: "Стерилизация, лечение и поиск новых хозяев для бездомных кошек и собак.",
    raised: 0,
    goal: 120000,
    deadline: "идёт сбор",
  },
];

export const DIRECTIONS = [
  {
    icon: "ShoppingBasket",
    emoji: "🥘",
    title: "Продовольственная помощь",
    text: "Обеспечиваем продуктами питания семьи в трудной жизненной ситуации.",
  },
  {
    icon: "GraduationCap",
    emoji: "📚",
    title: "Образование и развитие",
    text: "Проводим курсы, тренинги и поддерживаем образовательные инициативы.",
  },
  {
    icon: "Stethoscope",
    emoji: "🏥",
    title: "Медицинская поддержка",
    text: "Помогаем с лекарствами, реабилитацией и сопровождением к врачам.",
  },
  {
    icon: "Brain",
    emoji: "🧠",
    title: "Психологическая помощь",
    text: "Бесплатные консультации психологов и группы поддержки.",
  },
];

export const WHOM = [
  {
    icon: "Baby",
    title: "Семьи с детьми",
    text: "Семьи с детьми в трудной жизненной ситуации.",
  },
  {
    icon: "PersonStanding",
    title: "Пожилые люди",
    text: "Пожилые люди, оставшиеся без поддержки.",
  },
  {
    icon: "Accessibility",
    title: "Люди с инвалидностью",
    text: "Люди с ограниченными возможностями здоровья.",
  },
  {
    icon: "Home",
    title: "Пострадавшие",
    text: "Жертвы насилия или стихийных бедствий.",
  },
];

export type Project = {
  title: string;
  period: string;
  text: string;
  stat: string;
  statLabel: string;
  icon: string;
};

export const PROJECTS: Project[] = [
  {
    title: "«Тёплый дом»",
    period: "Жильё",
    text: "Временное жильё для семей, оказавшихся без крова.",
    stat: "Жильё",
    statLabel: "направление проекта",
    icon: "Home",
  },
  {
    title: "«Шаг в будущее»",
    period: "Образование",
    text: "Профориентация и обучение подростков из малообеспеченных семей.",
    stat: "Образование",
    statLabel: "направление проекта",
    icon: "GraduationCap",
  },
  {
    title: "«Здоровье рядом»",
    period: "Медицина",
    text: "Мобильные медицинские бригады для отдалённых районов.",
    stat: "Медицина",
    statLabel: "направление проекта",
    icon: "Stethoscope",
  },
];

export type NewsItem = {
  id: number;
  title: string;
  desc: string;
  date: string;
  tags: string[];
  filter: "help" | "events" | "projects";
  image: string;
};

export const NEWS_FILTERS = [
  { key: "all", label: "Все новости" },
  { key: "help", label: "Помощь" },
  { key: "events", label: "События" },
  { key: "projects", label: "Проекты" },
] as const;

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Как стать амбассадором?",
    desc: "Присоединяйтесь к нам: станьте амбассадором «Дари Добро» и внесите свой вклад в благотворительность вместе с нашей командой.",
    date: "22 октября 2024",
    tags: ["помощь", "волонтёры"],
    filter: "help",
    image: "news-1.webp",
  },
  {
    id: 2,
    title: "Чужих детей не бывает",
    desc: "Круглогодичный проект «Чужих детей не бывает»: организуем праздничные мероприятия и собираем помощь для детей из детских домов.",
    date: "16 октября 2024",
    tags: ["проект", "дети"],
    filter: "projects",
    image: "news-2.webp",
  },
  {
    id: 3,
    title: "Гуманитарная помощь для жителей зон СВО",
    desc: "Истории успеха: собрали и доставили тонны одежды и медицинских принадлежностей, а также оказали финансовую поддержку.",
    date: "9 октября 2024",
    tags: ["помощь", "гуманитарная помощь"],
    filter: "help",
    image: "news-3.webp",
  },
  {
    id: 4,
    title: "Как стать благотворителем",
    desc: "Готовы к благотворительности, но не знаете с чего начать? Рассказываем, как присоединиться и начать помогать вместе с фондом.",
    date: "4 октября 2024",
    tags: ["событие", "обучение"],
    filter: "events",
    image: "news-4.webp",
  },
  {
    id: 5,
    title: "Помощь людям",
    desc: "От идеи до действия: история фонда «Дари Добро» и наши главные ценности — милосердие, доброта и поддержка нуждающихся.",
    date: "23 июля 2024",
    tags: ["помощь", "миссия"],
    filter: "help",
    image: "news-5.webp",
  },
  {
    id: 6,
    title: "Благотворительный фонд Октябрьский",
    desc: "Добро пожаловать в наше сообщество добра! Объединяем усилия, чтобы помочь тем, кто оказался в беде.",
    date: "9 июля 2024",
    tags: ["событие", "фонд"],
    filter: "events",
    image: "news-6.webp",
  },
  {
    id: 7,
    title: "Помощь малоимущим",
    desc: "Поддержите наши проекты любой суммой — подпишитесь на регулярные переводы или сделайте разовое пожертвование без комиссии.",
    date: "24 октября 2023",
    tags: ["помощь", "пожертвования"],
    filter: "help",
    image: "news-7.webp",
  },
];

export const TEAM = [
  { name: "Быстрова Алина Рамильевна", role: "Директор", text: "" },
  {
    name: "Быстрова Алина Рамильевна",
    role: "Руководитель проектов",
    text: "",
  },
  { name: "Елена Козлова", role: "PR-менеджер", text: "" },
  { name: "Дмитрий Волков", role: "Координатор волонтёров", text: "" },
];

export const AWARDS = [
  {
    year: "2022",
    title: "Победитель конкурса «Лучший социальный проект»",
    text: "",
  },
  {
    year: "2023",
    title: "Благодарность от Министерства социальной защиты",
    text: "",
  },
  {
    year: "2024",
    title: "Грант Президентского фонда культурных инициатив",
    text: "",
  },
];

export const MEDIA = [
  {
    source: "Первый канал",
    title: "«Доброе утро» — сюжет об организации",
    date: "",
  },
  { source: "«Коммерсантъ»", title: "Статья о проекте «Тёплый дом»", date: "" },
  { source: "«Радио России»", title: "Интервью с директором", date: "" },
  { source: "«Такие дела»", title: "Репортаж о работе АНО", date: "" },
];

export const DOCUMENTS = [
  { title: "Устав АНО", type: "Документ", icon: "FileText" },
  { title: `ИНН: ${ORG.inn}`, type: "Реквизит", icon: "FileBadge" },
  { title: `ОГРН: ${ORG.ogrn}`, type: "Реквизит", icon: "FileBadge" },
  { title: "Карточка организации", type: "Документ", icon: "FileSignature" },
];

export const REPORTS_MONTHLY = [
  { title: "Отчёт за январь 2026", sum: "01.02.2026", icon: "FileSpreadsheet" },
  {
    title: "Отчёт за февраль 2026",
    sum: "01.03.2026",
    icon: "FileSpreadsheet",
  },
  { title: "Отчёт за март 2026", sum: "01.04.2026", icon: "FileSpreadsheet" },
  { title: "Отчёт за апрель 2026", sum: "01.05.2026", icon: "FileSpreadsheet" },
];

export const REPORTS_ANNUAL = [
  { title: "Публичный отчёт 2025", sum: "2025", icon: "FileArchive" },
  { title: "Публичный отчёт 2024", sum: "2024", icon: "FileArchive" },
  { title: "Публичный отчёт 2023", sum: "2023", icon: "FileArchive" },
];

export const PARTNERS = [
  { name: "Планета Добра", contribution: "Поддерживает миссию организации." },
  { name: "Банк «Добро»", contribution: "Поддерживает миссию организации." },
  {
    name: "Агентство «Социум»",
    contribution: "Поддерживает миссию организации.",
  },
  { name: "Фонд «Надежда»", contribution: "Поддерживает миссию организации." },
];

export const HELP_WAYS = [
  {
    icon: "HandHeart",
    title: "Стать волонтёром",
    text: "Присоединяйтесь к нашей команде! Мы ищем активных, ответственных и добрых людей.",
  },
  {
    icon: "CreditCard",
    title: "Финансовая поддержка",
    text: "Регулярные или разовые пожертвования — любой вклад важен для наших проектов.",
  },
  {
    icon: "Package",
    title: "Товарная помощь",
    text: "Продукты, одежда, канцтовары — мы принимаем вещи в хорошем состоянии.",
  },
  {
    icon: "Brain",
    title: "Интеллектуальная помощь",
    text: "Юристы, бухгалтеры, психологи, маркетологи — ваш профессионализм нужен нам.",
  },
];

export const HELP_STEPS = [
  {
    step: "01",
    title: "Позвоните нам",
    text: `Свяжитесь с нами по телефону ${ORG.phone}.`,
  },
  {
    step: "02",
    title: "Или заполните форму",
    text: "Оставьте заявку на сайте — это займёт минуту.",
  },
  {
    step: "03",
    title: "Координатор свяжется",
    text: "Мы перезвоним в течение 24 часов и вместе определим необходимый объём помощи.",
  },
];