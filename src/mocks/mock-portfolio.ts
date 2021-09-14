import { PortfolioEntity } from '../entities/portfolio.entity';
import { user1, user2 } from './mock-user';

const portfolio1: Partial<PortfolioEntity> = {
  userId: user1.userId,
};

const portfolio2: Partial<PortfolioEntity> = {
  userId: user2.userId,
};

export { portfolio1, portfolio2 };
