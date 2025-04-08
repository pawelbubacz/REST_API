import express from 'express';
import * as userController from './controller/controller';
import swaggerUi from 'swagger-ui-express';
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', userController.welcome);
app.get('/users', userController.getUsers);
app.get('/countusers', userController.countUsers);
app.get('/countwomen', userController.countWomen);
app.post('/getuserbyid/:id', userController.getUserById);
app.post('/getusersbyemail/:domain', userController.getUsersByEmail);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
