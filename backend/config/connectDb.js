import mongoose from "mongoose";

async function connectDb() {
  try {
    // console.log(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("error connecting to database", error);
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

export default connectDb;
