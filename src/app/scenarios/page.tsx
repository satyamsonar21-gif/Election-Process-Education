"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Trophy, RotateCcw, Sparkles, Theater } from "lucide-react";
import { scenarios } from "@/data/scenarioData";

export default function ScenariosPage() {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const reset = () => { setCurrentQ(0); setSelectedAnswer(null); setIsSubmitted(false); setScore(0); setFinished(false); };
  const backToList = () => { setActiveScenario(null); reset(); };

  const handleSubmit = () => {
    if (selectedAnswer === null || activeScenario === null) return;
    const s = scenarios[activeScenario];
    if (selectedAnswer === s.questions[currentQ].correctIndex) setScore((p) => p + 1);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (activeScenario === null) return;
    const s = scenarios[activeScenario];
    if (currentQ < s.questions.length - 1) {
      setCurrentQ((p) => p + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setFinished(true);
    }
  };

  // ─── Scenario Selection ───
  if (activeScenario === null) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl mb-4">
              <Theater className="w-8 h-8 text-violet-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Role-Play Scenarios</h1>
            <p className="mt-3 text-lg text-slate-600">Step into the shoes of election officials and learn how Indian elections are administered.</p>
          </div>
          <div className="grid gap-6">
            {scenarios.map((s, i) => (
              <button key={s.id} onClick={() => { setActiveScenario(i); reset(); }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                    {s.emoji}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{s.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">{s.questions.length} decisions</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700">Role: {s.role}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const scenario = scenarios[activeScenario];

  // ─── Finished Screen ───
  if (finished) {
    const total = scenario.questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center border border-slate-100 animate-slide-up">
          <div className="text-5xl mb-4">{scenario.emoji}</div>
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Scenario Complete!</h2>
          <p className="text-slate-500 mb-6">{scenario.title}</p>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.91" fill="none" stroke={pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="3" strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900">{score}</span>
              <span className="text-xs text-slate-500">out of {total}</span>
            </div>
          </div>
          <p className="text-lg font-semibold mb-8">
            {pct >= 80 ? "🎉 Excellent! You'd make a great election official!" : pct >= 50 ? "👍 Good job! Keep learning the rules." : "📚 Review the guide for more details."}
          </p>
          <div className="space-y-3">
            <button onClick={reset} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              <RotateCcw className="w-4 h-4" /> Replay Scenario
            </button>
            <button onClick={backToList} className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              All Scenarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Active Question ───
  const q = scenario.questions[currentQ];
  const progress = (currentQ / scenario.questions.length) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={backToList} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-1 transition-colors">← Back to scenarios</button>
            <h1 className="text-2xl font-bold text-slate-900">{scenario.title}</h1>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Decision</span>
            <div className="text-2xl font-extrabold text-indigo-600">{currentQ + 1}<span className="text-slate-300 text-lg font-normal"> / {scenario.questions.length}</span></div>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-10">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{scenario.emoji}</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${scenario.color} text-white`}>Role: {scenario.role}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 leading-relaxed">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let cls = "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium flex items-center gap-4 ";
              let icon = null;
              if (!isSubmitted) {
                cls += selectedAnswer === i ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
              } else {
                if (i === q.correctIndex) { cls += "border-emerald-500 bg-emerald-50 text-emerald-800"; icon = <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />; }
                else if (selectedAnswer === i) { cls += "border-red-400 bg-red-50 text-red-700"; icon = <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />; }
                else { cls += "border-slate-200 text-slate-400 opacity-50"; }
              }
              return (
                <button key={i} onClick={() => !isSubmitted && setSelectedAnswer(i)} disabled={isSubmitted} className={cls}>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${selectedAnswer === i && !isSubmitted ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-indigo-900 text-sm">ECI Guideline</h3>
              </div>
              <p className="text-sm text-indigo-800 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            {!isSubmitted ? (
              <button onClick={handleSubmit} disabled={selectedAnswer === null}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm">
                Submit Decision
              </button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                {currentQ < scenario.questions.length - 1 ? "Next Decision" : "See Results"} <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
