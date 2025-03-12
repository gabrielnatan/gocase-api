import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Uuid } from '../../../../../@sahred/domain/value-object/uuid/uuid.entity.js';

type Role = 'admin' | 'user';

export interface IUser extends Document {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  id: { 
    type: String, 
    required: true, 
    unique: true,
    default: new Uuid().id,
    validate: {
      validator: function(v: string) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
      },
      message: (props) => `${props.value} não é um UUID válido!`
    }
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  'User',
  UserSchema
);
