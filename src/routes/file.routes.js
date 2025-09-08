import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import multerConfig from "../config/multer.js";
import { removeFile, uploadSingle } from "../controllers/file.controller.js";
import expressAsyncHandler from "express-async-handler";

const { upload } = multerConfig;

const router = Router();

router.use(requireAuth);

router.post('/single', upload.single('file'), uploadSingle);
router.delete('/:fileId', expressAsyncHandler(removeFile));

export default router;