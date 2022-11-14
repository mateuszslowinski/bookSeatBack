import jwt from 'jsonwebtoken'

export const generateToken = (payload: { id: string }, expired: string) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expired,
    });
};