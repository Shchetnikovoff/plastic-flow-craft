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
  subcategories: CatalogSubcategory[];
}

export const catalog: CatalogCategory[] = [
  {
    id: "galvanika",
    name: "Гальваника",
    slug: "galvanika",
    description: "Гальваническое оборудование. Проектирование, производство и монтаж.",

    subcategories: [],
  },
  {
    id: "vodoochistka",
    name: "Водоочистка",
    slug: "vodoochistka",
    description: "Полимерное водоочистное оборудование — эффективность, долговечность и устойчивость к агрессивным средам!",
    subcategories: [
      { id: "v2", name: "ФФУ флотационно-фильтровальная установка", slug: "ffu", externalPath: "/catalog/vodoochistka/ffu", image: "/images/ffu-thumb.png" },
      { id: "v3", name: "Ламельный тонкослойный отстойник-сепаратор", slug: "lamelnyj-otstojnik", externalPath: "/catalog/vodoochistka/lamelnyj-otstojnik", image: "/images/lamelnyj-thumb.png" },
      { id: "v4", name: "Мешочный обезвоживатель осадка", slug: "meshochnyj-obezvozhivatel", externalPath: "/catalog/vodoochistka/meshochnyj-obezvozhivatel", image: "/images/obezvozhivatel-thumb.png" },
      { id: "v5", name: "Станция дозирования", slug: "stantsiya-dozirovaniya", externalPath: "/catalog/vodoochistka/stantsiya-dozirovaniya", image: "/images/dozirovanie-thumb.png" },
      { id: "v7", name: "Жироуловители промышленные", slug: "zhirouloviteli", externalPath: "/catalog/vodoochistka/zhirouloviteli", image: "/images/zhiroulovitel-thumb.png" },
      { id: "v8", name: "ЛОС — локальные очистные сооружения", slug: "los", externalPath: "/catalog/vodoochistka/los", image: "/images/los-thumb.png" },
      { id: "v9", name: "Реагентные шкафы и стойки", slug: "shkafy-dozirovaniya", externalPath: "/catalog/vodoochistka/shkafy-dozirovaniya", image: "/images/shkafy-thumb.png" },
    ],
  },
  {
    id: "vodopodgotovka",
    name: "Водоподготовка",
    slug: "vodopodgotovka",
    subcategories: [],
  },
  {
    id: "ventilyatsiya",
    name: "Вентиляция",
    slug: "ventilyatsiya",
    description: "Элементы промышленной вентиляции из полипропилена — круглого и прямоугольного сечения.",
    subcategories: [
      // — Круглого сечения —
      { id: "ve1", name: "Отвод вентиляционный", slug: "otvod", externalPath: "/", image: "/images/product-1.png", group: "Круглого сечения" },
      { id: "ve2", name: "Тройник вентиляционный", slug: "troynik", externalPath: "/troynik", image: "/images/troynik-1.png", group: "Круглого сечения" },
      { id: "ve3", name: "Раздвижной элемент", slug: "razdvizhnoy", externalPath: "/razdvizhnoy", image: "/images/razdvizhnoy-1.png", group: "Круглого сечения" },
      { id: "ve4", name: "Воздуховод круглый", slug: "vozdukhovod", externalPath: "/vozdukhovod", image: "/images/vozdukhovod-1.png", group: "Круглого сечения" },
    ],
  },
  {
    id: "gazoochistka",
    name: "Газоочистка",
    slug: "gazoochistka",
    subcategories: [
      { id: "go1", name: "Скрубберы вертикальные", slug: "skrubbery-vertikalnye", externalPath: "/catalog/gazoochistka/skrubbery", image: "/images/skrubber-vertikalnyj-1.jpg" },
      { id: "go2", name: "Скрубберы горизонтальные", slug: "skrubbery-gorizontalnye", externalPath: "/catalog/gazoochistka/skrubbery", image: "/images/skrubber-gorizontalnyj-1.jpg" },
      { id: "go3", name: "ФВГ — фильтры волокнистые гальванические", slug: "fvg", externalPath: "/catalog/gazoochistka/fvg", image: "/images/fvg-thumb.png" },
      { id: "go4", name: "Каплеуловители", slug: "kapleuloviteli", externalPath: "/catalog/gazoochistka/kapleuloviteli", image: "/images/kapleulovitel-thumb.png" },
    ],
  },
  {
    id: "emkosti",
    name: "Ёмкости",
    slug: "emkosti",
    description: "Промышленные ёмкости из листового полипропилена и полиэтилена — надёжность, проверенная временем!",
    subcategories: [
      { id: "e3", name: "Ёмкости подземные", slug: "podzemnye", externalPath: "/catalog/emkosti/podzemnye", image: "/images/emkosti-podzemnye-1.jpg" },
      { id: "e4", name: "Ёмкости прямоугольные", slug: "pryamougolnye", externalPath: "/catalog/emkosti/pryamougolnye", image: "/images/emkost-pryam-pp-1.png" },
      { id: "e5", name: "Ёмкости пожарные", slug: "pozharnye", externalPath: "/catalog/emkosti/pozharnye", image: "/images/emkost-pryam-pp-2.png" },
      { id: "e6", name: "Ёмкости для кислот и щелочей", slug: "kisloty-shchelochi", externalPath: "/catalog/emkosti/kisloty-shchelochi", image: "/images/emkosti-kisloty-thumb.png" },
    ],
  },
  {
    id: "reaktory",
    name: "Химические реакторы",
    slug: "reaktory",
    subcategories: [],
  },
  {
    id: "gidrometallurgiya",
    name: "Гидрометаллургия",
    slug: "gidrometallurgiya",
    subcategories: [],
  },
  {
    id: "kns",
    name: "КНС",
    slug: "kns",
    subcategories: [],
  },
  {
    id: "labmebel",
    name: "Лабораторная мебель",
    slug: "labmebel",
    subcategories: [],
  },
  {
    id: "shkafy-upravleniya",
    name: "Шкафы управления",
    slug: "shkafy-upravleniya",
    subcategories: [],
  },
  {
    id: "uslugi",
    name: "Услуги",
    slug: "uslugi",
    subcategories: [
      { id: "u1", name: "Проектирование водоподготовительного и водоочистного оборудования", slug: "proektirovanie-vodoochistki", image: "/images/uslugi-proekt-vodo.png", description: "Полный цикл проектирования водоочистных и водоподготовительных систем: технологические схемы, подбор оборудования, рабочая документация. Опыт реализации проектов производительностью до 500 м³/ч." },
      { id: "u2", name: "Проектирование КНС", slug: "proektirovanie-kns", image: "/images/uslugi-proekt-kns.png", description: "Проектирование канализационных насосных станций: гидравлический расчёт, подбор насосов, разработка конструкции корпуса. Учёт геологических и климатических условий площадки." },
      { id: "u3", name: "Монтаж ёмкостей", slug: "montazh-emkostej", image: "/images/uslugi-montazh-emk.png", description: "Профессиональный монтаж промышленных ёмкостей: доставка, установка, подключение трубопроводов. Монтаж подземных и наземных ёмкостей с соблюдением СНиП." },
      { id: "u4", name: "Монтаж КНС", slug: "montazh-kns", image: "/images/uslugi-montazh-kns.png", description: "Монтаж канализационных насосных станций «под ключ»: земляные работы, установка корпуса, подключение насосов и автоматики. Пусконаладочные работы." },
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
