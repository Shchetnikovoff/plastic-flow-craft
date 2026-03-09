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

    subcategories: [
      { id: "g1", name: "Гальванические линии ручные", slug: "linii-ruchnye", image: "/images/galvanika-linii-ruchnye.png", description: "Ручные гальванические линии для нанесения покрытий на металлические изделия. Ванны из полипропилена и полиэтилена, устойчивые к агрессивным электролитам. Оптимальное решение для мелкосерийного и опытного производства." },
      { id: "g2", name: "Гальванические линии механизированные", slug: "linii-mekhanizirovannye", image: "/images/galvanika-linii-mekh.png", description: "Механизированные гальванические линии с полуавтоматической транспортировкой деталей. Повышенная производительность при сохранении гибкости техпроцесса. Корпуса ванн из полипропилена и полиэтилена." },
      { id: "g3", name: "Гальванические линии автоматические", slug: "linii-avtomaticheskie", image: "/images/galvanika-linii-avto.png", description: "Полностью автоматизированные гальванические линии с программным управлением. Максимальная производительность и стабильное качество покрытий. Проектирование под конкретный техпроцесс заказчика." },
      { id: "g5", name: "Линия подготовки поверхности", slug: "podgotovka-poverhnosti", image: "/images/galvanika-podgotovka.png", description: "Линии подготовки поверхности перед нанесением гальванических покрытий: обезжиривание, травление, промывка. Ванны и ёмкости из химически стойких полимеров." },
      { id: "g6", name: "Гальванические ванны", slug: "vanny", image: "/images/galvanika-vanny.png", description: "Гальванические ванны из полипропилена и полиэтилена для электрохимических процессов. Устойчивы к кислотам, щелочам и электролитам. Изготовление по индивидуальным размерам." },
      { id: "g7", name: "Колокольные ванны", slug: "kolokolnye-vanny", image: "/images/galvanika-kolokolnye.png", description: "Колокольные ванны для гальванической обработки мелких деталей насыпью. Равномерное покрытие, высокая производительность. Корпус из полипропилена." },
      { id: "g8", name: "Гальванические барабаны", slug: "barabany", image: "/images/galvanika-barabany.png", description: "Гальванические барабаны для массовой обработки мелких деталей. Перфорированный корпус из полипропилена, устойчивый к агрессивным средам. Различные объёмы загрузки." },
      { id: "g9", name: "Запчасти и комплектующие для гальваники", slug: "zapchasti", image: "/images/galvanika-zapchasti.png", description: "Запасные части и комплектующие для гальванических линий: штанги, подвески, анодные корзины, уплотнения, фитинги. Изготовление из полимерных материалов по чертежам заказчика." },
    ],
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
    subcategories: [
      { id: "vp1", name: "Система подготовки воды / обратный осмос", slug: "obratnyj-osmos", image: "/images/vodopodgotovka-osmos.png", description: "Системы обратного осмоса для подготовки воды промышленного и питьевого качества. Мембранные установки в корпусах из полипропилена, устойчивые к коррозии. Производительность от 0,5 до 100 м³/ч." },
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
      { id: "ve5", name: "Воздуховод прямоугольный", slug: "vozdukhovod-pryamougolnyy", group: "Прямоугольного сечения", image: "/images/vent-vozdukhovod-pryam.png", description: "Воздуховоды прямоугольного сечения из полипропилена для промышленной вентиляции. Стойкость к агрессивным газам, лёгкий монтаж. Изготовление по индивидуальным размерам." },
      { id: "ve6", name: "Отвод прямоугольный", slug: "otvod-pryamougolnyy", group: "Прямоугольного сечения", image: "/images/vent-otvod-pryam.png", description: "Отводы прямоугольного сечения из полипропилена для изменения направления воздуховода. Углы 30°, 45°, 60°, 90°. Сварное соединение, высокая герметичность." },
      { id: "ve7", name: "Тройник прямоугольный", slug: "troynik-pryamougolnyy", group: "Прямоугольного сечения", image: "/images/vent-troynik-pryam.png", description: "Тройники прямоугольного сечения из полипропилена для разветвления вентиляционных каналов. Различные углы отвода и сечения. Сварное исполнение." },
      { id: "ve8", name: "Переход круглый-прямоугольный", slug: "perekhod-kruglyy-pryamougolnyy", group: "Прямоугольного сечения", image: "/images/vent-perekhod.png", description: "Переходные элементы для соединения круглых и прямоугольных воздуховодов. Плавный профиль, минимальные потери давления. Из полипропилена." },
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
    subcategories: [
      { id: "r1", name: "Химические реакторы из полипропилена", slug: "iz-polipropilena", image: "/images/reaktor-pp.png", description: "Химические реакторы из листового полипропилена для проведения реакций в агрессивных средах. Объём от 100 до 25 000 литров. Оснащение мешалками, теплообменниками и датчиками." },
      { id: "r2", name: "Химические реакторы из полиэтилена", slug: "iz-polietilena", image: "/images/reaktor-pe.png", description: "Химические реакторы из полиэтилена низкого давления (ПНД) для работы с кислотами и щелочами. Высокая химическая стойкость, длительный срок службы." },
      { id: "r3", name: "Реактор для гидрометаллургии", slug: "gidrometallurgiya", image: "/images/reaktor-gidro.png", description: "Специализированные реакторы для гидрометаллургических процессов: выщелачивание, осаждение, экстракция. Футеровка полимерами, устойчивость к кислотам." },
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
    id: "kns",
    name: "КНС",
    slug: "kns",
    subcategories: [
      { id: "k1", name: "КНС в корпусе SVT", slug: "v-korpuse-svt", image: "/images/kns-svt.png", description: "Канализационные насосные станции в корпусе SVT из стеклопластика. Высокая прочность, устойчивость к грунтовым водам. Комплектация насосами и автоматикой под проект." },
      { id: "k2", name: "КНС в корпусе из полипропилена", slug: "v-korpuse-polipropilen", image: "/images/kns-pp.png", description: "Канализационные насосные станции в полипропиленовом корпусе. Лёгкий монтаж, химическая стойкость, долговечность. Объём и конфигурация по техзаданию заказчика." },
    ],
  },
  {
    id: "labmebel",
    name: "Лабораторная мебель",
    slug: "labmebel",
    subcategories: [
      { id: "l1", name: "Лабораторная мебель из полипропилена", slug: "iz-polipropilena", image: "/images/lab-mebel.png", description: "Полный комплект лабораторной мебели из полипропилена: столы, тумбы, шкафы. Устойчивость к кислотам, щелочам и растворителям. Индивидуальная компоновка под планировку лаборатории." },
      { id: "l2", name: "Шкафы хранения реактивов", slug: "shkafy-reaktivov", image: "/images/lab-shkaf.png", description: "Шкафы из полипропилена для безопасного хранения химических реактивов. Вентиляция, кислотостойкие полки, запирающиеся дверцы. Соответствие нормам безопасности." },
      { id: "l3", name: "Вытяжные шкафы", slug: "vytyazhnye-shkafy", image: "/images/lab-vytyazhnoy.png", description: "Вытяжные шкафы из полипропилена для работы с агрессивными химикатами. Встроенная вентиляция, защитные стёкла, подвод воды и электричества." },
      { id: "l4", name: "Мойки лабораторные", slug: "mojki", image: "/images/lab-moyka.png", description: "Лабораторные мойки из полипропилена для химических лабораторий. Устойчивы к кислотам и щелочам. Различные размеры и конфигурации." },
      { id: "l5", name: "Стол лабораторный моечный", slug: "stol-moechnyj", image: "/images/lab-stol.png", description: "Моечные лабораторные столы из полипропилена со встроенной мойкой. Химически стойкая столешница, подвод коммуникаций. Изготовление по размерам заказчика." },
      { id: "l6", name: "Тумба лабораторная", slug: "tumba", image: "/images/lab-tumba.png", description: "Лабораторные тумбы из полипропилена с выдвижными ящиками и полками. Кислотостойкое исполнение для химических лабораторий." },
      { id: "l7", name: "Тумба лабораторная с мойкой", slug: "tumba-s-mojkoj", image: "/images/lab-tumba-moyka.png", description: "Лабораторная тумба из полипропилена с интегрированной мойкой. Компактное решение для лабораторий с ограниченным пространством." },
      { id: "l8", name: "Тумба лабораторная с мойкой и сушилкой", slug: "tumba-s-mojkoj-sushilkoj", image: "/images/lab-tumba-sushilka.png", description: "Лабораторная тумба из полипропилена с мойкой и сушилкой для посуды. Полный рабочий модуль для химической лаборатории." },
    ],
  },
  {
    id: "shkafy-upravleniya",
    name: "Шкафы управления",
    slug: "shkafy-upravleniya",
    subcategories: [
      { id: "su1", name: "Шкафы управления гальванической линией", slug: "galvanicheskoy-liniey", image: "/images/su-galvanika.png", description: "Шкафы автоматического управления гальваническими линиями. ПЛК-контроллеры, сенсорные панели, управление температурой, током и временем процессов." },
      { id: "su2", name: "Шкафы управления очистными", slug: "ochistnymi", image: "/images/su-ochistnye.png", description: "Шкафы управления очистными сооружениями: дозирование реагентов, контроль pH, управление насосами и задвижками. Автоматический и ручной режимы." },
      { id: "su3", name: "Шкафы управления насосами", slug: "nasosami", image: "/images/su-nasosy.png", description: "Шкафы управления насосными станциями: пуск/остановка, защита от сухого хода, контроль уровня. Степень защиты IP54–IP65." },
    ],
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
