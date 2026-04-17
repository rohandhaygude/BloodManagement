import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  acceptAppointment,
  rejectAppointment,
  updateAppointmentStatus,
  cancelAppointment
} from "../controller/appointmentController.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* ========== PATIENT ROUTES ========== */

// Create appointment (Patient)
router.post("/create", isAuthenticated(["Patient"]), createAppointment);

// Get my appointments (Patient)
router.get("/my", isAuthenticated(["Patient"]), getMyAppointments);

// Cancel appointment (Patient)
router.put("/cancel/:id", isAuthenticated(["Patient"]), cancelAppointment);


/* ========== DONOR ROUTES ========== */

// Get my appointments (Donor)
router.get("/donor/my", isAuthenticated(["Donor"]), getMyAppointments);

// Accept appointment
router.put("/accept/:id", isAuthenticated(["Donor"]), acceptAppointment);

// Reject appointment
router.put("/reject/:id", isAuthenticated(["Donor"]), rejectAppointment);


/* ========== ADMIN ROUTES ========== */

// Get all appointments
router.get("/all", isAuthenticated(["Admin"]), getAllAppointments);

// Update status (Admin)
router.put("/update/:id", isAuthenticated(["Admin"]), updateAppointmentStatus);


/* ========== SHARED ROUTES ========== */

// Optional: both patient & donor can view their appointments
router.get("/my-all", isAuthenticated(["Patient", "Donor"]), getMyAppointments);

export default router;