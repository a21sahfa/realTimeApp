import mongoose from "mongoose";
import test from "node:test";
import { type } from "os";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        bild: {
            type: String,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;