/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { PaymentGateway } from '../../application/ports/payment-gateway.port';

export class WompiPaymentAdapter implements PaymentGateway {
  private readonly apiUrl = process.env.WOMPI_SANDBOX_URL;
  private readonly privateKey = process.env.WOMPI_PRIVATE_KEY;

  async charge(input: {
    transactionId: string;
    amount: number;
    currency: string;
    cardToken: string;
  }): Promise<{ success: boolean; reference: string }> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const response = await axios.post(
        `${this.apiUrl}/transactions`,
        {
          amount_in_cents: input.amount * 100,
          currency: input.currency,
          payment_method: {
            type: 'CARD',
            token: input.cardToken,
          },
          reference: input.transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const status = response.data.data.status;

      return {
        success: status === 'APPROVED',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        reference: response.data.data.id,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { success: false, reference: '' };
    }
  }
}
