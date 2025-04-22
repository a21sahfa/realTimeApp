import jwt from "jsonwebtoken";
import User from "../modeller/user.modeller.js";
import db from "../lib/mysql.js";

export const skyddRoute = (req, res, next) => {
    try {
      const token2 = req.cookies.token;
  
      if (!token2) {
        return res.status(401).json({ message: "Unauthorized - no token provided" });
      }
  
      const decoded = jwt.verify(token2, process.env.JWT_HEMLIG);
  
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized – invalid token" });
      }
  
      db.query("SELECT id, namn, email, profilBild FROM users WHERE id = ?", [decoded.userId], (err, results) => {
        if (err) {
          console.log("DB error in skyddRoute:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
  
        req.user = results[0];
        next();
      });
  
    } catch (error) {
      console.log("Error i skyddRoute middleware:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  