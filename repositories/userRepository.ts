import mongoose from "mongoose";
import type { UserItem, UserModelType } from "../types/userServiceTypes.js";

class UserRepository {
    private userModel: UserModelType;

    constructor(userModel: UserModelType) {
        this.userModel = userModel;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.findOneByEmail = this.findOneByEmail.bind(this);
        this.getOne = this.getOne.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    async create(itemObject: UserItem) {
        const user = await this.userModel.create(itemObject);
        const { password, ...safe } = user.toObject();

        return safe;
    }

    async getAll() {
        return await this.userModel.find().lean();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email }).select("+password");
    }

    async getOne(id: string) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }

        return await this.userModel.findById(id).lean();
    }

    async updateStatus(id: string, isActive: boolean) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }

        return await this.userModel.findByIdAndUpdate(
            id,
            { isActive },
            { new: true },
        );
    }

    throwError(message: string) {
        const error = new Error(message);
        throw error;
    }
}

export default UserRepository;
