import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import multerConfig from "../config/multer.js";
import { uploadSingle } from "../controllers/file.controller.js";

const { upload } = multerConfig;

const router = Router();

router.use(requireAuth);

router.post('/single', upload.single('file'), uploadSingle);

export default router;