import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from '../lib/db.js';
import authRoutes from '../routes/auth.route.js'; 

const app = express(); //initialize the express app

dotenv.config();//to access the environment variables
const PORT = process.env.PORT //to access the port number from the environment variables


app.use (express.json()) //to parse the incoming request with JSON payloads , basically extract the body portion of an incoming request and expose it on req.body
app.use(cookieParser()); //to parse the incoming cookies


app.use("/api/auth", authRoutes)

app.listen(PORT, () =>{
    console.log('Server is running on PORT:' + PORT);
    //once listening starts we will connect to the database
    connectDB();
}   
)              