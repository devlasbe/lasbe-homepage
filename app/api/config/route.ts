export const dynamic = "force-dynamic";

import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import type { AppConfigResponseType, ErrorResponseType } from "./config.types";

type FirestoreConfigType = {
  is_visible_resume: boolean;
  is_visible_notion_test: boolean;
};

export async function GET(): Promise<
  NextResponse<AppConfigResponseType | ErrorResponseType>
> {
  try {
    const docRef = doc(db, "config", "6xgLPPC2FPcj5fu9P8Co");
    const snapshot = await getDoc(docRef);

    const data = snapshot.exists() ? (snapshot.data() as FirestoreConfigType) : null;

    return NextResponse.json({
      is_visible_resume: Boolean(data?.is_visible_resume),
      is_visible_notion_test: Boolean(data?.is_visible_notion_test),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get config" }, { status: 500 });
  }
}
