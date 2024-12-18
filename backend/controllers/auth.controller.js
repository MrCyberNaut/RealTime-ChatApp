import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        //hash passwrods 
//using bcryptjs to hash the password
        if(password.length < 6){
            return res.status(400).json({message: "Password should be atleast 6 characters long"})
        }
        //if password is valid then hash the password nad create user as well
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password,salt);
        

        const newUser = new User({
            email,
            fullName,
            password: hasedPassword,
        });

        // const newUser = new User({
        //     email: email;
        //     fullName : fullname
        //     password: hasedPassword,
        // });
        if(newUser){

            //generate jwt token 
            //now to generate jwt token we need to install jsonwebtoken
            //also to keep the codebase clean instead of writing the entire code here ,we weill write the code in a separate file and import it here like utils folder/ files;
            generateToken(newUser._id,res); //MONGODB stores it as _ id and not id , and response so that it can  send the cookie in the response

            await newUser.save();
            res.status(201).json({message: "User created successfully",
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            });
        }else{
            console.log("error in signup controller");
            res.status(500).json({message: "Internal server error"}); //500 is server error

        }

    } catch (error) {
        
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
export const logout = async (req, res) => {
    try {
       
        res.cookie("jwt","",{maxAge: 0}); //clear the cookie
        res.status(200).json({message: "User logged out successfully"});
      } catch (error) {
        console.log("error in logout controller", error);
        res.status(500).json({message: "Internal server error"}); //500 is server error
    }
};


export const updateProfile = async (req, res) => {
    
}