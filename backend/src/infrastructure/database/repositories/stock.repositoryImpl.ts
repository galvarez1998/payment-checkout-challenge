import { StockRepository } from '../../../domain/repositories/stock.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntity } from '../entities/stock.entity';
import { StockMapper } from '../mappers/stock.mapper';
import { Stock } from '../../../domain/entities/stock.entity';

export class StockRepositoryImpl implements StockRepository {
  constructor(
    @InjectRepository(StockEntity)
    private readonly repo: Repository<StockEntity>,
  ) {}

  async findByProductId(productId: string): Promise<Stock | null> {
    const entity = await this.repo.findOne({ where: { productId } });
    return entity ? StockMapper.toDomain(entity) : null;
  }

  async save(stock: Stock): Promise<void> {
    await this.repo.save(StockMapper.toEntity(stock));
  }
}
