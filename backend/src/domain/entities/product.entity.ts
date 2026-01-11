export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly createdAt: Date,
  ) {
    if (price <= 0) {
      throw new Error('Product price must be greater than zero');
    }
  }
}
