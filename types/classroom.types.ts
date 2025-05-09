import { Types } from 'mongoose';

export type ClassroomStatus = 'draft' | 'active' | 'archived';
export type StudentStatus = 'accepted' | 'requested';

export interface ClassroomStudent {
    username: string;
    status?: StudentStatus; // default is 'requested'
}

export interface Classroom {
    _id?: Types.ObjectId;
    name: string;
    description?: string;
    status: ClassroomStatus;
    activatedAt?: Date;
    teachers: Types.ObjectId[]; // or User[] if populated
    students: ClassroomStudent[];
    createdAt?: Date;
    updatedAt?: Date;
}
