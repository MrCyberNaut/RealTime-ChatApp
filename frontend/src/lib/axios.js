//we are creating an instance of axios and setting the base url to the backend server
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE ==="developemnt" ? 'http://localhost:5001/api' : "/api", //making this port dynamic based on whether its in development or produciotn mode 
    withCredentials: true,
    
    });
