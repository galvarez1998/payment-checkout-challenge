import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Product ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Name of the customer making the transaction',
    example: 'John Doe',
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'Customer email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Optional customer phone number',
    example: '+1 555 123 4567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Base fee for the product or service',
    example: 49.99,
    type: Number,
  })
  @IsNumber()
  baseFee: number;

  @ApiProperty({
    description: 'Delivery fee applied to the transaction',
    example: 10.0,
    type: Number,
  })
  @IsNumber()
  deliveryFee: number;
}
