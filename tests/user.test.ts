import mongoose from "mongoose";
import {database} from "../config/mongoDb";
import {User} from "../models/User";
import {NewUserType} from "../types";

jest.setTimeout(9000)

describe('insert', () => {

    let defaultUser: NewUserType;

    beforeAll(async () => {
        database();
        defaultUser = {
            username: "Janek",
            first_name: "janek",
            last_name: "nowak",
            email: "test@gmail.com",
            password: "123",
            favorite_places: [],
            isAdmin: false,
        }

        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should insert user into collection', async () => {
        const user = await new User(defaultUser)
        await user.save();

        const insertedUser = await User.findOne({username: 'janek'});
        expect(insertedUser.username).toBe('janek');
    });
});