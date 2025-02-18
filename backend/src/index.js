import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { connectDB } from '../lib/db.js';

import authRoutes from '../routes/auth.route.js'; 
import messageRoutes from '../routes/message.route.js'; 
import { app, server} from '../lib/socket.js';



dotenv.config();//to access the environment variables
const PORT = process.env.PORT //to access the port number from the environment variables
const __dirname = path.resolve(); //to get the current directory name

app.use (express.json()) //to parse the incoming request with JSON payloads , basically extract the body portion of an incoming request and expose it on req.body
app.use(cookieParser()); //to parse the incoming cookies
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true   //to allow the frontend to send cookies to the backend with the requests
    
}
))//object to be put inside curly braces to allow the frontend to make requests to the backend


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html")); //entry point for the react app
    });
    };

server.listen(PORT, () =>{
    console.log('Server is running on PORT:' + PORT);
    //once listening starts we will connect to the database
    connectDB();
});              