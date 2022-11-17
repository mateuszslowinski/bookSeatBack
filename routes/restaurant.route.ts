import express from "express"
import {createRestaurant, getListOfRestaurants, getRestaurant} from "../controllers/restaurant.controller";


export const restaurantRouter = express.Router()

restaurantRouter
    .get('/', getListOfRestaurants)
    .get('/:id',getRestaurant)
    .post('/', createRestaurant)

