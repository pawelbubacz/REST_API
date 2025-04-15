import path from 'path'; 
import express from 'express';
import * as userController from './controller/controller.ts';
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve('../infrastructure/config/swagger.yaml'));

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', userController.welcome);
app.get('/users', userController.getUsers);
app.get('/countusers', userController.countUsers);
app.get('/countwomen', userController.countWomen);
app.get('/userbyid/:id', userController.getUserById);
app.get('/usersbydomain/:domain', userController.getUsersByDomain);
app.post('/addusers', userController.addUsers);

export default app;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
