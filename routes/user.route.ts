import express from "express"
import {userRegister} from "../controllers/user.controller";

export const userRoute = express.Router()

userRoute.post('/register', userRegister)