import mongoose from "mongoose";


const ConnectMongoDb = async () => {

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("MongoDB connection failed");
  }
};

export default ConnectMongoDb;
