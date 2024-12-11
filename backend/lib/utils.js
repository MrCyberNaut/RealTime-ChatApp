import jwt from "jsonwebtoken";

export const generateToken = (userId,res) => {
    // function body here
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"}); //creating token , first it takes the payload which is userId, then the secret key and then the expiration time


    //now to send the jwt token to the client we will use cookie
    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000, //7 days make sure to use colon and not "="

        httpOnly: true, //cookie cannot be accessed by javascript and preverts xss attacks which is cross site scripting attacks

        secure: process.env.NODE_ENV !== "development", //cookie will only be sent over https in production mode and not in development mode as https is secure moreand http is notsecure mode but in development mode we use http so it has to be an exception

        sameSite : "strict" , //CSRF attacks crosssite request forgery attacks
    });//naming the toke, which token to send , securing the token


    return token;

};
