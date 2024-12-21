import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsersForSidebar = async (req, res) => {
    //we bascially want to get all the users except the logged in user
    try {
        const loggedInUserId  = req.user._id; //we can grab the user from the request object bcz we have added it in the protect route middleware
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); //the $ne operator selects the documents where the value of the field is not equal to the specified value, which in this case is the logged in user id
        //we are not sending the password back to the client

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in get users for sidebar", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    //we want to get the messages for a particular user
    try {
        const {id:userToChatId}  = req.params //id or whatever coressponsonds to the same nane as in the route , req.params will have the id of the user , we dont use req.body here bcz ??? then we also rename the id to userToChatId

        const myId  = req.user._id; //the logged in user
        const messages  = await Message.find({
            //find all the messsages where the senderId is the logged in user and the receiverId is the user we are chatting with
            $or : [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ] //we are using the $or operator to find the messages where the senderId is the logged in user and the receiverId is the user we are chatting with or the senderId is the user we are chatting with and the receiverId is the logged in user

        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages", error.message);
        res.status(500).json({message: "Internal server error"});

    }
};

export const sendMessage = async (req, res) => {

    //sent message will be a string or a image

    try {
        const {text,image} = req.body; //we will get the text and image from the request body
        const {id:receiverId} = req.params; //we will get the receiverId from the url
        const senderId = req.user._id; //we will get the senderId from the logged in user
    } catch (error) {
        
    }
};