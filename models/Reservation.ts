import mongoose from "mongoose";
import {ReservationType} from "../types";
import {Document} from "mongodb";

interface ReservationModal extends ReservationType, Document {}

const reservationSchema = new mongoose.Schema({
        date: {
            type: Date,
            required: true,
        },
        countOfPeople: {
            type: Number,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Restaurant'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {timestamps: true}
)

export const Reservation = mongoose.model<ReservationModal>('Reservation', reservationSchema)