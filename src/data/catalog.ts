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
    id: "emkosti",
    name: "Ёмкости",
    slug: "emkosti",
    description: "Промышленные ёмкости из листового полипропилена и полиэтилена — надёжность, проверенная временем!",
    subcategories: [
      { id: "e1", name: "Ёмкости цилиндрические вертикальные", slug: "cilindricheskie-vertikalnye", image: "/images/emkosti-real-proizvodstvo.jpg", description: "Вертикальные цилиндрические ёмкости из листового полипропилена и полиэтилена для хранения воды, химических реагентов и технических жидкостей. Объём от 100 до 50 000 литров." },
      { id: "e2", name: "Ёмкости цилиндрические горизонтальные", slug: "cilindricheskie-gorizontalnye", image: "/images/emkosti-hero-2.png", description: "Горизонтальные цилиндрические ёмкости из полипропилена и полиэтилена. Применяются для хранения и транспортировки жидкостей. Оснащение люками, штуцерами, уровнемерами." },
      { id: "e3", name: "Ёмкости подземные", slug: "podzemnye", externalPath: "/catalog/emkosti/podzemnye", image: "/images/emkosti-podzemnye-1.jpg" },
      { id: "e4", name: "Ёмкости прямоугольные", slug: "pryamougolnye", externalPath: "/catalog/emkosti/pryamougolnye", image: "/images/emkost-pryam-pp-1.png" },
      { id: "e5", name: "Ёмкости пожарные", slug: "pozharnye", externalPath: "/catalog/emkosti/pozharnye", image: "/images/emkost-pryam-pp-2.png" },
      { id: "e6", name: "Ёмкости для сейсмически активных районов", slug: "sejsmicheskie", image: "/images/emkosti-podzemnye-svt-2.jpg", description: "Ёмкости из полипропилена и полиэтилена с усиленной конструкцией для эксплуатации в сейсмически активных зонах. Повышенная устойчивость к динамическим нагрузкам." },
      { id: "e7", name: "Ёмкость для щелочи", slug: "dlya-shchelochi", externalPath: "/catalog/emkosti/kisloty-shchelochi", image: "/images/emkosti-shchelochi-real.jpg" },
      { id: "e8", name: "Ёмкость для кислоты", slug: "dlya-kisloty", externalPath: "/catalog/emkosti/kisloty-shchelochi", image: "/images/emkosti-kisloty-thumb.png" },
      { id: "e9", name: "Переливные ёмкости для бассейнов", slug: "perelivnye-bassejny", image: "/images/emkost-perelivnaya-bassein.jpg", description: "Переливные ёмкости из полипропилена для систем водоподготовки бассейнов. Сбор и хранение переливной воды, интеграция с системами фильтрации и обеззараживания." },
    ],
  },
  {
    id: "vodoochistka",
    name: "Водоочистка",
    slug: "vodoochistka",
    description: "Полимерное водоочистное оборудование — эффективность, долговечность и устойчивость к агрессивным средам!",
    subcategories: [
      { id: "v1", name: "ФФУ флотационно-фильтровальная установка", slug: "ffu", externalPath: "/catalog/vodoochistka/ffu", image: "/images/ffu-real-3d.png" },
      { id: "v2", name: "Ламельный тонкослойный отстойник-сепаратор", slug: "lamelnyj-otstojnik", externalPath: "/catalog/vodoochistka/lamelnyj-otstojnik", image: "/images/lamelnyj-thumb.png" },
      { id: "v3", name: "Мешочный обезвоживатель осадка", slug: "meshochnyj-obezvozhivatel", externalPath: "/catalog/vodoochistka/meshochnyj-obezvozhivatel", image: "/images/obezvozhivatel-real-3d.png" },
      { id: "v4", name: "Станция приготовления коагулянта", slug: "stantsiya-dozirovaniya", externalPath: "/catalog/vodoochistka/stantsiya-dozirovaniya", image: "/images/vodoochistka-koagulyant-real.png" },
      { id: "v5", name: "Станция приготовления флокулянта", slug: "stantsiya-flokulyanta", image: "/images/vodoochistka-flokulyant-real.jpg", description: "Автоматизированные станции приготовления и дозирования флокулянта. Корпус из химически стойкого полипропилена, встроенные мешалки и насосы-дозаторы." },
      { id: "v6", name: "Жироуловители промышленные", slug: "zhirouloviteli", externalPath: "/catalog/vodoochistka/zhirouloviteli", image: "/images/vodoochistka-zhiroulovitel-real.jpg" },
      { id: "v7", name: "КОС — комплексные очистные сооружения", slug: "los", externalPath: "/catalog/vodoochistka/los", image: "/images/vodoochistka-kos-kompakt.jpg" },
      { id: "v8", name: "Шкафы и стойки дозирования", slug: "shkafy-dozirovaniya", externalPath: "/catalog/vodoochistka/shkafy-dozirovaniya", image: "/images/vodoochistka-dozirovanie-grundfos.jpg" },
    ],
  },
  {
    id: "kns",
    name: "КНС",
    slug: "kns",
    subcategories: [
      { id: "k1", name: "КНС в корпусе SVT", slug: "v-korpuse-svt", image: "/images/kns-3d-razrez.png", description: "Канализационные насосные станции в корпусе SVT из стеклопластика. Высокая прочность, устойчивость к грунтовым водам. Комплектация насосами и автоматикой под проект." },
      { id: "k2", name: "КНС в корпусе из полипропилена", slug: "v-korpuse-polipropilen", image: "/images/kns-pp.png", description: "Канализационные насосные станции в полипропиленовом корпусе. Лёгкий монтаж, химическая стойкость, долговечность. Объём и конфигурация по техзаданию заказчика." },
    ],
  },
  {
    id: "reaktory",
    name: "Химические реакторы",
    slug: "reaktory",
    subcategories: [
      { id: "r1", name: "Химические реакторы из полипропилена", slug: "iz-polipropilena", image: "/images/reaktor-pp-render.jpg", description: "Химические реакторы из листового полипропилена для проведения реакций в агрессивных средах. Объём от 100 до 25 000 литров. Оснащение мешалками, теплообменниками и датчиками." },
      { id: "r2", name: "Реактор для гидрометаллургии", slug: "gidrometallurgiya", image: "/images/reaktor-gidro.png", description: "Специализированные реакторы для гидрометаллургических процессов: выщелачивание, осаждение, экстракция. Футеровка полимерами, устойчивость к кислотам." },
    ],
  },
  {
    id: "gidrometallurgiya",
    name: "Гидрометаллургия",
    slug: "gidrometallurgiya",
    subcategories: [
      { id: "gm1", name: "Реактор химического осаждения металла", slug: "reaktor-osazhdeniya", image: "/images/gm-reaktor.png", description: "Реакторы для химического осаждения металлов из растворов. Корпуса из полипропилена, оснащение перемешивающими устройствами и системой нагрева/охлаждения." },
      { id: "gm2", name: "Нутч-фильтр", slug: "nutch-filtr", image: "/images/gm-nutch.png", description: "Нутч-фильтры из полипропилена для вакуумной фильтрации пульп и суспензий. Химическая стойкость к кислотам и щелочам. Площадь фильтрации от 0,5 до 10 м²." },
      { id: "gm3", name: "Установки выщелачивания", slug: "vyshchelachivaniye", image: "/images/gm-vyshchelach.png", description: "Установки для кислотного и щелочного выщелачивания руд и концентратов. Реакторы с мешалками из химически стойких полимеров. Производительность по проекту заказчика." },
      { id: "gm4", name: "Установки сорбционные", slug: "sorbtsionnye", image: "/images/gm-sorbtsionnye.png", description: "Сорбционные колонны и установки из полипропилена для извлечения металлов из растворов. Устойчивы к агрессивным средам, длительный ресурс работы." },
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
    id: "ventilyatsiya",
    name: "Вентиляция",
    slug: "ventilyatsiya",
    description: "Элементы промышленной вентиляции из полипропилена — круглого и квадратного сечения.",
    subcategories: [
      { id: "ve1", name: "Воздуховоды и фасонные элементы химическистойкие круглого сечения", slug: "krugloe-sechenie", externalPath: "/", image: "/images/ventilyatsiya-fasonnye.jpg", group: "Круглого сечения", description: "Отводы, тройники, раздвижные элементы и воздуховоды круглого сечения из полипропилена для промышленной вентиляции." },
      { id: "ve2", name: "Воздуховоды и фасонные элементы химическистойкие квадратного сечения", slug: "pryamougolnoe-sechenie", group: "Квадратного сечения", image: "/images/vent-vozdukhovod-pryam.png", description: "Воздуховоды, отводы, тройники и переходные элементы квадратного сечения из полипропилена для промышленной вентиляции. Стойкость к агрессивным газам, изготовление по индивидуальным размерам." },
    ],
  },
  {
    id: "uslugi",
    name: "Услуги",
    slug: "uslugi",
    description: "Инжиниринговые услуги: проектирование, монтаж и пусконаладка.",
    subcategories: [
      { id: "us2", name: "Проектирование гальванических линий", slug: "proektirovanie-galvanika", image: "/images/uslugi-hero-2.png", description: "Проектирование гальванических линий под ключ: от техзадания до рабочей документации." },
      { id: "us3", name: "Проектирование водоочистного оборудования", slug: "proektirovanie-vodoochistka", image: "/images/uslugi-proekt-vodo.png", description: "Проектирование систем водоочистки и водоподготовки: расчёты, подбор оборудования, чертежи." },
      { id: "us4", name: "Проектирование КНС", slug: "proektirovanie-kns", image: "/images/uslugi-proekt-kns.png", description: "Проектирование канализационных насосных станций под конкретные условия объекта." },
      { id: "us5", name: "Монтаж ёмкостей", slug: "montazh-emkostej", image: "/images/uslugi-montazh-emk.png", description: "Монтаж промышленных ёмкостей на объекте заказчика: установка, обвязка, подключение к коммуникациям." },
      { id: "us6", name: "Монтаж КНС", slug: "montazh-kns", image: "/images/uslugi-montazh-kns.png", description: "Монтаж канализационных насосных станций: земляные работы, установка, пусконаладка." },
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
