import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";

export type UserRole = "admin" | "user" | undefined;

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
