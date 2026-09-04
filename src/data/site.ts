export const ORG = {
  name: "Дари Добро",
  full: "Автономная некоммерческая организация оказания социальной помощи «Дари Добро»",
  short: "АНО · Октябрьский, РБ",
  city: "г. Октябрьский, Республика Башкортостан",
  address: "г. Октябрьский, ул. Островского, 5б, ТЦ «РИО», цокольный этаж",
  legalAddress: "452606, Республика Башкортостан, г. Октябрьский, ул. Кызыл Маяк, д. 55/2",
  phone: "+7 (937) 830-44-82",
  phoneHref: "tel:+79378304482",
  email: "daridobro.okt@yandex.ru",
  inn: "0265052533",
  ogrn: "1220200026045",
  kpp: "026501001",
  account: "40703810229890000001",
  corrAccount: "30101810200000000824",
  bank: "Филиал «Нижегородский» АО «АЛЬФА-БАНК», г. Нижний Новгород",
  bik: "042202824",
  director: "Быстрова Алина Рамильевна",
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
    text: "Оплачиваем временное жильё семьям, которые остались без крыши над головой.",
    stat: "Жильё",
    statLabel: "направление проекта",
    icon: "Home",
  },
  {
    title: "«Шаг в будущее»",
    period: "Образование",
    text: "Помогаем подросткам из малообеспеченных семей выбрать профессию и пройти обучение.",
    stat: "Образование",
    statLabel: "направление проекта",
    icon: "GraduationCap",
  },
  {
    title: "«Здоровье рядом»",
    period: "Медицина",
    text: "Организуем выезды врачей в отдалённые районы, где нет своей поликлиники.",
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
  href: string;
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
    title: "Ищем амбассадоров фонда",
    desc: "Нужны люди, которые расскажут о «Дари Добро» в своём городе или компании — помогут с ярмарками, сбором вещей и информированием.",
    date: "22 октября 2024",
    tags: ["помощь", "волонтёры"],
    filter: "help",
    image: "news-1.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 2,
    title: "Чужих детей не бывает",
    desc: "Постоянный проект: устраиваем праздники и собираем вещи для детей из детских домов.",
    date: "16 октября 2024",
    tags: ["проект", "дети"],
    filter: "projects",
    image: "news-2.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 3,
    title: "Гуманитарная помощь для жителей зон СВО",
    desc: "Собрали и доставили несколько тонн одежды и медицинских принадлежностей, оказали финансовую поддержку семьям.",
    date: "9 октября 2024",
    tags: ["помощь", "гуманитарная помощь"],
    filter: "help",
    image: "news-3.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 4,
    title: "Как стать благотворителем",
    desc: "Короткая инструкция для тех, кто впервые хочет помочь фонду: с чего начать и куда обратиться.",
    date: "4 октября 2024",
    tags: ["событие", "обучение"],
    filter: "events",
    image: "news-4.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 5,
    title: "Помощь людям",
    desc: "Рассказываем историю фонда «Дари Добро» — с чего начали и чем занимаемся сейчас.",
    date: "23 июля 2024",
    tags: ["помощь", "миссия"],
    filter: "help",
    image: "news-5.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 6,
    title: "Благотворительный фонд Октябрьский",
    desc: "Рассказываем, чем занимается фонд в Октябрьском и как к нему присоединиться.",
    date: "9 июля 2024",
    tags: ["событие", "фонд"],
    filter: "events",
    image: "news-6.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 7,
    title: "Помощь малоимущим",
    desc: "Подпишитесь на регулярный перевод любой суммой или сделайте разовое пожертвование без комиссии.",
    date: "24 октября 2023",
    tags: ["помощь", "пожертвования"],
    filter: "help",
    image: "news-7.webp",
    href: "https://vk.ru/daridobrookt",
  },
  {
    id: 8,
    title: "Собрали и передали гуманитарную помощь",
    desc: "Волонтёры фонда упаковали продукты и вещи для нескольких семей в трудной ситуации. Фото и подробности — в группе ВКонтакте.",
    date: "3 сентября 2026",
    tags: ["событие", "волонтёры"],
    filter: "events",
    image: "news-8.webp",
    href: "https://vk.ru/daridobrookt",
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
  { title: "Устав АНО", type: "Документ", icon: "FileText", href: "/documents/ustav-ano-dari-dobro.pdf" },
  { title: `ИНН: ${ORG.inn}`, type: "Реквизит", icon: "FileBadge" },
  { title: `ОГРН: ${ORG.ogrn}`, type: "Реквизит", icon: "FileBadge" },
  { title: "Карточка организации", type: "Документ", icon: "FileSignature", href: "/documents/karta-partnera-dari-dobro.pdf" },
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
  { name: "Планета Добра", contribution: "Передаёт вещи и товары для наших складов." },
  { name: "Банк «Добро»", contribution: "Помогает с переводами и эквайрингом для пожертвований." },
  {
    name: "Агентство «Социум»",
    contribution: "Готовит макеты и печатает материалы для акций.",
  },
  { name: "Фонд «Надежда»", contribution: "Совместно проводим сборы для подопечных семей." },
];

export const HELP_WAYS = [
  {
    icon: "HandHeart",
    title: "Стать волонтёром",
    text: "Развозим продукты, разбираем вещи на складе, помогаем на мероприятиях — можно приходить на пару часов в неделю.",
  },
  {
    icon: "CreditCard",
    title: "Финансовая поддержка",
    text: "Разовый или ежемесячный платёж любой суммой — деньги идут на конкретные сборы из раздела «Сборы».",
  },
  {
    icon: "Package",
    title: "Товарная помощь",
    text: "Продукты, одежда, канцтовары — принимаем вещи в хорошем состоянии, список нужного есть в разделе «Каталог».",
  },
  {
    icon: "Brain",
    title: "Профессиональная помощь",
    text: "Нужны юристы, бухгалтеры, психологи и маркетологи, готовые взять на себя отдельные задачи фонда.",
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
    text: "Перезвоним в течение 24 часов, уточним детали и подскажем, что нужно принести или оформить.",
  },
];