import { User } from "../../../domain/user/entity/user.entity.js";

export type UserRole = 'admin' | 'user'

export type UserOutput = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    const { 
      id,
      first_name,
      last_name,
      email,
      role,
      created_at,
      updated_at,
      deleted_at,
     } = entity.toJSON();
    return {
      id: id.id,
      first_name,
      last_name,
      email,
      role,
      deleted_at,
      updated_at,
      created_at,
    };
  }
}
