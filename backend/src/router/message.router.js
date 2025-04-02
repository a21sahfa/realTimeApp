import express from "express";
import { skyddRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsers, sendeMessage } from "../kontroller/message.kontroller.js";


const router = express.Router();

//så att inte alla kan kalla på funktionen utan bara när du är autentiserad
router.get("/Users", skyddRoute, getUsers);
router.get("/:id", skyddRoute, getMessages);

router.post("/send/:id", skyddRoute, sendeMessage);


export default router;
