import { Request, Response } from "express";
import authService from "../services/authService.js";
import { validationResult } from "express-validator";


class AuthController {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }
            const user = await authService.createUser(req.body);

            return res.json({
                message: "Пользователь успешно зарегистрирован",
                user: { id: user._id, email: user.email },
            });
        } catch (e: any) {
            console.error("Registration error:", e.message);
            res.status(e.statusCode || 400).json({
                message: e.message || "Registration error",
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);

            return res.json(result);
        } catch (e: any) {
            console.error("Login error:", e.message);
            res.status(e.statusCode || 400).json({
                message: e.message || "Login error",
            });
        }
    }
}

export default new AuthController();
