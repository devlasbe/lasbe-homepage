import { createHash } from "crypto";
import { db } from "@/utils/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import type { GuestbookDeleteResponseType, ErrorResponseType } from "../guestbook.types";

type GuestbookDocType = {
  passwordHash: string;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<GuestbookDeleteResponseType | ErrorResponseType>> {
  try {
    const { password } = (await request.json()) as { password: string };

    if (!password) {
      return NextResponse.json({ error: "비밀번호를 입력해주세요." }, { status: 400 });
    }

    const docRef = doc(db, "guestbook", params.id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
    }

    const data = snapshot.data() as GuestbookDocType;
    const passwordHash = createHash("sha256").update(password).digest("hex");

    if (data.passwordHash !== passwordHash) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 401 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete guestbook entry" }, { status: 500 });
  }
}
