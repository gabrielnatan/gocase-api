
import jwt from 'jsonwebtoken';
import { SessionToken } from '../../../domain/token/entity/session-token.entity.js';
import { UserRole } from '../../../../application/user/common/user-output.js';

export class JsonWebToken implements SessionToken {
  async sign(
    data: object,
    secret: string,
    option?: jwt.SignOptions
  ): Promise<string> {
    return jwt.sign(data, secret, option);
  }

  async verify(
    token: string
  ): Promise<{
    id: string;
    email?: string;
    role: UserRole;
  }> {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.tenant_id,
      };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
