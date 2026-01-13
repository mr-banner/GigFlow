import express from "express";
import {
  createBid,
  getBidsForGig,
  getMyBids,
  hireBid,
  rejectBid,
} from "../controllers/bidController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBid);
router.get("/my", authMiddleware, getMyBids);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);
router.patch("/:bidId/reject", authMiddleware, rejectBid);


export default router;
