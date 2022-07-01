import { FilterQuery, UpdateQuery } from 'mongoose';
import { LeaveDTO } from './models/leave-dto.interface';
import { ILeave, LeaveModel } from './models/leave.schema';
import { Leave } from './models';

export class LeaveService {
  static async getAll(): Promise<LeaveDTO[]> {
    const leaves = await LeaveModel.find().catch(console.log);
    return (leaves || []).map((leave) => ({
      id: leave._id.toString(),
      fullname: leave.fullname,
      userId: leave.userId,
      leave: leave.leave,
    }));
  }

  static async getOne(id: string): Promise<LeaveDTO> {
    const leave = await LeaveModel.findById(id).catch(console.log);
    if (!leave) {
      return null;
    }

    return {
      id: leave._id.toString(),
      fullname: leave.fullname,
      userId: leave.userId,
      leave: leave.leave,
    };
  }

  static async findOne(filter: FilterQuery<ILeave>): Promise<LeaveDTO> {
    const leave = await LeaveModel.findOne(filter).catch(console.log);
    if (!leave) {
      return null;
    }

    return {
      id: leave._id.toString(),
      fullname: leave.fullname,
      userId: leave.userId,
      leave: leave.leave,
    };
  }

  static async create(leave: Leave): Promise<LeaveDTO> {
    const newLeave = await LeaveModel.create(leave).catch(console.log);
    if (newLeave) {
      return {
        id: newLeave._id.toString(),
        fullname: newLeave.fullname,
        userId: newLeave.userId,
        leave: newLeave.leave,
      };
    }
    return null;
  }

  static async delete(id: string): Promise<LeaveDTO> {
    const deletedLeave = await LeaveModel.findByIdAndDelete(id).catch(
      console.log
    );
    if (!deletedLeave) {
      return null;
    }
    return {
      id: deletedLeave._id.toString(),
      fullname: deletedLeave.fullname,
      userId: deletedLeave.userId,
      leave: deletedLeave.leave,
    };
  }

  static async update(
    id: string,
    leave: UpdateQuery<ILeave>
  ): Promise<LeaveDTO> {
    const updatedLeave = await LeaveModel.findByIdAndUpdate(id, leave).catch(
      console.log
    );
    if (!updatedLeave) {
      return null;
    }
    return {
      id: leave._id.toString(),
      fullname: leave.fullname,
      userId: leave.userId,
      leave: leave.leave,
    };
  }
}
