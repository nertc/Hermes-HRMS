import { Model, model, Schema } from 'mongoose';
import { Leave } from './leave.interface';

export interface ILeave extends Leave, Document {}

const LeaveSchema: Schema = new Schema({
  userId: { type: String, required: true },
  fullname: { type: String, required: true },
  leave: {
    type: {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
    },
    required: true,
  },
});

export const LeaveModel: Model<ILeave> = model<ILeave>('Leave', LeaveSchema);
