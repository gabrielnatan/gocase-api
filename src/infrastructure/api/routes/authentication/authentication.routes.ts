import { Router, Request, Response } from "express";
import { LoginUseCase } from "../../../../application/authentication/login/login.use-case.js";
import { UserRepository } from "../../../user/db/mongo/repository/user.repository.js";
import { UserModel } from "../../../user/db/mongo/model/user.model.js";
import { AuthenticationRedis } from "../../../authentication/cache/redis/repository/redis.repository.js";
import { JsonWebToken } from "../../../../@sahred/infrastructure/token/jsonWebToken/index.js";
import { LogoutUseCase } from "../../../../application/authentication/logout/logout.use-case.js";
import { authenticateToken } from "../../../../@sahred/infrastructure/middleware/verify-token.middleware.js";

const authenticationRouter = Router()

const handleError = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};

const userRepository = new UserRepository(UserModel)
const authenticationCache = new AuthenticationRedis()
const sessionToken = new JsonWebToken()

const loginUseCase = new LoginUseCase(userRepository, authenticationCache, sessionToken)
const logoutUseCase = new LogoutUseCase(authenticationCache)

authenticationRouter.post("/login",async(req:Request, res:Response)=>{
    const { email, password } = req.body
    try {
        const response = await loginUseCase.execute({
            email,
            password
        })

        res.json(response)
    } catch (error) {
        handleError(res, error);
    }
})


authenticationRouter.get("/logout",authenticateToken,async(req:Request, res:Response)=>{
    const { authentication_id } = req.user
    try {
        if(!authentication_id){
            throw new Error('Algo deu erado')
        }
        const response = await logoutUseCase.execute( {id:authentication_id})
        res.json(response)
    } catch (error) {
        handleError(res, error);
    }
})


export { authenticationRouter }