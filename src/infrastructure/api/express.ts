import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user/user.routes.js';
import mongoose from "mongoose";
import cors from "cors"
import { authenticationRouter } from './routes/authentication/authentication.routes.js';
import { authenticateToken } from '../../@sahred/infrastructure/middleware/verify-token.middleware.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3002", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));

await mongoose.connect('mongodb://root:example@localhost:27017/', {
    pass: process.env.MONGO_PASSWORD,
    user: process.env.MONGO_USER,
    dbName: process.env.MONGO_DATABASE
});

app.use('/api', authenticationRouter);
app.use('/api/auth/', authenticateToken);
app.use('/api/auth/user', userRouter);

export { app };
