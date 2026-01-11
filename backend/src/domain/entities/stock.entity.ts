export class Stock {
  constructor(
    public readonly productId: string,
    private quantity: number,
    public readonly updatedAt: Date,
  ) {}

  getQuantity(): number {
    return this.quantity;
  }

  hasAvailability(units: number): boolean {
    return this.quantity >= units;
  }

  decrease(units: number): void {
    if (units <= 0) {
      throw new Error('Units must be greater than zero');
    }

    if (!this.hasAvailability(units)) {
      throw new Error('Insufficient stock');
    }

    this.quantity -= units;
  }
}
