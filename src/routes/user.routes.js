import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import expressAsyncHandler from "express-async-handler";
import { getAllNonFriendUsers, getMe, getNonFriendOnlineUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();
router.use(requireAuth);

router.get('/non-friends', expressAsyncHandler(getAllNonFriendUsers));
router.get('/non-friends/online', expressAsyncHandler(getNonFriendOnlineUsers));
router.get('/me', expressAsyncHandler(getMe));
router.get('/:userId', expressAsyncHandler(getUserById));

export default router;