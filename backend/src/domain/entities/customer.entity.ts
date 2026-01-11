import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

export class Customer {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly email: Email,
    public readonly phone: Phone | null,
    public readonly createdAt: Date,
  ) {
    if (!fullName || fullName.trim().length === 0) {
      throw new Error('Customer name is required');
    }
  }
}
