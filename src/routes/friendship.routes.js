import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { addFriendSchema } from "chat-app-zod-schema";
import expressAsyncHandler from "express-async-handler";
import { addFriend, deleteFriendship } from "../controllers/friendship.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.post('/', validate(addFriendSchema), expressAsyncHandler(addFriend));
router.delete('/:friendId', expressAsyncHandler(deleteFriendship));

export default router;