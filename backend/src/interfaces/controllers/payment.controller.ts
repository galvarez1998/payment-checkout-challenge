import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProcessPaymentUseCase } from '../../application/use-cases/process-payment.usecase';
import { CreateDeliveryUseCase } from '../../application/use-cases/create-delivery.usecase';
import { UpdateStockUseCase } from '../../application/use-cases/update-stock.usecase';
import { ProcessPaymentDto } from '../dtos/process-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly processPaymentUC: ProcessPaymentUseCase,
    private readonly createDeliveryUC: CreateDeliveryUseCase,
    private readonly updateStockUC: UpdateStockUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Process payment for a transaction' })
  @ApiBody({
    type: ProcessPaymentDto,
    description: 'Payment information',
    examples: {
      example1: {
        summary: 'Payment example',
        value: {
          transactionId: '123e4567-e89b-12d3-a456-426614174000',
          cardToken: 'tok_1234567890abcdef',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Payment processed successfully',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['APPROVED', 'DECLINED'],
          example: 'APPROVED',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Payment processed failed',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['APPROVED', 'DECLINED'],
          example: 'DECLINED',
        },
      },
    },
  })
  async pay(@Body() dto: ProcessPaymentDto) {
    const paymentResult = await this.processPaymentUC.execute({
      transactionId: dto.transactionId,
      cardToken: dto.cardToken,
      currency: 'COP',
    });

    if (paymentResult.isFailure) {
      return { status: 'DECLINED' };
    }

    await this.createDeliveryUC.execute({
      transactionId: dto.transactionId,
      address: 'Fake address 123',
      city: 'Bogotá',
      postalCode: '110111',
    });

    await this.updateStockUC.execute(dto.transactionId);

    return { status: 'APPROVED' };
  }
}
