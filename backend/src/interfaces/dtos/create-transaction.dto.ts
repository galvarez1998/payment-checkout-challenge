import {
  IsUUID,
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  productId: string;

  @IsString()
  customerName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNumber()
  baseFee: number;

  @IsNumber()
  deliveryFee: number;
}
