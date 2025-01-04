import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';


export const useChatStore = create((set)=>({

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
}
}));


