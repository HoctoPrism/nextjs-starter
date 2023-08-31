interface ExampleItem {
  id: number;

  name: string;

  created_at?: string;

  updated_at?: string;
}

interface ExampleItems extends Array<ExampleItem> {}

export type { ExampleItems, ExampleItem };
