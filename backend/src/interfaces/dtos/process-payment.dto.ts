import { IsUUID, IsString } from 'class-validator';

export class ProcessPaymentDto {
  @IsUUID()
  transactionId: string;

  @IsString()
  cardToken: string;
}
