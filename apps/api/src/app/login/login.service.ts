import { UserDTO, UserService } from '../shared';

export class LoginService {
  static async login(username: string, password: string): Promise<UserDTO> {
    const pass = UserService.encrypt(password);
    console.log(password, pass);
    return await UserService.findOne({
      username,
      password: pass,
    });
  }
}
