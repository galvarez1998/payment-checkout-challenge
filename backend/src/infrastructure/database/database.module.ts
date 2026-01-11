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
  providers: [
    { provide: 'ProductRepository', useClass: ProductRepositoryImpl },
    { provide: 'StockRepository', useClass: StockRepositoryImpl },
    { provide: 'CustomerRepository', useClass: CustomerRepositoryImpl },
    { provide: 'DeliveryRepository', useClass: DeliveryRepositoryImpl },
    { provide: 'TransactionRepository', useClass: TransactionRepositoryImpl },
  ],
  exports: [
    'ProductRepository',
    'StockRepository',
    'CustomerRepository',
    'DeliveryRepository',
    'TransactionRepository',
  ],
})
export class DatabaseModule {}
