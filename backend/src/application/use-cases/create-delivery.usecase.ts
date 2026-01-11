import { Result, ok, fail } from '../../shared/result';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { DeliveryRepository } from '../../domain/repositories/delivery.repository';
import { Delivery } from '../../domain/entities/delivery.entity';
import { TransactionStatus } from '../../domain/entities/transaction-status.enum';
import { v4 as uuid } from 'uuid';

export class CreateDeliveryUseCase {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly deliveryRepo: DeliveryRepository,
  ) {}

  async execute(input: {
    transactionId: string;
    address: string;
    city: string;
    postalCode: string;
  }): Promise<Result<Delivery>> {
    const transaction = await this.transactionRepo.findById(
      input.transactionId,
    );
    if (!transaction) return fail('Transaction not found');

    if (transaction.status !== TransactionStatus.APPROVED) {
      return fail('Delivery can only be created for approved transactions');
    }

    const delivery = new Delivery(
      uuid(),
      transaction.id,
      input.address,
      input.city,
      input.postalCode,
      new Date(),
    );

    await this.deliveryRepo.save(delivery);
    return ok(delivery);
  }
}
