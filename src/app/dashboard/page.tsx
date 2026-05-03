"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, BookOpen, Brain, Vote, Award, Calendar, ArrowRight, Sparkles, Trophy, Star, Flame, Medal, Lock, CheckCircle, Settings } from "lucide-react";
import NextStepWidget from "@/components/dashboard/NextStepWidget";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import ProfileSettingsModal from "@/components/dashboard/ProfileSettingsModal";
import CertificateWidget from "@/components/dashboard/CertificateWidget";
import EmbeddedChatAssistant from "@/components/chat/EmbeddedChatAssistant";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  check: (p: any) => boolean;
}

const badges: Badge[] = [
  { id: "first-steps", name: "First Steps", description: "Create your account", icon: Medal, color: "text-blue-600", bgColor: "bg-blue-100", check: () => true },
  { id: "guide-graduate", name: "Guide Graduate", description: "Complete the full election guide", icon: BookOpen, color: "text-emerald-600", bgColor: "bg-emerald-100", check: (p: any) => p.guideCompleted === true },
  { id: "quiz-rookie", name: "Quiz Rookie", description: "Take your first quiz", icon: Brain, color: "text-purple-600", bgColor: "bg-purple-100", check: (p: any) => (p.quizScores?.length || 0) >= 1 },
  { id: "quiz-master", name: "Quiz Master", description: "Score 100% on any quiz", icon: Trophy, color: "text-amber-600", bgColor: "bg-amber-100", check: (p: any) => (p.quizScores || []).some((q: any) => q.score === q.total) },
  { id: "mock-voter", name: "Mock Voter", description: "Cast a mock vote in the simulation", icon: Vote, color: "text-indigo-600", bgColor: "bg-indigo-100", check: (p: any) => p.hasVoted === true },
  { id: "hat-trick", name: "Hat Trick", description: "Score 80%+ on 3 different quizzes", icon: Flame, color: "text-orange-600", bgColor: "bg-orange-100", check: (p: any) => (p.quizScores || []).filter((q: any) => q.score / q.total >= 0.8).length >= 3 },
  { id: "democracy-champion", name: "Democracy Champion", description: "Complete guide, quiz, and simulation", icon: Star, color: "text-rose-600", bgColor: "bg-rose-100", check: (p: any) => p.guideCompleted && (p.quizScores?.length || 0) >= 1 && p.hasVoted },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = JSON.parse(localStorage.getItem("election_edu_user") || "null");
      if (!u) { router.push("/login"); return; }
      setUser(u);
      const p = JSON.parse(localStorage.getItem(`progress_${u.email}`) || '{"guideCompleted":false,"lastStepId":"registration","quizScores":[],"hasVoted":false}');
      setProgress(p);
      setLoading(false);
    }
  }, [router]);

  if (loading || !user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const quizScores = progress.quizScores || [];
  const bestScore = quizScores.length > 0 ? Math.max(...quizScores.map((q: any) => q.score)) : 0;
  const bestTotal = quizScores.length > 0 ? quizScores.find((q: any) => q.score === bestScore)?.total || 5 : 5;

  const unlockedBadges = badges.filter((b) => b.check(progress));
  const lockedBadges = badges.filter((b) => !b.check(progress));
  const isDemocracyChampion = progress.guideCompleted && (progress.quizScores?.length || 0) >= 1 && progress.hasVoted;

  const stats = [
    { label: "Guide Progress", value: progress.guideCompleted ? "Completed" : "In Progress", icon: BookOpen, iconBg: "bg-blue-100", iconColor: "text-blue-600", badge: progress.guideCompleted ? { text: "✓ Done", color: "bg-emerald-100 text-emerald-700" } : null, link: "/guide", linkText: "Continue Guide" },
    { label: "Best Quiz Score", value: `${bestScore} / ${bestTotal}`, icon: Brain, iconBg: "bg-purple-100", iconColor: "text-purple-600", badge: null, link: "/quiz", linkText: "Take a Quiz", subtitle: `${quizScores.length} quizzes taken` },
    { label: "Mock Election", value: progress.hasVoted ? "Voted ✓" : "Not Voted", icon: Vote, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", badge: progress.hasVoted ? { text: "✓ Done", color: "bg-emerald-100 text-emerald-700" } : null, link: "/simulation", linkText: "Cast Mock Vote" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden">
              {user.picture ? <img src={user.picture} alt={user.name} className="w-full h-full object-cover" /> : <User className="w-7 h-7" />}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Welcome, {user.name}!</h1>
              <p className="text-slate-500 mt-0.5">Track your learning progress and election knowledge.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-sm transition-all"
            aria-label="Profile Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Next Step */}
        <NextStepWidget progress={progress} />

        {/* Certificate Section (Conditional) */}
        <CertificateWidget user={user} isUnlocked={isDemocracyChampion} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${stat.iconBg} ${stat.iconColor} p-3 rounded-xl`}><Icon className="w-6 h-6" /></div>
                  {stat.badge && <span className={`text-xs font-bold px-3 py-1 rounded-full ${stat.badge.color}`}>{stat.badge.text}</span>}
                </div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                {stat.subtitle && <p className="text-sm text-slate-400 mt-1">{stat.subtitle}</p>}
                <Link href={stat.link} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  {stat.linkText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900">Achievements</h2>
            </div>
            <span className="text-sm font-bold text-indigo-600">{unlockedBadges.length} / {badges.length} earned</span>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-5">
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(unlockedBadges.length / badges.length) * 100}%` }} />
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              const isUnlocked = badge.check(progress);
              return (
                <div key={badge.id} className={`relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${isUnlocked ? "bg-white border-amber-200 shadow-sm" : "bg-slate-50 border-slate-200 opacity-60"}`}
                  title={isUnlocked ? `✓ ${badge.name}: ${badge.description}` : `🔒 ${badge.name}: ${badge.description}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${isUnlocked ? badge.bgColor : "bg-slate-200"}`}>
                    {isUnlocked ? <Icon className={`w-6 h-6 ${badge.color}`} /> : <Lock className="w-5 h-5 text-slate-400" />}
                  </div>
                  <span className={`text-xs font-bold ${isUnlocked ? "text-slate-900" : "text-slate-400"}`}>{badge.name}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">{badge.description}</span>
                  {isUnlocked && <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center"><CheckCircle className="w-3 h-3 text-white" /></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links to New Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { href: "/glossary", label: "Election Glossary", emoji: "📖", desc: "39+ terms explained" },
            { href: "/eligibility", label: "Eligibility Check", emoji: "✅", desc: "Am I eligible?" },
            { href: "/scenarios", label: "Role-Play", emoji: "🎭", desc: "3 scenarios" },
            { href: "/history", label: "Election History", emoji: "📈", desc: "1951 to 2024" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{item.label}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Interactive Analytics Chart */}
        <AnalyticsChart quizScores={quizScores} />

        {/* AI Chat Assistant Section */}
        <EmbeddedChatAssistant />

        {/* Recent Quiz Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900">Recent Quiz Activity</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {quizScores.length > 0 ? (
              quizScores.slice().reverse().slice(0, 10).map((s: any, idx: number) => (
                <div key={idx} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-50 p-2.5 rounded-xl text-purple-500"><Brain className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {s.quizId === "basics" ? "Election Basics" : s.quizId === "process" ? "Election Process & Rules" : "Quiz"}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(s.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${(s.score / s.total) >= 0.8 ? "bg-emerald-100 text-emerald-700" : (s.score / s.total) >= 0.5 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {s.score}/{s.total}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-slate-500">
                <Brain className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No quiz activity yet</p>
                <Link href="/quiz" className="mt-3 inline-block text-indigo-600 font-semibold hover:underline text-sm">Take your first quiz →</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showSettings && (
        <ProfileSettingsModal 
          user={user} 
          onClose={() => setShowSettings(false)} 
          onUpdate={(updatedUser) => setUser(updatedUser)} 
        />
      )}
    </div>
  );
}
