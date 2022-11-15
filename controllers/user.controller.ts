import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import {generateToken} from "../utils/generateToken";
import {validateEmail, validateLengthOfString, validatePassword} from "../utils/validation";
import {NotFoundError, ValidationError} from "../utils/error";
import {User} from "../models/User";

export const userRegister = async (req: Request, res: Response) => {
    const {username, email, password, firstName, lastName, favoritePlaces} = req.body;

    const checkEmail = await User.findOne({email});
    if (checkEmail) {
        throw new ValidationError('Email is already taken');
    }
    const isCorrectPassword = validatePassword(password);
    if (!isCorrectPassword) {
        throw new ValidationError('password contains at least eight characters, including at least one number' +
            ' and includes both lower and uppercase letters and special characters')
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = await new User({
            username,
            email,
            password: encryptedPassword,
            isAdmin: email === process.env.ADMIN_EMAIL,
            favoritePlaces,
            firstName,
            lastName,
        }).save();

        return res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            favoritePlaces: user.favoritePlaces,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken({id: user._id}, '14d'),

        })
    } catch (e) {
        throw new ValidationError(e.message);
    }
}

export const userLogin = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const isEmail = validateEmail(email);
    if (!isEmail) {
        throw new ValidationError('Incorrect email');
    }

    const user = await User.findOne({email});
    if (!user) {
        throw new NotFoundError("This email don't exits in database")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ValidationError("Password is incorrect");
    }
    try {
        return res.status(201).send({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            favoritePlaces: user.favoritePlaces,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken({id: user._id}, '14d'),
        })
    } catch (e) {
        throw new ValidationError(e.message);
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    const {email} = req.body;

    const isEmail = validateEmail(email);
    if (!isEmail) {
        throw new ValidationError('Incorrect email');
    }

    const user = await User.findOne({email});
    if (!user) {
        throw new NotFoundError('User not found');
    }
    try {
        return res.status(200).json({
            username: user.username,
            email: user.email,
            favorite_places: user.favorite_places,
            firstName: user.firstName,
            lastName: user.lastName,
        })
    } catch (e) {
        throw new ValidationError(e.message);

    }
}

export const updateProfile = async (req: Request, res: Response) => {
    const {email, username, firstName, lastName} = req.body;

    const isEmail = validateEmail(email);
    if (!isEmail) {
        throw new ValidationError('Incorrect email');
    }
    validateLengthOfString(username, 3, 15, 'The user name must be a string of characters, cannot be empty and have a minimum of 3 and a maximum of 15 characters.')
    validateLengthOfString(firstName, 3, 30, 'The first name must be a string of characters, cannot be empty and' +
        ' have a' +
        ' minimum of 3 and a maximum of 30 characters.')
    validateLengthOfString(lastName, 3, 50, 'The last name must be a string of characters, cannot be empty and have' +
        ' a minimum of 3 and a maximum of 50 characters.')

    try {
        await User.findOneAndUpdate({email}, {
            username,
            firstName,
            lastName
        });
        const updateUser = await User.findOne({email});

        return res.status(200).json({
            username: updateUser.username,
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
        })

    } catch (e) {
        throw new ValidationError(e.message);
    }
}

export const removeProfile = async (req: Request, res: Response) => {
    const {email} = req.body;

    const isEmail = validateEmail(email);
    if (!isEmail) {
        throw new ValidationError('Incorrect email');
    }

    const user = await User.findOne({email});
    if (!user) {
        throw new NotFoundError('User not found');
    }

    try {
        await User.findOneAndRemove({email})
        res.status(201).json('The user was removed successfully')

    } catch (e) {
        throw new ValidationError(e.message);
    }

}
