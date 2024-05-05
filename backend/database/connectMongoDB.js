import mongoose from "mongoose";

const connectMongoDB = async () =>{
    try{
        const connectDB=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connectDB.connection.host}`);
    }catch(error){
        console.error(`Error connection to mongoDB ${error.message}`);
        process.exit(1)
    }
}
export default connectMongoDB;