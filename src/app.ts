require('dotenv').config(); 
import express from 'express';
import router from './router';
import connect from './db';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const corsPermission = cors();
app.use(corsPermission);
app.use(express.json());
app.use('/', router);
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*'
  },
  transports: ['websocket', 'polling']
});
const port = process.env.PORT || 5000;

server.listen(port, async () => {
  await connect();
  console.log('app working at: ' + port);
});
