import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getGigById, getGigs, getMyGigs, postGig } from "../controllers/gigController.js";

const router = Router();

router.route("/").post(authMiddleware, postGig);
router.route("/").get(authMiddleware, getGigs);
router.get("/getGigs", authMiddleware, getMyGigs);
router.get("/:id", getGigById);

export default router;