import express from "express";
import {
  createBloodRequest,
  deleteBloodRequest,
  getAllBloodRequests,
  getStats,
  updateBloodRequestStatus,
} from "../controller/BloodRequestController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Public: Send a request
router.post("/add", createBloodRequest);

// Admin Only
router.get("/all", isAuthenticated(["Admin"]), getAllBloodRequests);
router.get("/stats", isAuthenticated(["Admin"]), getStats);
router.put("/update/:id", isAuthenticated(["Admin"]), updateBloodRequestStatus);
router.delete("/delete/:id", isAuthenticated(["Admin"]), deleteBloodRequest);

export default router;