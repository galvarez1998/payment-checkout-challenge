import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryRepository } from '../../../domain/repositories/delivery.repository';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryMapper } from '../mappers/delivery.mapper';
import { Delivery } from '../../../domain/entities/delivery.entity';

export class DeliveryRepositoryImpl implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly repo: Repository<DeliveryEntity>,
  ) {}

  async findByTransactionId(id: string): Promise<Delivery | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async save(delivery: Delivery): Promise<void> {
    await this.repo.save(DeliveryMapper.toEntity(delivery));
  }
}
