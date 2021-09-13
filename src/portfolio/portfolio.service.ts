import { Injectable } from '@nestjs/common';

export type Portfolio = any;

export enum StocksSymbol {
  STAN = 'STAN',
  MGX = 'MGX',
}

@Injectable()
export class PortfolioService {
  private readonly portfolios = [
    {
      userId: 1,
      walletBalance: 10,
      bought: {},
      sold: {},
    },
    {
      userId: 2,
      walletBalance: 5,
      bought: {},
      sold: {},
    },
  ];

  private readonly stocks = {
    STAN: {
      stockId: 1,
      stockSymbol: StocksSymbol.STAN,
      rate: 100,
    },
    MGX: {
      stockId: 2,
      stockSymbol: StocksSymbol.MGX,
      rate: 50,
    },
  };

  async getPortfolioByUserId(userId: number): Promise<Portfolio | undefined> {
    return this.portfolios.find((portfolio) => portfolio.userId === userId);
  }

  async buyStocks(
    userId: number,
    stock,
    quantity: number,
  ): Promise<Portfolio | undefined> {
    const portf = this.portfolios.find(
      (portfolio) => portfolio.userId === userId,
    );

    if (!portf) {
      return;
    }

    if (portf.bought[stock] !== undefined) {
      portf.bought[stock] = portf.bought[stock] + quantity;
    } else {
      portf.bought[stock] = quantity;
    }
    portf.walletBalance =
      portf.walletBalance - quantity * this.stocks[stock].rate;

    console.log('updated:', portf);

    return portf;
  }
}
