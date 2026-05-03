"use client";

import { useState, useEffect } from "react";
import { Newspaper, ExternalLink, Calendar, RefreshCw, AlertTriangle, Search, Globe, MapPin } from "lucide-react";

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<"india" | "global" | "politics" | "voting">("india");

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/news?topic=${topic}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch news from server.");
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setNews(data.articles || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching news.");
      
      // Fallback data in case the local API fails for some reason
      setNews([
        {
          title: "Election Commission announces new guidelines for upcoming polls",
          description: "The Election Commission of India has released a comprehensive set of guidelines focusing on digital campaigning and voter accessibility for the upcoming phase.",
          content: "Full content...",
          url: "#",
          image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
          publishedAt: new Date().toISOString(),
          source: { name: "Democracy India", url: "#" }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [topic]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-4">
              <Newspaper className="w-4 h-4" /> Live Updates
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Election News & Updates
            </h1>
            <p className="text-slate-500 mt-2 max-w-2xl text-lg">
              Stay informed with the latest daily news regarding elections, democracy, and political developments.
            </p>
          </div>
          
          <button 
            onClick={fetchNews}
            disabled={loading}
            className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 font-semibold rounded-xl transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-indigo-600" : ""}`} />
            Refresh News
          </button>
        </div>

        <div className="flex flex-wrap bg-slate-200/50 p-1 rounded-xl w-fit mb-8 border border-slate-200 gap-1">
          <button
            onClick={() => setTopic("india")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${topic === "india" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <MapPin className="w-4 h-4" /> India Elections
          </button>
          <button
            onClick={() => setTopic("global")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${topic === "global" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Globe className="w-4 h-4" /> Global Democracy
          </button>
          <button
            onClick={() => setTopic("politics")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${topic === "politics" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <MapPin className="w-4 h-4" /> Politics & Parliament
          </button>
          <button
            onClick={() => setTopic("voting")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${topic === "voting" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <MapPin className="w-4 h-4" /> Voting & EVMs
          </button>
        </div>

        {/* Error / Warning Alert */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 font-medium">
              {error}
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col sm:flex-row gap-4 h-full">
                <div className="w-full sm:w-40 h-40 bg-slate-200 rounded-xl shrink-0"></div>
                <div className="flex-1 py-2">
                  <div className="h-4 bg-slate-200 rounded w-1/4 mb-3"></div>
                  <div className="h-5 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-5 bg-slate-200 rounded w-5/6 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No news found</h3>
            <p className="text-slate-500">We couldn't find any recent news for this topic. Try refreshing later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item, idx) => (
              <a 
                key={idx} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[2/1] w-full overflow-hidden relative bg-slate-100">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-slate-900 rounded-lg shadow-sm">
                    {item.source.name}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-indigo-600 text-sm font-semibold group-hover:gap-1.5 transition-all">
                    Read full article <ExternalLink className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
