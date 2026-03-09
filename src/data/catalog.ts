export interface CatalogSubcategory {
  id: string;
  name: string;
  slug: string;
  /** If set, navigates to this path instead of /catalog/:cat/:sub */
  externalPath?: string;
  /** Optional image path */
  image?: string;
  /** Optional group label for visual grouping within a category */
  group?: string;
  /** Product/service description shown in detail card */
  description?: string;
}

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  /** Optional description shown on the category page */
  description?: string;
  /** Category thumbnail image */
  image?: string;
  subcategories: CatalogSubcategory[];
}

export const catalog: CatalogCategory[] = [
  /* ─── 1. Ёмкости ─── */
  {
    id: "emkosti",
    name: "Ёмкости",
    slug: "emkosti",
    description: "Промышленные ёмкости из листового полипропилена и полиэтилена — надёжность, проверенная временем!",
    image: "/images/emkosti-hero-1.png",
    subcategories: [
      { id: "e1", name: "Цилиндрические вертикальные", slug: "konfigurator", externalPath: "/catalog/emkosti/konfigurator", image: "/images/emkosti-hero-1.png", description: "Вертикальные цилиндрические ёмкости из полипропилена и полиэтилена для хранения жидкостей." },
      { id: "e2", name: "Цилиндрические горизонтальные", slug: "konfigurator-horiz", externalPath: "/catalog/emkosti/konfigurator", image: "/images/emkosti-hero-2.png", description: "Горизонтальные цилиндрические ёмкости для наземного и подземного размещения." },
      { id: "e3", name: "Подземные", slug: "podzemnye", externalPath: "/catalog/emkosti/podzemnye", image: "/images/emkosti-podzemnye-1.jpg", description: "Подземные ёмкости с усиленным корпусом для заглублённого монтажа." },
      { id: "e4", name: "Прямоугольные", slug: "pryamougolnye", externalPath: "/catalog/emkosti/pryamougolnye", image: "/images/emkost-pryam-pp-1.png", description: "Прямоугольные ёмкости в обрешётке из полипропилена и полиэтилена." },
      { id: "e5", name: "Пожарные", slug: "pozharnye", externalPath: "/catalog/emkosti/pozharnye", image: "/images/emkost-pryam-pp-2.png", description: "Пожарные резервуары для запаса воды на предприятиях и объектах." },
      { id: "e6", name: "Для сейсмоактивных районов", slug: "sejsmoaktivnye", image: "/images/emkosti-hero-1.png", description: "Ёмкости с усиленной конструкцией для эксплуатации в сейсмоактивных зонах." },
      { id: "e7", name: "Для щелочи", slug: "kisloty-shchelochi", externalPath: "/catalog/emkosti/kisloty-shchelochi", image: "/images/emkosti-kisloty-thumb.png", description: "Химически стойкие ёмкости для хранения щелочных растворов." },
      { id: "e8", name: "Для кислоты", slug: "kisloty", externalPath: "/catalog/emkosti/kisloty-shchelochi", image: "/images/emkosti-kisloty-hero-1.png", description: "Химически стойкие ёмкости для хранения кислот." },
      { id: "e9", name: "Переливные для бассейнов", slug: "perelivnye", image: "/images/emkosti-hero-2.png", description: "Переливные ёмкости для систем водоподготовки бассейнов." },
    ],
  },

  /* ─── 2. Водоочистка ─── */
  {
    id: "vodoochistka",
    name: "Водоочистка",
    slug: "vodoochistka",
    description: "Полимерное водоочистное оборудование — эффективность, долговечность и устойчивость к агрессивным средам!",
    image: "/images/vodoochistka-hero-1.jpeg",
    subcategories: [
      { id: "v1", name: "ФФУ флотационно-фильтровальная установка", slug: "ffu", externalPath: "/catalog/vodoochistka/ffu", image: "/images/ffu-thumb.png" },
      { id: "v2", name: "Ламельный тонкослойный отстойник-сепаратор", slug: "lamelnyj-otstojnik", externalPath: "/catalog/vodoochistka/lamelnyj-otstojnik", image: "/images/lamelnyj-thumb.png" },
      { id: "v3", name: "Мешочный обезвоживатель осадка", slug: "meshochnyj-obezvozhivatel", externalPath: "/catalog/vodoochistka/meshochnyj-obezvozhivatel", image: "/images/obezvozhivatel-thumb.png" },
      { id: "v4", name: "Станция приготовления коагулянта", slug: "stantsiya-dozirovaniya", externalPath: "/catalog/vodoochistka/stantsiya-dozirovaniya", image: "/images/dozirovanie-thumb.png", description: "Автоматизированное дозирование и смешивание коагулянтов." },
      { id: "v5", name: "Станция приготовления флокулянта", slug: "stantsiya-flokulyanta", image: "/images/dozirovanie-hero-1.png", description: "Станция приготовления и дозирования флокулянтов для систем водоочистки." },
      { id: "v6", name: "Жироуловители промышленные", slug: "zhirouloviteli", externalPath: "/catalog/vodoochistka/zhirouloviteli", image: "/images/zhiroulovitel-thumb.png" },
      { id: "v7", name: "КОС ливневых сточных вод", slug: "los", externalPath: "/catalog/vodoochistka/los", image: "/images/los-thumb.png", description: "Комплексные очистные сооружения для ливневых и талых вод." },
      { id: "v8", name: "Реагентные шкафы и стойки", slug: "shkafy-dozirovaniya", externalPath: "/catalog/vodoochistka/shkafy-dozirovaniya", image: "/images/shkafy-thumb.png" },
    ],
  },

  /* ─── 3. КНС ─── */
  {
    id: "kns",
    name: "КНС",
    slug: "kns",
    description: "Канализационные насосные станции из полипропилена и стеклопластика — надёжное водоотведение для любых объектов!",
    image: "/images/kns-hero-1.png",
    subcategories: [
      { id: "kns1", name: "КНС в корпусе SVT (стеклопластик)", slug: "kns-svt", image: "/images/kns-svt.png", description: "Канализационные насосные станции в корпусе из стеклопластика SVT. Высокая прочность и коррозионная стойкость, подземное размещение." },
      { id: "kns2", name: "КНС в корпусе из полипропилена", slug: "kns-pp", image: "/images/kns-pp.png", description: "Канализационные насосные станции в полипропиленовом корпусе. Химическая стойкость, облегчённый монтаж." },
    ],
  },

  /* ─── 4. Химические реакторы ─── */
  {
    id: "reaktory",
    name: "Химические реакторы",
    slug: "reaktory",
    description: "Реакторы из полипропилена и полиэтилена для химических, гидрометаллургических и технологических процессов!",
    image: "/images/reaktory-hero-1.png",
    subcategories: [
      { id: "r1", name: "Реакторы из полипропилена", slug: "reaktor-pp", image: "/images/reaktor-pp.png", description: "Химические реакторы из полипропилена для работы с агрессивными средами при температурах до +100 °C." },
      { id: "r2", name: "Реакторы для гидрометаллургии", slug: "reaktor-gidro", image: "/images/reaktor-gidro.png", description: "Реакторы для гидрометаллургических процессов: осаждение, выщелачивание, экстракция." },
    ],
  },

  /* ─── 5. Гидрометаллургия ─── */
  {
    id: "gidrometallurgiya",
    name: "Гидрометаллургия",
    slug: "gidrometallurgiya",
    description: "Реакторы, нутч-фильтры, установки выщелачивания и сорбции — полимерное оборудование для извлечения металлов!",
    image: "/images/gidrometallurgiya-hero-1.png",
    subcategories: [
      { id: "gm1", name: "Реакторы химического осаждения", slug: "reaktor-osazhdeniya", image: "/images/gm-reaktor.png", description: "Реакторы с мешалкой для химического осаждения металлов из растворов." },
      { id: "gm2", name: "Нутч-фильтры", slug: "nutch-filtry", image: "/images/gm-nutch.png", description: "Полипропиленовые нутч-фильтры для фильтрации пульп и суспензий." },
      { id: "gm3", name: "Установки выщелачивания", slug: "vyshchelachivanie", image: "/images/gm-vyshchelach.png", description: "Установки атмосферного и автоклавного выщелачивания руд и концентратов." },
      { id: "gm4", name: "Сорбционные установки", slug: "sorbtsionnye", image: "/images/gm-sorbtsionnye.png", description: "Колонные и кассетные сорбционные установки для извлечения золота, серебра, цветных металлов." },
    ],
  },

  /* ─── 6. Газоочистка ─── */
  {
    id: "gazoochistka",
    name: "Газоочистка",
    slug: "gazoochistka",
    description: "Скрубберы, фильтры и каплеуловители из полимеров для очистки промышленных газов.",
    image: "/images/gazoochistka-hero-1.png",
    subcategories: [
      { id: "go1", name: "Скрубберы вертикальные", slug: "skrubbery-vertikalnye", externalPath: "/catalog/gazoochistka/skrubbery", image: "/images/skrubber-vertikalnyj-1.jpg" },
      { id: "go2", name: "Скрубберы горизонтальные", slug: "skrubbery-gorizontalnye", externalPath: "/catalog/gazoochistka/skrubbery", image: "/images/skrubber-gorizontalnyj-1.jpg" },
      { id: "go3", name: "ФВГ — фильтры волокнистые гальванические", slug: "fvg", externalPath: "/catalog/gazoochistka/fvg", image: "/images/fvg-thumb.png" },
      { id: "go4", name: "Каплеуловители", slug: "kapleuloviteli", externalPath: "/catalog/gazoochistka/kapleuloviteli", image: "/images/kapleulovitel-thumb.png" },
    ],
  },

  /* ─── 7. Вентиляция ─── */
  {
    id: "ventilyatsiya",
    name: "Вентиляция",
    slug: "ventilyatsiya",
    description: "Элементы промышленной вентиляции из полипропилена — круглого и прямоугольного сечения.",
    image: "/images/ventilyatsiya-hero-1.png",
    subcategories: [
      { id: "ve1", name: "Отвод вентиляционный", slug: "otvod", externalPath: "/", image: "/images/product-1.png", group: "Круглого сечения" },
      { id: "ve2", name: "Тройник вентиляционный", slug: "troynik", externalPath: "/troynik", image: "/images/troynik-1.png", group: "Круглого сечения" },
      { id: "ve3", name: "Раздвижной элемент", slug: "razdvizhnoy", externalPath: "/razdvizhnoy", image: "/images/razdvizhnoy-1.png", group: "Круглого сечения" },
      { id: "ve4", name: "Воздуховод круглый", slug: "vozdukhovod", externalPath: "/vozdukhovod", image: "/images/vozdukhovod-1.png", group: "Круглого сечения" },
      { id: "ve5", name: "Воздуховод прямоугольный", slug: "vozdukhovod-pryam", image: "/images/vent-vozdukhovod-pryam.png", group: "Прямоугольного сечения", description: "Воздуховоды прямоугольного сечения из полипропилена для промышленной вентиляции." },
      { id: "ve6", name: "Отвод прямоугольный", slug: "otvod-pryam", image: "/images/vent-otvod-pryam.png", group: "Прямоугольного сечения", description: "Отводы прямоугольного сечения для систем вентиляции." },
      { id: "ve7", name: "Тройник прямоугольный", slug: "troynik-pryam", image: "/images/vent-troynik-pryam.png", group: "Прямоугольного сечения", description: "Тройники прямоугольного сечения из полипропилена." },
      { id: "ve8", name: "Переход круглый-прямоугольный", slug: "perekhod", image: "/images/vent-perekhod.png", group: "Прямоугольного сечения", description: "Переходные элементы с круглого на прямоугольное сечение." },
    ],
  },
];

export function findCategory(slug: string): CatalogCategory | undefined {
  return catalog.find((c) => c.slug === slug);
}

export function findSubcategory(
  catSlug: string,
  subSlug: string
): { category: CatalogCategory; subcategory: CatalogSubcategory } | undefined {
  const cat = findCategory(catSlug);
  if (!cat) return undefined;
  const sub = cat.subcategories.find((s) => s.slug === subSlug);
  if (!sub) return undefined;
  return { category: cat, subcategory: sub };
}
