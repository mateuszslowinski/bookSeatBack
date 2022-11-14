import mongoose from "mongoose";
import {Document} from "mongodb";
import {RestaurantType} from "../types";

interface RestaurantModal extends RestaurantType, Document {}

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
        image: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {timestamps: true}
)

export const RestaurantSchema = mongoose.model<RestaurantModal>('Restaurant', restaurantSchema)