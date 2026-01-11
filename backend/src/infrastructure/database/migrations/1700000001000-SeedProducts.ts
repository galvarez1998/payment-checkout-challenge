import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProducts1700000001000 implements MigrationInterface {
  name = 'SeedProducts1700000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // PRODUCT 1
    await queryRunner.query(`
      INSERT INTO products ("id", "name", "description", "price", "currency", "createdAt")
      VALUES (
        'prod-iphone-case',
        'iPhone Case',
        'Premium silicone case for iPhone',
        50000,
        'COP',
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO stocks ("productId", "quantity", "updatedAt")
      VALUES (
        'prod-iphone-case',
        10,
        NOW()
      )
      ON CONFLICT ("productId") DO NOTHING;
    `);

    // PRODUCT 2
    await queryRunner.query(`
      INSERT INTO products ("id", "name", "description", "price", "currency", "createdAt")
      VALUES (
        'prod-airpods-holder',
        'AirPods Holder',
        'Leather holder for AirPods',
        30000,
        'COP',
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO stocks ("productId", "quantity", "updatedAt")
      VALUES (
        'prod-airpods-holder',
        5,
        NOW()
      )
      ON CONFLICT ("productId") DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM stocks
      WHERE "productId" IN ('prod-iphone-case', 'prod-airpods-holder');
    `);

    await queryRunner.query(`
      DELETE FROM products
      WHERE id IN ('prod-iphone-case', 'prod-airpods-holder');
    `);
  }
}
