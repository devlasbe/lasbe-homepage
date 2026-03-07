const NOTION_PAGE_ID_LENGTH = 32;
const NOTION_PAGE_ID_REGEX = /^[a-f0-9]{32}$/;
const NOTION_UUID_REGEX = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

/**
 * 노션 URL 또는 ID에서 page ID(32자 hex)를 추출한다.
 *
 * 지원 형식:
 * - https://www.notion.so/workspace/Page-Title-{32자hex}
 * - https://notion.so/{32자hex}
 * - {32자hex} (ID만)
 * - {8-4-4-4-12} (하이픈 포함 UUID)
 */
export function parseNotionPageId(urlOrId: string): string {
  const trimmed = urlOrId.trim();

  // 하이픈 포함 UUID
  if (NOTION_UUID_REGEX.test(trimmed)) {
    return trimmed.replace(/-/g, "");
  }

  // 이미 32자 hex ID
  if (NOTION_PAGE_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  // URL에서 추출 — 마지막 하이픈 뒤 32자 또는 경로 마지막 세그먼트
  try {
    const url = new URL(trimmed);
    const pathname = url.pathname;
    const lastSegment = pathname.split("/").pop() ?? "";

    // "Page-Title-{32자hex}" 또는 "{32자hex}" 형태
    const suffix = lastSegment.slice(-NOTION_PAGE_ID_LENGTH);
    if (NOTION_PAGE_ID_REGEX.test(suffix)) {
      return suffix;
    }
  } catch {
    // URL 파싱 실패 시 마지막 32자 시도
    const suffix = trimmed.slice(-NOTION_PAGE_ID_LENGTH);
    if (NOTION_PAGE_ID_REGEX.test(suffix)) {
      return suffix;
    }
  }

  throw new Error(`유효한 Notion page ID를 추출할 수 없습니다: ${trimmed}`);
}
