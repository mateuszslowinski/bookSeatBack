import mongoose from "mongoose";

export const database =async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected successfully')
    } catch (e) {
        console.log('Database connection failed', e.message)
    }
}