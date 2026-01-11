import { Entity, PrimaryColumn, Column } from 'typeorm';
import { TransactionStatus } from '../../../domain/entities/transaction-status.enum';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  customerId: string;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  baseFee: number;

  @Column('decimal')
  deliveryFee: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
  })
  status: TransactionStatus;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
