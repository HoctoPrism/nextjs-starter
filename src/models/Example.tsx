interface ExampleItem {
  id: number;
  name: string;
  datetime: Date | undefined;
  slider?: number;
  active: boolean;
  rating: number;
  select?: string;
  radio?: string;
  checkbox?: string[];
  autocomplete?: string;
  created_at?: string;
  updated_at?: string;
  range?: number[] | undefined | string;
}

interface ExampleItems extends Array<ExampleItem> {}

export type { ExampleItems, ExampleItem };
