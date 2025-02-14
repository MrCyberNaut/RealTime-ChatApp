import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore.js";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";



const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore(); // useAuthStore is imported from the store folder
  const {theme} = useThemeStore(); // useThemeStore is imported from the store folder
  
    console.log({onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });; //authUser is the user object that is returned from the backend after the user is authenticated

//if the user is not authenticated then the user will be redirected to the login page
//isCheckingAuth is a boolean value that is set to true when the user is being authenticated, its a state that is used to show the loader when the user is being authenticated

if (isCheckingAuth && !authUser)
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );  




  return (
    <div data-theme ={theme}>

{/* Navbar component is added here to display the Navbar on all pages */}
    <Navbar/> 

    <Routes>
    <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>

    <Toaster/>

    </div>
  )
}

export default App