import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import connectMongoDB from './database/connectMongoDB.js';

dotenv.config();

const app=express();
const PORT=8000;


app.use("/api/auth",authRoutes);



app.listen(PORT,()=>{
    console.log(`server is runnning on ${PORT}`);
    connectMongoDB();
})