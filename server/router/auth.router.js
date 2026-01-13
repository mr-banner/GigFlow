import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/getUser", authMiddleware, getCurrentUser);

export default router;