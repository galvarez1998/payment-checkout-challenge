import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('deliveries')
export class DeliveryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  transactionId: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  createdAt: Date;
}
