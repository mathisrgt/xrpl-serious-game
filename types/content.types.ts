import { Types } from 'mongoose';
import type { Wallet } from "./wallet.type";


export enum ContentTypeEnum {
  QCM = 'qcm',
  ONCHAIN = 'onchain',
  LESSON = 'lesson',
  DOCUMENT = 'document'
}
type ContentType = `${ContentTypeEnum}`

export enum ContentSectionTypeEnum {
  TITLE = 'title',
  BODY = 'body',
  LINK = 'link',
  CODE = 'code',
  QUESTION = 'question'
}
type ContentSectionType = `${ContentSectionTypeEnum}`


export interface ContentSection {
  type: ContentSectionType;
  value: string;
}

export type Content = {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  type: ContentType;
  relatedContents: Types.ObjectId[];
  data: ContentSection[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type GenerateMemoResponse = {
    studentWallet: Wallet;
    metaData: {
        memoSent: {
            randomSenderAddress: string;
            studentClassicAddress: string;
            txHash: string;
            memo: string;
            memoHex: string;
        };
        solutionWallet: Wallet;
    };
}

export type WatchMemoResponse = 
    | { found: true; txHash: string }
    | { found: false; }
