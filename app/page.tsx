import CardContainer from "@/features/home/components/CardContainer";
import IconList from "@/features/home/components/icon/IconList";
import Typing from "@/components/Typing";

export default function Home() {
  return (
    <main className="flex justify-center min-w-full min-h-dvh bg-[url(/background.jpg)] bg-cover tracking-tight">
      <div className="max-w-screen-lg flex">
        <div className="w-full min-h-dvh flex flex-col">
          <div className="flex flex-1 justify-center items-center gap-2">
            <CardContainer>
              <div>
                <Typing text="FRONTEND DEVELOPER" />
                <h1
                  className={`font-archivo text-3xl md:text-5xl font-extrabold text-wrap whitespace-pre-wrap text-center leading-normal`}
                >
                  JANG SUNG WOO
                </h1>
              </div>
              <div className="border-b border-[rgba(0,0,0,0.2)] w-1/4" />
              <p
                className={`text-sm md:text-lg text-wrap whitespace-pre-wrap text-center leading-normal`}
              >
                안녕하세요.{"\n"}본질을 탐구하고, 주도적인 문제 해결을 즐기는{" "}
                {"\n"} 2년차 프론트엔드 개발자 장성우입니다. {"\n"} 성장을 위해
                끊임없이 도전하고 기록합니다.
              </p>
              <div className="border border-neutral-900 px-4 py-2 rounded-full text-sm md:text-md">
                더 알아보기
              </div>
            </CardContainer>
          </div>
          <div className="flex justify-center items-center py-4">
            <IconList />
          </div>
        </div>
      </div>
    </main>
  );
}
