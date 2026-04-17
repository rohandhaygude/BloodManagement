import dotenv from "dotenv";
dotenv.config();

console.log("🚀 Starting server initialization...");

(async () => {
  try {
    console.log("📦 Loading modules...");

    const app = (await import("./app.js")).default;
    console.log("✅ App module loaded");

    const cloudinary = (await import("cloudinary")).default;
    console.log("✅ Cloudinary module loaded");

    const { connectDB } = await import("./Database/dbConnection.js");
    console.log("✅ Database module loaded");

    const { User } = await import("./models/UserSchema.js");
    console.log("✅ User model loaded");

    console.log("⚙️ Configuring cloudinary...");
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const PORT = process.env.PORT || 3000;

    const createDefaultAdmin = async () => {
      try {
        console.log("🔍 Checking for existing admin user...");
        const existingAdmin = await User.findOne({ email: "admin@bloodsource.com", role: "Admin" });
        if (existingAdmin) {
          console.log(`✅ Admin user already exists: ${existingAdmin.email}`);
          return;
        }

        console.log("🆕 Creating default admin user...");
        const admin = await User.create({
          firstName: "Admin",
          lastName: "User",
          email: "admin@bloodsource.com",
          phone: "0000000000",
          blood: "O+",
          dob: new Date("1990-01-01"),
          gender: "Other",
          password: "admin123",
          role: "Admin",
        });
        console.log(`✅ Created default admin: ${admin.email} (password: admin123)`);
      } catch (error) {
        console.error("❌ Could not create default admin:", error.message);
      }
    };

    console.log("🔌 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    console.log("👤 Setting up default admin...");
    await createDefaultAdmin();

    console.log("🌐 Starting HTTP server...");
    const server = app.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}`);
    });

    console.log("🎉 Server startup complete - ready to accept requests!");

  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
})();