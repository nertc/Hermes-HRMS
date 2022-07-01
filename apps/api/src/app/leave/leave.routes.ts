import {
  ErrorMessage,
  LeaveListResponse,
  LeavePostRequest,
  LeavePostResponse,
  LeavePutRequest,
  LeavePutResponse,
} from '@hermes/interfaces';
import { Request, Response, Router } from 'express';
import { LeaveMngService } from './leaveMng.service';

const router = Router();

router.get('', async (req, res: Response<LeaveListResponse>) => {
  const list = await LeaveMngService.getList();
  res.send(list);
});

router.post(
  '/request',
  async (
    req: Request<any, any, LeavePostRequest>,
    res: Response<LeavePostResponse>
  ) => {
    const request = await LeaveMngService.create(req.body);
    res.send({});
  }
);

router.put(
  '/:id',
  async (
    req: Request<{ id: string }, any, LeavePutRequest>,
    res: Response<LeavePutResponse>
  ) => {
    const id = req.params.id;
    const { accepted } = req.body;
    if (accepted) {
      await LeaveMngService.accept(id);
    } else {
      await LeaveMngService.delete(id);
    }
    res.send({});
  }
);

export const leaveRoute = router;
