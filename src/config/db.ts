import mongoose from "mongoose";
require("dotenv").config();

mongoose.set('strictQuery', false);

const url: string | undefined = process.env.DB_URL;

if (typeof url === "string") {
    mongoose.connect(url);
} else {
    throw new Error("DB_URL is not defined");
}


const connectDB = mongoose.connection;

connectDB
    .on("open", () => console.log("mongoose is connected"))
    .on("close", () => console.log("mongoose is disconnected"))
    .on("error", (error: any) => console.log(error));

export default connectDB;
