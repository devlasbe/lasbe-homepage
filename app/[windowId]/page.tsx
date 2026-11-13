import type { Metadata } from "next";
import { PUBLIC_WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { SEO, SEO_OPEN_GRAPH_BASE, SEO_TWITTER_BASE } from "@/constants/seo";

type PagePropsType = { params: Promise<{ windowId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const params = PUBLIC_WINDOW_CONFIGS.map((config) => ({ windowId: config.id }));
  return params;
}

export async function generateMetadata(props: PagePropsType): Promise<Metadata> {
  const params = await props.params;
  const config = PUBLIC_WINDOW_CONFIGS.find((windowConfig) => windowConfig.id === params.windowId);
  if (!config) return {};
  const title = config.title;
  const description = config.readmeDesc;
  const socialTitle = SEO.TITLE_TEMPLATE.replace("%s", title);
  const path = `/${config.id}`;
  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...SEO_OPEN_GRAPH_BASE, title: socialTitle, description, url: path },
    twitter: { ...SEO_TWITTER_BASE, title: socialTitle, description },
  };
  return metadata;
}

export default function WindowPage() {
  return null;
}
