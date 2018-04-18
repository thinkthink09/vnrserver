import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import testRouter from './routes/test';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
app.use('/test', testRouter);

app.listen(3000, () => {
  console.log('Server Started');
});
