export class Category {
  private id: string;
  private name: string;
  private imageUrl: string;
  private description: string;
  private products: Product[];

  constructor(id = '', name = '', description = '', imageUrl = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public setImageUrl(value: string) {
    this.imageUrl = value;
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

  public getImageUrl() {
    return this.imageUrl;
  }

  public toJson() {
    return {
      name: this.name,
      description: this.description,
    };
  }

  public toJsonUrl() {
    return {
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
    };
  }
}

export class Service {
  private id: string;
  private name: string;
  private description: string;
  private price: number;

  constructor(id = '', name = '', description = '', price = 0) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  public getId() {
    return this.id;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public setPrice(value: number) {
    this.price = value;
  }
}

export class CategoryPreview {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export enum Unit {
  Mililiter = 'ml',
  Gram = 'gr',
}

export class Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: string;
  unit: string;

  constructor(
    id: string, categoryId: string, name: string,
    description: string, price: string, unit: string,
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.unit = unit;
  }

  toJson() {
    return {
      category: this.categoryId,
      name: this.name,
      description: this.description,
      price: this.price,
      unit: this.unit,
    };
  }
}
