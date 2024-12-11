import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    email : {
        type:String,
        required:true,
        unique:true,    
    },
    fullName: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
        minlength:6,
        
    },
    profilePic: {
        type:String,
        default:"",
    },

} , //dont forget the comma, this is an object 
  { timestamps:true},

);

//create a model from the schema 

const User = mongoose.model("User", userSchema); //User is the name of the model, userSchema is the schema
//the U in User is capitalized because it is a class, it is a constructor function and it is automatically set as users in the MONGODB database 
export default User; //export the model