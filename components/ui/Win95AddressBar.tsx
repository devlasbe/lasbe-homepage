import Win95Button from "./Win95Button";

type Win95AddressBarPropsType = {
  url: string;
  showNavButtons?: boolean;
  onRefresh?: () => void;
  actionLabel?: string;
  actionHref?: string;
};

export function Win95AddressBar({
  url,
  showNavButtons = false,
  onRefresh,
  actionLabel = "이동",
  actionHref,
}: Win95AddressBarPropsType) {
  return (
    <div className="flex items-center gap-1 px-1 py-1 border-b border-[#808080] bg-[#c0c0c0] flex-shrink-0">
      {showNavButtons && (
        <>
          <Win95Button disabled>◀</Win95Button>
          <Win95Button disabled>▶</Win95Button>
          <Win95Button onClick={onRefresh} disabled={!onRefresh} title="새로고침">
            🔄
          </Win95Button>
        </>
      )}
      <span className="text-system-caption px-1 shrink-0">주소(D):</span>
      <div className="flex-1 win95-sunken bg-white px-1 py-0.5 text-system-caption text-[#000080] truncate">
        {url}
      </div>
      {actionHref ? (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="win95-raised bg-[#c0c0c0] px-2 py-0.5 text-system-caption shrink-0"
        >
          {actionLabel}
        </a>
      ) : (
        <Win95Button className="shrink-0">{actionLabel}</Win95Button>
      )}
    </div>
  );
}
