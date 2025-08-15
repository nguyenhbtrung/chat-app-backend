import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import expressAsyncHandler from "express-async-handler";
import { getNonFriendOnlineUsers } from "../controllers/user.controller.js";

const router = Router();
router.use(requireAuth);

router.get('/online/non-friends', expressAsyncHandler(getNonFriendOnlineUsers));

export default router;