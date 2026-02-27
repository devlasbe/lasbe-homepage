"use client";

import Image from "next/image";
import Link from "next/link";
import { IconType } from "../../types";

export default function Icon({
  type,
  src,
  label,
  backgroundColor,
  alt,
  href,
  onClick,
}: IconType) {
  if (type === "link" && !!href)
    return (
      <Link
        href={href}
        className="icon relative flex flex-col items-center gap-1"
        target="_blank"
      >
        <div
          className={`${backgroundColor} absolute z-0 w-[70px] h-[70px] rounded-lg overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,.5)]`}
        ></div>
        <Image
          className="z-10 rounded-lg overflow-hidden"
          src={src}
          alt={alt}
          width={70}
          height={70}
        />
        <span className="text-sm">{label}</span>
      </Link>
    );

  if (type === "button")
    return (
      <button
        className="icon relative flex flex-col items-center gap-1 w-full"
        onClick={onClick}
      >
        <div
          className={`${backgroundColor} absolute z-0 w-[70px] h-[70px] rounded-lg overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,.5)]`}
        ></div>
        <Image
          className="z-10 rounded-lg overflow-hidden"
          src={src}
          alt={alt}
          width={70}
          height={70}
        />
        <span className="text-sm">{label}</span>
      </button>
    );
}
