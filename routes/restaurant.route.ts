import express from "express"
import {createRestaurant} from "../controllers/restaurant.controller";


export const restaurantRoute = express.Router()

restaurantRoute.post('/',createRestaurant)
