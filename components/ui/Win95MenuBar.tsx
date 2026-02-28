type Win95MenuBarPropsType = { items: readonly string[] };

export function Win95MenuBar({ items }: Win95MenuBarPropsType) {
  return (
    <div className="flex gap-4 px-2 py-0.5 text-system-body border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
      {items.map((item) => (
        <button key={item} className="hover:bg-[#000080] hover:text-white px-1">
          {item}
        </button>
      ))}
    </div>
  );
}
