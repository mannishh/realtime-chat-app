import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      `${process.env.MONGO_CONNECTION_STRING}`,
    );
    console.log("connnect to host: ", connectionResponse.connection.host);
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

export { connectDB };
