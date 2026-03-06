type Win95StatusBarPropsType = { children: React.ReactNode };

export function Win95StatusBar({ children }: Win95StatusBarPropsType) {
  return (
    <div className="h-5 flex items-center px-2 text-system-caption border-t border-gray-500 win95-sunken flex-shrink-0 gap-4">
      {children}
    </div>
  );
}
