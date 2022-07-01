import { FilterQuery, UpdateQuery } from 'mongoose';
import { UserDTO } from './models/user-dto.interface';
import { IUser, UserModel } from './models/user.schema';
import * as sha256 from 'sha256';
import { UserPartialDTO } from './models';

export class UserService {
  static async getAll(): Promise<UserDTO[]> {
    const users = await UserModel.find().catch(console.log);
    return (users || []).map((user) => ({
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      attandence: user.attandence,
      leave: user.leave,
      username: user.username,
      password: user.password,
      phone: user.phone,
      salary: user.salary,
      status: user.status,
      total: user.total,
      working: user.working,
    }));
  }

  static async getOne(id: string): Promise<UserDTO> {
    const user = await UserModel.findById(id).catch(console.log);
    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      attandence: user.attandence,
      leave: user.leave,
      username: user.username,
      password: user.password,
      phone: user.phone,
      salary: user.salary,
      status: user.status,
      total: user.total,
      working: user.working,
    };
  }

  static async findOne(filter: FilterQuery<IUser>): Promise<UserDTO> {
    const user = await UserModel.findOne(filter).catch(console.log);
    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      attandence: user.attandence,
      leave: user.leave,
      username: user.username,
      password: user.password,
      phone: user.phone,
      salary: user.salary,
      status: user.status,
      total: user.total,
      working: user.working,
    };
  }

  static async create(user: UserPartialDTO): Promise<UserDTO> {
    const newUser = await UserModel.create({
      ...user,
      password: this.encrypt(user.password),
    }).catch(console.log);
    if (newUser) {
      return {
        id: newUser._id.toString(),
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        attandence: newUser.attandence,
        leave: newUser.leave,
        username: newUser.username,
        password: newUser.password,
        phone: newUser.phone,
        salary: newUser.salary,
        status: newUser.status,
        total: newUser.total,
        working: newUser.working,
      };
    }
    return null;
  }

  static async delete(id: string): Promise<boolean> {
    const deletedUser = await UserModel.findByIdAndDelete(id).catch(
      console.log
    );
    return !!deletedUser;
  }

  static async update(id: string, user: UpdateQuery<IUser>): Promise<UserDTO> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user).catch(
      console.log
    );
    if (!updatedUser) {
      return null;
    }
    return {
      id: updatedUser._id.toString(),
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      attandence: updatedUser.attandence,
      leave: updatedUser.leave,
      username: updatedUser.username,
      password: updatedUser.password,
      phone: updatedUser.phone,
      salary: updatedUser.salary,
      status: updatedUser.status,
      total: updatedUser.total,
      working: updatedUser.working,
    };
  }

  static encrypt(password: string): string {
    return sha256(password);
  }
}
