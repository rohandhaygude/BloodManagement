console.log("🚀 Server script started");

import dotenv from "dotenv";
dotenv.config();
console.log("✅ Environment loaded");

console.log("🔄 Starting imports...");

try {
  const appModule = await import("./app.js");
  console.log("✅ App imported");

  const cloudinaryModule = await import("cloudinary");
  console.log("✅ Cloudinary imported");

  const dbModule = await import("./Database/dbConnection.js");
  console.log("✅ Database connection imported");

  const userModule = await import("./models/UserSchema.js");
  console.log("✅ User schema imported");

  console.log("🎉 All imports successful!");
} catch (error) {
  console.error("❌ Import failed:", error);
  process.exit(1);
}