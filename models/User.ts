import mongoose from "mongoose";
import {Document} from "mongodb";
import {UserType} from "../types";
import {validateEmail} from "../utils/validation";

interface UserModal extends UserType, Document {}

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'username name is required'],
            trim: true,
            text: true,
            lowercase: true,
            minlength:3,
            maxLength: 15,
        },
        firstName: {
            type: String,
            required: [true, 'first name is required'],
            trim: true,
            text: true,
            minlength:3,
            maxLength: 30,
        },
        lastName: {
            type: String,
            required: [true, 'last  name is required'],
            trim: true,
            text: true,
            minlength:3,
            maxLength: 50,
        },
        email: {
            type: String,
            required: [true, 'email name is required'],
            trim: true,
            text: true,
            validate: [validateEmail, 'email is incorrect'],
            minlength:3,
            maxLength: 40,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minlength:8,
            maxLength: 64,
        },

        isAdmin: {
            type: Boolean,
            default: false
        },
        favorite_places: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Restaurant"
                }
            }
        ],
    },
    {timestamps: true}
);

export const User = mongoose.model<UserModal>('User', userSchema)