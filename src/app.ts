import path from 'path';
import express from 'express';
import * as userController from './controller/controller';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../infrastructure/config/mikro-orm.config';
import { setEntityManager } from './database-service/database-service';
import { loggerInterface } from './logger/logger-interface';
import { WinstonLogger } from './logger/winston-logger';

const logger: loggerInterface = new WinstonLogger();

export const DI = {} as {
  orm: MikroORM,
  em: MikroORM['em']
};

const initializeApp = async (options?: { skipDb?: boolean }) => {
  try {
    logger.debug('Initializing application...');
    if (!options?.skipDb) {
      logger.debug('Initializing MikroORM...');
      DI.orm = await MikroORM.init(mikroOrmConfig);
      DI.em = DI.orm.em;
      setEntityManager(DI.em);
      logger.debug('MikroORM initialized and entity manager set.');
    } else {
      logger.debug('Skipping DB initialization as per options.');
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
    app.post('/adduser', userController.addUsers);
    app.delete('/user/:id', userController.deleteUser);

    if (!options?.skipDb) {
      app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
      });
    }

    logger.debug('Application initialized successfully.');
    return app;
  } catch (error) {
    logger.error(`Error initializing app: ${error}`);
    throw new Error('Failed to initialize app:');
  }
};

export default initializeApp;

if (require.main === module) {
  initializeApp().catch((error) => {
    logger.error(`Failed to start the application: ${error}`);
    process.exit(1);
  });
}