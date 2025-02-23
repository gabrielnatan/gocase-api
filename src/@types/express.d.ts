import { UserRole } from "../application/user/common/user-output.ts";

export {};

declare global {
  namespace Express {
    export interface Request {
      user: {
        id?: string | null;
        authentication_id?: string | null;
      };
    }
  }
}
