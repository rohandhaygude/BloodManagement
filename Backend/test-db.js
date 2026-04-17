import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  try {
    console.log("Testing MongoDB connection...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    console.log("Connection test passed!");
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

testConnection();