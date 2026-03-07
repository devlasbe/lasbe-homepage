import { parseNotionPageId } from "@/utils/notionUrl";

// ── Notion 페이지 URL ──
// 전체 URL만 관리하고, page ID는 parseNotionPageId로 자동 파싱한다.

const RESUME_URL =
  "https://www.notion.so/devlasbe/2025-28699322f59d8060911ff907842cfffc";

const RENDER_TEST_URL =
  "https://www.notion.so/devlasbe/Notion-Render-Test-Page-31b99322f59d803ea7acf61175e33b6b";

export const NOTION_PAGES = {
  resume: {
    url: RESUME_URL,
    pageId: parseNotionPageId(RESUME_URL),
  },
  renderTest: {
    url: RENDER_TEST_URL,
    pageId: parseNotionPageId(RENDER_TEST_URL),
  },
} as const;
