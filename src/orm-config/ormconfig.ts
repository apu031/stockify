import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const defaultOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'stocs',
  password: 'stocks',
  database: 'stocks',
  entities: [
    join(__dirname, '**', '*.entity.{ts,js}'),
    './dist/**/*.entity.{ts,js}',
  ],
  synchronize: false,
  migrationsRun: false,
  logger: 'simple-console',
};

export const ormconfig: ConnectionOptions = {
  ...defaultOrmConfig,
  migrationsTableName: 'migration',
  migrations: ['dist/migrations/*js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export const ormconfigSeed: ConnectionOptions = {
  ...defaultOrmConfig,
  migrationsTableName: 'seed',
  migrations: ['dist/seeds/*js'],
  cli: {
    migrationsDir: 'src/seeds',
  },
};
