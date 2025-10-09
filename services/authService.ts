import { Request } from "express";
import {
    TokenPayload,
    RegistrationBody,
    LoginBody,
    UserRole,
    IAuthService,
    IUserRepository,
} from "../types/userServiceTypes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../config.js";

class AuthService implements IAuthService {
    private userRepository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.userRepository = repository;
        this.createUser = this.createUser.bind(this);
        this.login = this.login.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
        this.extractToken = this.extractToken.bind(this);
    }

    async createUser(body: RegistrationBody) {
        const { fullName, password, email, role, birthDate } = body;
        const candidate = await this.userRepository.findOneByEmail(email);

        if (candidate) {
            this.throwError("Пользователь с таким адресом уже существует");
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const user = await this.userRepository.create({
            fullName,
            password: hashPassword,
            role,
            email,
            birthDate,
        });

        return user;
    }

    async login(body: LoginBody) {
        const { email, password } = body;
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            this.throwError(`Пользователь ${email} не найден`);

            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            this.throwError("Введен неверный пароль");

            return;
        }

        const token = this.generateAccessToken(
            user._id.toString(),
            user.role,
            user.email,
        );

        return { token };
    }

    generateAccessToken(id: string, role: UserRole, email: string) {
        const payload = {
            id,
            role,
            email,
        };

        return jwt.sign(payload, secret, { expiresIn: "24h" });
    }

    verifyToken(token: string): TokenPayload {
        if (!token) {
            throw new Error("Token not provided");
        }

        try {
            const decoded = jwt.verify(token, secret);

            if (typeof decoded === "string") {
                throw new Error("Invalid token format");
            }

            return decoded as TokenPayload;
        } catch (err) {
            throw new Error("Invalid token");
        }
    }

    extractToken(req: Request) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return null;
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        return token || null;
    }

    throwError(message: string, code: number = 400): never {
        const error = new Error(message) as Error & { statusCode?: number };
        error.statusCode = code;
        throw error;
    }
}

export default AuthService;
