import express from "express"
import {createRestaurant,getRestaurants} from "../controllers/restaurant.controller";


export const restaurantRouter = express.Router()

restaurantRouter
    .get('/', getRestaurants)
    .post('/', createRestaurant)

