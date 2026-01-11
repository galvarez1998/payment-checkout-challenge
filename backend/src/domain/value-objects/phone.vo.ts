export class Phone {
  private readonly value: string;

  constructor(value: string) {
    const isValid = /^[0-9]{7,15}$/.test(value);
    if (!isValid) {
      throw new Error('Invalid phone number');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
