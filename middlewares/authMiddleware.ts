import { Response, NextFunction } from "express";
import authService from "../services/authService.js";
import { UserRole, AuthRequest } from "../types/userServiceTypes.js";

class AuthMiddleware {
    authenticate(req: AuthRequest, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") return next();

        try {
            const token = authService.extractToken(req);
            if (!token)
                return res.status(403).json({ message: "Не авторизован" });

            req.user = authService.verifyToken(token);
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

            if (req.user.role !== "admin" && req.user.id.toString() !== targetId) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            next();
        };
    }
}

export default new AuthMiddleware();
