import { UserStatus } from '@hermes/interfaces';

export interface EmployeeItem {
  id: string;
  fullname: string;
  role: UserStatus;
  total: number;
  leave?: {
    from: Date;
    to: Date;
  };
  working: number;
  salary: number;
  currency: string;
  attandence: boolean;
  phone: string;
}
