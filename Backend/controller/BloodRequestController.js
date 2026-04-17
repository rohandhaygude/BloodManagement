import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { BloodRequest } from "../models/BloodRequestSchema.js";
import { User } from "../models/UserSchema.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";

// ── Create Request ──
export const createBloodRequest = catchAsyncErrors(async (req, res, next) => {
  const { patientName, bloodGroup, location, phone, urgency } = req.body;

  if (!patientName || !bloodGroup || !location || !phone) {
    return next(new ErrorHandler("Please fill full details!", 400));
  }

  const bloodRequest = await BloodRequest.create({
    patientName,
    bloodGroup,
    location,
    phone,
    urgency: urgency || "Medium",
    status: "Pending"
  });

  res.status(201).json({
    success: true,
    message: "Blood Request Sent Successfully!",
    bloodRequest,
  });
});

// ── Get All (Admin) ──
export const getAllBloodRequests = catchAsyncErrors(async (req, res, next) => {
  const bloodRequests = await BloodRequest.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    bloodRequests,
  });
});

// ── Update Status ──
export const updateBloodRequestStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    let request = await BloodRequest.findById(id);
    if (!request) return next(new ErrorHandler("Request not found", 404));

    request = await BloodRequest.findByIdAndUpdate(id, { status }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Status Updated!",
        request
    });
});

// ── Delete ──
export const deleteBloodRequest = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const request = await BloodRequest.findById(id);
    if (!request) return next(new ErrorHandler("Request not found", 404));

    await request.deleteOne();
    res.status(200).json({
        success: true,
        message: "Request Deleted!"
    });
});

// ── Stats for Dashboard ──
export const getStats = catchAsyncErrors(async (req, res, next) => {
    const totalRequests = await BloodRequest.countDocuments();
    const activeRequests = await BloodRequest.countDocuments({ status: "Pending" });
    const fulfilledRequests = await BloodRequest.countDocuments({ status: "Fulfilled" });
    
    const bloodGroupsData = await BloodRequest.aggregate([
        { $group: { _id: "$bloodGroup", value: { $sum: 1 } } }
    ]);

    const totalDonors = await User.countDocuments({ role: "Donor" });

    res.status(200).json({
      success: true,
      stats: {
        totalRequests,
        activeRequests,
        fulfilledRequests,
        totalDonors,
        bloodGroups: bloodGroupsData.map(bg => ({ name: bg._id, value: bg.value }))
      }
    });
});