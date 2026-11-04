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

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop";

export const SOURCES = [
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

export const PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

export const firstImage = (itemXml: string, html = ""): string => {
  try {
    let match = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];

    match = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];

    match = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];

    match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];

    match = html.match(/data-src=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];

    return FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
};

export const excerptOf = (text: string, title = "", max = 150): string => {
  const clean = stripHtml(text);

  if (!clean || clean.length < 40) {
    return `Read the latest update on ${title.toLowerCase()} — trends, context and what it means for long-term investors.`;
  }

  return clean.length > max ? clean.slice(0, max) + "…" : clean;
};

export const readTimeOf = (text = ""): string => {
  const words = stripHtml(text).split(" ").filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
};

export const categorize = (text = ""): string => {
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

async function fetchFeed(source: (typeof SOURCES)[0]): Promise<LiveArticle[]> {
  // 1. First attempt: rss2json as requested
  try {
    const feedUrl = encodeURIComponent(source.url);
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.items && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.slice(0, 8).map((item: any) => ({
          id: item.guid || item.link,
          title: stripHtml(item.title || ""),
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
      }
    }
  } catch (e) {
    // Continue to direct XML fetch
  }

  // 2. Direct RSS feed parsing (resilient server-side fetch without rate limits)
  try {
    const res = await fetch(source.url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const text = await res.text();
    const items = text.match(/<item[\s\S]*?<\/item>/gi) || [];

    return items.slice(0, 8).map((item, idx) => {
      const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      const descMatch = item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
      const pubMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

      const title = stripHtml(titleMatch ? titleMatch[1] : "").replace(/\]\]>$/, "");
      const desc = stripHtml(descMatch ? descMatch[1] : "").replace(/\]\]>$/, "");
      const link = (linkMatch ? linkMatch[1] : "").trim().replace(/\]\]>$/, "");
      const pubDate = pubMatch ? pubMatch[1] : "";

      return {
        id: link || `${source.name}-${idx}`,
        title,
        excerpt: excerptOf(desc, title),
        image: firstImage(item, descMatch ? descMatch[1] : ""),
        category: categorize(`${title} ${desc}`),
        readTime: readTimeOf(desc),
        date: pubDate
          ? new Date(pubDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
        publishTs: pubDate ? new Date(pubDate).getTime() : Date.now(),
        url: link,
        source: source.name,
        isLive: true,
        accent: source.accent,
      };
    });
  } catch (err) {
    console.error(`Error fetching feed for ${source.name}:`, err);
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

