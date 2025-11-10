import express from 'express';
import dotenv from 'dotenv'
import tasksRouter from './Routes/tasksRouter.js'
import { connectDB } from './config/dbConnect.js';

dotenv.config();

const app = express();
const PORT = 5001 || process.env.PORT
//middleware
app.use(express.json());
//router
app.use("/api/tasks", tasksRouter)


connectDB().then(
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT} `)
}));

