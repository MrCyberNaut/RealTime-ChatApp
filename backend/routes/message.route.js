import express from 'express';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/user",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages); //get messages for a particular user , we will be passing the id of the user in the url
router.post("/send/:id",protectRoute,sendMessage); //send a message to a particular user , we will be passing the id of the user in the url


export default router;