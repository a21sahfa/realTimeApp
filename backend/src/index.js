import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/databas.js";
import cookieParser from "cookie-parser";


import authRouter from "./router/auth.router.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//för att kunna fånga användarinfo
app.use(express.json());
app.use(cookieParser());

app.use ("/api/auth", authRouter);

app.listen (PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});