import express from "express";
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from "cors";
import {handleError} from "./utils/error";
import { database } from "./config/mongoDb";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))


app.get('/', (req, res) => {
    res.send('hello world')
})


app.use(handleError);


database();
const PORT = Number(process.env.PORT);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listing on http://localhost:${PORT}`)
})


