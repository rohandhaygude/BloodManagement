import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
    }, // ✅ FIXED

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: "Please provide a valid 10-digit phone number",
        },
    },

    message: {
        type: String,
        required: [true, "Message is required"],
        minLength: [10, "Message must be at least 10 characters"],
        maxLength: [1000, "Message must be less than 1000 characters"],
    },
}, {
    timestamps: true,
});

export const Message = mongoose.model("Message", messageSchema);

export default Message;