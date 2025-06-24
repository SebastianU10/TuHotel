import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { createServer, } from 'http';

import adminMiddleware from './middlewares/admin.middleware.js';
import validatorMiddleware from './middlewares/validator.middleware.js';
import authenticationMiddleware from './middlewares/authentication.middleware.js';

import hotelRouter from './routes/hotel.routes.js';
import adminRouter from './routes/admin.routes.js';
import usersRouter from './routes/users.routes.js';
import authenticationRouter from './routes/authentication.routes.js';
import roomRouter from './routes/room.routes.js';
import reservationRouter from './routes/reservation.routes.js';

function bootstrap() {
  const app = express();
  // Llamar a una variable: process.env.<nombre de la variable>
  const port = +process.env.APP_PORT ?? 3000;
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  
  // app.use(cors({
  //   origin: process.env.APP_CORS,
  //   methods: ['GET', 'POST',],
  // }));
  // Forma 1. Utilizar el middleware a nivel global.
  // app.use(authenticationMiddleware);
  app.use('/auth', authenticationRouter);
  // Forma 2. Utilizar el middleware a nivel de router.
  app.use('/hotels', hotelRouter);
  app.use('/rooms', roomRouter);
  app.use('/users', authenticationMiddleware, usersRouter);
  app.use('/reservations', authenticationMiddleware, reservationRouter);
  app.use('/admin', authenticationMiddleware, adminMiddleware, adminRouter);

  app.get('/', (req, res) => {
    res.send('Hola mundo!');
  });
  
  const httServer = createServer(app);
  httServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

bootstrap();