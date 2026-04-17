import mongoose from "mongoose";


const bloodRequestSchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  unitsRequired: Number,
  hospital: String,
  location: String,
  contact: String,
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  requiredDate: Date,
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);