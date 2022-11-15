import mongoose from "mongoose";
import supertest from 'supertest'
import {database} from "../config/mongoDb";
import {User} from "../models/User";
import {app} from "../index";
import {UserType} from "../types";

const request = supertest(app)
jest.setTimeout(9000)

describe('user.ts', () => {

    let defaultUser: UserType;

    beforeAll(async () => {
        database();
        defaultUser = {
            username: "Janek",
            first_name: "janek",
            last_name: "nowak",
            email: "test@gmail2.com",
            password: "Haslo123@",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNhNjg5NGI2YjNmYWI4MWZlYzg1YiIsImlhdCI6MTY2ODUyMzY1NywiZXhwIjoxNjY5NzMzMjU3fQ.iAE_OMblKgmAda10Z4nyIiQzXChqgxljNDetbiadJTM",
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

    describe("POST /api/login", () => {
        it("Checking login for incorrect email", async () => {
            const email = 'test';
            const password = defaultUser.password;

            const res = await request.post("/api/login").send({email, password});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Incorrect email")
        });
    });

    describe("POST /api/login", () => {
        it("Checking the login from an email that is not in the database", async () => {
            const email = 'niema@o2.pl';
            const password = defaultUser.password;

            const res = await request.post("/api/login").send({email, password});
            expect(res.status).toBe(404);
            expect(res.body.message).toBe("This email don't exits in database")
        });
    });
    describe("POST /api/login", () => {
        it("Checking login for incorrect password", async () => {
            const email = defaultUser.email;
            const password = '123';

            const res = await request.post("/api/login").send({email, password});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Password is incorrect")
        });
    });

    describe("POST /api/login", () => {
        it("Checking login route", async () => {
            const email = defaultUser.email;
            const password = defaultUser.password;

            const res = await request.post("/api/login").send({email, password});
            expect(res.status).toBe(201);
            expect(res.body.email).toBe(email)
        });
    });

    describe("GET /api/profile", () => {
        it("get user profile", async () => {
            const email = defaultUser.email;

            const res = await request.get("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email});
            expect(res.status).toBe(200);
            expect(res.body.email).toBe(email)
        });
    });
    describe("GET /api/profile", () => {
        it("checking get profile for invalid email", async () => {
            const email = 'ola@o2.pl';

            const res = await request.get("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email});
            expect(res.status).toBe(404);
            expect(res.body.email).not.toBe(email)
        });
    });

    describe("GET /api/profile", () => {
        it("checking to getting profile with incorrect token", async () => {
            const email = defaultUser.email;
            const token = 'invalid';

            const res = await request.get("/api/profile").set('Authorization', `Bearer ${token}`).send({email});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("Invalid Authentication")
        });
    });

    describe("PATCH /api/profile", () => {
        it("checking validation of first name ", async () => {
            const email = defaultUser.email;
            const first_name = 'te';
            const last_name = defaultUser.last_name;
            const username = defaultUser.username;

            const res = await request.patch("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email, first_name, last_name, username});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('The first name must be a string of characters, cannot be empty and have a' +
                ' minimum of 3 and a maximum of 30 characters.')
        });
    });
    describe("PATCH /api/profile", () => {
        it("checking validation of last name ", async () => {
            const email = defaultUser.email;
            const first_name = defaultUser.first_name;
            const last_name = '';
            const username = defaultUser.username;

            const res = await request.patch("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email, first_name, last_name, username});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('The last name must be a string of characters, cannot be empty and have' +
                ' a minimum of 3 and a maximum of 50 characters.')
        });
    });
    describe("PATCH /api/profile", () => {
        it("checking validation of user name ", async () => {
            const email = defaultUser.email;
            const first_name = defaultUser.first_name;
            const last_name = defaultUser.last_name;
            const username = 'A';

            const res = await request.patch("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email, first_name, last_name, username});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('The user name must be a string of characters, cannot be empty and have a minimum of 3 and a maximum of 15 characters.')
        });

        describe("PATCH /api/profile", () => {
            it("checking for update route", async () => {
                const email = defaultUser.email;
                const first_name = 'zmiana';
                const last_name = 'zmiana';
                const username = 'zmiana';

                const res = await request.patch("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email, first_name, last_name, username});
                expect(res.status).toBe(200);
                expect(res.body.username).toBe(username)
                expect(res.body.first_name).toBe(first_name)
                expect(res.body.last_name).toBe(last_name)
            });
        });
    });

    describe("PATCH /api/profile", () => {
        it("checking for validation of email", async () => {
            const email = 'test.com';

            const res = await request.patch("/api/profile").set('Authorization', `Bearer ${defaultUser.token}`).send({email,});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Incorrect email')
        });
    });

    describe("DELETE /api/profile", () => {
        it("checking for incorrect  email", async () => {
            const email = 'asgamil.com';

            const res = await request.delete("/api/profile").send({email});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Incorrect email')
        });
    });

    describe("DELETE /api/profile", () => {
        it("Checking remove user from an email that is not in the database", async () => {
            const email = 'asg@amil.com';

            const res = await request.delete("/api/profile").send({email});
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('User not found')
        });
    });
    describe("DELETE /api/profile", () => {
        it("Checking if a user has been successfully removed", async () => {
            const email = defaultUser.email;

            const res = await request.delete("/api/profile").send({email});
            expect(res.status).toBe(201);
            expect(res.body).toBe('The user was removed successfully')
        });
    });
})