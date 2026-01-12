import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { ProductRepository } from 'src/domain/repositories/product.repository';
import type { StockRepository } from 'src/domain/repositories/stock.repository';

import {
  PRODUCT_REPOSITORY,
  STOCK_REPOSITORY,
} from 'src/domain/repositories/tokens';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
    @Inject(STOCK_REPOSITORY)
    private readonly stockRepo: StockRepository,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with stock information' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of products with stock',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          name: { type: 'string', example: 'Product Name' },
          description: { type: 'string', example: 'Product Description' },
          price: { type: 'number', example: 29.99 },
          currency: { type: 'string', example: 'USD' },
          stock: { type: 'number', example: 100 },
        },
      },
    },
  })
  async findAll() {
    const products = await this.productRepo.findAll();

    return Promise.all(
      products.map(async (product) => {
        const stock = await this.stockRepo.findByProductId(product.id);
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          currency: product.currency,
          stock: stock?.getQuantity() ?? 0,
        };
      }),
    );
  }
}
