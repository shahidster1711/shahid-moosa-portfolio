interface SEOOptions {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

const SITE_NAME = "Shahid Moosa — Distributed Systems Engineer";
const BASE_URL = "https://www.shahidster.tech";
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/og-default.jpg`;

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function updateSEO(options: SEOOptions): void {
  const {
    title,
    description,
    ogImage = DEFAULT_OG_IMAGE,
    canonical,
    type = "website",
    publishedTime,
    tags,
  } = options;

  const fullTitle = title === SITE_NAME ? title : `${title} | Shahid Moosa`;

  // Basic meta
  document.title = fullTitle;
  setMeta("description", description);

  // Open Graph
  setMeta("og:title", fullTitle, "property");
  setMeta("og:description", description, "property");
  setMeta("og:image", ogImage, "property");
  setMeta("og:type", type, "property");
  setMeta("og:site_name", SITE_NAME, "property");
  if (canonical) setMeta("og:url", canonical, "property");

  // Twitter Cards
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", description);
  setMeta("twitter:image", ogImage);

  // Canonical link
  if (canonical) setLink("canonical", canonical);

  // Article-specific
  if (type === "article" && publishedTime) {
    setMeta("article:published_time", publishedTime, "property");
  }
  if (type === "article" && tags) {
    for (const tag of tags) {
      const el = document.createElement("meta");
      el.setAttribute("property", "article:tag");
      el.content = tag;
      document.head.appendChild(el);
    }
  }
}

export function getArticleJsonLD(opts: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    url: opts.url,
    image: opts.image ?? DEFAULT_OG_IMAGE,
    author: {
      "@type": "Person",
      name: "Shahid Moosa",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Shahid Moosa",
    },
  });
}
