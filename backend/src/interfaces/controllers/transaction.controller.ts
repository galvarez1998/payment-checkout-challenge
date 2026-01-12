import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.usecase';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Inject } from '@nestjs/common';
import type { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { TRANSACTION_REPOSITORY } from 'src/domain/repositories/tokens';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUC: CreateTransactionUseCase,
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepo: TransactionRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({
    type: CreateTransactionDto,
    description: 'Transaction information',
    examples: {
      example1: {
        summary: 'Transaction example',
        value: {
          customerId: '123e4567-e89b-12d3-a456-426614174000',
          items: [
            {
              productId: '123e4567-e89b-12d3-a456-426614174001',
              quantity: 2,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transaction created successfully',
    schema: {
      type: 'object',
      properties: {
        transactionId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        status: {
          type: 'string',
          example: 'PENDING',
        },
        totalAmount: {
          type: 'number',
          example: 150.5,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid transaction data',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: 'Product not found',
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiParam({
    name: 'id',
    description: 'Transaction ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction found',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        status: {
          type: 'string',
          example: 'PENDING',
        },
        totalAmount: {
          type: 'number',
          example: 150.5,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: 'Transaction not found',
        },
      },
    },
  })
  async findById(@Param('id') id: string) {
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
