import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "chat-app-zod-schema";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post("/register", validate(registerSchema), expressAsyncHandler(register));
router.post("/login", validate(loginSchema), expressAsyncHandler(login));

export default router;