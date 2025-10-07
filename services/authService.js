import userRepository from "../repositories/userRepository.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {secret} from "../config.js";
console.log(secret, 'SSSSSSSSSSSS')

class AuthService {
    async createUser(body) {
        const { fullName, password,  email, role } = body;
        const candidate = await userRepository.findOneByEmail(email);
        console.log(candidate, "CCCCCCCCCCCCCCCCCccc");

        if (candidate) {
            const error = new Error(
                "Пользователь с таким адресом уже существует",
            );
            error.statusCode = 400;
            throw error;
        }

        const hashPassword = await bcrypt.hash(password, 7);

        const user = await userRepository.create({
            fullName,
            password: hashPassword,
            role,
            email,
        });

        return user;
    }

    async login(body) {
        const { email, password, fullName } = body;
        const user = await userRepository.findOneByEmail(email);

        if (!user) {
            const error = new Error(`Пользователь ${username} не найден`);
            error.statusCode = 400;

            throw error;
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            const error = new Error("Введен неверный пароль");
            error.statusCode = 400;

            throw error;
        }

        const token = this.generateAccessToken(user._id, user.role);

        return { token };
    }

    generateAccessToken(id, role) {
        const payload = {
            id,
            role,
        };

        return jwt.sign(payload, secret, { expiresIn: "24h" });
    }

    verifyToken(token) {
        if (!token) {
            throw new Error("Token not provided");
        }

        try {
            const decoded = jwt.verify(token, secret);
        console.log(decoded, 'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt')

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

        const parts = authHeader.split(" ");

        return parts.length === 2 ? parts[1] : null;
    }
}

export default new AuthService();
