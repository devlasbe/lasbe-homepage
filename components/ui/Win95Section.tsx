type Win95SectionPropsType = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

export function Win95Section({ icon, title, children }: Win95SectionPropsType) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-1 font-bold text-[#000080] border-b-2 border-[#000080] pb-1 mb-2">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="ml-1">{children}</div>
    </div>
  );
}
