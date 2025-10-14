import mongoose from "mongoose";
import UserRepository from "../userRepository";
import type { UserItem, UserRole } from "../../types/userServiceTypes";

describe("UserRepository", () => {
    let userModelMock: any;
    let repo: UserRepository;

    beforeEach(() => {
        userModelMock = {
            create: jest.fn(),
            find: jest
                .fn()
                .mockReturnValue({ lean: jest.fn().mockResolvedValue([]) }),
            findOne: jest.fn().mockReturnValue({ select: jest.fn() }),
            findById: jest.fn().mockReturnValue({ lean: jest.fn() }),
            findByIdAndUpdate: jest.fn(),
        };

        repo = new UserRepository(userModelMock);
    });

    // create
    test("create() should call userModel.create and return safe object", async () => {
        const fakeUser = {
            toObject: () => ({
                fullName: "Full Name",
                role: 'user',
                email: "a@b.com",
                password: "123",
            }),
        };

        userModelMock.create.mockResolvedValue(fakeUser);

        const input: UserItem = {
            fullName: "Full Name",
            role: 'user',
            email: "a@b.com",
            password: "123",
        };

        const result = await repo.create(input);

        expect(userModelMock.create).toHaveBeenCalledWith(input);
        expect(result).toEqual({
            fullName: "Full Name",
            role: 'user',
            email: "a@b.com",
        });
    });

    //getAll
    test("getAll() should return all users", async () => {
        const fakeUsers = [{ email: "x@x.com" }];
        userModelMock.find.mockReturnValue({
            lean: jest.fn().mockResolvedValue(fakeUsers),
        });

        const result = await repo.getAll();

        expect(userModelMock.find).toHaveBeenCalled();
        expect(result).toEqual(fakeUsers);
    });

    // --- тест findOneByEmail ---
    test("findOneByEmail() should call findOne with email and select password", async () => {
        const selectMock = jest.fn();
        userModelMock.findOne.mockReturnValue({ select: selectMock });

        await repo.findOneByEmail("a@b.com");

        expect(userModelMock.findOne).toHaveBeenCalledWith({
            email: "a@b.com",
        });
        expect(selectMock).toHaveBeenCalledWith("+password");
    });

    // --- тест getOne: ошибка при невалидном id ---
    test("getOne() should throw error if id invalid", async () => {
        await expect(repo.getOne("bad_id")).rejects.toThrow("Не указан ID");
    });

    // --- тест updateStatus: успешный апдейт ---
    test("updateStatus() should call findByIdAndUpdate", async () => {
        const validId = new mongoose.Types.ObjectId().toString();
        userModelMock.findByIdAndUpdate.mockResolvedValue({
            id: validId,
            isActive: true,
        });

        const result = await repo.updateStatus(validId, true);

        expect(userModelMock.findByIdAndUpdate).toHaveBeenCalledWith(
            validId,
            { isActive: true },
            { new: true },
        );
        expect(result).toEqual({ id: validId, isActive: true });
    });

    // --- тест updateStatus: ошибка при невалидном id ---
    test("updateStatus() should throw error if id invalid", async () => {
        await expect(repo.updateStatus("bad", true)).rejects.toThrow(
            "Не указан ID",
        );
    });
});
