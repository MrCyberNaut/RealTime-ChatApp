import {create} from "zustand";
import{ axiosInstance} from "../lib/axios.js";


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
    }

}));
