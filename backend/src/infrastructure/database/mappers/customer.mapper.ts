import { Email } from 'src/domain/value-objects/email.vo';
import { Phone } from 'src/domain/value-objects/phone.vo';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerMapper {
  static toDomain(entity: CustomerEntity): Customer {
    return new Customer(
      entity.id,
      entity.fullName,
      new Email(entity.email),
      entity.phone ? new Phone(entity.phone) : null,
      entity.createdAt,
    );
  }

  static toEntity(domain: Customer): CustomerEntity {
    return {
      id: domain.id,
      fullName: domain.fullName,
      email: domain.email.getValue(),
      phone: domain.phone ? domain.phone.getValue() : undefined,
      createdAt: domain.createdAt,
    };
  }
}
