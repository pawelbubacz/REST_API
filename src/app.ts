import path from 'path';
import express from 'express';
import * as userController from './controller/controller';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../infrastructure/config/mikro-orm.config';
import { setEntityManager } from './database-service/database-service';

export const DI = {} as {
  orm: MikroORM,
  em: MikroORM['em']
};

const initializeApp = async (options?: { skipDb?: boolean }) => {
  try {
    if (!options?.skipDb) {
      DI.orm = await MikroORM.init(mikroOrmConfig);
      DI.em = DI.orm.em;
      setEntityManager(DI.em);
    }

    const swaggerDocument = YAML.load(
      path.resolve(process.cwd(), 'infrastructure/config/swagger.yaml')
    );
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/', userController.welcome);
    app.get('/users', userController.getUsers);
    app.get('/countusers', userController.countUsers);
    app.get('/countwomen', userController.countWomen);
    app.get('/user', userController.getUser);
    app.post('/addusers', userController.addUsers);

    if (!options?.skipDb) {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    }

    return app;
  } catch (error) {
    console.error('Error during application initialization:', error);
    throw error;
  }
};

export default initializeApp;

if (require.main === module) {
  initializeApp().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}