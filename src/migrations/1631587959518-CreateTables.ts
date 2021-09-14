import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1631587959518 implements MigrationInterface {
  name = 'CreateTables1631587959518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "portfolioEntity" ("portfolioId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" text NOT NULL, "walletBalance" numeric NOT NULL DEFAULT '0', "bought" text NOT NULL DEFAULT '{}', "sold" text NOT NULL DEFAULT '{}', "current" text NOT NULL DEFAULT '{}', "createdTs" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedTs" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c7a3841fbc49f9d92c954479e1d" PRIMARY KEY ("portfolioId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stockEntity" ("stockId" uuid NOT NULL DEFAULT uuid_generate_v4(), "stockName" text NOT NULL, "stockSymbol" text NOT NULL, "price" text NOT NULL, "createdTs" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedTs" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fe5440fbad337e30f69e86f73e0" PRIMARY KEY ("stockId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userEntity" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "password" text NOT NULL, "createdTs" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedTs" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_dc687d34e05530ea7cbd95b5bde" PRIMARY KEY ("userId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "userEntity"`);
    await queryRunner.query(`DROP TABLE "stockEntity"`);
    await queryRunner.query(`DROP TABLE "portfolioEntity"`);
  }
}
