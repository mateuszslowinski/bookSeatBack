import express from "express";
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from "cors";
import {handleError} from "./utils/error";
import {database} from "./config/mongoDb";
import {userRouter} from "./routes/user.route";
import {restaurantRouter} from "./routes/restaurant.route";

dotenv.config();
export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json());


app.use('/api', userRouter);
app.use('/api/restaurants', restaurantRouter);

app.use(handleError);

const PORT = Number(process.env.PORT);

app.listen(PORT, '0.0.0.0',async () => {
    console.log(`Listing on http://localhost:${PORT}`)

    await database();
})


