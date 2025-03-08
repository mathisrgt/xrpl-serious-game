import type { User } from './user';

export interface Course {
  _id: string;
  title: string;
  description: string;
  classrooms: string[];
  activities: string[];
  documents: string[];
}
