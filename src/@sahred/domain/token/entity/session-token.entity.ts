import { UserRole } from "../../../../application/user/common/user-output.js";

export abstract class SessionToken {
  abstract sign(data: object, secret: string, option?: object): Promise<string>;
  abstract verify(
    token: string,
    secret: string
  ): Promise<{   
      id: string;
      email?: string;
      role: UserRole;
    }>;
}
