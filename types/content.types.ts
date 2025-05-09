import { Types } from 'mongoose';

export type ContentType = 'qcm' | 'onchain' | 'lesson' | 'document';

export type ContentBlockType = 'title' | 'body' | 'link' | 'code';

export interface ContentBlock {
  type: ContentBlockType;
  value: string;
}

export interface Content {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  type: ContentType;
  relatedContents: Types.ObjectId[];
  data: ContentBlock[];
  createdAt?: Date;
  updatedAt?: Date;
}
