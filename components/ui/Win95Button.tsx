// ── 크기 변형 ──
const SIZE_CLASS = {
  lg: "px-3 py-0.5 text-system-body",
  md: "px-2 py-0.5 text-system-caption",
  sm: "win95-btn",
};

// ── 굵기 변형 ──
const WEIGHT_CLASS = {
  medium: "font-medium",
  bold: "font-bold",
};

function cx(...args: (string | undefined | false)[]) {
  return args.filter(Boolean).join(" ");
}

type Win95ButtonPropsType = {
  size?: "lg" | "md" | "sm";
  weight?: "medium" | "bold";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Win95Button({
  size = "md",
  weight = "medium",
  className,
  children,
  ...rest
}: Win95ButtonPropsType) {
  return (
    <button
      className={cx(
        "win95-raised bg-[#c0c0c0] cursor-pointer disabled:opacity-50",
        SIZE_CLASS[size],
        WEIGHT_CLASS[weight],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
