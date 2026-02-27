import { ScrollAnimation } from "@lasbe/react-scroll-animation";
import Image from "next/image";
import { ProfileType } from "../types";

export default function Profile(props: ProfileType) {
  return (
    <ScrollAnimation delay={(props.idx + 1) * 0.1} amount="sm">
      <div className="flex items-center gap-4">
        <Image
          className="stroke-red-900"
          src={props.src}
          alt={props.alt}
          width={20}
          height={20}
        />
        <div className="flex flex-col">
          <h2 className="text-xs font-bold">{props.label}</h2>
          <p className="text-sm">{props.value}</p>
        </div>
      </div>
    </ScrollAnimation>
  );
}
