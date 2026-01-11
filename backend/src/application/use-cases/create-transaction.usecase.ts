import { ok, fail, Result } from '../../shared/result';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { StockRepository } from '../../domain/repositories/stock.repository';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/entities/transaction-status.enum';
import { Customer } from '../../domain/entities/customer.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Phone } from '../../domain/value-objects/phone.vo';
import { v4 as uuid } from 'uuid';

export class CreateTransactionUseCase {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly stockRepo: StockRepository,
    private readonly customerRepo: CustomerRepository,
    private readonly transactionRepo: TransactionRepository,
  ) {}

  async execute(input: {
    productId: string;
    customerName: string;
    email: string;
    phone?: string;
    baseFee: number;
    deliveryFee: number;
  }): Promise<Result<Transaction>> {
    const product = await this.productRepo.findById(input.productId);
    if (!product) return fail('Product not found');

    const stock = await this.stockRepo.findByProductId(input.productId);
    if (!stock || !stock.hasAvailability(1)) {
      return fail('Product out of stock');
    }

    const customer = new Customer(
      uuid(),
      input.customerName,
      new Email(input.email),
      input.phone ? new Phone(input.phone) : null,
      new Date(),
    );

    await this.customerRepo.save(customer);

    const transaction = new Transaction(
      uuid(),
      product.id,
      customer.id,
      product.price,
      input.baseFee,
      input.deliveryFee,
      TransactionStatus.PENDING,
      new Date(),
      new Date(),
    );

    await this.transactionRepo.save(transaction);

    return ok(transaction);
  }
}
