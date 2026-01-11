import { Stock } from '../entities/stock.entity';

export interface StockRepository {
  findByProductId(productId: string): Promise<Stock | null>;
  save(stock: Stock): Promise<void>;
}
