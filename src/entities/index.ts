export class Category {
  private id: string;
  private name: string;
  private description: string;
  private products: Product[];

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  setName(value: string) {
    this.name = value;
  }

  setDescription(value: string) {
    this.description = value;
  }

  getId() {
    return this.id;
  }
}

export interface Product {
  id: string;
  collectionId: string;
  name: string;
  description: string;
  price: string;
  unit: string;
}
