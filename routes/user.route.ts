import express from "express"
import {userLogin, userRegister} from "../controllers/user.controller";

export const userRoute = express.Router()

userRoute
    .post('/register', userRegister)
    .post('/login', userLogin)