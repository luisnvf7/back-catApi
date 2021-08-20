export interface CatInterface {
  breeds: Body[];
  height: number;
  id: string;
  url: string;
  width: number;
  categories: Body[];
}

export interface Body {
  id: string;
  name: string;
}
