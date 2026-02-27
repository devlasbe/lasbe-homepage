import { getDateString } from "@/utils/date";
import { db } from "@/utils/firebase";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

type IncrementResponseType = { success: boolean };
type ErrorResponseType = { error: string };

export async function POST(): Promise<
  NextResponse<IncrementResponseType | ErrorResponseType>
> {
  try {
    const today = getDateString();
    const docRef = doc(db, "view", today);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      await setDoc(docRef, { count: 0 });
    }

    await updateDoc(docRef, { count: increment(1) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to increment view count" }, { status: 500 });
  }
}
