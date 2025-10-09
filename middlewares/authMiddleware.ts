import { Response, NextFunction } from "express";
import {
    UserRole,
    AuthRequest,
    IAuthService,
} from "../types/userServiceTypes.js";

class AuthMiddleware {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
        this.authenticate = this.authenticate.bind(this);
        this.requireRole = this.requireRole.bind(this);
        this.requireSelfOrAdmin = this.requireSelfOrAdmin.bind(this);
    }

    authenticate(req: AuthRequest, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") return next();

        try {
            const token = this.authService.extractToken(req);
            if (!token)
                return res.status(403).json({ message: "Не авторизован" });

            req.user = this.authService.verifyToken(token);
            next();
        } catch (e) {
            console.error(e);
            return res.status(403).json({ message: "Не авторизован" });
        }
    }

    requireRole(roles: UserRole[]) {
        return function (req: AuthRequest, res: Response, next: NextFunction) {
            if (!req.user)
                return res.status(403).json({ message: "Не авторизован" });

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            next();
        };
    }

    requireSelfOrAdmin(idParam = "id") {
        return function (req: AuthRequest, res: Response, next: NextFunction) {
            if (!req.user)
                return res.status(403).json({ message: "Не авторизован" });

            const targetId = req.params[idParam];

            if (
                req.user.role !== "admin" &&
                req.user.id.toString() !== targetId
            ) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            next();
        };
    }
}

export default AuthMiddleware;
