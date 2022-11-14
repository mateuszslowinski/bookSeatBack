import jwt from 'jsonwebtoken'

export const generateToken = (payload: string, expired: string) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expired,
    });
};