import express from "express";
import AuthController from "../controllers/AuthController.js";
import {authenticate} from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export default authRouter;
