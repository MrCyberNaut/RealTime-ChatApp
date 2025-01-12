import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';


export const useChatStore = create((set,get)=>({

messages :[], //empty array for storing messages
users: [],  //empty array for storing users
selectedUser: null, //for updating UI while user selected 
isLoading : false,
isUsersLoading : false ,
isMessagesLoading : false ,


getUsers : async()=>{
    set({isUsersLoading:true});
    try {
        const res = await axiosInstance.get('/messages/users');
        set({users:res.data}); //getting the data back and storing in users array
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }

    finally{
        set({isUsersLoading:false});
    }
},
getMessages : async(userId)=>{
    //userId needed to checkwhich  chat to fetch 
    set({isMessagesLoading:true});
    try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({messages:res.data}); //updated messages array with the fetched data
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    finally{
        set({isMessagesLoading:false});
    }   
},
sendMessages : async(messageData)=>{
    const {selectedUser,messages} = get() //getting the array from above we have to use the get function fro zustnd
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
        //selectedUser has to be under curly braces and not the normal braces cuz
        //we would like to send the messageData to the API
        set({messages:[...messages,res.data]}); //updating the messages array with the new message
    } catch (error) {
        toast.error(error.response.data.message);
    }
},

//todo: optimize later

setSelectedUser : (selectedUser)=>{ //function to set the selected user for the state and side bar
    set({selectedUser});
},
}));


