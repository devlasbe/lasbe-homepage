import { sendGAEvent } from "@next/third-parties/google";

// 이벤트명 → 파라미터 타입 맵 (이벤트 추가 시 여기만 수정)
type GAEventMapType = {
  window_open: { window_id: string; window_name: string };
};

export const analytics = {
  track: <K extends keyof GAEventMapType>(name: K, params: GAEventMapType[K]) => {
    if (process.env.NODE_ENV !== "production") return;
    sendGAEvent("event", name, params);
  },
};
