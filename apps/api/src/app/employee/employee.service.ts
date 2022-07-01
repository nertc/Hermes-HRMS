import { UserDTO, UserService } from '../shared';

export class EmployeeService {
  static async getList(): Promise<UserDTO[]> {
    return UserService.getAll();
  }
}
