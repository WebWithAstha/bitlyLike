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
import linkRoutes from './routes/link.routes.js';
import { handleRedirect } from './controllers/link.controllers.js';
app.get('/:shortCode', handleRedirect);
app.use('/api/auth',authRoutes);
app.use('/api/links', linkRoutes);


export default app;