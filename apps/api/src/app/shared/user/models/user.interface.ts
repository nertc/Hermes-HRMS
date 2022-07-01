import { UserStatus } from '@hermes/interfaces';

export interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  status: UserStatus;
  salary: number;
  phone: string;
  total: number;
  leave: {
    from: number;
    to: number;
  };
  working: number;
  attandence: boolean;
}
