import { Types } from 'mongoose';
import type { Wallet } from "./wallet.type";

export type ContentType = 'qcm' | 'onchain' | 'lesson' | 'document';

export type ContentSectionType = 'title' | 'body' | 'link' | 'code';

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
