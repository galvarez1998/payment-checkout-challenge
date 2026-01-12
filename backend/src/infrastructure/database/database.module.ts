import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { DeliveryEntity } from './entities/delivery.entity';
import { ProductEntity } from './entities/product.entity';
import { StockEntity } from './entities/stock.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { ProductRepositoryImpl } from './repositories/product.repositoryImpl';
import { StockRepositoryImpl } from './repositories/stock.repositoryImpl';
import { TransactionRepositoryImpl } from './repositories/transaction.repositoryImpl';
import { DeliveryRepositoryImpl } from './repositories/delivery.repositoryImpl';
import { CustomerRepositoryImpl } from './repositories/customer.repositoryImpl';
import {
  CUSTOMER_REPOSITORY,
  DELIVERY_REPOSITORY,
  PAYMENT_GATEWAY,
  PRODUCT_REPOSITORY,
  STOCK_REPOSITORY,
  TRANSACTION_REPOSITORY,
} from 'src/domain/repositories/tokens';
import { ProductController } from 'src/interfaces/controllers/product.controller';
import { PaymentController } from 'src/interfaces/controllers/payment.controller';
import { UpdateStockUseCase } from 'src/application/use-cases/update-stock.usecase';
import { CreateDeliveryUseCase } from 'src/application/use-cases/create-delivery.usecase';
import { ProcessPaymentUseCase } from 'src/application/use-cases/process-payment.usecase';
import { TransactionController } from 'src/interfaces/controllers/transaction.controller';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      StockEntity,
      CustomerEntity,
      TransactionEntity,
      DeliveryEntity,
    ]),
  ],
  controllers: [ProductController, PaymentController, TransactionController],
  providers: [
    { provide: PRODUCT_REPOSITORY, useClass: ProductRepositoryImpl },
    { provide: STOCK_REPOSITORY, useClass: StockRepositoryImpl },
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerRepositoryImpl },
    { provide: DELIVERY_REPOSITORY, useClass: DeliveryRepositoryImpl },
    { provide: TRANSACTION_REPOSITORY, useClass: TransactionRepositoryImpl },
    { provide: PAYMENT_GATEWAY, useClass: /* PaymentGatewayImpl */ class {} },
    ProcessPaymentUseCase,
    CreateDeliveryUseCase,
    UpdateStockUseCase,
    CreateTransactionUseCase,
  ],
  exports: [
    PRODUCT_REPOSITORY,
    STOCK_REPOSITORY,
    CUSTOMER_REPOSITORY,
    DELIVERY_REPOSITORY,
    TRANSACTION_REPOSITORY,
    PAYMENT_GATEWAY,
  ],
})
export class DatabaseModule {}
