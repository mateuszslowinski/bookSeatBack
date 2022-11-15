import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {ValidationError} from "../utils/error";


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let tmp = req.header('Authorization')
        const token = tmp ? tmp.slice(7, tmp.length) : null
        if (!token) {
            throw new ValidationError('Invalid Authentication')
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw new ValidationError('Invalid Authentication')
            }
            next()
        })
    } catch (error) {
        throw new ValidationError(error.message)
    }
}