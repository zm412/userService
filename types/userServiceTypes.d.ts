import { Request, Response, NextFunction } from "express";
import mongoose, { Model, Document, ObjectId } from "mongoose";

// --- Mongoose Document Interface (for non-lean results) ---
export interface IUser {
    _id: ObjectId;
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    birthDate?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// --- Mongoose Model Type (for the Repository constructor) ---
export type UserModelType = Model<IUser>;

// --- Safe/Lean User Type (for API responses and lean repository results) ---
export type SafeUser = Omit<IUser, "password">;

export type UserRole = "admin" | "user" | undefined;

interface IUserModel {
    create(itemObject: UserItem): Promise<any>; // Mongoose create returns a Mongoose document
    find(): { lean(): Promise<IUser[]> }; // Simplified for .find().lean()
    findOne(query: any): { select(fields: string): Promise<IUser | null> };
    findById(id: string): { lean(): Promise<IUser | null> };
    findByIdAndUpdate(
        id: string,
        update: any,
        options: { new: boolean },
    ): Promise<IUser | null>;
}

export interface IAuthService {
    // Methods related to business logic
    createUser(body: RegistrationBody): Promise<SafeUser>; // Returns the created user (safe)
    login(body: LoginBody): Promise<{ token: string }>; // Returns an object containing the JWT token

    // Utility Methods
    generateAccessToken(id: string, role: UserRole, email: string): string;
    verifyToken(token: string): TokenPayload;
    extractToken(req: Request): string | null;
    throwError(message: string, code?: number): void;
}

export interface IUserRepository {
    create(itemObject: UserItem): Promise<SafeUser>;
    // .lean() is used, returning a simple array of IUser objects.
    getAll(): Promise<IUser[]>;
    // findOne can return null if no user is found.
    findOneByEmail(email: string): Promise<IUser | null>;
    // findById().lean() can return null
    getOne(id: string): Promise<IUser | null>;
    // findByIdAndUpdate can return null if the ID is not found.
    // IMPORTANT: It MUST be a Promise, and the Promise resolves to IUser or null.
    updateStatus(id: string, isActive: boolean): Promise<IUser | null>;
    // a function that always throws returns 'never'
    throwError(message: string): void;

    //new (userModel: IUserReopsitory)
}

export interface IUserService {
    // 1. Must be async and return a Promise.
    // 2. The result can be SafeUser OR null if the user is not found.
    getUserById(targetId: string): Promise<SafeUser | null>;

    // 1. Must be async and return a Promise of the array.
    listUsers(): Promise<SafeUser[]>;

    // 1. Must be async and return a Promise.
    // 2. The result is the updated SafeUser object.
    blockUser(id: string): Promise<SafeUser>;

    // 1. The input 'user' can be IUser | null (from the repository).
    // 2. The return can be SafeUser OR null.
    sanitize(user: IUser | null): SafeUser | null;

    // 3. You should also add the constructor signature for completeness (optional but helpful)
    // new (repository: IUserRepository): IUserService;
}

export interface IAuthController {
    registration(req: Request, res: Response): Promise<Response | void>;
    login(req: Request, res: Response): Promise<Response | void>;

    // Note: The return type is typically a Promise<Response | void>
    // because Express route handlers either send a response (Response)
    // or call next() (void/Promise<void> if async).
}

export interface IUserController {
    getUsers(reg: Request, res: Response): Promise<Response | void>;
    getUser(reg: Request, res: Response): Promise<Response | void>;
    blockUser(reg: Request, res: Response): Promise<Response | void>;

}

export interface UserItem {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    birthDate?: string;
    isActive?: boolean;
}

export interface TokenPayload {
    id: string;
    role: "admin" | "user";
    email: string;
}

export interface AuthUser {
    id: string;
    role: "admin" | "user";
    email: string;
}

export interface AuthRequest extends Request {
    user?: AuthUser;
}

export interface RegistrationBody {
    fullName: string;
    email: string;
    password: string;
    role?: "admin" | "user";
    birthDate: string;
}

export interface LoginBody {
    email: string;
    password: string;
}
