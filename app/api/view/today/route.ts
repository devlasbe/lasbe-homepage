export const dynamic = "force-dynamic";

import { getDateString } from "@/utils/date";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

type TodayViewCountResponseType = { count: number };
type ErrorResponseType = { error: string };

export async function GET(): Promise<
  NextResponse<TodayViewCountResponseType | ErrorResponseType>
> {
  try {
    const today = getDateString();
    const docRef = doc(db, "view", today);
    const snapshot = await getDoc(docRef);

    const count = snapshot.exists() ? (snapshot.data() as { count: number }).count : 0;

    return NextResponse.json({ count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get today view count" }, { status: 500 });
  }
}
