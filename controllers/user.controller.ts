import {Request, Response} from "express";
import {NotFoundError, ValidationError} from "../utils/error";
import bcrypt from 'bcrypt';
import {User} from "../models/User";
import {validateEmail, validateLengthOfString, validatePassword} from "../utils/validation";
import {generateToken} from "../utils/generateToken";

export const userRegister = async (req: Request, res: Response) => {
    const {username, email, password, first_name, last_name, favorite_places} = req.body;

    const checkEmail = await User.findOne({email});
    if (checkEmail) {
        throw new ValidationError('Email is already taken');
    }
    const isCorrectPassword = validatePassword(password)
    if (!isCorrectPassword) {
        throw new ValidationError('password contains at least eight characters, including at least one number' +
            ' and includes both lower and uppercase letters and special characters')
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt)

        const user = await new User({
            username,
            email,
            password: encryptedPassword,
            isAdmin: email === process.env.ADMIN_EMAIL,
            favorite_places,
            first_name,
            last_name,
        }).save();

        return res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            favorite_places: user.favorite_places,
            first_name: user.first_name,
            last_name: user.last_name,
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
        throw new ValidationError('Incorrect email')
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new NotFoundError("This email don't exits")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new ValidationError("Password is incorrect")
    }
    try {
        return res.status(201).send({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            favorite_places: user.favorite_places,
            first_name: user.first_name,
            last_name: user.last_name,
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
        throw new ValidationError('Incorrect email')
    }

    const user = await User.findOne({email});
    if (!user) {
        throw new NotFoundError('User not found')
    }
    try {
        return res.status(200).json({
            username: user.username,
            email: user.email,
            favorite_places: user.favorite_places,
            first_name: user.first_name,
            last_name: user.last_name,
        })
    } catch (e) {
        throw new ValidationError(e.message);

    }
}

export const updateDetails = async (req: Request, res: Response) => {
    const {email, username, first_name, last_name} = req.body;

    const isEmail = validateEmail(email);
    if (!isEmail) {
        throw new ValidationError('Incorrect email')
    }
    validateLengthOfString(username, 3, 15, 'The user name must be a string of characters, cannot be empty and have a minimum of 3 and a maximum of 15 characters.')
    validateLengthOfString(first_name, 3, 30, 'The first name must be a string of characters, cannot be empty and have a' +
        ' minimum of 3 and a maximum of 30 characters.')
    validateLengthOfString(last_name, 3, 50, 'The last name must be a string of characters, cannot be empty and have' +
        ' a minimum of 3 and a maximum of 50 characters.')

    try {
        await User.findOneAndUpdate({email}, {
            username,
            first_name,
            last_name
        });
        const updateUser = await User.findOne({email});

        return res.status(200).json({
            username: updateUser.username,
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
        })

    } catch (e) {
        throw new ValidationError(e.message);
    }
}

export const removeUser = async (req: Request, res: Response) => {
    const {email} = req.body;

    try {
        await User.findOneAndRemove({email})
        res.status(201).json('The user was removed successfully')

    } catch (e) {
        throw new ValidationError(e.message);
    }

}
