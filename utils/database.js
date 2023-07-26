import mongoose from "mongoose";

let isConntected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConntected) {
    console.log("MongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      dbName: "share-prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConntected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
