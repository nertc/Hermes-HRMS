import { ErrorMessage, LogoutResponse } from '@hermes/interfaces';
import { Request, Response, Router } from 'express';
import { LogoutService } from './logout.service';

const router = Router();

router.post(
  '',
  async (req, res: Response<LogoutResponse | ErrorMessage>, next) => {
    await LogoutService.logout(req.body.username, req.body.password);

    const response: LogoutResponse = {};

    res.send(response);
  }
);

export const logoutRoute = router;
