import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './orm-config/ormconfig';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PortfolioModule,
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
