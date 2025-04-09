import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();


const allowedOrigins = process.env.CORS_ORIGINS.split(",");
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


// setting logger
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(cookieParser());

import authRoutes from './routes/auth.routes.js';
import linkRoutes from './routes/link.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import { handleRedirect } from './controllers/link.controllers.js';
app.use('/auth',authRoutes);
app.use('/links', linkRoutes);
app.use('/analytics', analyticsRoutes);
app.get('/:shortCode', handleRedirect);

export default app;