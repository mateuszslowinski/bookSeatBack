import {ObjectId} from "mongodb";

export type RestaurantType = {
    name: string,
    available_seats: number,
    address: {
        street: string,
        building_number: string,
        zip_code: string,
        city: string,
    }
    image: string,
}

export interface CreatedRestaurantType extends RestaurantType {
    _id: ObjectId
    createdAt: Date,
    updateAt: Date,
}