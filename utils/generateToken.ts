import jwt from 'jsonwebtoken'
import {Types} from 'mongoose';

export const generateToken = (payload: { id: Types.ObjectId }, expired: string) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expired,
    });
};