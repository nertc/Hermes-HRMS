import {
  EmployeeListResponse,
  EmployeeSingleResponse,
  ErrorMessage,
} from '@hermes/interfaces';
import { Response, Router } from 'express';
import { EmployeeService } from './employee.service';

const router = Router();

router.get(
  '',
  async (req, res: Response<EmployeeListResponse | ErrorMessage>, next) => {
    const users = await EmployeeService.getList();
    const response: EmployeeListResponse = users.map((user) => {
      const respUser: EmployeeSingleResponse = {
        id: user.id,
        fullname: `${user.firstname} ${user.lastname}`,
        attandence: user.attandence,
        salary: user.salary,
        currency: '$',
        phone: user.phone,
        role: user.status,
        total: user.total,
        working: user.working,
      };
      if (user.leave) {
        respUser.leave = user.leave;
      }
      return respUser;
    });

    res.send(response);
  }
);

export const employeeRoute = router;
