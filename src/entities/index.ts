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

  public setName(value: string) {
    this.name = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public setProductsCollection(value: Product[]) {
    this.products = value;
  }

  public addProduct(value: Product) {
    this.products.push(value);
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getProducts() {
    return this.products;
  }

  public toJson() {
    return {
      name: this.name,
      description: this.description,
    };
  }
}

export class Product {
  id: string;
  collectionId: string;
  name: string;
  description: string;
  price: string;
  unit: string;

  constructor(id: string, collectionId: string, name: string,
    description: string, price: string, unit: string) {
    this.id = id;
    this.collectionId = collectionId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.unit = unit;
  }
}
