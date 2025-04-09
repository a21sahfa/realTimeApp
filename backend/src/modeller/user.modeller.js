import { kMaxLength } from "buffer";
import mongoose from "mongoose";
import { type } from "os";
//vilka fält en användare ska ha
const userInfo = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    namn: {
        type: String,
        required: true,           
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    profilBild: {
        type: String,
        default: "",
      },
},
{ timestamps: true }
);

const User = mongoose.model("User", userInfo);
//exporterar den så att vi kan använda den i olika filer
export default User;