export interface InnerItem {
  id: number;
  name: string;
}

export interface BlockItem {
  name: string;
  innerItems: InnerItem[];
}

export const items: BlockItem[] = [
  {
    name: "firstBlock",
    innerItems: [
      { name: "Свойство 1", id: 1 },
      { name: "Свойство 2", id: 2 },
      { name: "Свойство 3", id: 3 },
      { name: "Свойство 4", id: 4 },
      { name: "Свойство 5", id: 5 },
      { name: "Свойство 6", id: 6 },
      { name: "Свойство 7", id: 7 },
      { name: "Свойство 8", id: 8 },
    ],
  },

  {
    name: "secondBlock",
    innerItems: [
      { name: "Опция 1", id: 10 },
      { name: "Опция 2", id: 11 },
      { name: "Опция 3", id: 12 },
      { name: "Опция 4", id: 13 },
      { name: "Опция 5", id: 14 },
      { name: "Опция 6", id: 15 },
      { name: "Опция 7", id: 16 },
      { name: "Опция 8", id: 17 },
    ],
  },
];
