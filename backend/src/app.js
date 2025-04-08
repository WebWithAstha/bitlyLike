import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
const app = express();

// setting logger
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(cookieParser());

import authRoutes from './routes/auth.routes.js';
app.use('/api/auth',authRoutes);


export default app;