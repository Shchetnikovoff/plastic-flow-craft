export interface EmkostSize {
  article: string;
  volume: number;
  diameter: number;
  height: number;
}

const sizes: [number, number, number][] = [
  [1000, 940, 1500],
  [2000, 1330, 1500],
  [3000, 1600, 1500],
  [4000, 1600, 2000],
  [5000, 1700, 2300],
  [6000, 1850, 2300],
  [8000, 2260, 2000],
  [10000, 2350, 2350],
  [12000, 2350, 2800],
  [15000, 2350, 3500],
  [20000, 2380, 4500],
  [25000, 2370, 5700],
  [30000, 2400, 6650],
  [35000, 3050, 4800],
  [40000, 3050, 5600],
  [45000, 3050, 6200],
  [50000, 3050, 7000],
];

function makeTable(prefix: string): EmkostSize[] {
  return sizes.map(([volume, diameter, height]) => ({
    article: `СЗПК.${prefix}.${volume}`,
    volume,
    diameter,
    height,
  }));
}

export interface EmkostCategory {
  id: string;
  title: string;
  description: string;
  items: EmkostSize[];
  heightLabel: string;
}

export interface EmkostGroup {
  id: string;
  title: string;
  categories: EmkostCategory[];
}

export const emkostGroups: EmkostGroup[] = [
  {
    id: "vertical-pp",
    title: "Вертикальные из ПП",
    categories: [
      {
        id: "evpp-flat",
        title: "Плоская крыша / плоское дно",
        description: "Емкость полностью закрытая с приваренной к цилиндру крышей. Стандартная форма с люком Ø800 мм со съёмной крышкой на болтовом соединении.",
        items: makeTable("ЕВПП"),
        heightLabel: "H, мм",
      },
      {
        id: "evpp-sloped",
        title: "Наклонное дно",
        description: "Вертикальная цилиндрическая ёмкость с наклонным дном. Полностью закрытая с люком Ø800 мм со съёмной крышкой на болтовом соединении.",
        items: makeTable("ЕВПП-НД"),
        heightLabel: "H, мм",
      },
      {
        id: "evpp-conical",
        title: "Коническая крыша",
        description: "Вертикальная цилиндрическая ёмкость с конической крышей и люком Ø800 мм со съёмной крышкой на болтовом соединении.",
        items: makeTable("ЕВПП-КК"),
        heightLabel: "H, мм",
      },
    ],
  },
  {
    id: "vertical-pnd",
    title: "Вертикальные из ПНД",
    categories: [
      {
        id: "evpnd-flat",
        title: "Плоская крыша / плоское дно",
        description: "Емкость полностью закрытая с приваренной к цилиндру крышей. Стандартная форма с люком Ø800 мм со съёмной крышкой на болтовом соединении.",
        items: makeTable("ЕВПНД"),
        heightLabel: "H, мм",
      },
      {
        id: "evpnd-sloped",
        title: "Наклонное дно",
        description: "Вертикальная цилиндрическая ёмкость с наклонным дном. Полностью закрытая с люком Ø800 мм со съёмной крышкой на болтовом соединении.",
        items: makeTable("ЕВПНД-НД"),
        heightLabel: "H, мм",
      },
      {
        id: "evpnd-conical",
        title: "Коническая крыша",
        description: "Вертикальная цилиндрическая ёмкость с конической крышей и люком Ø800 мм со съёмной крышкой на болтовом соединении.",
        items: makeTable("ЕВПНД-КК"),
        heightLabel: "H, мм",
      },
    ],
  },
  {
    id: "horizontal-pp",
    title: "Горизонтальные из ПП",
    categories: [
      {
        id: "egpplst",
        title: "Низкие ложементы",
        description: "Горизонтальная цилиндрическая ёмкость из полипропилена на стандартных низких ложементах.",
        items: makeTable("ЕГППЛСТ"),
        heightLabel: "L, мм",
      },
      {
        id: "egpplv",
        title: "Высокие ложементы",
        description: "Горизонтальная цилиндрическая ёмкость из полипропилена на высоких ложементах.",
        items: makeTable("ЕГППЛВ"),
        heightLabel: "L, мм",
      },
    ],
  },
  {
    id: "horizontal-pnd",
    title: "Горизонтальные из ПНД",
    categories: [
      {
        id: "egpndlst",
        title: "Низкие ложементы",
        description: "Горизонтальная цилиндрическая ёмкость из полиэтилена на стандартных низких ложементах.",
        items: makeTable("ЕГПНДЛСТ"),
        heightLabel: "L, мм",
      },
      {
        id: "egpndlv",
        title: "Высокие ложементы",
        description: "Горизонтальная цилиндрическая ёмкость из полиэтилена на высоких ложементах.",
        items: makeTable("ЕГПНДЛВ"),
        heightLabel: "L, мм",
      },
    ],
  },
];
