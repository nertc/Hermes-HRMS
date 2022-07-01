import {
  EmployeeDeleteResponse,
  EmployeeListResponse,
  EmployeePostRequest,
  EmployeePostResponse,
  EmployeePutRequest,
  EmployeePutResponse,
  EmployeeSingleResponse,
  ErrorMessage,
} from '@hermes/interfaces';
import { Request, Response, Router } from 'express';
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

router.delete('/:id', async (req, res: Response<EmployeeDeleteResponse>) => {
  const id = req.params.id;
  await EmployeeService.delete(id);
  res.send({});
});

router.put(
  '/:id',
  async (
    req: Request<{ id: string }, any, EmployeePutRequest>,
    res: Response<EmployeePutResponse>
  ) => {
    const id = req.params.id;
    const updateVals = req.body;
    const user = await EmployeeService.update(id, updateVals);
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
      ...updateVals,
    };
    res.send(respUser);
  }
);

router.post(
  '',
  async (
    req: Request<any, any, EmployeePostRequest>,
    res: Response<EmployeePostResponse>
  ) => {
    const user = await EmployeeService.create(req.body);
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
    res.send(respUser);
  }
);

export const employeeRoute = router;
