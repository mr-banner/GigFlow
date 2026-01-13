import { asyncHandler } from "../utils/asyncHandler.js";
import { Gig } from "../models/Gig.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const postGig = asyncHandler(async (req, res) => {

  const { title, description, budget } = req.body || {};

  if (!title || !description || budget === undefined) {
    throw new ApiError(400, "All fields are required");
  }

  const gig = await Gig.create({
    title,
    description,
    budget: Number(budget),
    ownerId: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      { gig },
      "Gig created successfully"
    )
  );
});

export const getGigs = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const query = {
    status: "open",
    ...(search && {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }),
  };

  const gigs = await Gig.find(query).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      { gigs },
      "Open gigs fetched successfully"
    )
  );
});

export const getMyGigs = asyncHandler(async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user._id })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      { gigs },
      "User gigs fetched successfully"
    )
  );
});

export const getGigById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const gig = await Gig.findById(id);

  if (!gig) {
    throw new ApiError(404, "Gig not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { gig },
      "Gig details fetched successfully"
    )
  );
});




