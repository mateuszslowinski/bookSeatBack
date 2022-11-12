import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'username name is required'],
            trim: true,
            text: true,

        },
        first_name: {
            type: String,
            required: [true, 'first name is required'],
            trim: true,
            text: true,

        },
        last_name: {
            type: String,
            required: [true, 'last  name is required'],
            trim: true,
            text: true,

        },
        email: {
            type: String,
            required: [true, 'email name is required'],
            trim: true,
            text: true,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

export const User = mongoose.model('User', userSchema)