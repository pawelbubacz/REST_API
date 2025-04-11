import { MikroORM } from '@mikro-orm/core';
import config from '../../infrastructure/config/mikro-orm.config';

(async () => {
  try {
    const orm = await MikroORM.init(config);

    const em = orm.em.fork();

    const users = await em.getConnection().execute('SELECT * FROM user_data');
    console.log('Users:', users);

    await orm.close();
  }
  catch (error) {
    console.error(error);
  }
})();