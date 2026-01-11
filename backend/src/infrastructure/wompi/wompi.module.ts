import { Module } from '@nestjs/common';
import { WompiPaymentAdapter } from './wompi-payment.adapter';

@Module({
  providers: [
    {
      provide: 'PaymentGateway',
      useClass: WompiPaymentAdapter,
    },
  ],
  exports: ['PaymentGateway'],
})
export class WompiModule {}
