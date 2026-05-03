import { NextResponse } from "next/server";

/**
 * News API route — fetches election & politics news from GNews API.
 * Supports topics: india, global, politics, voting
 * Falls back to curated stock images when article images are missing.
 */

const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
  "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=800&q=80",
  "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80",
  "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80",
  "https://images.unsplash.com/photo-1575384043015-802c638f2eb8?w=800&q=80",
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
  "https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
  "https://images.unsplash.com/photo-1555848960-8c3ed4cf32a0?w=800&q=80",
  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
  "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80",
];

/* Topic → search query mapping */
const TOPIC_CONFIG: Record<string, { query: string; lang: string; country?: string }> = {
  india: {
    query: "India election OR India politics OR Indian democracy OR Lok Sabha",
    lang: "en",
    country: "in",
  },
  global: {
    query: "elections OR democracy OR voting OR political reform",
    lang: "en",
  },
  politics: {
    query: "India politics OR parliament OR BJP OR Congress OR political party India",
    lang: "en",
    country: "in",
  },
  voting: {
    query: "voter registration OR EVM OR election commission OR NOTA OR VVPAT",
    lang: "en",
    country: "in",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "india";

  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey || apiKey === "YOUR_GNEWS_API_KEY_HERE") {
    return NextResponse.json(
      { error: "News API key is not configured. Please add your GNews API key to .env.local" },
      { status: 503 }
    );
  }

  const config = TOPIC_CONFIG[topic] || TOPIC_CONFIG.india;

  // Build GNews API URL
  const params = new URLSearchParams({
    q: config.query,
    lang: config.lang,
    max: "12",
    apikey: apiKey,
    sortby: "publishedAt",
  });

  if (config.country) {
    params.set("country", config.country);
  }

  const gnewsUrl = `https://gnews.io/api/v4/search?${params.toString()}`;

  try {
    const response = await fetch(gnewsUrl, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("GNews API error:", response.status, errorBody);

      // If rate-limited or error, try top-headlines as fallback
      if (response.status === 429 || response.status === 403) {
        return await fetchTopHeadlines(apiKey, config, topic);
      }

      throw new Error(`GNews API returned ${response.status}`);
    }

    const data = await response.json();
    const articles = (data.articles || []).map((article: any, idx: number) => ({
      title: article.title || "Untitled",
      description: article.description || `Latest ${topic === "global" ? "global" : "Indian"} election and political news. Click to read the full article.`,
      url: article.url || "#",
      image: article.image || STOCK_IMAGES[idx % STOCK_IMAGES.length],
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        name: article.source?.name || "News Source",
        url: article.source?.url || "#",
      },
      content: article.content || "",
    }));

    return NextResponse.json({ articles, topic, totalResults: articles.length });
  } catch (error: any) {
    console.error("News fetch error:", error?.message || error);

    // Final fallback: try top-headlines endpoint
    try {
      return await fetchTopHeadlines(apiKey, config, topic);
    } catch {
      return NextResponse.json(
        { error: "Failed to fetch news. Please try again later.", articles: [] },
        { status: 500 }
      );
    }
  }
}

/**
 * Fallback: fetch top headlines when search endpoint fails or is rate-limited.
 */
async function fetchTopHeadlines(
  apiKey: string,
  config: { lang: string; country?: string },
  topic: string
) {
  const params = new URLSearchParams({
    lang: config.lang,
    max: "10",
    apikey: apiKey,
    topic: "nation", // GNews category
  });

  if (config.country) {
    params.set("country", config.country);
  }

  const url = `https://gnews.io/api/v4/top-headlines?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 1800 } });

  if (!res.ok) {
    throw new Error(`Top headlines also failed: ${res.status}`);
  }

  const data = await res.json();
  const articles = (data.articles || []).map((article: any, idx: number) => ({
    title: article.title || "Untitled",
    description: article.description || "Click to read the full article.",
    url: article.url || "#",
    image: article.image || STOCK_IMAGES[idx % STOCK_IMAGES.length],
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: {
      name: article.source?.name || "News Source",
      url: article.source?.url || "#",
    },
    content: article.content || "",
  }));

  return NextResponse.json({ articles, topic, totalResults: articles.length });
}
