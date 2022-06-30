import { UserStatus } from './user-status.enum';

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  status: UserStatus;
}
