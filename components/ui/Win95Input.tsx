import React from "react";

type Win95InputPropsType = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Win95Input({ className, ...rest }: Win95InputPropsType) {
  return (
    <input
      className={`text-system-body bg-white win95-sunken px-1 py-0.5 outline-none min-w-0 w-full ${className ?? ""}`}
      {...rest}
    />
  );
}
