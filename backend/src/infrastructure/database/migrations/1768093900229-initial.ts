import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1768093900229 implements MigrationInterface {
  name = 'Initial1768093900229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('PENDING', 'APPROVED', 'DECLINED')`,
    );

    await queryRunner.query(
      `CREATE TABLE "transactions" (
        "id" character varying NOT NULL,
        "productId" character varying NOT NULL,
        "customerId" character varying NOT NULL,
        "amount" numeric NOT NULL,
        "baseFee" numeric NOT NULL,
        "deliveryFee" numeric NOT NULL,
        "status" "public"."transactions_status_enum" NOT NULL,
        "createdAt" TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "deliveries" (
        "id" character varying NOT NULL,
        "transactionId" character varying NOT NULL,
        "address" character varying NOT NULL,
        "city" character varying NOT NULL,
        "postalCode" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "products" (
        "id" character varying NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "price" numeric NOT NULL,
        "currency" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "customers" (
        "id" character varying NOT NULL,
        "fullName" character varying NOT NULL,
        "email" character varying NOT NULL,
        "phone" character varying,
        "createdAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "stocks" (
        "productId" character varying NOT NULL,
        "quantity" integer NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_3024bbca6232c8b6efa3ff51028" PRIMARY KEY ("productId")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stocks"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "deliveries"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
  }
}
