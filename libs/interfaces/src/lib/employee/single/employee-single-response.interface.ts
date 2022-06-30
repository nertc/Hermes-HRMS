import { UserStatus } from '../../login';

export interface EmployeeSingleResponse {
  id: number;
  fullname: string;
  role: UserStatus;
  total: number;
  leave: {
    from: number;
    to: number;
  };
  working: number;
  salary: number;
  currency: string;
  attandence: boolean;
  phone: string;
}
