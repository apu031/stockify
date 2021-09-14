import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UserEntity],
  exports: [UsersService, UserEntity],
})
export class UsersModule {}
