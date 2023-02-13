import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from 'compression';
import helmet from 'helmet';
import * as initDB from './src/config/db';
import session from 'express-session';


initDB;
dotenv.config();

import userRouter from './src/resources/user/user.route'
import ErrorHandler from "./src/middleware/error/error.handler";

const app = express();


app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(helmet());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000", }));
app.use(express.json());

app.use('/api', userRouter)

app.use(compression())
app.use(ErrorHandler)

const port: string | number = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});







