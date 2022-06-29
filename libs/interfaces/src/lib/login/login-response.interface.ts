import { UserStatus } from './user-status.enum';

export interface LoginResponse {
  firstName: string;
  lastName: string;
  status: UserStatus;
}
