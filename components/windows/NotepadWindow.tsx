"use client";

import { profileDataList, favoritesData } from "@/constants/portfolio";
import { Win95MenuBar, Win95StatusBar } from "../ui";

// ── 메뉴 ──
const MENU_ITEMS = ["파일(F)", "편집(E)", "서식(O)", "보기(V)", "도움말(H)"] as const;

export default function NotepadWindow() {
  const name = profileDataList.find((p) => p.label === "이름")?.value ?? "";
  const birth = profileDataList.find((p) => p.label === "생년월일")?.value ?? "";
  const location = profileDataList.find((p) => p.label === "위치")?.value ?? "";
  const email = profileDataList.find((p) => p.label === "메일")?.value ?? "";
  const github = favoritesData.find((f) => f.label === "GitHub")?.url ?? "";
  const blog = favoritesData.find((f) => f.label === "블로그")?.url ?? "";

  const githubDisplay = github.replace("https://", "");
  const blogDisplay = blog.replace("https://", "");

  return (
    <div className="flex flex-col h-full font-vt323">
      <Win95MenuBar items={MENU_ITEMS} />

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white p-2 win95-sunken">
        <pre className="whitespace-pre-wrap font-vt323 text-system-body leading-relaxed">
{`이름        : ${name}
생년월일    : ${birth}
위치        : ${location}
연락처      : ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

안녕하세요, ${name}입니다.

본질을 탐구하고, 주도적인 문제 해결을 즐기는
프론트엔드 개발자입니다.

단순히 기능을 구현하는 것에 그치지 않고
왜 이렇게 동작해야 하는지를 탐구하며 개발합니다.

자동화, 최적화, 사용자 경험 개선에 관심이 많으며
혼자서도 서비스를 기획·개발·배포할 수 있는
풀사이클 개발자를 지향합니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub  : ${githubDisplay}
Blog    : ${blogDisplay}
`}
        </pre>
      </div>

      <Win95StatusBar><span>Ln 1, Col 1</span><span>일반 텍스트</span></Win95StatusBar>
    </div>
  );
}
