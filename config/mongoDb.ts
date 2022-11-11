import mongoose from "mongoose";

export const database = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected successfully')
    } catch (e) {
        console.log('Database connection failed', e.message)
    }
}