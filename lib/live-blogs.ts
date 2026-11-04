export interface LiveArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  publishTs: number;
  url: string;
  source: string;
  isLive: boolean;
  accent: string;
}

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop";

const SOURCES = [
  {
    url: "https://www.moneycontrol.com/rss/business.xml",
    name: "MoneyControl",
    accent: "blue",
  },
  {
    url: "https://economictimes.indiatimes.com/mf/rssfeeds/359241701.cms",
    name: "ET Mutual Funds",
    accent: "red",
  },
  {
    url: "https://www.livemint.com/rss/money",
    name: "Mint Money",
    accent: "blue",
  },
  {
    url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    name: "ET Markets",
    accent: "red",
  },
];

const PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

const firstImage = (item: any, html = ""): string => {
  try {
    const mediaContent = item?.querySelector?.("media\\:content");
    const mediaUrl = mediaContent?.getAttribute?.("url");
    if (mediaUrl) return mediaUrl;

    const mediaThumb = item?.querySelector?.("media\\:thumbnail");
    const thumbUrl = mediaThumb?.getAttribute?.("url");
    if (thumbUrl) return thumbUrl;

    const enclosure = item?.querySelector?.("enclosure");
    const enclosureUrl = enclosure?.getAttribute?.("url");
    if (enclosureUrl) return enclosureUrl;

    let match = html.match(/<img[^>]+src="([^">]+)"/i);
    if (match?.[1]) return match[1];

    match = html.match(/data-src="([^"]+)"/i);
    if (match?.[1]) return match[1];

    return FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
};

const excerptOf = (text: string, title = "", max = 150) => {
  const clean = stripHtml(text);

  if (!clean || clean.length < 40) {
    return `Read the latest update on ${title.toLowerCase()} — trends, context and what it means for long-term investors.`;
  }

  return clean.length > max ? clean.slice(0, max) + "…" : clean;
};

const readTimeOf = (text = "") => {
  const words = stripHtml(text).split(" ").filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
};

const categorize = (text = "") => {
  const t = text.toLowerCase();

  if (t.includes("sip") || t.includes("systematic")) {
    return "SIP & Investing";
  }

  if (t.includes("mutual fund") || t.includes("amc") || t.includes("nfo") || t.includes("elss")) {
    return "Mutual Funds";
  }

  if (t.includes("sensex") || t.includes("nifty") || t.includes("stock") || t.includes("market")) {
    return "Markets";
  }

  if (t.includes("rbi") || t.includes("inflation") || t.includes("repo")) {
    return "Economy";
  }

  return "Personal Finance";
};

async function fetchFeed(source: (typeof SOURCES)[number]): Promise<LiveArticle[]> {
  try {
    const feedUrl = encodeURIComponent(source.url);
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items)) return [];

    return data.items.slice(0, 8).map((item: any) => ({
      id: item.guid || item.link,
      title: item.title,
      excerpt: excerptOf(item.description || item.content || "", item.title),
      image: item.thumbnail || item.enclosure?.link || FALLBACK_IMAGE,
      category: categorize(`${item.title} ${item.description || ""}`),
      readTime: readTimeOf(item.description || ""),
      date: item.pubDate
        ? new Date(item.pubDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
      publishTs: item.pubDate ? new Date(item.pubDate).getTime() : Date.now(),
      url: item.link,
      source: source.name,
      isLive: true,
      accent: source.accent,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchLiveBlogs(): Promise<LiveArticle[]> {
  const results = (await Promise.all(SOURCES.map(fetchFeed))).flat().filter((a) => a.title);

  const unique = results.filter(
    (article, index, self) => index === self.findIndex((a) => a.title === article.title)
  );

  return unique.sort((a, b) => b.publishTs - a.publishTs);
}

