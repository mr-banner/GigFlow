import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log("TOKEN:", token);

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }

  req.user = user;
  return next();
});
