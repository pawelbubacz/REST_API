import express from 'express';
import * as userController from './controller';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', userController.welcome);
app.get('/users', userController.getUsers);
app.get('/countusers', userController.countUsers);
app.get('/countwomen', userController.countWomen);
app.post('/getuserbyid/:id', userController.getUserById);
app.post('/getusersbyemail/:domain', userController.getUsersByEmail);
app.post('/tshirt/:id', userController.getTshirt);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
