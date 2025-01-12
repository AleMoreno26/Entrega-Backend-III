import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'
import loggerRouter from "./routes/logger.router.js";
import addLogger from './utils/logger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL)
app.use(cors({
  // origin: 'http://localhost:5173',
  origin: '*', // Permite cualquier origen
  credentials: true 
}))

// Middleware
app.use(express.json());
app.use(cookieParser());      
app.use(addLogger);

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use("/api/loggerTest", loggerRouter);


app.listen(PORT, () => console.log(`Listening on ${PORT}`))
