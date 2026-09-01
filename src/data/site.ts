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
  { label: "Новости", href: "#news" },
  { label: "Документы", href: "#documents" },
  { label: "Контакты", href: "#contacts" },
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
    title: "Открыт новый набор волонтёров",
    desc: "Приглашаем добровольцев для помощи в проекте «Тёплый дом».",
    date: "18 августа 2026",
    tags: ["помощь", "волонтёры"],
    filter: "help",
  },
  {
    id: 2,
    title: "Фестиваль «Добрый город» прошёл с успехом",
    desc: "Более 500 человек посетили благотворительный фестиваль на выходных.",
    date: "10 августа 2026",
    tags: ["событие", "фестиваль"],
    filter: "events",
  },
  {
    id: 3,
    title: "Запуск нового проекта «Здоровье рядом»",
    desc: "Мобильные бригады врачей начнут выезжать в отдалённые районы с сентября.",
    date: "1 августа 2026",
    tags: ["проект", "медицина"],
    filter: "projects",
  },
  {
    id: 4,
    title: "Собран рекордный объём помощи для семей",
    desc: "Более 200 семей получили продуктовые наборы и вещи первой необходимости.",
    date: "25 июля 2026",
    tags: ["помощь", "семьи"],
    filter: "help",
  },
  {
    id: 5,
    title: "Вебинар по финансовой грамотности для НКО",
    desc: "Приглашаем представителей некоммерческих организаций на обучающий вебинар.",
    date: "15 июля 2026",
    tags: ["событие", "обучение"],
    filter: "events",
  },
  {
    id: 6,
    title: "Проект «Шаг в будущее» получил грант",
    desc: "Наш образовательный проект стал победителем конкурса грантов.",
    date: "5 июля 2026",
    tags: ["проект", "образование"],
    filter: "projects",
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
