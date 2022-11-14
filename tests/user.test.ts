import mongoose from "mongoose";
import supertest from 'supertest'
import {database} from "../config/mongoDb";
import {User} from "../models/User";
import {app} from "../index";
import {NewUserType} from "../types";

const request = supertest(app)
jest.setTimeout(9000)

describe('user.ts', () => {

    let defaultUser: NewUserType;

    beforeAll(async () => {
        database();
        defaultUser = {
            username: "Janek",
            first_name: "janek",
            last_name: "nowak",
            email: "test@gmail2.com",
            password: "Haslo123@",
            favorite_places: [],
            isAdmin: false,
        }

        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // describe("POST /register", () => {
    //     it("checking when email is taken", async () => {
    //         const res = await request.post("/api/register").send(defaultUser);
    //         expect(res.body.message).toBe('Email is already taken')
    //         expect(res.status).toBe(400);
    //     });
    // });

    // describe("POST /register", () => {
    //     it("checking when password is incorrect", async () => {
    //         const res = await request.post("/api/register").send(defaultUser);
    //         expect(res.body.message).toBe('password contains at least eight characters, including at least one number' +
    //             ' and includes both lower and uppercase letters and special characters')
    //         expect(res.status).toBe(400);
    //     });
    // });

    describe("POST /register", () => {
        it("Checking is route create user into database", async () => {
            const res = await request.post("/api/register").send(defaultUser);
            expect(res.status).toBe(201);
        });
    });

    // describe("POST /api/login", () => {
    //     it("Checking login for incorrect email", async () => {
    //         const email = 'test';
    //         const password = defaultUser.password;
    //
    //         const res = await request.post("/api/login").send({email,password});
    //         expect(res.status).toBe(400);
    //         expect(res.body.message).toBe("This email don't exits")
    //     });
    // });

    describe("POST /api/login", () => {
        it("Checking login for incorrect password", async () => {
            const email = defaultUser.email;
            const password = '123';

            const res = await request.post("/api/login").send({email,password});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Password is incorrect")
        });
    });
});