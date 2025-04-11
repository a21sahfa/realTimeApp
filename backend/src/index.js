import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/databas.js";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRouter from "./router/auth.router.js";
import messageRouter from "./router/message.router.js";
import { app, server } from "./lib/socket.js";
 


dotenv.config();
const PORT = process.env.PORT;

//för att kunna fånga användarinfo
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials :true
})
);

app.use ("/api/auth", authRouter);
app.use ("/api/message", messageRouter);


server.listen (PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});