import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getAllChats } from "../controllers/chat.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get('/', expressAsyncHandler(getAllChats));

export default router;