import { Product } from '../../../domain/entities/product.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(entity: ProductEntity): Product {
    return new Product(
      entity.id,
      entity.name,
      entity.description,
      Number(entity.price),
      entity.currency,
      entity.createdAt,
    );
  }

  static toEntity(domain: Product): ProductEntity {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      price: domain.price,
      currency: domain.currency,
      createdAt: domain.createdAt,
    };
  }
}
