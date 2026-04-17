import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    // ✅ Validation
    if (!firstName || !lastName || !email || !phone || !message) {
        throw new ErrorHandler("All fields are required", 400);
    }

    // ✅ Create message
    await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message
    });

    // ✅ Response
    return res.status(201).json({
        success: true,
        message: "Message sent successfully"
    });
});