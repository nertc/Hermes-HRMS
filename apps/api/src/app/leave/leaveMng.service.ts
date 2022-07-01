import { LeavePostRequest } from '@hermes/interfaces';
import { UpdateQuery } from 'mongoose';
import { ILeave, LeaveDTO, LeaveService, UserService } from '../shared';

export class LeaveMngService {
  static async getList(): Promise<LeaveDTO[]> {
    return await LeaveService.getAll();
  }

  static async delete(id: string): Promise<LeaveDTO> {
    return await LeaveService.delete(id);
  }

  static async create(leave: LeavePostRequest): Promise<LeaveDTO> {
    return await LeaveService.create(leave);
  }

  static async accept(id: string): Promise<void> {
    const leave = await this.delete(id);
    await UserService.update(leave.userId, { leave: leave.leave });
  }
}
