import {ObjectId} from "mongodb";

export type ReservationType = {
    date: Date,
    count_of_people: number,
    restaurant: string,
    user: string,
}

export interface CreatedReservationType extends ReservationType {
    _id: ObjectId,
    createdAt: Date,
    updateAt: Date,
}