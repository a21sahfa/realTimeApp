import jwt from "jsonwebtoken";
import User from "../modeller/user.modeller.js";

export const skyddRoute = async (req,res,next) => {
    try {
        const token2 = req.cookies.token;

        if(!token2){
            return res.status(401).json({ message: "unauthorized - no token provided"});
        }

        const decoded = jwt.verify(token2, process.env.JWT_HEMLIG);

        if (!decoded){
            return res.status(401).json({ message: "unauthorized - token invalid"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({ message: "user not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in skyddRoute middleware: ", error.message);
        return res.status(500).json({ message: "internal server error"});

    }
}