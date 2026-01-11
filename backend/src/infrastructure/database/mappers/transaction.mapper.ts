import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionEntity } from '../entities/transaction.entity';

export class TransactionMapper {
  static toDomain(entity: TransactionEntity): Transaction {
    return new Transaction(
      entity.id,
      entity.productId,
      entity.customerId,
      Number(entity.amount),
      Number(entity.baseFee),
      Number(entity.deliveryFee),
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: Transaction): TransactionEntity {
    return {
      id: domain.id,
      productId: domain.productId,
      customerId: domain.customerId,
      amount: domain.amount,
      baseFee: domain.baseFee,
      deliveryFee: domain.deliveryFee,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
