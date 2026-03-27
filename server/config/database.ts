import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

if (!URI) {
  console.error("MONGODB_URL is not set");
  process.exit(1);
}

mongoose
  .connect(URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});