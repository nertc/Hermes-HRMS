import {
  EmployeePostRequest,
  EmployeePutRequest,
  UserStatus,
} from '@hermes/interfaces';
import { UpdateQuery } from 'mongoose';
import { IUser, UserDTO, UserPartialDTO, UserService } from '../shared';

export class EmployeeService {
  static async getList(): Promise<UserDTO[]> {
    const users = await UserService.getAll();
    const respUsers = users.map((user) => {
      user.salary *= user.working;
      return user;
    });
    return respUsers;
  }

  static async delete(id: string): Promise<boolean> {
    return await UserService.delete(id);
  }

  static async update(id: string, user: EmployeePutRequest): Promise<UserDTO> {
    const queryUpdate: UpdateQuery<IUser> = Object.getOwnPropertyNames(
      user
    ).reduce((acc, cur) => {
      if (cur === 'currency') {
        return acc;
      }
      let accname = cur;
      if (cur === 'role') {
        accname = 'status';
      }
      acc[accname] = user[cur];
      return acc;
    }, {} as UpdateQuery<IUser>);
    const respUser = await UserService.update(id, queryUpdate);
    respUser.salary *= respUser.working;
    return respUser;
  }

  static async create(user: EmployeePostRequest): Promise<UserDTO> {
    const newUser: UserPartialDTO = {
      attandence: false,
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.firstName + user.lastName,
      password: '123456',
      phone: user.phone,
      salary: user.salary,
      status: UserStatus.EMPLOYEE,
      total: 0,
      working: 0,
    };
    return await UserService.create(newUser);
  }
}
