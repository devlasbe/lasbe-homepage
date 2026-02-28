import { NotionAPI } from "notion-client";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const notion = new NotionAPI();

const getNotionPage = unstable_cache(
  async (pageId: string) => notion.getPage(pageId),
  ["notion-page"],
  { revalidate: 3600 }
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");
  if (!pageId) return NextResponse.json({ error: "pageId is required" }, { status: 400 });
  try {
    const recordMap = await getNotionPage(pageId);
    return NextResponse.json(recordMap);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
