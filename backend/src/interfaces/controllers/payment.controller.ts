import { Controller, Post, Body } from '@nestjs/common';
import { ProcessPaymentUseCase } from '../../application/use-cases/process-payment.usecase';
import { CreateDeliveryUseCase } from '../../application/use-cases/create-delivery.usecase';
import { UpdateStockUseCase } from '../../application/use-cases/update-stock.usecase';
import { ProcessPaymentDto } from '../dtos/process-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly processPaymentUC: ProcessPaymentUseCase,
    private readonly createDeliveryUC: CreateDeliveryUseCase,
    private readonly updateStockUC: UpdateStockUseCase,
  ) {}

  @Post()
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
