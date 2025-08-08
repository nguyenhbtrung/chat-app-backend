import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getAllChats, getFriendChats } from "../controllers/chat.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get('/', expressAsyncHandler(getAllChats));
router.get('/friends', expressAsyncHandler(getFriendChats));

export default router;