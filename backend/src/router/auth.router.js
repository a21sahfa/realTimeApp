import express from "express";
import { updateraBild, checkAuth, login, logout, register } from "../kontroller/auth.kontroller.js";
import { skyddRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.put("/updaterabild", skyddRoute, updateraBild);

router.get("/check", skyddRoute, checkAuth);

export default router;
 