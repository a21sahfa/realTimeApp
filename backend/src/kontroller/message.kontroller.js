import User from "../modeller/user.modeller.js";
import Message from "../modeller/message.modeller.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";


export const getUsers = async (req, res) => {
    try {
        const logadInUserId = req.user._id;
        //hitta alla användare men hitta inte the currently logged in user. fetchar allt förutom lösen
        const filteredUsers = await User.find({_id: {$ne: logadInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("error i getUsers: ", error.message);
        res.status(500).json({error: "internal server error"});
    }
};

export const getMessages = async (req, res) =>{
try {
    const {id:userToChatId} = req.params;
    const minId = req.user._id;

    const messages = await Message.find({
        $or: [
            {senderId:minId, recieverId:userToChatId},
            {senderId:userToChatId, recieverId:minId}
        ]
    });
    res.status(200).json(messages);

} catch (error) {
    console.error("error i messageskontroller: ", error.message);
    res.status(500).json({error: "internal server error"});

}
};
import mongoose from "mongoose";
import { getMottagareSockerId } from "../lib/socket.js";

export const sendeMessage = async (req, res) => {
    try {
        const { text, bild } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        // Validate if recieverId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(recieverId)) {
            return res.status(400).json({ error: "Invalid reciever ID" });
        }

        let bildUrl;
        if (bild) {
            const uploadResponse = await cloudinary.uploader.upload(bild);
            bildUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,  // This is now validated to be a valid ObjectId
            text,
            bild: bildUrl,
        });

        await newMessage.save();
        res.status(201).json(newMessage);

        const mottagareSocketId = getMottagareSockerId(recieverId);
        if (mottagareSocketId){
            io.to(mottagareSocketId).emit("nyMessage", newMessage);
        }

    } catch (error) {
        console.error("error i sendMessagekontroller: ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};
