import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { user1, user2 } from '../mocks/mock-user';

export class CreateUsers1631589127050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { manager } = queryRunner;
    await manager.getRepository(UserEntity).save(user1);
    await manager.getRepository(UserEntity).save(user2);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
