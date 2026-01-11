import { Stock } from '../../../domain/entities/stock.entity';
import { StockEntity } from '../entities/stock.entity';

export class StockMapper {
  static toDomain(entity: StockEntity): Stock {
    return new Stock(entity.productId, entity.quantity, entity.updatedAt);
  }

  static toEntity(domain: Stock): StockEntity {
    return {
      productId: domain.productId,
      quantity: domain.getQuantity(),
      updatedAt: new Date(),
    };
  }
}
