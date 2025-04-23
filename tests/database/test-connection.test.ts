import { MikroORM } from '@mikro-orm/core';
import config from '../../infrastructure/config/mikro-orm.config';

describe('Database Connection', () => {
  it('should connect to PostgreSQL successfully', async () => {
    let orm: MikroORM | null = null;

    try {
      orm = await MikroORM.init(config);
      expect(orm).toBeDefined();
      console.log('Connected to PostgreSQL!');
    } catch (error) {
      console.error('Failed to connect to PostgreSQL:', error);
      throw error;
    } finally {
      if (orm) {
        await orm.close();
      }
    }
  });
});