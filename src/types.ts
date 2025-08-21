export interface ICategoryInfo {
  name: string;
  icon: React.ReactNode;
}
export interface ITone {
  name: string;
  char: string;
  tone: number[];
}
export interface IEmoji {
  name: string;
  char: string;
  hasTone?: boolean;
  preRendered?: boolean; // used for skins and internal knowing if it needs to render skins in recently-used icons.
  tones?: ITone[];
}
export interface ICategory {
  name: string;
  emojis: IEmoji[];
}
