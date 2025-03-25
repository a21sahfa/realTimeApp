import { generateToken } from "../lib/jwt.lib.js";
import User from "../modeller/user.modeller.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    //fångar data som användare skickar
    const{namn,email,password} = req.body;
    try{

        if (!namn || !email || !password){
            return res.status(400).json({ message: "alla fält måste vara iskriven"});
        };
        if (password.length < 6){
            return res.status(400).json({ message: "lösenordet måste vara minst 6 bokstäver"});
        };

        const user = await User.findOne({email});
        if (user) return res.status(400).json({ message: "Email existerar redan"});
        //hashar lösenord
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const nyUser = new User({
            namn,
            email,
            password: hashPassword
        });

        if(nyUser) {
            // generera json web token (JWT)
            generateToken(nyUser._id, res);
            await nyUser.save();

            res.status(201).json({
                _id:nyUser._id,
                namn:nyUser.namn,
                email:nyUser.email,
            });
        }else {
            res.status(400).json({ message: "invalid användare"});
        };

    }catch (error) {
        console.log("error i registerkontroller", error.message);
        res.status(500).json({message: "internal server error"});
    }
};

export const login = (req, res) => {
    res.send("login router");
};

export const logout = (req, res) => {
    res.send("logout router");
};