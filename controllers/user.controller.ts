import {Request, Response} from "express";
import {ValidationError} from "../utils/error";
import bcrypt from 'bcrypt';
import {User} from "../models/User";
import {validatePassword} from "../utils/validation";

export const userRegister = async (req: Request, res: Response) => {
    const {username, email, password, first_name, last_name, favorite_places} = req.body;

    const checkEmail = await User.findOne({email});
    if (checkEmail) {
         throw new ValidationError('Email is already taken');
    }
    const isCorrectPassword = validatePassword(password)
    if(!isCorrectPassword){
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
            isAdmin: false,
            favorite_places,
            first_name,
            last_name,
        }).save();
        res.status(201).json(user)
    } catch (e) {
        throw new ValidationError(e.message);
    }
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if (!user) {
        throw new ValidationError("This email don't exits")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new ValidationError("Password is incorrect")
    }
    try {
        res.status(201).send(user)
    } catch (e) {
        throw new ValidationError(e.message);
    }
}
