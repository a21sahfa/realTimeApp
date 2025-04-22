import User from "../modeller/user.modeller.js";
import Message from "../modeller/message.modeller.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import { getMottagareSockerId } from "../lib/socket.js";
import db from "../lib/mysql.js";



export const getUsers = (req, res) => {
    try {
      const loggedInUserId = req.user.id;
  // 
      const query = "SELECT id, namn, email, profilBild FROM users WHERE id != ?";
      db.query(query, [loggedInUserId], (err, results) => {
        if (err) {
          console.error("Error fetching users:", err.message);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        res.status(200).json(results);
      });
    } catch (error) {
      console.error("error in getUsers:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  

  export const getMessages = (req, res) => {
    try {
      const userToChatId = req.params.id;
      const currentUserId = req.user.id;
  
      const query = `
        SELECT * FROM messages 
        WHERE 
          (senderId = ? AND recieverId = ?) 
          OR 
          (senderId = ? AND recieverId = ?)
        ORDER BY createdAt ASC
      `;
  
      db.query(query, [currentUserId, userToChatId, userToChatId, currentUserId], (err, results) => {
        if (err) {
          console.error("Error fetching messages:", err.message);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        res.status(200).json(results);
      });
    } catch (error) {
      console.error("error in getMessages:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
export const sendeMessage = async (req, res) => {
    try {
      const { text, bild } = req.body;
      const { id: recieverId } = req.params;
      const senderId = req.user.id; // MySQL ID (number)
  
      // Validate receiverId as number
      if (isNaN(recieverId)) {
        return res.status(400).json({ error: "Invalid recieverId" });
      }
  
      let bildUrl = null;
      if (bild) {
        const uploadResponse = await cloudinary.uploader.upload(bild);
        bildUrl = uploadResponse.secure_url;
      }
  
      const sql = "INSERT INTO messages (senderId, recieverId, text, bild, createdAt) VALUES (?, ?, ?, ?, NOW())";
      const values = [senderId, recieverId, text, bildUrl];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("DB error:", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        const newMessage = {
          id: result.insertId,
          senderId,
          recieverId,
          text,
          bild: bildUrl,
          createdAt: new Date(),
        };
  
        res.status(201).json(newMessage);

        
  
        const mottagareSocketId = getMottagareSockerId(recieverId);
        if (mottagareSocketId) {
          io.to(mottagareSocketId).emit("nyMessage", newMessage);
        }
      });
    } catch (error) {
      console.error("Error in sendeMessage:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  