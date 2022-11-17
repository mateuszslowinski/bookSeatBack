import supertest from "supertest";
import {app} from "../index";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {database} from "../config/mongoDb";
import {Restaurant} from "../models/Restaurant";
import {CreatedRestaurantType, TypeOfRestaurant} from "../types";


export const defaultRestaurant: CreatedRestaurantType = {
    _id: new ObjectId(),
    name: "Janek",
    availableSeats: 4,
    address: {
        street: 'krakowska',
        buildingNumber: '3',
        zipCode: '23-323',
        city: 'kielce',
    },
    description: "test@gmail2.com",
    typeOfRestaurant: TypeOfRestaurant.americanCuisine,
    rating: 0,
    numberOfRating: 0,
    lat: 3,
    lon: 3,
    createdAt: new Date(),
    updateAt: new Date()
}
const request = supertest(app);

jest.setTimeout(9000);

describe('restaurant.test.ts', () => {

    beforeAll(async () => {
        await database();
        await Restaurant.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe("POST /restaurants", () => {
        it("checking the validation of the restaurant name when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                name: 'we'
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('The restaurant name must be a string of characters, cannot be empty and' +
                ' have a minimum of 3 and a maximum of 40 characters.');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of the restaurant description when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                description: ''
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('The restaurant description must be a string of characters, cannot' +
                ' be empty and have a minimum of 1 and a maximum of 2000 characters.');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of the restaurant street address when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                address: {
                    ...defaultRestaurant.address,
                    street: ''
                }
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('The street address name must be a string of characters, cannot be' +
                ' empty and have a minimum of 1 and a maximum of 100 characters.');
        });
    });
    describe("POST /restaurants", () => {
        it("checking the validation of the restaurant street building number when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                address: {
                    ...defaultRestaurant.address,
                    buildingNumber: ''
                }
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('The building number address name must be a string of' +
                ' characters,cannot be empty and have a minimum of 1 and a maximum of 5 characters.');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of the restaurant zip code when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                address: {
                    ...defaultRestaurant.address,
                    zipCode: ''
                }
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('The zip code address name must be a string of characters,' +
                ' cannot be empty and have a minimum of 1 and a maximum of 10 characters.');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of the restaurant city when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                address: {
                    ...defaultRestaurant.address,
                    city: ''
                }
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('The city address name must be a string of characters,' +
                ' cannot be empty and have a minimum of 1 and a maximum of 50 characters.');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of putting of negative number in the available seats when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                availableSeats: -2
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Available spaces must be a number and be greater than 0');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of putting of string in the available seats when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                availableSeats: "23"
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Available spaces must be a number and be greater than 0');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of putting of string in the latitude when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                lat: "3"
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Latitude must be a number and be greater than 0');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of putting of incorrect number in the latitude when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                lat: 0
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Latitude must be a number and be greater than 0');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of putting of incorrect number in the longitude when creating a new restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                lon: -4
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Longitude must be a number and be greater than 0');
        });
    });

    describe("POST /restaurants", () => {
        it("checking the validation of putting of incorrect value in the type of restaurant  when creating a new" +
            " restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                typeOfRestaurant: -4
            });
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Type of restaurant cannot be empty and must be one of specify type of restaurant.');
        });
    });
    describe("POST /restaurants", () => {
        it("checking the validation of putting of correct value in the type of restaurant  when creating a new" +
            " restaurant", async () => {
            const res = await request.post("/api/restaurants").send({
                ...defaultRestaurant,
                typeOfRestaurant: 'americanCuisine'
            });
            expect(res.status).toBe(201)
            expect(res.body.typeOfRestaurant).toBe(defaultRestaurant.typeOfRestaurant);
        });
    });

    describe("POST /restaurants", () => {
        it("checking to successful create a restaurant", async () => {
            const res = await request.post("/api/restaurants").send(defaultRestaurant);

            expect(res.status).toBe(201);
            expect(res.body.name).toBe(defaultRestaurant.name)
        })
    });

    describe("GET /restaurants", () => {
        it("checking to successful get a restaurants list", async () => {
            const res = await request.get("/api/restaurants");
            expect(res.status).toBe(200);
            expect(res.body).not.toEqual([])
            expect(res.body[0]._id).toBeDefined();
        })
    });

    // describe("GET /restaurants", () => {
    //     it("checking to validation of get empty restaurants list", async () => {
    //         const res = await request.get("/api/restaurants");
    //         expect(res.status).toBe(404);
    //         expect(res.body.message).toEqual('No restaurants in database')
    //     })
    // });

    describe("GET /restaurants/:id", () => {
        it("checking to validation of putting incorrect id", async () => {
            const id = new ObjectId()
            const res = await request.get(`/api/restaurants/${id}`);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('This restaurant does not exist')
            expect(res.body._id).not.toBeDefined();
        })
    });

    describe("GET /restaurants/:id", () => {
        it("checking to get restaurant by id", async () => {
            const restaurants = await Restaurant.find();
            const res = await request.get(`/api/restaurants/${restaurants[0]._id}`);

            expect(res.status).toBe(200);
            expect(res.body._id).toEqual(String(restaurants[0]._id))
        })
    });
})