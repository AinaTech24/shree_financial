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

const excerptOf = (text, title = "", max = 150) => {
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
  if (t.includes("sip") || t.includes("systematic")) return "SIP & Investing";
  if (t.includes("mutual fund") || t.includes("amc") || t.includes("nfo") || t.includes("elss"))
    return "Mutual Funds";
  if (t.includes("sensex") || t.includes("nifty") || t.includes("stock") || t.includes("market"))
    return "Markets";
  if (t.includes("rbi") || t.includes("inflation") || t.includes("repo")) return "Economy";
  return "Personal Finance";
};

function extractImage(itemStr) {
  let m = itemStr.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (m && m[1]) return m[1];
  m = itemStr.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (m && m[1]) return m[1];
  m = itemStr.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (m && m[1]) return m[1];
  return FALLBACK_IMAGE;
}

async function fetchFeed(source) {
  // First attempt: rss2json
  try {
    const feedUrl = encodeURIComponent(source.url);
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        return data.items.slice(0, 8).map((item) => ({
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
      }
    }
  } catch (e) {
    // Fall through to direct RSS XML
  }

  // Fallback: direct RSS XML fetch (works on Node server environment)
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
        image: extractImage(item),
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
    console.error("fetchFeed direct failed for", source.name, err.message);
    return [];
  }
}

async function fetchLiveBlogs() {
  const results = (await Promise.all(SOURCES.map(fetchFeed))).flat().filter((a) => a.title);
  const unique = results.filter(
    (article, index, self) => index === self.findIndex((a) => a.title === article.title)
  );
  return unique.sort((a, b) => b.publishTs - a.publishTs);
}

fetchLiveBlogs().then((blogs) => {
  console.log("Successfully fetched total blogs:", blogs.length);
  if (blogs.length > 0) {
    console.log("Sample article:", {
      title: blogs[0].title,
      source: blogs[0].source,
      category: blogs[0].category,
      date: blogs[0].date,
      readTime: blogs[0].readTime,
      image: blogs[0].image,
      url: blogs[0].url,
    });
  }
});

