import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectDB(dbName) {
  try {
    const { connection } = await mongoose.connect(
      process.env.EXPO_PUBLIC_MONGODB_URI
    );
    if (connection.readyState === 1) {
      db = mongoose.connection.getClient().db(dbName);
      return Promise.resolve(db);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// export async function findUserById(id) {
//   try {
//     connectDB();
    
//   }
// }
