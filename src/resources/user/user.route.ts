import UserController from "./user.controller";
import { Router } from "express";
import validateBody from "./user.validation";

const router = Router();
const userController = new UserController();

router.post("/login", userController.login);
router.post("/register",validateBody, userController.register);
router.post("/verify-otp", userController.verifyAccount);

export default router;
