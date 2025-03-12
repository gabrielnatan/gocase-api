import express, { Request, Response } from "express";
import { GetUserUseCase } from "../../../../application/user/get/get-user.use-case.js";
import { UserRepository } from "../../../user/db/mongo/repository/user.repository.js";
import { UserModel } from "../../../user/db/mongo/model/user.model.js";
import { ListUserUseCase } from "../../../../application/user/list/list-user.use-case.js";
import { CreateUserUseCase } from "../../../../application/user/create/create-user.use-case.js";
import { UpdateUserUseCase } from "../../../../application/user/update/update-user.use-case.js";
import { DeleteUserUseCase } from "../../../../application/user/delete/delete-user.use-case.js";

const userRouter = express.Router();

const userRepository = new UserRepository(UserModel);
const getUserUseCase = new GetUserUseCase(userRepository);
const listUserUseCase = new ListUserUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const handleError = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await listUserUseCase.execute({user_id: req.user.id as string});
        res.json({ message: users });
    } catch (error) {
        handleError(res, error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserUseCase.execute({ id });
        res.json({ message: user });
    } catch (error) {
        handleError(res, error);
    }
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const userDTO = { first_name, last_name, email, password, role };
        const user = await createUserUseCase.execute(userDTO as any);
        res.status(201).json({ message: user });
    } catch (error) {
        handleError(res, error);
    }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, role } = req.body;
        const userDTO = { id, first_name, last_name, email, password, role };
        const user = await updateUserUseCase.execute(userDTO as any);
        res.json({ message: user });
    } catch (error) {
        handleError(res, error);
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await deleteUserUseCase.execute({ id });
        res.json({ message: user });
    } catch (error) {
        handleError(res, error);
    }
});

export { userRouter };
