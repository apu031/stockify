import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PortfolioService } from './portfolio/portfolio.service';
import { UsersService } from './users/users.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PortfolioEntity } from './entities/portfolio.entity';
import { UserEntity } from "./entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { jwtConstants } from "./auth/constants";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: '10s',
          },
        }),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        PortfolioService,
        UsersService,
        SchedulerRegistry,
        {
          provide: getRepositoryToken(PortfolioEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
