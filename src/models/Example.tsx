interface ExampleItem {
  id: number; name: string;
}

interface ExampleItems extends Array<ExampleItem> {}

export default { EnumServiceItems, EnumServiceItem };
