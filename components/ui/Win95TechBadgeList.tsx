type Win95TechBadgeListPropsType = {
  items: string[];
  className?: string;
};

export function Win95TechBadgeList({ items, className }: Win95TechBadgeListPropsType) {
  return (
    <div className={`flex flex-wrap gap-0.5 ${className ?? ""}`}>
      {items.map((s) => (
        <span key={s} className="win95-raised bg-[#c0c0c0] px-1.5 text-system-caption font-bold">
          {s}
        </span>
      ))}
    </div>
  );
}
