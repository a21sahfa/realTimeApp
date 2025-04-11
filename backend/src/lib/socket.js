import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export function getMottagareSockerId(userId) {
    return userSocketKarta[userId];
}
//används för att lagra online användare
const userSocketKarta = {};

io.on("connection", (socket) => {
    console.log("en användare anslutade", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketKarta[userId] = socket.id;

    //io.emit används för att skicka events till alla anslutade clienter
    io.emit("getAktivUsers", Object.keys(userSocketKarta));

    socket.on("disconnect", () => {
        console.log("en användare disconnected", socket.id);
        delete userSocketKarta[userId];
        io.emit("getAktivUsers", Object.keys(userSocketKarta));

      });
 });
export { io, app, server};