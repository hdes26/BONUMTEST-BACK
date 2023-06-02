import dotenv from 'dotenv';
import { Server } from './models/server';
//confit dotenv
dotenv.config();



const server = new Server();



server.listen();