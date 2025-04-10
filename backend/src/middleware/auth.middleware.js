import jwt from "jsonwebtoken";
import User from "../modeller/user.modeller.js";

export const skyddRoute = async (req,res,next) => {
    try {
        const token2 = req.cookies.token;

        if(!token2){
            return res.status(401).json({ message: "Obehörig - ingen token angiven"});
        }

        const decoded = jwt.verify(token2, process.env.JWT_HEMLIG);

        if (!decoded){
            return res.status(401).json({ message: "Obehörig – ogiltig token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({ message: "användare hittades inte"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error i skyddRoute middleware: ", error.message);
        return res.status(500).json({ message: "internal server error"});

    }
}