import express from "express"
import {
    createRestaurant,
    editRestaurant,
    getListOfRestaurants,
    getRestaurant, removeRestaurant
} from "../controllers/restaurant.controller";


export const restaurantRouter = express.Router()

restaurantRouter
    .get('/', getListOfRestaurants)
    .get('/:id', getRestaurant)
    .post('/', createRestaurant)
    .patch('/:id', editRestaurant)
    .delete('/:id',removeRestaurant)

