import {create} from "zustand";
import{ axiosInstance} from "../lib/axios.js";
import { toast } from "react-hot-toast";

import {io} from "socket.io-client";

const BASE_URL = "http://localhost:5173";

export const useAuthStore = create((set,get) => ({ // takes the first argument as a callback function that receives a set function
    authUser : null , // sets the initial state of the store
    isSigningUp :  false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    isCheckingAuth : true , // sets the initial state of the store
    onlineUsers : [], //empty array for storing online users
    socket: null , //initially the socket is null

    checkAuth : async () => { 
        //related to endpoints ???
        try {
            const res = axiosInstance.get("/auth/check");
            
            set({authUser : res.data}); // sets the state of the store
            get().connectSocket(); //calling connectSocket function
        } catch ( error) {
            console.log("Error in checkAuth",error)
            set({authUser : null}); // sets the state of the store

        }
        finally{
            set({isCheckingAuth : false}); // sets the state of the store
        }
    },

    signup : async(data) => {
        set({isSigningUp : true});
            try {
             const res =   await axiosInstance.post("/auth/signup",data); //passing the data that the user sends us to the backend
             
             set({authUser : res.data}); // sets the state of the store
             toast.success("Account created successfully");
             get().connectSocket(); //calling connectSocket function
            } catch (error) {
                toast.error(error.response.data.message);//grabbing the message sent from the signup
                    console.log("Error in signup",error);
            }

            finally{
                set({isSigningUp : false});
            }
    },
    logout : async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser : null}); // sets the state of the store
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            console.log("Error in logout",error);
        }
    },

    login : async(data) => {
        set({ isLoggingIn: true }); 
    try {
      const res = await axiosInstance.post("/auth/login", data); //sending post request with data
      set({ authUser: res.data }); //updating state
      toast.success("Logged in successfully"); //showing toast

      get().connectSocket(); //calling connectSocket function
    
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
    },

    updateProfile : async(data) => {
        set({isUpdatingProfile : true});
        try {
            const res = axiosInstance.put("/auth/update-profile",data); //here the axios instance function is used to send the data to the backend to the endpoint /auth/update-profile 
            set({authUser : res.data}); // sets the to the updated profiles 

            toast.success("Profile updated successfully"); //shows a toast message
        } catch (error) {
            console.log("Error in updateProfile",error);
            toast.error(error.response.data.message);
        }

        finally{
            set({isUpdatingProfile : false});
        }
    },

    connectSocket : () => {
        const {authUser } = get();//getting the authUser from the store
        if(!authUser || get().socket?.connected){ //increases optimizaiton
            return;
        } 
        const socket = io(BASE_URL)
        socket.connect()
    },
    disconnectSocket : () => {
        get().socket.disconnect();
    }

}));
