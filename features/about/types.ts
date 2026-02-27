export type LayoutType = {
  title: string;
  headerColorClassName: string;
  isUseBgColor?: boolean;
  children: React.ReactElement;
};

export type ProfileType = {
  src: string;
  alt: string;
  label: string;
  value: string;
  idx: number;
};

export type CarrerProjectType = {
  title: string;
  period: string;
  mainDesc: string;
  stackList: string[];
  descList: { href?: string; desc: string }[];
};

export type CarrerType = {
  imageSrc: string;
  company: string;
  period: string;
  desc: string;
  projectList: CarrerProjectType[];
};

export type ProjectType = {
  title: string;
  period: string;
  desc: string;
  subDesc: string[];
  imageList: string[];
  stack: string[];
  link?: string;
  readme?: string;
  idx: number;
};
