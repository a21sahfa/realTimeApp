import express from "express";
import dotenv from "dotenv";
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



/**
 * The `syncDatabase` function synchronizes database models by either creating new tables or recreating
 * all tables based on the `force` option.
 */
//sconnects the mysql library
const syncDatabase = async() => {
    try {
        console.log("Database Models sync started....")
        await MySQLConnector.sync({
            force: true // true value will delete all tables and recreate while false will only create the new one
        })
        console.log("Database Models Synced")
    } catch (err) {
        console.log(err.message ? err.message : err)
    }
}

//runs server
server.listen (PORT,async() => {
    console.log("server is running on PORT:" + PORT);
    await syncDatabase()
});