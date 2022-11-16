import express from "express"
import {createRestaurant} from "../controllers/restaurant.controller";


export const restaurantRouter = express.Router()

restaurantRouter.post('/',createRestaurant)
