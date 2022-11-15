import mongoose from "mongoose";
import {Document} from "mongodb";
import {RestaurantType, TypeOfRestaurant} from "../types";

interface RestaurantModal extends RestaurantType, Document {}

const restaurantSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: [true, 'name is required'],
        },
        address: {
            street: {type: String, required: true},
            buildingNumber: {type: String, required: true},
            zipCode: {type: String, required: true},
            city: {type: String, required: true},
        },
        availableSeats: {
            type: Number,
            required: true,
        },
        typeOfRestaurant: {
            type:String,
            enum: TypeOfRestaurant,
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