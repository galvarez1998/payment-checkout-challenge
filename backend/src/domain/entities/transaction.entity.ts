import { TransactionStatus } from './transaction-status.enum';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly customerId: string,
    public readonly amount: number,
    public readonly baseFee: number,
    public readonly deliveryFee: number,
    public status: TransactionStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    if (amount <= 0) {
      throw new Error('Transaction amount must be greater than zero');
    }
  }

  get totalAmount(): number {
    return this.amount + this.baseFee + this.deliveryFee;
  }

  approve(): void {
    if (this.status !== TransactionStatus.PENDING) {
      throw new Error('Only pending transactions can be approved');
    }
    this.status = TransactionStatus.APPROVED;
    this.updatedAt = new Date();
  }

  decline(): void {
    if (this.status !== TransactionStatus.PENDING) {
      throw new Error('Only pending transactions can be declined');
    }
    this.status = TransactionStatus.DECLINED;
    this.updatedAt = new Date();
  }
}
