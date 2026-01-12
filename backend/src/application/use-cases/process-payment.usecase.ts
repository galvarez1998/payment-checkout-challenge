import { Result, ok, fail } from '../../shared/result';
import type { TransactionRepository } from '../../domain/repositories/transaction.repository';
import type { PaymentGateway } from '../ports/payment-gateway.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  PAYMENT_GATEWAY,
  TRANSACTION_REPOSITORY,
} from 'src/domain/repositories/tokens';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepo: TransactionRepository,
    @Inject(PAYMENT_GATEWAY)
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async execute(input: {
    transactionId: string;
    cardToken: string;
    currency: string;
  }): Promise<Result<void>> {
    const transaction = await this.transactionRepo.findById(
      input.transactionId,
    );
    if (!transaction) return fail('Transaction not found');

    const payment = await this.paymentGateway.charge({
      transactionId: transaction.id,
      amount: transaction.totalAmount,
      currency: input.currency,
      cardToken: input.cardToken,
    });

    if (!payment.success) {
      transaction.decline();
      await this.transactionRepo.save(transaction);
      return fail('Payment declined');
    }

    transaction.approve();
    await this.transactionRepo.save(transaction);

    return ok(undefined);
  }
}
