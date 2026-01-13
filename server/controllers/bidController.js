import mongoose from "mongoose";
import { Bid } from "../models/Bid.js";
import { Gig } from "../models/Gig.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBid = asyncHandler(async (req, res) => {
  const { gigId, message, price } = req.body;
  const freelancerId = req.user._id;

  if (!gigId || !message || !price) {
    throw new ApiError(400, "All fields are required");
  }

  const gig = await Gig.findById(gigId);
  if (!gig) throw new ApiError(404, "Gig not found");

  if (gig.status !== "open") {
    throw new ApiError(400, "Bidding is closed for this gig");
  }

  if (gig.ownerId.toString() === freelancerId.toString()) {
    throw new ApiError(403, "You cannot bid on your own gig");
  }

  const existingBid = await Bid.findOne({ gigId, freelancerId });
  if (existingBid) {
    throw new ApiError(409, "You already placed a bid on this gig");
  }

  const bid = await Bid.create({
    gigId,
    freelancerId,
    message,
    price,
  });

  return res.status(201).json(
    new ApiResponse(201, { bid }, "Bid submitted successfully")
  );
});

export const getBidsForGig = asyncHandler(async (req, res) => {
  const { gigId } = req.params;

  const gig = await Gig.findById(gigId);
  if (!gig) throw new ApiError(404, "Gig not found");

  if (gig.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to view bids");
  }

  const bids = await Bid.find({ gigId })
    .populate("freelancerId", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { bids }, "Bids fetched successfully")
  );
});

export const hireBid = asyncHandler(async (req, res) => {
  const { bidId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) throw new ApiError(404, "Bid not found");

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) throw new ApiError(404, "Gig not found");

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Not authorized to hire");
    }

    if (gig.status !== "open") {
      throw new ApiError(400, "Gig is already assigned");
    }

    // 1️⃣ Assign gig
    gig.status = "assigned";
    await gig.save({ session });

    // 2️⃣ Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    // 3️⃣ Reject all other bids
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id },
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json(
      new ApiResponse(200, null, "Freelancer hired successfully")
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

export const rejectBid = asyncHandler(async (req, res) => {
  const { bidId } = req.params;

  const bid = await Bid.findById(bidId);
  if (!bid) throw new ApiError(404, "Bid not found");

  const gig = await Gig.findById(bid.gigId);
  if (!gig) throw new ApiError(404, "Gig not found");

  if (gig.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  if (bid.status !== "pending") {
    throw new ApiError(400, "Bid already processed");
  }

  bid.status = "rejected";
  await bid.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Bid rejected successfully")
  );
});

export const getMyBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ freelancerId: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { bids }, "My bids fetched"));
});
