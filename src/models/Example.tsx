interface ExampleItem {
  id: number;
  name: string;
  datetime?: Date | undefined;
  slider?: number | undefined;
  active: boolean;
  rating?: number | undefined;
  select?: string | undefined;
  radio?: string | undefined;
  checkbox?: string[] | undefined;
  autocomplete?: string | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  range?: number[] | undefined | string;
}

interface ExampleItemDelete {
  id: number;
  name: string;
}

interface ExampleItems extends Array<ExampleItem> {}

export type { ExampleItems, ExampleItem, ExampleItemDelete };
