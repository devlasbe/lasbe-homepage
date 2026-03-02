"use client";

import { useState, useRef, useEffect } from "react";

export default function Typing({ text }: { text: string }) {
  const [result, setResult] = useState(text.charAt(0));
  const [index, setIndex] = useState(1);
  const timerRef = useRef(false);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (index === text.length && !timerRef.current) {
        setTimeout(() => {
          setResult(text.charAt(0));
          setIndex(1);
          timerRef.current = false;
        }, 1000);
        timerRef.current = true;
      }
      if (index < text.length) {
        setResult(result + text.charAt(index));
        setIndex(index + 1);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [result, index, text]);

  return (
    <div
      className={`text-md md:text-2xl font-extrabold text-wrap whitespace-pre-wrap text-center leading-normal`}
    >
      <span>{result}</span>
      <span className="cursor-animation border-r-2 px-0.5 border-neutral-900" />
    </div>
  );
}
