import { UserDTO, UserService } from '../shared';

export class LoginService {
  static async login(username: string, password: string): Promise<UserDTO> {
    return await UserService.findOne({
      username,
      password: UserService.encrypt(password),
    });
  }
}
