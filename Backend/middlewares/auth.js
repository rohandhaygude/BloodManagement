import { User } from "../models/UserSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate users by role
 * @param {Array|string} roles - allowed role(s) e.g. "Admin" or ["Patient","Donor"]
 */
export const isAuthenticated = (roles = []) =>
  catchAsyncErrors(async (req, res, next) => {
    // 1️⃣ Get token from cookies (check all possible tokens)
    const token =
      req.cookies.adminToken ||
      req.cookies.patientToken ||
      req.cookies.donorToken;

    if (!token) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    // 2️⃣ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }

    // 3️⃣ Fetch user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // 4️⃣ Check role
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    if (roles.length && !allowedRoles.includes(user.role)) {
      return next(new ErrorHandler("Unauthorized access", 403));
    }

    // 5️⃣ Attach user to request
    req.user = user;
    next();
  });