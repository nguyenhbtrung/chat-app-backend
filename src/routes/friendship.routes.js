import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { addFriendSchema, updateFriendshipSchema } from "chat-app-zod-schema";
import expressAsyncHandler from "express-async-handler";
import { addFriend, deleteAllFriendships, deleteFriendship, getFriendships, updateFriendship } from "../controllers/friendship.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.post('/', validate(addFriendSchema), expressAsyncHandler(addFriend));
router.delete('/:friendId', expressAsyncHandler(deleteFriendship));
router.delete('/', expressAsyncHandler(deleteAllFriendships));
router.put('/:friendId', validate(updateFriendshipSchema), expressAsyncHandler(updateFriendship));
router.get('/', expressAsyncHandler(getFriendships));

export default router;