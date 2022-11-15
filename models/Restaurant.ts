import mongoose from "mongoose";
import {Document} from "mongodb";
import {RestaurantType, TypeOfRestaurant} from "../types";

interface RestaurantModal extends RestaurantType, Document {
}

const restaurantSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: [true, 'name is required'],
        },
        address: {
            street: {type: String, required: true},
            building_number: {type: String, required: true},
            zip_code: {type: String, required: true},
            city: {type: String, required: true},
        },
        available_seats: {
            type: Number,
            required: true,
        },
        typeOfRestaurant: {
            type: TypeOfRestaurant,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            default: 0
        },
        numberOfRating: {
            type: Number,
            default: 0
        },
        lat: {
            type: Number,
            default: 0
        },
        lon: {
            type: Number,
            default: 0
        },
    },
    {timestamps: true}
)

export const Restaurant = mongoose.model<RestaurantModal>('Restaurant', restaurantSchema)