import dotenv from "dotenv";
import http from "http";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB Connected Successfully");

    server.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

connectDB();
