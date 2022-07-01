import * as express from 'express';
import { DBHelper } from './app/helper/db.helper';
import { loginRoute } from './app/login/login.routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ErrorMessage } from '@hermes/interfaces';
import { logoutRoute } from './app/logout/logout.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);

app.use((err, res) => {
  res.status(404).send({ message: 'Not found bro' } as ErrorMessage);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

DBHelper.init();
