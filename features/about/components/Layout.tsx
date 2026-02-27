import { LayoutType } from "../types";

export default function Layout({
  title,
  headerColorClassName,
  isUseBgColor = true,
  children,
}: LayoutType) {
  return (
    <section
      className={`relative flex flex-col gap-8 items-center ${
        isUseBgColor ? "py-12 bg-white shadow-md" : ""
      } rounded-lg`}
    >
      <h2
        className={`z-10 absolute top-[-20px] px-4 py-1 rounded-full shadow-[0_2px_4px_0px_rgba(0,0,0,0.4)] ${headerColorClassName} text-white font-extrabold text-2xl`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
