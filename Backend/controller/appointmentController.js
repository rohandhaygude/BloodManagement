import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";

/* =====================================================
   🔹 CREATE APPOINTMENT (PATIENT)
===================================================== */
export const createAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        bloodGroup,
        unitsRequired,
        appointmentDate,
        timeSlot,
        hospitalName,
        hospitalAddress,
        notes
    } = req.body;

    if (!bloodGroup || !unitsRequired || !appointmentDate || !timeSlot || !hospitalName || !hospitalAddress) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const appointment = await Appointment.create({
        patient: req.user._id,
        bloodGroup,
        unitsRequired,
        appointmentDate,
        timeSlot,
        hospitalName,
        hospitalAddress,
        notes
    });

    res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        appointment
    });
});

/* =====================================================
   🔹 GET MY APPOINTMENTS (PATIENT / DONOR)
===================================================== */
export const getMyAppointments = catchAsyncErrors(async (req, res, next) => {
    let appointments;

    if (req.user.role === "Patient") {
        appointments = await Appointment.find({ patient: req.user._id })
            .populate("donor", "firstName lastName email phone");
    } else if (req.user.role === "Donor") {
        appointments = await Appointment.find({ donor: req.user._id })
            .populate("patient", "firstName lastName email phone");
    } else {
        return next(new ErrorHandler("Unauthorized role", 403));
    }

    res.status(200).json({
        success: true,
        count: appointments.length,
        appointments
    });
});

/* =====================================================
   🔹 GET ALL APPOINTMENTS (ADMIN)
===================================================== */
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find()
        .populate("patient", "firstName lastName email")
        .populate("donor", "firstName lastName email");

    res.status(200).json({
        success: true,
        count: appointments.length,
        appointments
    });
});

/* =====================================================
   🔹 ACCEPT APPOINTMENT (DONOR)
===================================================== */
export const acceptAppointment = catchAsyncErrors(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    if (appointment.status !== "Pending") {
        return next(new ErrorHandler("Appointment already processed", 400));
    }

    appointment.donor = req.user._id;
    appointment.status = "Accepted";

    await appointment.save();

    res.status(200).json({
        success: true,
        message: "Appointment accepted",
        appointment
    });
});

/* =====================================================
   🔹 REJECT APPOINTMENT (DONOR)
===================================================== */
export const rejectAppointment = catchAsyncErrors(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    if (appointment.status !== "Pending") {
        return next(new ErrorHandler("Appointment already processed", 400));
    }

    appointment.status = "Rejected";

    await appointment.save();

    res.status(200).json({
        success: true,
        message: "Appointment rejected",
        appointment
    });
});

/* =====================================================
   🔹 UPDATE STATUS (ADMIN)
===================================================== */
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
        success: true,
        message: "Status updated successfully",
        appointment
    });
});

/* =====================================================
   🔹 DELETE / CANCEL APPOINTMENT (PATIENT)
===================================================== */
export const cancelAppointment = catchAsyncErrors(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    if (appointment.patient.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("Not authorized", 403));
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.status(200).json({
        success: true,
        message: "Appointment cancelled",
    });
});