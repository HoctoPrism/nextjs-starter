interface ExampleItem {
  id: number;

  name: string;
}

interface ExampleItems extends Array<ExampleItem> {}

export type { ExampleItems, ExampleItem };
