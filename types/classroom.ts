import type { User } from './user';

export interface Classroom {
  _id: string;
  name: string;
  users: User[];
}
