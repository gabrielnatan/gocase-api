import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user/user.routes.js';
import mongoose from "mongoose";
import cors from "cors"
import { authenticationRouter } from './routes/authentication/authentication.routes.js';
import { authenticateToken } from '../../@sahred/infrastructure/middleware/verify-token.middleware.js';
import { chatRouter } from './routes/chat/chat.routes.js';
import { messageRouter } from './routes/message/message.routes.js';
import { campaignRouter } from './routes/campaign/campaign.routes.js';
import { productRouter } from './routes/product/product.routes.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));

app.use("/uploads", express.static(path.resolve("src", "upload")));

await mongoose.connect('mongodb://root:example@localhost:27017/', {
    pass: process.env.MONGO_PASSWORD,
    user: process.env.MONGO_USER,
    dbName: process.env.MONGO_DATABASE
});


app.use('/api', authenticationRouter);
app.use('/api/auth/', authenticateToken);
app.use('/api/auth/user', userRouter);
app.use('/api/auth/chat', chatRouter);
app.use('/api/auth/message', messageRouter);
app.use('/api/auth/campaign', campaignRouter);
app.use('/api/auth/product', productRouter);

export { app };
