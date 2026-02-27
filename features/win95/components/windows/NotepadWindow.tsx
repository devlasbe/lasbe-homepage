"use client";

export default function NotepadWindow() {
  return (
    <div className="flex flex-col h-full font-vt323">
      {/* Menu bar */}
      <div className="flex gap-4 px-2 py-0.5 text-system-body border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
        {["파일(F)", "편집(E)", "서식(O)", "보기(V)", "도움말(H)"].map((menu) => (
          <button
            key={menu}
            className="hover:bg-[#000080] hover:text-white px-1"
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white p-2 win95-sunken">
        <pre className="whitespace-pre-wrap font-vt323 text-system-body leading-relaxed">
{`이름        : 장성우
생년월일    : 97.03.05
위치        : 서울 동작구
연락처      : devlasbe@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

안녕하세요, 장성우입니다.

본질을 탐구하고, 주도적인 문제 해결을 즐기는
프론트엔드 개발자입니다.

단순히 기능을 구현하는 것에 그치지 않고
왜 이렇게 동작해야 하는지를 탐구하며 개발합니다.

자동화, 최적화, 사용자 경험 개선에 관심이 많으며
혼자서도 서비스를 기획·개발·배포할 수 있는
풀사이클 개발자를 지향합니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub  : github.com/devlasbe
Blog    : lasbe.tistory.com
`}
        </pre>
      </div>

      {/* Status bar */}
      <div className="h-5 flex items-center px-2 text-system-caption border-t border-[#808080] win95-sunken flex-shrink-0 gap-4">
        <span>Ln 1, Col 1</span>
        <span>일반 텍스트</span>
      </div>
    </div>
  );
}
