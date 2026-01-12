import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repo: Repository<TransactionEntity>,
  ) {}

  async findById(id: string): Promise<Transaction | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TransactionMapper.toDomain(entity) : null;
  }

  async save(transaction: Transaction): Promise<void> {
    await this.repo.save(TransactionMapper.toEntity(transaction));
  }
}
