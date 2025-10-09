import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IAuthService, IAuthController } from "../types/userServiceTypes.js";

class AuthController implements IAuthController {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
    }

    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }
            const user = await this.authService.createUser(req.body);

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
            const result = await this.authService.login(req.body);

            return res.json(result);
        } catch (e: any) {
            console.error("Login error:", e.message);
            res.status(e.statusCode || 400).json({
                message: e.message || "Login error",
            });
        }
    }
}

export default AuthController;
