import { kMaxLength } from "buffer";
import mongoose from "mongoose";
import { type } from "os";
const userinfo = new mongoose.info(
{
    email: {
        type: string,
        required: true,
        unique: true,  
    },
    namn: {
        type: string,
        required: true,           
    },
    password: {
        type: string,
        required: true,
        minlength: 6,
    },
},
{ Timestamp: true }
);