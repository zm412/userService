import express from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";
//import {authenticate} from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/registration', [
    check('fullName', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], authController.registration)


authRouter.post("/login", authController.login);

export default authRouter;
