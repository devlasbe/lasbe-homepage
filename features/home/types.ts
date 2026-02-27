export type IconType = {
  type: "link" | "button";
  src: string;
  label: string;
  backgroundColor?: string;
  alt: string;
  href?: string;
  onClick?: () => void;
};
