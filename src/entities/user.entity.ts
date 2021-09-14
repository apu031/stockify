import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('userEntity')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

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
