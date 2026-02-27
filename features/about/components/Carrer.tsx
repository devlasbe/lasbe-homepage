import Image from "next/image";
import Stack from "@/components/Stack";
import Link from "next/link";
import { CarrerType } from "../types";

export default function Carrer(props: CarrerType) {
  return (
    <div className="flex flex-col gap-8 w-full px-6">
      <div className="md:flex-1 space-y-2">
        <div className="flex justify-center">
          <div className="w-fit p-6 rounded-full border border-neutral-300">
            <Image
              src={props.imageSrc}
              alt={`${props.company} company image`}
              width={50}
              height={50}
            />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center">{props.company}</h3>
        <p className="text-sm md:text-base text-neutral-500 text-center">
          {props.period}{" "}
        </p>
        <p className="text-sm md:text-base whitespace-pre-wrap text-center">
          {props.desc}
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {props.projectList.map((data) => (
          <div
            key={`carrer-project-${data.title}`}
            className="flex flex-col md:flex-row flex-1 gap-4 md:gap-8"
          >
            <div className="flex flex-col flex-[2] gap-1">
              <div className="flex gap-2 items-center">
                <div className="w-1 h-4 bg-neutral-900" />
                <p className="font-bold">{data.title}</p>
              </div>
              <p className="text-sm text-neutral-500">{data.period}</p>
              <p className="text-sm whitespace-pre-wrap break-keep">
                {data.mainDesc}
              </p>
            </div>
            <div className="flex flex-col flex-[3] gap-4">
              <ul className="pl-4 space-y-1">
                {data.descList.map((desc) => (
                  <li
                    key={`carrer-${data.title}-${desc.desc}`}
                    className="list-disc text-sm"
                  >
                    {desc.href ? (
                      <Link
                        className="text-neutral-700 underline hover:opacity-50"
                        href={desc.href}
                        target="_blank"
                      >
                        {desc.desc}
                      </Link>
                    ) : (
                      desc.desc
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-0.5">
                {data.stackList.map((stack) => (
                  <Stack key={`carrer-${data.title}-${stack}`} name={stack} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
