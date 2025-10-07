import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../config.js";

class AuthService {
    async createUser(body) {
        const { fullName, password, email, role, birthDate } = body;
        const candidate = await userRepository.findOneByEmail(email);

        if (candidate) {
            this.throwError("Пользователь с таким адресом уже существует");
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const user = await userRepository.create({
            fullName,
            password: hashPassword,
            role,
            email,
            birthDate,
        });

        return user;
    }

    async login(body) {
        const { email, password, fullName } = body;
        const user = await userRepository.findOneByEmail(email);

        if (!user) {
            this.throwError(`Пользователь ${email} не найден`);
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            this.throwError("Введен неверный пароль");
        }

        const token = this.generateAccessToken(user._id, user.role, user.email);

        return { token };
    }

    generateAccessToken(id, role, email) {
        const payload = {
            id,
            role,
            email
        };

        return jwt.sign(payload, secret, { expiresIn: "24h" });
    }

    verifyToken(token) {
        if (!token) {
            throw new Error("Token not provided");
        }

        try {
            const decoded = jwt.verify(token, secret);

            return decoded;
        } catch (err) {
            throw new Error("Invalid token");
        }
    }

    extractToken(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return null;
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        return token || null;
    }

    throwError(message, code = 400) {
        const error = new Error(message);
        error.statusCode = code;
        throw error;
    }
}

export default new AuthService();
