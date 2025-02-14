import {Server} from 'socket.io';
import http from 'http'; // built in node feature
import express from 'express';


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});

const userSocketMap ={};// userId:socketID

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId; //passing to client whichis the useAuthStire in frontend
    if(userId) userSocketMap[userId] = socket.id;// if userid exsists update the socket map with the socket id


    io.emit("getOnlineUsers",Object.keys(userSocketMap)); //emit is used to send events to all the connected clients

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    }); 
});

export {io,app,server};