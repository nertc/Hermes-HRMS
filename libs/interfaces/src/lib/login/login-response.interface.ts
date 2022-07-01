import { UserStatus } from './user-status.enum';

export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}
