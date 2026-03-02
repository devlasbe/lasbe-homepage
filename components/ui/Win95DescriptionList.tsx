type Win95DescriptionItemType = string | { desc: string; href?: string };

type Win95DescriptionListPropsType = {
  items: Win95DescriptionItemType[];
  className?: string;
};

export function Win95DescriptionList({ items, className }: Win95DescriptionListPropsType) {
  return (
    <ul className={`pl-3 space-y-0.5 ${className ?? ""}`}>
      {items.map((item, i) => {
        if (typeof item === "string") {
          return (
            <li key={item} className="list-disc text-system-caption">
              {item}
            </li>
          );
        }
        return (
          <li key={i} className="list-disc text-system-caption leading-relaxed">
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[#000080] underline">
                {item.desc}
              </a>
            ) : (
              item.desc
            )}
          </li>
        );
      })}
    </ul>
  );
}
