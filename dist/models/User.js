import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
const User = mongoose.model("User", UserSchema);
export default User;
