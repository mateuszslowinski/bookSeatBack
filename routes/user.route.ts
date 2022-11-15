import express from "express"
import {getUserProfile, updateDetails, userLogin, userRegister} from "../controllers/user.controller";

export const userRoute = express.Router()

userRoute
    .post('/register', userRegister)
    .post('/login', userLogin)
    .get('/profile', getUserProfile)
    .patch('/profile', updateDetails)