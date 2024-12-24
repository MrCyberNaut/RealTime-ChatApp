//we are creating an instance of axios and setting the base url to the backend server
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
    
    });
