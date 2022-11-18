import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import {generateToken} from "../utils/generateToken";
import {validateEmail, validateForUserData, validatePassword} from "../utils/validation";
import {NotFoundError, ValidationError} from "../utils/error";
import {User} from "../models/User";

export const userRegister = async (req: Request, res: Response) => {
    const {email, password} = req.body;

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
            email,
            password: encryptedPassword,
            isAdmin: email === process.env.ADMIN_EMAIL,
        }).save();

        return res.status(201).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
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
    validateForUserData(username, firstName, lastName)

    try {
        await User.findOneAndUpdate({email}, {
            username,
            firstName,
            lastName
        });
        const updatedUser = await User.findOne({email});

        return res.status(200).json({
            username: updatedUser.username,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
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


export const completeUserData = async (req: Request, res: Response) => {
    const {_id,username,firstName,lastName} = req.body;

    const user = await User.findById({_id});
    if (!user) {
        throw new NotFoundError('No user found');
    }

    validateForUserData(username, firstName, lastName)

    try {
        await User.findByIdAndUpdate(_id, {
            username,
            firstName,
            lastName
        });
        const updatedUser = await User.findById(_id);

        return res.status(200).json({
            username: updatedUser.username,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
        })

    } catch (e) {
        throw new ValidationError(e.message);
    }
}

