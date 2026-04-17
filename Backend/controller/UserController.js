import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { User } from "../models/UserSchema.js";
import { generateToken } from "../utils/jwtToken.js";

/* ================= REGISTER ================= */

const registerUser = async (data, role) => {
    const { firstName, lastName, email, phone, blood, dob, gender, password } = data;

    if (!firstName || !lastName || !email || !phone || !blood || !dob || !gender || !password) {
        throw new ErrorHandler("All fields are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ErrorHandler("User already exists", 400);
    }

    return await User.create({
        firstName,
        lastName,
        email,
        phone,
        blood,
        dob,
        gender,
        password,
        role,
    });
};

export const PatientRegister = catchAsyncErrors(async (req, res, next) => {
    const user = await registerUser(req.body, "Patient");
    generateToken(user, "Patient registered successfully", 201, res);
});

export const DonorRegister = catchAsyncErrors(async (req, res, next) => {
    const user = await registerUser(req.body, "Donor");
    generateToken(user, "Donor registered successfully", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await registerUser(req.body, "Admin");
    generateToken(user, "Admin added successfully", 201, res);
});

/* ================= LOGIN ================= */

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ErrorHandler("Email and password are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ErrorHandler("Invalid email or password", 401);
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        throw new ErrorHandler("Invalid email or password", 401);
    }

    generateToken(user, "Login successful", 200, res);
});

/* ================= GET USER ================= */

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            blood: user.blood,
            dob: user.dob,
            gender: user.gender,
            role: user.role,
        }
    });
});

/* ================= GET DONORS ================= */

export const addNewDonor = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, blood, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !blood || !dob || !gender || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const donor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        blood,
        dob,
        gender,
        password,
        role: "Donor",
    });

    res.status(201).json({
        success: true,
        message: "Donor added successfully by Admin",
        donor: {
            id: donor._id,
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            role: donor.role
        }
    });
});

export const getAllDonors = catchAsyncErrors(async (req, res, next) => {
    const { blood } = req.query;

    let query = { role: "Donor" };
    if (blood) query.blood = blood;

    const donors = await User.find(query).select("-password").lean();

    if (!donors.length) {
        return next(new ErrorHandler("No donors found", 404));
    }

    res.status(200).json({
        success: true,
        count: donors.length,
        donors
    });
});

/* ================= LOGOUT ================= */

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
    }).json({
        success: true,
        message: "Admin logged out successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(0),
    }).json({
        success: true,
        message: "Patient logged out successfully",
    });
});

export const logoutDonor = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("donorToken", "", {
        httpOnly: true,
        expires: new Date(0),
    }).json({
        success: true,
        message: "Donor logged out successfully",
    });
});