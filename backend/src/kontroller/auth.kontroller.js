import { generateToken } from "../lib/jwt.lib.js";
import User from "../modeller/user.modeller.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import db from "../lib/mysql.js";

export const register = async (req, res) => {
    const { namn, email, password } = req.body; //getting namn ... from user 

    if (!namn || !email || !password) { //is it filled or empty
        return res.status(400).json({ message: "alla fält måste vara iskriven" });
    }

    // Check if email exists in MySQL
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => { //gets the user ifemail exists
        if (err) return res.status(500).json({ message: "Error checking email" });

        if (results.length > 0) {
            return res.status(400).json({ message: "Email existerar redan" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Insert new user into MySQL
        db.query('INSERT INTO users (namn, email, password) VALUES (?, ?, ?)', //registers the user 
            [namn, email, hashPassword], (err, result) => {
                if (err) return res.status(500).json({ message: "Error saving user" });

                const newUser = { _id: result.insertId, namn, email };
                generateToken(newUser._id, res);
                res.status(201).json(newUser);
            });
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: "invalid credentials" });

        const user = results[0];
        const isPassCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPassCorrect) return res.status(400).json({ message: "invalid credentials" });

        //my variables
        generateToken(user.id, res);
        res.status(200).json({
            _id: user.id,
            namn: user.namn,
            email: user.email,
            profilBild: user.profilBild,
        });
    });
};


export const logout = (req, res) => {
try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({message: "loggades ut"});

} catch (error) {
    console.log("error in logout kontroller", error.message);
    res.status(500).json({message: "internal server error"});
}
};

export const updateraBild = async (req, res) => {
    try {
        const { profilBild } = req.body;
        const userId = req.user._id;

        if (!profilBild) {
            return res.status(400).json({ message: "behöver en profilbild" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilBild);

        db.query('UPDATE users SET profilBild = ? WHERE id = ?', 
            [uploadResponse.secure_url, userId], (err, result) => {
                if (err) return res.status(500).json({ message: "Error updating profile image" });

                res.status(200).json({ message: "Profile updated", profilBild: uploadResponse.secure_url });
            });
    } catch (error) {
        console.log("error i update profile:", error);
        res.status(500).json({ message: "internal server error" });
    }
};


//checks if user is correkt 
export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error){
        console.log("error in checkauth kontroller", error.message);
        res.status(500).json({message: "internal server error"});    
    }
}