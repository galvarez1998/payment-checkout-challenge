export class Delivery {
  constructor(
    public readonly id: string,
    public readonly transactionId: string,
    public readonly address: string,
    public readonly city: string,
    public readonly postalCode: string,
    public readonly createdAt: Date,
  ) {
    if (!address || !city) {
      throw new Error('Delivery address and city are required');
    }
  }
}
