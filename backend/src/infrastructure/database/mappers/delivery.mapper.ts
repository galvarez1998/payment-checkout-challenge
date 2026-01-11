import { Delivery } from '../../../domain/entities/delivery.entity';
import { DeliveryEntity } from '../entities/delivery.entity';

export class DeliveryMapper {
  static toDomain(entity: DeliveryEntity): Delivery {
    return new Delivery(
      entity.id,
      entity.transactionId,
      entity.address,
      entity.city,
      entity.postalCode,
      entity.createdAt,
    );
  }

  static toEntity(domain: Delivery): DeliveryEntity {
    return {
      id: domain.id,
      transactionId: domain.transactionId,
      address: domain.address,
      city: domain.city,
      postalCode: domain.postalCode,
      createdAt: domain.createdAt,
    };
  }
}
