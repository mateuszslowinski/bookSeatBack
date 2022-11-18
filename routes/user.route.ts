import express from "express"
import {
    completeUserData,
    getUserProfile,
    removeProfile,
    updateProfile,
    userLogin,
    userRegister
} from "../controllers/user.controller";
import {protect} from "../middleware/auth.middleware";

export const userRouter = express.Router()

userRouter
    .post('/register', userRegister)
    .post('/login', userLogin)
    .get('/profile', protect, getUserProfile)
    .post('/profile', protect, completeUserData)
    .patch('/profile', protect, updateProfile)
    .delete('/profile', protect, removeProfile)

