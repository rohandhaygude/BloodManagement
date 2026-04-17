import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [2, "First name must be at least 2 characters"],
        maxLength: [50, "First name must be less than 50 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [2, "Last name must be at least 2 characters"],
        maxLength: [50, "Last name must be less than 50 characters"],
    },
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // ✅ add this
    validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
    },
},
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: v => /^\d{10}$/.test(v),
            message: "Please provide a valid 10-digit phone number",
        },
    },
    blood: {
        type: String,
        required: [true, "Blood group is required"],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"],
        validate: {
            validator: v => v < new Date(),
            message: "Date of birth must be in the past",
        },
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ['Male', 'Female', 'Other'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Donor', 'Patient'],
    }
}, { timestamps: true });


// ✅ Hash password before save
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// ✅ Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


// ✅ Generate JWT
UserSchema.methods.generateJsonWebToken = function () {

    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};
export const User = mongoose.model("User", UserSchema);
