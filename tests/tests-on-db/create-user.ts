import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config';

(async () => {
    try {
        const orm = await MikroORM.init(config);
        console.log('Connected to PostgreSQL!');

        const em = orm.em.fork();

        const users = await em.getConnection().execute("INSERT INTO user_data(name, email, age) VALUES('Bartek Kowalski', 'bartekkowalski@mail.com', 33);");

        await orm.close();
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
})();