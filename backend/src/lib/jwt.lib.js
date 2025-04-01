import jwt from "jsonwebtoken";
//funktion som genererar jwt token
export const generateToken= (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_HEMLIG, {
        expiresIn:"7d"
    });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //förebygger xxs attack 
        samesite: "strict", //förebyger csrf attck 
        secure: process.env.NODE_ENV !== "development" //kommer vara falsk eftersom vi är i development
    });

    return token;
}