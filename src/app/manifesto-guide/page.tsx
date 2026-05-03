"use client";

import { useState } from "react";
import { FileText, CheckCircle, AlertTriangle, Eye, Scale, TrendingUp, Users, ChevronRight, ChevronLeft, Lightbulb, ShieldAlert } from "lucide-react";

const manifestoSections = [
  {
    title: "What is a Manifesto?",
    icon: FileText,
    color: "bg-indigo-100 text-indigo-600",
    content: "A manifesto (or election manifesto) is a public document released by a political party before elections. It outlines the party's vision, promises, policies, and plans for governance if they come to power.",
    keyPoints: [
      "It is NOT a legally binding contract — parties are not legally obligated to fulfill promises",
      "The Supreme Court of India has urged parties to be responsible with promises (S. Subramaniam Balaji vs. Govt. of Tamil Nadu, 2013)",
      "Manifestos are reviewed by the ECI to ensure they don't violate the Model Code of Conduct",
      "Most major parties release manifestos 1-2 weeks before polling day",
    ],
  },
  {
    title: "How to Evaluate Promises",
    icon: Eye,
    color: "bg-emerald-100 text-emerald-600",
    content: "Not all promises are equal. Here's a framework to critically evaluate what a party is promising:",
    keyPoints: [
      "SPECIFICITY — Is the promise specific ('Build 500 hospitals') or vague ('Improve healthcare')?",
      "FEASIBILITY — Is it financially and practically achievable within 5 years?",
      "FUNDING SOURCE — Does the party explain HOW they will pay for the promise?",
      "TRACK RECORD — Has the party delivered on similar promises in the past?",
      "TIMELINE — Is there a clear deadline or is it open-ended?",
    ],
  },
  {
    title: "Red Flags to Watch For",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
    content: "Be cautious of manifestos that rely heavily on emotional appeals without substance:",
    keyPoints: [
      "🚩 Promises of 'free everything' without explaining funding sources",
      "🚩 Vague, unmeasurable goals like 'make India great' without concrete plans",
      "🚩 No mention of fiscal impact or budget allocation",
      "🚩 Contradictory promises (e.g., lower taxes AND higher spending)",
      "🚩 Ignoring ground realities like existing debts or ongoing projects",
      "🚩 Last-minute promises made only during election season with no prior agenda",
    ],
  },
  {
    title: "Check Candidate Credentials",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    content: "Beyond the party manifesto, evaluate the individual candidate standing from your constituency:",
    keyPoints: [
      "Check criminal records on MyNeta.info (ADR) — all candidates must file affidavits",
      "Review their educational qualifications and declared assets",
      "Look at their attendance record if they are a sitting MP/MLA (PRS India)",
      "Check how many questions they raised in Parliament and debates participated in",
      "Evaluate their local work — constituency development fund utilization",
    ],
  },
  {
    title: "Useful Resources",
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-600",
    content: "These non-partisan websites help you make informed voting decisions:",
    keyPoints: [
      "🔗 MyNeta.info — Candidate criminal records, assets, and affidavits (by ADR)",
      "🔗 PRS Legislative Research (prsindia.org) — MP/MLA performance data",
      "🔗 India Votes (indiavotes.com) — Election data and historical results",
      "🔗 ECI Voter Helpline App — Official app for voter services",
      "🔗 Factly.in — Fact-checking political claims and promises",
    ],
  },
];

const sampleManifestoA = [
  { promise: "Build 500 new primary health centers in rural districts within 3 years", rating: "good", reason: "Specific target, clear timeline, measurable" },
  { promise: "Allocate ₹50,000 Cr for highway development from infrastructure cess", rating: "good", reason: "Specific funding source mentioned" },
  { promise: "Reduce unemployment to below 5%", rating: "average", reason: "Measurable goal but no clear plan on HOW" },
  { promise: "Make India a global superpower", rating: "poor", reason: "Vague, unmeasurable, no concrete steps" },
];

const sampleManifestoB = [
  { promise: "Free laptops to all college students", rating: "average", reason: "Specific but no funding source. Estimated cost: ₹30,000 Cr+" },
  { promise: "Double farmer income by 2028 through MSP guarantee", rating: "average", reason: "Has a timeline but implementation details unclear" },
  { promise: "Zero tolerance for corruption", rating: "poor", reason: "No measurable criteria, no enforcement mechanism specified" },
  { promise: "Install 10 lakh EV charging stations, funded by green bonds", rating: "good", reason: "Specific number, named funding mechanism" },
];

export default function ManifestoGuidePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const section = manifestoSections[currentSection];
  const SectionIcon = section.icon;

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "good": return <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">✓ Strong</span>;
      case "average": return <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">⚠ Needs Detail</span>;
      case "poor": return <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">✗ Weak</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
            <Scale className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">How to Read a Manifesto</h1>
          <p className="mt-3 text-lg text-slate-600">Learn to evaluate political promises critically — become an informed voter.</p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {manifestoSections.map((s, i) => (
            <button key={s.title} onClick={() => setCurrentSection(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${currentSection === i ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>
              {i + 1}. {s.title}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-10">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl ${section.color} flex items-center justify-center`}>
                <SectionIcon className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">{section.content}</p>

            <div className="space-y-3">
              {section.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-t border-slate-100">
            <button onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm font-semibold text-slate-500">{currentSection + 1} of {manifestoSections.length}</span>
            <button onClick={() => setCurrentSection(Math.min(manifestoSections.length - 1, currentSection + 1))} disabled={currentSection === manifestoSections.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Tool */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
          <button onClick={() => setShowComparison(!showComparison)} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-slate-900">Practice: Compare Sample Manifestos</h3>
                <p className="text-sm text-slate-500">See how promises from two fictional parties stack up</p>
              </div>
            </div>
            <ChevronRight className={`w-6 h-6 text-slate-400 transition-transform ${showComparison ? "rotate-90" : ""}`} />
          </button>

          {showComparison && (
            <div className="mt-8 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Party A */}
                <div className="border border-blue-200 rounded-2xl overflow-hidden">
                  <div className="bg-blue-600 text-white px-5 py-3 font-bold text-sm">🌟 Progressive Alliance — Promises</div>
                  <div className="p-4 space-y-3">
                    {sampleManifestoA.map((p, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-semibold text-slate-800">{p.promise}</p>
                          {getRatingBadge(p.rating)}
                        </div>
                        <p className="text-xs text-slate-500">{p.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Party B */}
                <div className="border border-orange-200 rounded-2xl overflow-hidden">
                  <div className="bg-orange-600 text-white px-5 py-3 font-bold text-sm">🦅 National Democratic Front — Promises</div>
                  <div className="p-4 space-y-3">
                    {sampleManifestoB.map((p, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-semibold text-slate-800">{p.promise}</p>
                          {getRatingBadge(p.rating)}
                        </div>
                        <p className="text-xs text-slate-500">{p.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-indigo-900 text-sm">Key Takeaway</span>
                </div>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  Always look for <strong>specificity</strong>, <strong>funding sources</strong>, and <strong>measurable targets</strong>. 
                  Promises without clear plans and budgets are often campaign rhetoric rather than genuine policy commitments.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
