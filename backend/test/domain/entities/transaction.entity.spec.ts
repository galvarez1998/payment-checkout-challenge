import { Transaction } from '../../../src/domain/entities/transaction.entity';
import { TransactionStatus } from '../../../src/domain/entities/transaction-status.enum';

describe('Transaction Entity', () => {
  it('should approve a pending transaction', () => {
    const tx = new Transaction(
      '1',
      'p1',
      'c1',
      100,
      10,
      5,
      TransactionStatus.PENDING,
      new Date(),
      new Date(),
    );

    tx.approve();
    expect(tx.status).toBe(TransactionStatus.APPROVED);
  });

  it('should not approve a non-pending transaction', () => {
    const tx = new Transaction(
      '1',
      'p1',
      'c1',
      100,
      10,
      5,
      TransactionStatus.APPROVED,
      new Date(),
      new Date(),
    );

    expect(() => tx.approve()).toThrow();
  });
});
