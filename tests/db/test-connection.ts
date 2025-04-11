import { MikroORM } from '@mikro-orm/core';
import config from '../../infrastructure/config/mikro-orm.config';

(async () => {
  try {
    const orm = await MikroORM.init(config);
    console.log('Connected to PostgreSQL!');
    await orm.close();
  } catch (error) {
    console.error(error);
  }
})();