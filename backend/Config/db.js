import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();


//connection configuration
const db = asyncHandler( async () => {

    try {
        const conn = await mongoose
        .connect(process.env.MONGO_DB);
        console.log(`DATABASE Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
});
  

export default db;

