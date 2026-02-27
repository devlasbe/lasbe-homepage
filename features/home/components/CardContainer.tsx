"use client";

import { CardAnimation } from "@lasbe/react-card-animation";
import { useModal } from "@/components/modal/useModal";
import AboutMeModal from "@/features/about/components/AboutMeModal";

export default function CardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal } = useModal();
  const handleClick = () =>
    openModal({ title: "About Me", content: <AboutMeModal /> });
  return (
    <CardAnimation angle={20}>
      <button
        onClick={handleClick}
        className="cursor-pointer flex flex-col items-center gap-4 md:gap-6 w-full p-8 backdrop-blur-sm bg-white/20 rounded-xl shadow-lg leading-4"
      >
        {children}
      </button>
    </CardAnimation>
  );
}
