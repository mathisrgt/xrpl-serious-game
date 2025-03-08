import type { User } from './user';

export type ActivityStatus = 'notStarted' | 'inProgress' | 'completed';

export interface Activity {
  _id: string;
  content: string;
  grades: { user: User; submission: string; grade: number }[];
  status: { user: User; status: ActivityStatus }[];
}
