import "dotenv/config";

import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const SLOT_BACKEND = process.env.DB_CONNECTION_STRING as string;
    await mongoose.connect(SLOT_BACKEND);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default dbConnect;
