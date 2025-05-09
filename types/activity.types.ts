import { Types } from 'mongoose';

export interface WalletInfo {
  userId: Types.ObjectId;
  pubkey: string;
  privkey: string;
}

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
  wallets: WalletInfo[];
  grades: GradeInfo[];
  status: StatusInfo[];
  metaData: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
