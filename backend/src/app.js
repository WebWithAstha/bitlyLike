import express from 'express';
import morgan from 'morgan';
const app = express();

// setting logger
app.use(morgan('dev'));
app.use(express.json());


export default app;