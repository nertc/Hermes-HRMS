import { Model, model, Schema } from 'mongoose';
import { User } from './user.interface';

export interface IUser extends User, Document {}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  status: { type: Number, required: true },
  salary: { type: Number, required: true },
  phone: { type: String, required: true },
  total: { type: Number, required: true },
  leave: {
    type: {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
    },
    required: false,
  },
  working: { type: Number, required: true },
  attandence: { type: Boolean, required: true },
});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
