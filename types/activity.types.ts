import { Types } from 'mongoose';
import type { Wallet } from './wallet.type';

export interface GradeInfo {
  userId: Types.ObjectId;
  grade: number;
}

export type ActivityStatus = 'done' | 'inProgress' | 'notStarted';

export interface StatusInfo {
  userId: Types.ObjectId;
  state: ActivityStatus;
}

export interface Activity {
  _id?: Types.ObjectId;
  content: Types.ObjectId;
  classroom: Types.ObjectId;
  wallets: Wallet[];
  grades: GradeInfo[];
  status: StatusInfo[];
  metaData: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
