class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
        this.authenticate = this.authenticate.bind(this);
        this.requireRole = this.requireRole.bind(this);
        this.requireSelfOrAdmin = this.requireSelfOrAdmin.bind(this);
    }
    authenticate(req, res, next) {
        if (req.method === "OPTIONS")
            return next();
        try {
            const token = this.authService.extractToken(req);
            if (!token)
                return res.status(403).json({ message: "Не авторизован" });
            req.user = this.authService.verifyToken(token);
            next();
        }
        catch (e) {
            console.error(e);
            return res.status(403).json({ message: "Не авторизован" });
        }
    }
    requireRole(roles) {
        return function (req, res, next) {
            if (!req.user)
                return res.status(403).json({ message: "Не авторизован" });
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            next();
        };
    }
    requireSelfOrAdmin(idParam = "id") {
        return function (req, res, next) {
            if (!req.user)
                return res.status(403).json({ message: "Не авторизован" });
            const targetId = req.params[idParam];
            if (req.user.role !== "admin" &&
                req.user.id.toString() !== targetId) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            next();
        };
    }
}
export default AuthMiddleware;
