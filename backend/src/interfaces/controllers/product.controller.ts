import { Controller, Get } from '@nestjs/common';
import * as stockRepository from '../../domain/repositories/stock.repository';
import * as productRepository from '../../domain/repositories/product.repository';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productRepo: productRepository.ProductRepository,
    private readonly stockRepo: stockRepository.StockRepository,
  ) {}

  @Get()
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
