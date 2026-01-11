import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('stocks')
export class StockEntity {
  @PrimaryColumn()
  productId: string;

  @Column('int')
  quantity: number;

  @Column()
  updatedAt: Date;
}
