import {CreatedRestaurantType} from "../restaurant";
import {ObjectId} from "mongodb";

export type UserType = {
    username: string;
    firstName: string,
    lastName: string,
    email: string,
    token?: string,
    password: string,
    isAdmin: boolean,
    favoritePlaces: CreatedRestaurantType[],
}

export interface CreatedUserType extends UserType {
    _id:ObjectId,
    createdAt: Date,
    updateAt: Date,
}