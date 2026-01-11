import { Result, ok, fail } from '../../shared/result';
import { StockRepository } from '../../domain/repositories/stock.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionStatus } from '../../domain/entities/transaction-status.enum';

export class UpdateStockUseCase {
  constructor(
    private readonly stockRepo: StockRepository,
    private readonly transactionRepo: TransactionRepository,
  ) {}

  async execute(transactionId: string): Promise<Result<void>> {
    const transaction = await this.transactionRepo.findById(transactionId);
    if (!transaction) return fail('Transaction not found');

    if (transaction.status !== TransactionStatus.APPROVED) {
      return fail('Stock can only be updated for approved transactions');
    }

    const stock = await this.stockRepo.findByProductId(transaction.productId);
    if (!stock) return fail('Stock not found');

    stock.decrease(1);
    await this.stockRepo.save(stock);

    return ok(undefined);
  }
}
