import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    
    // Patient who created request
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // Donor assigned (optional at start)
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    // Blood details
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    unitsRequired: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },

    // Appointment scheduling
    appointmentDate: {
        type: Date,
        required: true,
    },

    timeSlot: {
        type: String,
        required: true,
        enum: ["Morning", "Afternoon", "Evening"],
    },

    // Location
    hospitalName: {
        type: String,
        required: true,
    },

    hospitalAddress: {
        type: String,
        required: true,
    },

    // Status tracking
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"],
        default: "Pending",
    },

    // Optional notes
    notes: {
        type: String,
        default: "",
    }

}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);