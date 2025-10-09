import { validationResult } from "express-validator";
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
    }
    async registration(req, res) {
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
        }
        catch (e) {
            console.error("Registration error:", e.message);
            res.status(e.statusCode || 400).json({
                message: e.message || "Registration error",
            });
        }
    }
    async login(req, res) {
        try {
            console.log("EEEEEEEEEEEEEEEEEEEEEE", this.authService);
            const result = await this.authService.login(req.body);
            console.log(result, "DDDDDDDDDDDDDDdd");
            return res.json(result);
        }
        catch (e) {
            console.error("Login error:", e.message);
            res.status(e.statusCode || 400).json({
                message: e.message || "Login error",
            });
        }
    }
}
export default AuthController;
