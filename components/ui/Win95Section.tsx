type Win95SectionPropsType = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

export function Win95Section({ icon, title, children }: Win95SectionPropsType) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-1 font-bold text-blue-900 border-b-2 border-blue-900 pb-1 mb-2">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="ml-1">{children}</div>
    </div>
  );
}
