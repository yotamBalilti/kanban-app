import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

// import path from 'path';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';

const app = express();

connectDB();

app.use(cors());

// app.use(logger('dev'));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/v1', require('./src/routes'));

export default app;
