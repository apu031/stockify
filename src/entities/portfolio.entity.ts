import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolioEntity')
export class PortfolioEntity {
  @PrimaryGeneratedColumn('uuid')
  portfolioId: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'decimal',
    nullable: false,
    default: 0,
  })
  walletBalance?: number;

  @Column({
    type: 'text',
    nullable: false,
    default: '{}',
  })
  bought?: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '{}',
  })
  sold?: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '{}',
  })
  current?: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTs: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedTs: Date;
}
