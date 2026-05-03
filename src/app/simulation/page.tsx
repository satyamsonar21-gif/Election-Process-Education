"use client";

import { useState, useEffect } from "react";
import { Vote, Info, BarChart3, Fingerprint, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const candidates = [
  { id: "c1", name: "Progressive Alliance", symbol: "🌟", color: "bg-blue-500", tagline: "Building a Modern India" },
  { id: "c2", name: "National Democratic Front", symbol: "🦅", color: "bg-orange-500", tagline: "Unity in Diversity" },
  { id: "c3", name: "Green Future Party", symbol: "🌳", color: "bg-green-500", tagline: "Sustainable Tomorrow" },
  { id: "c4", name: "People's Voice", symbol: "✊", color: "bg-red-500", tagline: "Power to the People" },
  { id: "nota", name: "NOTA", symbol: "❌", color: "bg-slate-500", tagline: "None Of The Above" },
];

export default function SimulationPage() {
  const [step, setStep] = useState<"intro" | "booth" | "confirm" | "done">("intro");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = JSON.parse(localStorage.getItem("election_edu_user") || "null");
      setUser(u);

      // Load existing votes
      const existingVotes = JSON.parse(localStorage.getItem("election_sim_votes") || "{}");
      setVotes(existingVotes);

      // Check if user already voted
      if (u) {
        const voterLog = JSON.parse(localStorage.getItem("election_sim_voters") || "[]");
        if (voterLog.includes(u.email)) {
          setHasVoted(true);
          setStep("done");
        }
      }
    }
  }, []);

  const handleCastVote = () => {
    if (!selectedCandidate || !user) return;

    // Record vote
    const updatedVotes = { ...votes };
    updatedVotes[selectedCandidate] = (updatedVotes[selectedCandidate] || 0) + 1;
    localStorage.setItem("election_sim_votes", JSON.stringify(updatedVotes));
    setVotes(updatedVotes);

    // Record that user voted
    const voterLog = JSON.parse(localStorage.getItem("election_sim_voters") || "[]");
    voterLog.push(user.email);
    localStorage.setItem("election_sim_voters", JSON.stringify(voterLog));

    // Update user progress
    const progress = JSON.parse(localStorage.getItem(`progress_${user.email}`) || "{}");
    progress.hasVoted = true;
    localStorage.setItem(`progress_${user.email}`, JSON.stringify(progress));

    setHasVoted(true);
    setStep("done");
  };

  const totalVotes = Object.values(votes).reduce((a: number, b: any) => a + (b as number), 0);

  /* ─── Intro Screen ─── */
  if (step === "intro") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-500/20 rounded-3xl mb-6">
            <Vote className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Mock Voting Simulation</h1>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            Experience how Electronic Voting Machines (EVMs) work in a safe, simulated environment.
          </p>

          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-left mb-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Info className="text-indigo-400 w-5 h-5" /> How it Works
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> You will see a list of mock candidates — just like a real EVM</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> Press the button next to your preferred candidate</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> Confirm your vote — you can only vote ONCE</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> View the aggregated results after voting</li>
            </ul>
          </div>

          {!user ? (
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-amber-200 mb-3">
                <Lock className="w-5 h-5" />
                <span className="font-bold">Login Required</span>
              </div>
              <p className="text-amber-300/80 text-sm mb-4">You need to be logged in to ensure one vote per person.</p>
              <Link href="/login" className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-2.5 rounded-xl transition-colors">
                Login to Continue
              </Link>
            </div>
          ) : hasVoted ? (
            <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-2xl p-6 mb-8">
              <p className="text-emerald-200 font-bold mb-2">✅ You have already cast your mock vote!</p>
              <button onClick={() => { setStep("done"); setShowResults(true); }} className="text-emerald-400 underline text-sm">
                View Results →
              </button>
            </div>
          ) : (
            <button
              onClick={() => setStep("booth")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-indigo-600/30"
            >
              Enter Polling Booth
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ─── EVM Booth Screen ─── */
  if (step === "booth" || step === "confirm") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep("intro")} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to instructions
          </button>

          {/* EVM Unit */}
          <div className="bg-slate-200 rounded-2xl p-6 sm:p-8 border-[8px] border-slate-300 shadow-2xl relative">
            {/* Header Label */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-6 py-1.5 rounded-sm uppercase tracking-[0.15em] shadow-md">
              Electronic Voting Machine — Mock
            </div>

            {/* Ballot Unit */}
            <div className="bg-white rounded-xl shadow-inner mt-4">
              <div className="grid grid-cols-[1fr_auto_auto] gap-0 text-sm font-bold text-slate-800 px-4 py-3 border-b-2 border-slate-800">
                <span>CANDIDATE / PARTY</span>
                <span className="w-12 text-center">LED</span>
                <span className="w-16 text-center">BUTTON</span>
              </div>

              {candidates.map((c) => (
                <div key={c.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-0 px-4 py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.symbol}</span>
                    <div>
                      <span className="font-bold text-slate-800 text-sm">{c.name}</span>
                      <span className="block text-xs text-slate-500">{c.tagline}</span>
                    </div>
                  </div>
                  {/* LED */}
                  <div className="w-12 flex justify-center">
                    <div className={`w-4 h-4 rounded-full border-2 border-slate-300 transition-all duration-300 ${selectedCandidate === c.id ? "bg-red-500 shadow-[0_0_12px_#ef4444] border-red-400" : "bg-slate-300"}`} />
                  </div>
                  {/* Button */}
                  <div className="w-16 flex justify-center">
                    <button
                      onClick={() => { setSelectedCandidate(c.id); setStep("confirm"); }}
                      className="w-14 h-9 bg-blue-600 hover:bg-blue-500 active:translate-y-0.5 active:shadow-none border-b-4 border-blue-800 rounded-lg shadow-md transition-all"
                      aria-label={`Vote for ${c.name}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Confirm Section */}
            {step === "confirm" && selectedCandidate && (
              <div className="mt-6 animate-fade-in">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-amber-800 font-bold text-sm">
                    ⚠️ You selected: <strong>{candidates.find(c => c.id === selectedCandidate)?.name}</strong>
                  </p>
                  <p className="text-amber-700 text-xs mt-1">Once you press CAST VOTE, your choice is final.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setSelectedCandidate(null); setStep("booth"); }}
                    className="flex-1 py-3 bg-white border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Change
                  </button>
                  <button
                    onClick={handleCastVote}
                    className="flex-1 py-3 bg-emerald-600 border-b-4 border-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-700 active:translate-y-0.5 active:border-b-0 transition-all uppercase tracking-wider"
                  >
                    Cast Vote ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Done / Results Screen ─── */
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center animate-slide-up">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">Vote Cast Successfully!</h1>
        <p className="text-slate-400 text-lg mb-10">Thank you for participating in the mock election. <em>Beep!</em> 🔊</p>

        {/* Results Panel */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-slate-700">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-indigo-400 w-5 h-5" /> Mock Election Results
            </h2>
            <button
              onClick={() => setShowResults(!showResults)}
              className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg font-semibold transition-colors"
            >
              {showResults ? "Hide" : "Reveal"}
            </button>
          </div>

          <div className="p-6">
            {showResults ? (
              <div className="space-y-5">
                <p className="text-sm text-slate-400 text-left">Total Mock Votes: <strong className="text-white">{totalVotes}</strong></p>
                {candidates.map((c) => {
                  const count = votes[c.id] || 0;
                  const pct = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                  return (
                    <div key={c.id} className="text-left">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300 font-medium">{c.symbol} {c.name}</span>
                        <span className="text-white font-bold">{count} votes ({pct.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${c.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-slate-500">
                <Fingerprint className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Results are sealed.</p>
                <p className="text-sm mt-1">Click &quot;Reveal&quot; to view current standings.</p>
              </div>
            )}
          </div>
        </div>

        <Link href="/dashboard" className="inline-block mt-8 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
