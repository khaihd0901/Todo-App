import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STR);

    console.log("connect db success");
  } catch (error) {
    console.error("connect db failed:", error);
    process.exit(1); // exit with error
  }
};