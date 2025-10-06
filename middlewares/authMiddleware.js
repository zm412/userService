import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
        return res.status(401).json({ message: "No token" });

    try {
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
