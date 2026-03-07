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

    subcategories: [
      { id: "g1", name: "Гальванические линии ручные", slug: "linii-ruchnye" },
      { id: "g2", name: "Гальванические линии механизированные", slug: "linii-mekhanizirovannye" },
      { id: "g3", name: "Гальванические линии автоматические", slug: "linii-avtomaticheskie" },
      { id: "g5", name: "Линия подготовки поверхности", slug: "podgotovka-poverhnosti" },
      { id: "g6", name: "Гальванические ванны", slug: "vanny" },
      { id: "g7", name: "Колокольные ванны", slug: "kolokolnye-vanny" },
      { id: "g8", name: "Гальванические барабаны", slug: "barabany" },
      { id: "g9", name: "Запчасти и комплектующие для гальваники", slug: "zapchasti" },
    ],
  },
  {
    id: "vodoochistka",
    name: "Водоочистка",
    slug: "vodoochistka",
    description: "Полимерное водоочистное оборудование — эффективность, долговечность и устойчивость к агрессивным средам!",
    subcategories: [
      { id: "v2", name: "ФФУ флотационно-фильтровальная установка", slug: "ffu", externalPath: "/catalog/vodoochistka/ffu" },
      { id: "v3", name: "Ламельный тонкослойный отстойник-сепаратор", slug: "lamelnyj-otstojnik", externalPath: "/catalog/vodoochistka/lamelnyj-otstojnik" },
      { id: "v4", name: "Мешочный обезвоживатель осадка", slug: "meshochnyj-obezvozhivatel", externalPath: "/catalog/vodoochistka" },
      { id: "v5", name: "Станция приготовления коагулянта", slug: "stantsiya-koagulyanta", externalPath: "/catalog/vodoochistka" },
      { id: "v7", name: "Жироуловители промышленные", slug: "zhirouloviteli", externalPath: "/catalog/vodoochistka" },
      { id: "v8", name: "КОС — комплексные очистные сооружения", slug: "kos", externalPath: "/catalog/vodoochistka" },
      { id: "v9", name: "Реагентные шкафы и стойки", slug: "shkafy-dozirovaniya", externalPath: "/catalog/vodoochistka" },
    ],
  },
  {
    id: "vodopodgotovka",
    name: "Водоподготовка",
    slug: "vodopodgotovka",
    subcategories: [
      { id: "vp1", name: "Система подготовки воды / обратный осмос", slug: "obratnyj-osmos" },
    ],
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
      // — Прямоугольного сечения —
      { id: "ve5", name: "Воздуховод прямоугольный", slug: "vozdukhovod-pryamougolnyy", group: "Прямоугольного сечения" },
      { id: "ve6", name: "Отвод прямоугольный", slug: "otvod-pryamougolnyy", group: "Прямоугольного сечения" },
      { id: "ve7", name: "Тройник прямоугольный", slug: "troynik-pryamougolnyy", group: "Прямоугольного сечения" },
      { id: "ve8", name: "Переход круглый-прямоугольный", slug: "perekhod-kruglyy-pryamougolnyy", group: "Прямоугольного сечения" },
    ],
  },
  {
    id: "gazoochistka",
    name: "Газоочистка",
    slug: "gazoochistka",
    subcategories: [
      { id: "go1", name: "Скрубберы вертикальные", slug: "skrubbery-vertikalnye" },
      { id: "go2", name: "Скрубберы горизонтальные", slug: "skrubbery-gorizontalnye" },
      { id: "go3", name: "ФВГ — фильтры волокнистые гальванические", slug: "fvg" },
      { id: "go4", name: "Каплеуловители", slug: "kapleuloviteli" },
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
    ],
  },
  {
    id: "reaktory",
    name: "Химические реакторы",
    slug: "reaktory",
    subcategories: [
      { id: "r1", name: "Химические реакторы из полипропилена", slug: "iz-polipropilena" },
      { id: "r2", name: "Химические реакторы из полиэтилена", slug: "iz-polietilena" },
      { id: "r3", name: "Реактор для гидрометаллургии", slug: "gidrometallurgiya" },
    ],
  },
  {
    id: "gidrometallurgiya",
    name: "Гидрометаллургия",
    slug: "gidrometallurgiya",
    subcategories: [
      { id: "gm1", name: "Реактор химического осаждения металла", slug: "reaktor-osazhdeniya" },
      { id: "gm2", name: "Нутч-фильтр", slug: "nutch-filtr" },
      { id: "gm3", name: "Установки выщелачивания", slug: "vyshchelachivaniye" },
      { id: "gm4", name: "Установки сорбционные", slug: "sorbtsionnye" },
    ],
  },
  {
    id: "kns",
    name: "КНС",
    slug: "kns",
    subcategories: [
      { id: "k1", name: "КНС в корпусе SVT", slug: "v-korpuse-svt" },
      { id: "k2", name: "КНС в корпусе из полипропилена", slug: "v-korpuse-polipropilen" },
    ],
  },
  {
    id: "labmebel",
    name: "Лабораторная мебель",
    slug: "labmebel",
    subcategories: [
      { id: "l1", name: "Лабораторная мебель из полипропилена", slug: "iz-polipropilena" },
      { id: "l2", name: "Шкафы хранения реактивов", slug: "shkafy-reaktivov" },
      { id: "l3", name: "Вытяжные шкафы", slug: "vytyazhnye-shkafy" },
      { id: "l4", name: "Мойки лабораторные", slug: "mojki" },
      { id: "l5", name: "Стол лабораторный моечный", slug: "stol-moechnyj" },
      { id: "l6", name: "Тумба лабораторная", slug: "tumba" },
      { id: "l7", name: "Тумба лабораторная с мойкой", slug: "tumba-s-mojkoj" },
      { id: "l8", name: "Тумба лабораторная с мойкой и сушилкой", slug: "tumba-s-mojkoj-sushilkoj" },
    ],
  },
  {
    id: "shkafy-upravleniya",
    name: "Шкафы управления",
    slug: "shkafy-upravleniya",
    subcategories: [
      { id: "su1", name: "Шкафы управления гальванической линией", slug: "galvanicheskoy-liniey" },
      { id: "su2", name: "Шкафы управления очистными", slug: "ochistnymi" },
      { id: "su3", name: "Шкафы управления насосами", slug: "nasosami" },
    ],
  },
  {
    id: "uslugi",
    name: "Услуги",
    slug: "uslugi",
    subcategories: [
      { id: "u1", name: "Проектирование водоподготовительного и водоочистного оборудования", slug: "proektirovanie-vodoochistki" },
      { id: "u2", name: "Проектирование КНС", slug: "proektirovanie-kns" },
      { id: "u3", name: "Монтаж ёмкостей", slug: "montazh-emkostej" },
      { id: "u4", name: "Монтаж КНС", slug: "montazh-kns" },
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
