import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(username: string, password: string): Promise<any> {
    return this.userRepo.save({ username, password });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepo.findOne({ username });
  }
}
