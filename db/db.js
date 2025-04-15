import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


 const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB database successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
        
    }
 }
 
 export default connectToDatabase;