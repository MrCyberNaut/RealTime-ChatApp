import {create} from "zustand";
import{ axiosInstance} from "../lib/axios.js";
import { toast } from "react-hot-toast";


export const useAuthStore = create((set) => ({ // takes the first argument as a callback function that receives a set function
    authUser : null , // sets the initial state of the store
    isSigningUp :  false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    isCheckingAuth : true , // sets the initial state of the store

    checkAuth : async () => { 
        //related to endpoints ???
        try {
            const res = axiosInstance.get("/auth/check");
            
            set({authUser : res.data}); // sets the state of the store
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
        } catch (error) {
            console.log("Error in logout",error);
        }
    }
}));
