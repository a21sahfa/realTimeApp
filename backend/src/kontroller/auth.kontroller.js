import { generateToken } from "../lib/jwt.lib.js";
import User from "../modeller/user.modeller.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

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

export const login = async (req, res) => {
    const{ email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if (!user)  {
            return res.status(400).json({message:"invalid credentials"});
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if(!isPassCorrect) {
            return res.status(400).json({message:"invalid credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            namn:user.namn,
            email:user.email,            
        })
        
    } catch (error) {
        console.log("error in login kontroller", error.message);
        res.status(500).json({message: "internal server error"});

    }
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

export const updateraBild = async(req, res) => {
    try {
        const {profilBild} = req.body;
        const userId = req.user._id;

        if(!profilBild){
            return res.status(400).json({message:"behöver en profilbild"});

        }

        const uploadResponse = await cloudinary.uploader.upload(profilBild);
        const updateradUser = await User.findByIDAndUpdate(userId, {profilBild:uploadResponse.secure_url}, {new:true});

        res.status(500).json(updateradUser);


    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({message: "internal server error"});
    }
};

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error){
        console.log("error in checkauth kontroller", error.message);
        res.status(500).json({message: "internal server error"});    
    }
}