import * as fs from 'fs';
import { ormconfig, ormconfigSeed } from './ormconfig';

const JSON_SPACE_SIZE = 2;

fs.writeFileSync(
  'src/orm-config/ormconfig-stocks.json',
  JSON.stringify(ormconfig, null, JSON_SPACE_SIZE),
);

fs.writeFileSync(
  'src/orm-config/ormconfig-stocks-seed.json',
  JSON.stringify(ormconfigSeed, null, JSON_SPACE_SIZE),
);
