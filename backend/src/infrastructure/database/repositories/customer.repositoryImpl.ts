import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerMapper } from '../mappers/customer.mapper';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepository } from 'src/domain/repositories/customer.repository';

export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repo: Repository<CustomerEntity>,
  ) {}

  async save(customer: Customer): Promise<void> {
    await this.repo.save(CustomerMapper.toEntity(customer));
  }

  async findById(id: string): Promise<Customer | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }
}
