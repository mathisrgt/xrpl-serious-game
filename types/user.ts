export type UserRole = 'student' | 'teacher';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  walletAddress?: string;
}
