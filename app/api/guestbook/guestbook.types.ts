import type { Timestamp } from "firebase/firestore";

export type GuestbookEntryType = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export type GuestbookDocType = {
  name: string;
  passwordHash: string;
  comment: string;
  createdAt: Timestamp;
};

export type GuestbookGetResponseType = { entries: GuestbookEntryType[] };
export type GuestbookPostResponseType = { id: string; success: boolean };
export type GuestbookDeleteResponseType = { success: boolean };
export type ErrorResponseType = { error: string };
