export const dynamic = "force-dynamic";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

type TotalViewCountResponseType = { total: number };
type ErrorResponseType = { error: string };

export async function GET(): Promise<
  NextResponse<TotalViewCountResponseType | ErrorResponseType>
> {
  try {
    const snapshot = await getDocs(collection(db, "view"));
    const total = snapshot.docs.reduce(
      (acc, doc) => acc + (doc.data() as { count: number }).count,
      0
    );

    return NextResponse.json({ total });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get total view count" }, { status: 500 });
  }
}
