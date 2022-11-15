import {ObjectId} from "mongodb";

export type RestaurantType = {
    name: string,
    available_seats: number,
    address: {
        street: string,
        building_number: string,
        zip_code: string,
        city: string,
    },
    description: string;
    typeOfRestaurant: TypeOfRestaurant,
    rating: number,
    numberOfRating: number,
    lat: number,
    lon: number,
}

export interface CreatedRestaurantType extends RestaurantType {
    _id: ObjectId
    createdAt: Date,
    updateAt: Date,
}

export enum TypeOfRestaurant {
    indianCuisine,
    italianCuisine,
    polishCuisine,
    chineseCuisine,
    americanCuisine
}