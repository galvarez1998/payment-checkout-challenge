import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.usecase';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import type { TransactionRepository } from 'src/domain/repositories/transaction.repository';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUC: CreateTransactionUseCase,
    private readonly transactionRepo: TransactionRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    const result = await this.createTransactionUC.execute(dto);

    if (result.isFailure) {
      return { error: result.error };
    }

    return {
      transactionId: result.value.id,
      status: result.value.status,
      totalAmount: result.value.totalAmount,
    };
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    // se inyecta repo directamente para lectura
    const transaction = await this.transactionRepo.findById(id);

    if (!transaction) {
      return { error: 'Transaction not found' };
    }

    return {
      id: transaction.id,
      status: transaction.status,
      totalAmount: transaction.totalAmount,
    };
  }
}
