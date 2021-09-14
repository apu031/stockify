import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from '../entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity])],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
