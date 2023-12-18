interface ExampleItem {
  id: number;
  name: string;
  datetime?: string;
  slider?: number;
  active: boolean;
  rate?: number;
  select?: string;
  radio?: string;
  checkbox?: string;
  autocomplete?: string;
  created_at?: string;
  updated_at?: string;
}

interface ExampleItems extends Array<ExampleItem> {}

export type { ExampleItems, ExampleItem };
