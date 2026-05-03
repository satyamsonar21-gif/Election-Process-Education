"use client";

import { useState, useMemo } from "react";
import { Search, BookText, Landmark, Scale, Cpu, Megaphone, Users, ChevronDown, ChevronUp } from "lucide-react";
import { glossaryTerms, categories } from "@/data/glossaryData";

const categoryIcons: Record<string, any> = {
  all: BookText, voting: Users, institutions: Landmark, legal: Scale, technology: Cpu, campaigns: Megaphone,
};
const categoryColors: Record<string, string> = {
  all: "bg-indigo-100 text-indigo-700", voting: "bg-blue-100 text-blue-700", institutions: "bg-purple-100 text-purple-700",
  legal: "bg-amber-100 text-amber-700", technology: "bg-emerald-100 text-emerald-700", campaigns: "bg-rose-100 text-rose-700",
};

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return glossaryTerms
      .filter((t) => {
        const matchCat = activeCategory === "all" || t.category === activeCategory;
        const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof glossaryTerms> = {};
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(term);
    }
    return map;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
            <BookText className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Election Glossary</h1>
          <p className="mt-3 text-lg text-slate-600">{glossaryTerms.length} essential terms about the Indian election system, explained simply.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Search terms like EVM, NOTA, Lok Sabha..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm" aria-label="Search glossary terms" />
          {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold">Clear</button>}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || BookText;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeCategory === cat.id ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                <Icon className="w-4 h-4" />{cat.label}
              </button>
            );
          })}
        </div>

        {/* Letter Jump */}
        {letters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mb-8">
            {letters.map((l) => <a key={l} href={`#letter-${l}`} className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">{l}</a>)}
          </div>
        )}

        {/* Terms List */}
        {letters.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No terms found matching your search.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-3 text-indigo-600 font-semibold text-sm hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-8">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-extrabold text-lg">{letter}</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid gap-3">
                  {grouped[letter].map((item) => {
                    const isExpanded = expandedTerm === item.term;
                    const catColor = categoryColors[item.category] || categoryColors.all;
                    const catLabel = categories.find((c) => c.id === item.category)?.label || "";
                    return (
                      <button key={item.term} onClick={() => setExpandedTerm(isExpanded ? null : item.term)}
                        className="w-full text-left bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 text-base truncate">{item.term}</h3>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${catColor} flex-shrink-0`}>{catLabel}</span>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />}
                        </div>
                        {isExpanded && <p className="mt-3 text-sm text-slate-600 leading-relaxed animate-fade-in">{item.definition}</p>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 text-sm text-slate-500">Showing {filtered.length} of {glossaryTerms.length} terms</div>
      </div>
    </div>
  );
}
