"use client";

import { useState } from "react";
import { History, TrendingUp, Award, Calendar, BarChart3, ChevronRight } from "lucide-react";
import { electionHistory, milestones } from "@/data/historyData";

export default function HistoryPage() {
  const [tab, setTab] = useState<"timeline" | "turnout" | "milestones">("timeline");
  const [selectedElection, setSelectedElection] = useState<number | null>(null);

  const maxTurnout = Math.max(...electionHistory.map((e) => e.turnout));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
            <History className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Indian Election History</h1>
          <p className="mt-3 text-lg text-slate-600">
            From 1951 to 2024 — explore 18 Lok Sabha elections that shaped the world&apos;s largest democracy.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: "timeline" as const, label: "Election Timeline", icon: Calendar },
            { id: "turnout" as const, label: "Voter Turnout Chart", icon: TrendingUp },
            { id: "milestones" as const, label: "Key Milestones", icon: Award },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${tab === t.id ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>
                <Icon className="w-4 h-4" />{t.label}
              </button>
            );
          })}
        </div>

        {/* ─── Timeline Tab ─── */}
        {tab === "timeline" && (
          <div className="grid gap-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Elections Held", value: "18" },
                { label: "Highest Turnout", value: "67.4%" },
                { label: "Latest Electorate", value: "96.8 Cr" },
                { label: "Lok Sabha Seats", value: "543" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
                  <div className="text-2xl font-extrabold text-indigo-600">{s.value}</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {electionHistory.map((e, i) => (
              <button key={e.year} onClick={() => setSelectedElection(selectedElection === i ? null : i)}
                className="w-full text-left bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-white">
                    <span className="text-xs font-bold leading-none">{e.number}</span>
                    <span className="text-[10px] opacity-80">LS</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-lg">{e.year}</h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{e.winner}</span>
                      <span className="text-xs text-slate-500">PM: {e.pm}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span>Turnout: <strong className="text-slate-700">{e.turnout}%</strong></span>
                      <span>Voters: <strong className="text-slate-700">{e.totalVoters}</strong></span>
                      <span>Seats: <strong className="text-slate-700">{e.seats}</strong></span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${selectedElection === i ? "rotate-90" : ""}`} />
                </div>
                {selectedElection === i && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-fade-in">
                    <p className="text-sm text-indigo-800 leading-relaxed">📌 {e.highlight}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ─── Turnout Chart Tab ─── */}
        {tab === "turnout" && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Voter Turnout Across 18 Lok Sabha Elections</h2>
            </div>

            <div className="space-y-3">
              {electionHistory.map((e) => {
                const pct = (e.turnout / maxTurnout) * 100;
                return (
                  <div key={e.year} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-semibold text-slate-700 text-right flex-shrink-0">{e.year}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden relative">
                      <div
                        className="h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                        style={{ width: `${pct}%` }}
                      >
                        <span className="text-xs font-bold text-white">{e.turnout}%</span>
                      </div>
                    </div>
                    <span className="w-16 text-xs text-slate-500 flex-shrink-0">{e.totalVoters}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm font-bold text-emerald-800">📈 Highest Turnout</p>
                <p className="text-lg font-extrabold text-emerald-700 mt-1">67.4% (2019)</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <p className="text-sm font-bold text-red-800">📉 Lowest Turnout</p>
                <p className="text-lg font-extrabold text-red-700 mt-1">45.7% (1951-52)</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <p className="text-sm font-bold text-indigo-800">📊 Electorate Growth</p>
                <p className="text-lg font-extrabold text-indigo-700 mt-1">17.3 Cr → 96.8 Cr</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── Milestones Tab ─── */}
        {tab === "milestones" && (
          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 rounded-full" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative pl-16 sm:pl-20 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="absolute left-3 sm:left-5 w-7 h-7 bg-white border-4 border-indigo-500 rounded-full z-10" />
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-extrabold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{m.year}</span>
                      <h3 className="font-bold text-slate-900">{m.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
