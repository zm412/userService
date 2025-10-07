import authService from "../services/authService.js";

class AuthMiddleware {
    authenticate(req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = authService.extractToken(req);

            if (!token) {
                return res
                    .status(403)
                    .json({ message: "Пользователь не авторизован" });
            }

            const decodedData = authService.verifyToken(token);
            req.user = decodedData;
            next();
        } catch (e) {
            console.log(e);
            return res
                .status(403)
                .json({ message: "Пользователь не авторизован" });
        }
    }

    roles(roles) {
        return function (req, res, next) {
            if (req.method === "OPTIONS") {
                next();
            }

            try {
                const token = authService.extractToken(req);

                if (!token) {
                    return res
                        .status(403)
                        .json({ message: "Пользователь не авторизован" });
                }

                const { role } = authService.verifyToken(token);

                let hasRole = false;
                console.log(roles, 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBb')
                if (roles.includes(role)) {
                    hasRole = true;
                }

                if (!hasRole) {
                    return res
                        .status(403)
                        .json({ message: "У вас нет доступа" });
                }

                next();
            } catch (e) {
                console.log(e);

                return res
                    .status(403)
                    .json({ message: "Пользователь не авторизован" });
            }
        }
    }
}

export default new AuthMiddleware();
