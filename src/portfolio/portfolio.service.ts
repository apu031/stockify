import { Injectable } from '@nestjs/common';
import { StocksSymbol } from '../enums/stock-symbol.enum';
import { errorMessage } from '../enums/error-messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { mockStocks } from '../mocks/mock-stocks';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

export type Portfolio = any;

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepo: Repository<PortfolioEntity>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async createPortfolio(userId: string) {
    return this.portfolioRepo.save({ userId });
  }

  async getPortfolioByUserId(userId: string): Promise<Portfolio | undefined> {
    return this.portfolioRepo.findOne({ userId });
  }

  async fundWalletByUserId(
    userId: string,
    fund: number,
  ): Promise<Portfolio | undefined> {
    const portf = await this.portfolioRepo.findOne({ userId });

    if (!portf) {
      throw new Error(errorMessage.invalid_user);
    }

    if (fund <= 0) {
      throw new Error(errorMessage.invalid_fund);
    }

    portf.walletBalance += fund;

    return this.portfolioRepo.update(portf.portfolioId, portf);
  }

  async buyStocks(
    userId: string,
    stock: StocksSymbol,
    quantity: number,
  ): Promise<Portfolio | undefined> {
    const portf = await this.portfolioRepo.findOne({ userId });

    if (!portf) {
      throw new Error(errorMessage.invalid_user);
    }

    if (quantity <= 0) {
      throw new Error(errorMessage.invalid_stock_quantity);
    }

    const newBalance = portf.walletBalance - quantity * mockStocks[stock].rate;
    if (newBalance < 0) {
      throw new Error(errorMessage.not_enough_balance);
    } else {
      portf.walletBalance = newBalance;
    }

    const boughtStocks = JSON.parse(portf.bought);
    const sellStocks = JSON.parse(portf.sold);
    const currentStocks = JSON.parse(portf.current);

    if (currentStocks[stock] !== undefined) {
      boughtStocks[stock] += quantity;
      currentStocks[stock] = boughtStocks[stock] - sellStocks[stock];
    } else {
      boughtStocks[stock] = quantity;
      currentStocks[stock] = boughtStocks[stock];
    }

    portf.bought = JSON.stringify(boughtStocks);
    portf.sold = JSON.stringify(sellStocks);
    portf.current = JSON.stringify(currentStocks);

    return this.portfolioRepo.update(portf.portfolioId, portf);
  }

  async sellStocks(
    userId: string,
    stock: StocksSymbol,
    quantity: number,
  ): Promise<Portfolio | undefined> {
    const portf = await this.portfolioRepo.findOne({ userId });

    if (!portf) {
      return;
    }

    if (!portf) {
      throw new Error(errorMessage.invalid_user);
    }

    if (quantity <= 0) {
      throw new Error(errorMessage.invalid_stock_quantity);
    }

    const boughtStocks = JSON.parse(portf.bought);
    const sellStocks = JSON.parse(portf.sold);
    const currentStocks = JSON.parse(portf.current);

    if (currentStocks[stock] === undefined) {
      throw new Error(errorMessage.stock_is_unavailable);
    }

    if (sellStocks[stock] !== undefined) {
      sellStocks[stock] = sellStocks[stock] + quantity;
    } else {
      sellStocks[stock] = quantity;
    }

    currentStocks[stock] = boughtStocks[stock] - sellStocks[stock];

    portf.bought = JSON.stringify(boughtStocks);
    portf.sold = JSON.stringify(sellStocks);
    portf.current = JSON.stringify(currentStocks);

    portf.walletBalance += quantity * mockStocks[stock].rate;

    return this.portfolioRepo.update(portf.portfolioId, portf);
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'priceNotification',
  })
  private triggerPriceNotification() {
    console.log('called every 5 minutes to show prices');
  }

  subscribeForPriceNotification() {
    const job = this.schedulerRegistry.getCronJob('priceNotification');
    job.start();
  }
  unsubscribeForPriceNotification() {
    const job = this.schedulerRegistry.getCronJob('priceNotification');
    job.stop();
  }
}
