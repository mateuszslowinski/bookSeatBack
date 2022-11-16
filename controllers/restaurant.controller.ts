import {Request, Response} from "express";
import {Restaurant} from "../models/Restaurant";
import {ValidationError} from "../utils/error";
import {validateLengthOfString, validateNumber} from "../utils/validation";
import {TypeOfRestaurant} from "../types";

export const createRestaurant = async (req: Request, res: Response) => {
    const {name, address, availableSeats, typeOfRestaurant, description, lat, lon} = req.body;

    validateLengthOfString(name, 3, 40, 'The restaurant name must be a string of characters, cannot be empty and have' +
        ' a minimum of 3 and a maximum of 40 characters.');
    validateLengthOfString(description, 1, 2000, 'The restaurant description must be a string of characters, cannot' +
        ' be empty and have a minimum of 1 and a maximum of 2000 characters.');
    validateLengthOfString(address.street, 1, 100, 'The street address name must be a string of characters, cannot be' +
        ' empty and have a minimum of 1 and a maximum of 100 characters.');
    validateLengthOfString(address.buildingNumber, 1, 5, 'The building number address name must be a string of' +
        ' characters,cannot be empty and have a minimum of 1 and a maximum of 5 characters.');
    validateLengthOfString(address.zipCode, 1, 10, 'The zip code address name must be a string of characters,' +
        ' cannot be empty and have a minimum of 1 and a maximum of 10 characters.');
    validateLengthOfString(address.city, 1, 50, 'The city address name must be a string of characters,' +
        ' cannot be empty and have a minimum of 1 and a maximum of 50 characters.');
    validateNumber(availableSeats,'Available spaces must be a number and be greater than 0');
    validateNumber(lat,'Latitude must be a number and be greater than 0');
    validateNumber(lon,'Longitude must be a number and be greater than 0');

    if(!(typeOfRestaurant in TypeOfRestaurant) || !typeOfRestaurant) {
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

    try {
        res.status(201).json(restaurant)
    } catch (e) {
        throw new ValidationError(e.message)
    }

}