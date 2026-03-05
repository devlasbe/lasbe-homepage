export const dynamic = "force-dynamic";

import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import type { ResumeVisibleResponseType, ErrorResponseType } from "./config.types";

export async function GET(): Promise<
  NextResponse<ResumeVisibleResponseType | ErrorResponseType>
> {
  try {
    const docRef = doc(db, "config", "6xgLPPC2FPcj5fu9P8Co");
    const snapshot = await getDoc(docRef);

    const is_visible_resume = snapshot.exists()
      ? Boolean((snapshot.data() as { is_visible_resume: boolean }).is_visible_resume)
      : false;

    return NextResponse.json({ is_visible_resume });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get resume visibility" }, { status: 500 });
  }
}
