import { useViewCount } from "../hooks/useViewCount";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SystemModal() {
  const [count, setCount] = useState<{ today?: number; total?: number }>();
  const { getTodayViewCount, getAllViewCount } = useViewCount();
  useEffect(() => {
    getTodayViewCount().then((data) =>
      setCount((prev) => ({ ...prev, today: data }))
    );
    getAllViewCount().then((data) =>
      setCount((prev) => ({ ...prev, total: data }))
    );
  }, [getAllViewCount, getTodayViewCount]);
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-[300px] h-[400px] p-4 backdrop-blur-2xl bg-white/40">
      <div className="rounded-full overflow-hidden">
        <Image
          src={"/lasbe_logo.jpeg"}
          alt="lasbe logo"
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-extrabold opacity-75">장성우의 포트폴리오</p>
        <p className="text-xs opacity-50">2024.10</p>
      </div>
      <div className="flex flex-col px-4 py-2 text-xs border border-[rgba(0,0,0,0.2)] rounded-lg whitespace-nowrap">
        <div className="flex flex-1 gap-4">
          <p className="flex flex-1 justify-end opacity-75">금일 방문자</p>
          <p className="flex-1 opacity-75">
            <b>{count?.today || "-"}</b>명
          </p>
        </div>
        <div className="flex flex-1 gap-4">
          <p className="flex flex-1 justify-end opacity-75">전체 방문자</p>
          <p className="flex-1 opacity-75">
            <b>{count?.total || "-"}</b>명
          </p>
        </div>
      </div>
    </div>
  );
}
