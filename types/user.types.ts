import { Types } from 'mongoose';

export interface User {
  _id?: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}
