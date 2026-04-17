import express from "express";
import {
  PatientRegister,
  DonorRegister,
  login,
  addNewAdmin,
  getAllDonors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  logoutDonor
} from "../controller/UserController.js";

import { addNewDonor } from "../controller/UserController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* ========== PUBLIC ========== */

router.post("/register/patient", PatientRegister);
router.post("/register/donor", DonorRegister);
router.post("/login", login);

/* ========== ADMIN ========== */

router.post("/admin/addNew", isAuthenticated(["Admin"]), addNewAdmin);
router.get("/admin/me", isAuthenticated(["Admin"]), getUserDetails);
router.get("/admin/logout", logoutAdmin);
router.get("/admin/donors", isAuthenticated(["Admin"]), getAllDonors);

/* ========== PATIENT ========== */

router.get("/patient/me", isAuthenticated(["Patient"]), getUserDetails);
router.get("/patient/logout", logoutPatient);
router.get("/patient/donors", isAuthenticated(["Patient"]), getAllDonors);

/* ========== DONOR ========== */

router.post("/admin/add-donor", isAuthenticated(["Admin"]), addNewDonor);
router.get("/donor/me", isAuthenticated(["Donor"]), getUserDetails);
router.get("/donor/logout", logoutDonor);

/* ========== SHARED ========== */

router.get("/donors", isAuthenticated(["Admin", "Patient"]), getAllDonors);

export default router;