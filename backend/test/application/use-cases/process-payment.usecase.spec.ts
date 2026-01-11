import { ProcessPaymentUseCase } from '../../../src/application/use-cases/process-payment.usecase';
import { TransactionStatus } from '../../../src/domain/entities/transaction-status.enum';

describe('ProcessPaymentUseCase', () => {
  it('approves transaction when payment succeeds', async () => {
    const transaction = {
      id: '1',
      status: TransactionStatus.PENDING,
      totalAmount: 100,
      approve: jest.fn(),
      decline: jest.fn(),
    };

    const txRepo = {
      findById: jest.fn().mockResolvedValue(transaction),
      save: jest.fn(),
    };

    const paymentGateway = {
      charge: jest.fn().mockResolvedValue({ success: true }),
    };

    const useCase = new ProcessPaymentUseCase(
      txRepo as any,
      paymentGateway as any,
    );

    const result = await useCase.execute({
      transactionId: '1',
      cardToken: 'fake-token',
      currency: 'COP',
    });

    expect(result.isSuccess).toBe(true);
    expect(transaction.approve).toHaveBeenCalled();
  });
});
