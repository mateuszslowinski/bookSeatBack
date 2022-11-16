import {ObjectId} from "mongodb";

export type RestaurantType = {
    name: string,
    availableSeats: number,
    address: {
        street: string,
        buildingNumber: string,
        zipCode: string,
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
    indianCuisine = "indianCuisine",
    italianCuisine = "italianCuisine",
    polishCuisine = 'polishCuisine',
    chineseCuisine = "chineseCuisine",
    americanCuisine = 'americanCuisine'
}