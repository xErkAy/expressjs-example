// Express imports
import express from 'express'
const app = express();


// Database client import
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()


// Main index
import { jwtAuthenticationMiddleWare } from './src/middlewares/authentication.js'
import {errorHandler} from "./src/utils/handlers.js";

import authRouter from './src/routes/auth/urls.js'
import someAppRouter from './src/routes/someapp/urls.js'

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(jwtAuthenticationMiddleWare)
app.use(express.static('static'));

app.use('/api', authRouter)
app.use('/api', someAppRouter)

app.use(errorHandler)



const host = '127.0.0.1';
const port = 8000;
app.listen(port, host, async () => {
    console.log(`Server listens http://${host}:${port}`);
});