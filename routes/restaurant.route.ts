import express from "express"
import {createRestaurant, getListOfRestaurants} from "../controllers/restaurant.controller";


export const restaurantRouter = express.Router()

restaurantRouter
    .get('/', getListOfRestaurants)
    .post('/', createRestaurant)

