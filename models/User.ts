import mongoose from "mongoose";
import type { IUser } from "../types/userServiceTypes.js";

const UserSchema = new mongoose.Schema<IUser>(
    {
        fullName: { type: String, required: true },
        birthDate: { type: Date, required: false },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
