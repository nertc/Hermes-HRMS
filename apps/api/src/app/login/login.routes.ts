import { ErrorMessage, LoginRequest, LoginResponse } from '@hermes/interfaces';
import { Request, Response, Router } from 'express';
import { LoginService } from './login.service';

const router = Router();

router.post(
  '',
  async (
    req: Request<any, any, LoginRequest>,
    res: Response<LoginResponse | ErrorMessage>,
    next
  ) => {
    const user = await LoginService.login(req.body.username, req.body.password);
    if (!user) {
      res.status(404).send({ message: 'Not found bro' } as ErrorMessage);
      return;
    }

    const response: LoginResponse = {
      id: user.id,
      status: user.status,
      firstName: user.firstname,
      lastName: user.lastname,
    };

    res.send(response);
  }
);

export const loginRoute = router;
