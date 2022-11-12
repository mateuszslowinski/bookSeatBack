import mongoose from "mongoose";

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

export const RestaurantSchema = mongoose.model('Restaurant', restaurantSchema)