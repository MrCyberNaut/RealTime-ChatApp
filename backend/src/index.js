import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import cors from 'cors';

import { connectDB } from '../lib/db.js';

import authRoutes from '../routes/auth.route.js'; 
import messageRoutes from '../routes/message.route.js'; 
import { app, server} from '../lib/socket.js';



dotenv.config();//to access the environment variables
const PORT = process.env.PORT //to access the port number from the environment variables


app.use (express.json()) //to parse the incoming request with JSON payloads , basically extract the body portion of an incoming request and expose it on req.body
app.use(cookieParser()); //to parse the incoming cookies
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true   //to allow the frontend to send cookies to the backend with the requests
    
}
))//object to be put inside curly braces to allow the frontend to make requests to the backend


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () =>{
    console.log('Server is running on PORT:' + PORT);
    //once listening starts we will connect to the database
    connectDB();
}   
)              