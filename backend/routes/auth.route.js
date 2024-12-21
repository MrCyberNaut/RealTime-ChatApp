import express from 'express';
import { signup, login, logout, updateProfile, checkAuth} from '../controllers/auth.controller.js';

import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup" , signup)
router.post("/login" , login) //HAHA HAD AN ISSUE HERE FIGURINGOUT WHY ITWASNT WORKING AND ALL I HAD TO DO WAS REMOVE THE SPACE BETWEEN LOGIN AND INVERTED COMMAS 
router.post("/logout" , logout)

router.put("/update-profile", protectRoute, updateProfile) //update profile , protect route is to make sure useer gets to that endpoint only if hes logged in

router.get("/check",protectRoute,checkAuth) //check if user is logged in or not
//we wil lbe calling the above function whenever we refresh our application, to ccheck user is authenticated or not and depending on that we take the user to the login page or the profile

export default router;
