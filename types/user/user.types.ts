import {CreatedRestaurantType} from "../restaurant";
import {ObjectId} from "mongodb";

export type UserType = {
    username: string;
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    favorite_places: CreatedRestaurantType[],
}

export interface CreatedUserType extends UserType {
    _id:ObjectId,
    createdAt: Date,
    updateAt: Date,
}