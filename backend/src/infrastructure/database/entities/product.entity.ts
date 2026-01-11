import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  currency: string;

  @Column()
  createdAt: Date;
}
