import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationRedis } from "../../../infrastructure/authentication/cache/redis/repository/redis.repository.js";

const authenticationRedis = new AuthenticationRedis();

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    (async () => {
        try {
            req.user = req.user || { id: null, authentication_id: null, email: undefined, role: undefined };

            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
            }

            const token = authHeader.split(" ")[1]; 
            
            const secret = process.env.JWT_SECRET || "default_secret";
            const decoded = jwt.verify(token, secret) as { id: string };

            if (!decoded || !decoded.id) {
                return res.status(403).json({ message: "Token inválido." });
            }

            const session = await authenticationRedis.get(decoded.id);
            if (!session || session.access_token !== token) {
                return res.status(403).json({ message: "Sessão expirada. Faça login novamente." });
            }

            req.user = {
                id: session.user_id || null,
                authentication_id: session.id || null,
            };

            next(); 
        } catch (error) {
            next(error); 
        }
    })();
}
