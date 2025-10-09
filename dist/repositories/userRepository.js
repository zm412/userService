import mongoose from "mongoose";
class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.findOneByEmail = this.findOneByEmail.bind(this);
        this.getOne = this.getOne.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }
    async create(itemObject) {
        const user = await this.userModel.create(itemObject);
        const { password, ...safe } = user.toObject();
        return safe;
    }
    async getAll() {
        return await this.userModel.find().lean();
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email }).select("+password");
    }
    async getOne(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }
        return await this.userModel.findById(id).lean();
    }
    async updateStatus(id, isActive) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }
        return await this.userModel.findByIdAndUpdate(id, { isActive }, { new: true });
    }
    throwError(message) {
        const error = new Error(message);
        throw error;
    }
}
export default UserRepository;
