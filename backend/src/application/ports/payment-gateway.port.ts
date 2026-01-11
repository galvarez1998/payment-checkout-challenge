export interface PaymentGateway {
  charge(input: {
    transactionId: string;
    amount: number;
    currency: string;
    cardToken: string;
  }): Promise<{
    success: boolean;
    reference: string;
  }>;
}
