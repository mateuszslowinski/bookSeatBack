import {Request, Response} from "express";
import {Restaurant} from "../models/Restaurant";
import {NotFoundError, ValidationError} from "../utils/error";
import {validateForRestaurant} from "../utils/validation";
import {TypeOfRestaurant} from "../types";

export const createRestaurant = async (req: Request, res: Response) => {
    const {name, address, availableSeats, typeOfRestaurant, description, lat, lon} = req.body;

    const {city, street, buildingNumber, zipCode} = address;
    validateForRestaurant(name, description, street, buildingNumber, zipCode, city, availableSeats, lat, lon);

    if (!(typeOfRestaurant in TypeOfRestaurant) || !typeOfRestaurant) {
        throw new ValidationError('Type of restaurant cannot be empty and must be one of specify type of restaurant.')
    }

    const restaurant = await new Restaurant({
        name,
        address,
        availableSeats,
        typeOfRestaurant,
        description,
        lat,
        lon
    })
    await restaurant.save();
    try {
        res.status(201).json(restaurant)
    } catch (e) {
        throw new ValidationError(e.message)
    }
}

export const getListOfRestaurants = async (req: Request, res: Response) => {
    const restaurants = await Restaurant.find()

    if (restaurants.length === 0) {
        throw new NotFoundError('No restaurants in database')
    }
    try {
        res.status(200).json(restaurants)

    } catch (e) {
        throw new ValidationError(e.message)
    }
}
export const getRestaurant = async (req: Request, res: Response) => {
    const {id} = req.params;
    const restaurant = await Restaurant.findById({_id: id});
    if (!restaurant) {
        throw new NotFoundError("This restaurant does not exist")
    }
    try {
        await restaurant.save();
        res.status(200).json(restaurant);
    } catch (e) {
        throw new ValidationError(e.message)
    }
}

export const editRestaurant = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, availableSeats, address, description, typeOfRestaurant, lat, lon} = req.body;
    const isRestaurant = await Restaurant.findById({_id: id});
    if (!isRestaurant) {
        throw new NotFoundError("This restaurant does not exist")
    }
    const {city, street, buildingNumber, zipCode} = address;
    validateForRestaurant(name, description, street, buildingNumber, zipCode, city, availableSeats, lat, lon);

    try {
        await Restaurant.findByIdAndUpdate(id, {
                name,
                availableSeats,
                address,
                description,
                typeOfRestaurant,
                lat,
                lon
            }
        )
        const restaurant = await Restaurant.findById({_id: id});
        res.status(200).json(restaurant);
    } catch (e) {
        throw new ValidationError(e.message)
    }


}