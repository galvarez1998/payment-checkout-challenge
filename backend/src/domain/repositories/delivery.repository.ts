import { Delivery } from '../entities/delivery.entity';

export interface DeliveryRepository {
  save(delivery: Delivery): Promise<void>;
  findByTransactionId(transactionId: string): Promise<Delivery | null>;
}
