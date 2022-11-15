import express from "express"
import {getUserProfile, removeProfile, updateDetails, userLogin, userRegister} from "../controllers/user.controller";
import {protect} from "../middleware/auth.middleware";

export const userRoute = express.Router()

userRoute
    .post('/register', userRegister)
    .post('/login', userLogin)
    .get('/profile',protect, getUserProfile)
    .patch('/profile', updateDetails)
    .delete('/profile', removeProfile)