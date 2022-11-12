import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
        date: {
            type: Date,
            required: true,
        },
        count_of_people: {
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

export const ReservationSchema = mongoose.model('Reservation', reservationSchema)