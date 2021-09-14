import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity]),
    ScheduleModule.forRoot(),
  ],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
