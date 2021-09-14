import { MigrationInterface, QueryRunner } from 'typeorm';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { portfolio1, portfolio2 } from '../mocks/mock-portfolio';

export class CreatePortfolios1631589765514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { manager } = queryRunner;
    await manager.getRepository(PortfolioEntity).save(portfolio1);
    await manager.getRepository(PortfolioEntity).save(portfolio2);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
