export const dynamic = "force-dynamic";

import { createHash } from "crypto";
import { db } from "@/services/firebase";
import { addDoc, collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

type GuestbookEntryType = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

type GuestbookDocType = {
  name: string;
  passwordHash: string;
  comment: string;
  createdAt: Timestamp;
};

type GetResponseType = { entries: GuestbookEntryType[] };
type PostResponseType = { id: string; success: boolean };
type ErrorResponseType = { error: string };

export async function GET(): Promise<NextResponse<GetResponseType | ErrorResponseType>> {
  try {
    const colRef = collection(db, "guestbook");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const entries: GuestbookEntryType[] = snapshot.docs.map((doc) => {
      const data = doc.data() as GuestbookDocType;
      return {
        id: doc.id,
        name: data.name,
        comment: data.comment,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch guestbook entries" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<PostResponseType | ErrorResponseType>> {
  try {
    const { name, password, comment } = (await request.json()) as {
      name: string;
      password: string;
      comment: string;
    };

    if (!name?.trim() || !password?.trim() || !comment?.trim()) {
      return NextResponse.json({ error: "이름, 비밀번호, 댓글을 모두 입력해주세요." }, { status: 400 });
    }

    const passwordHash = createHash("sha256").update(password).digest("hex");

    const docRef = await addDoc(collection(db, "guestbook"), {
      name: name.trim(),
      passwordHash,
      comment: comment.trim(),
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add guestbook entry" }, { status: 500 });
  }
}
