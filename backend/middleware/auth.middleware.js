import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


import cookieParser from "cookie-parser";

export const protectRoute = async (req, res, next) => { //nextfunction will call the next function , for eg in the case of update profile it will call the update profile function
try {
    const token = req.cookies.jwt; //.jwt bcz thats what we named it in the auth.controller.js
    if(!token){
        return res.status(401).json({message: "You are not authorized to access this route"});
    }
    //now before we go ahead, in order to grab the cookie we need to install cookie parser
    //npm install cookie-parser

    //now we need to verify the token and decode the cookie which has the userId bcz that is the payload that we gave it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({message: "Token is INVALID"});
    }

    const user = await User.findById(decoded.userId).select("-password"); //we dont want to send the password back to the client
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    //at this point user is authenticated so we can add this user field to the request the user we have in the database

    req.user  = user;
    next(); //this will call the next function in the middleware stack

} catch (error) {
    console.log("Error in protect route middleware", error.message);
    res.status(500).json({message: "Internal server error"});
}
}