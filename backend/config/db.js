import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      dbName:'note_taking_db'
    })
    console.log("db connected");    
  } catch (error) {
    console.error("db connection error",error.message);   
    setTimeout(connectDb, 5000);
  }
}

export default connectDb