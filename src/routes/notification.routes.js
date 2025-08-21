import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import expressAsyncHandler from "express-async-handler";
import { getNotifications } from "../controllers/notification.controller.js";

const router = Router();
router.use(requireAuth);

router.get('/', expressAsyncHandler(getNotifications));

export default router;
