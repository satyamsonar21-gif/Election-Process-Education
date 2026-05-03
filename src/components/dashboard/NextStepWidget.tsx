"use client";

import { ArrowRight, BookOpen, Brain, PlayCircle, Search, Vote } from "lucide-react";
import Link from "next/link";

interface NextStepWidgetProps {
  progress: any;
}

export default function NextStepWidget({ progress }: NextStepWidgetProps) {
  let suggestion = {
    title: "Start Your Journey",
    description: "Begin with the interactive election guide to learn the basics.",
    link: "/guide",
    linkText: "Start the Guide",
    icon: PlayCircle,
    color: "bg-blue-100 text-blue-600",
  };

  const quizScores = progress.quizScores || [];

  if (!progress.guideCompleted && progress.lastStepId !== "registration") {
    suggestion = {
      title: "Continue Your Learning",
      description: "You're halfway through the guide. Keep going to earn your Guide Graduate badge!",
      link: "/guide",
      linkText: "Continue Guide",
      icon: BookOpen,
      color: "bg-emerald-100 text-emerald-600",
    };
  } else if (progress.guideCompleted && quizScores.length === 0) {
    suggestion = {
      title: "Test Your Knowledge",
      description: "You've finished the guide! Now take a quiz to see what you've learned.",
      link: "/quiz",
      linkText: "Take a Quiz",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
    };
  } else if (progress.guideCompleted && quizScores.length > 0 && !progress.hasVoted) {
    suggestion = {
      title: "Experience Voting",
      description: "Try out the EVM simulation to cast your first mock vote.",
      link: "/simulation",
      linkText: "Start Simulation",
      icon: Vote,
      color: "bg-indigo-100 text-indigo-600",
    };
  } else if (progress.guideCompleted && quizScores.length > 0 && progress.hasVoted) {
    suggestion = {
      title: "Keep Exploring",
      description: "Review the glossary to master election terminology.",
      link: "/glossary",
      linkText: "View Glossary",
      icon: Search,
      color: "bg-amber-100 text-amber-600",
    };
  }

  const Icon = suggestion.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="flex items-start gap-4">
        <div className={`p-4 rounded-2xl ${suggestion.color}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Next Step</h3>
          <h4 className="text-xl font-bold text-slate-900">{suggestion.title}</h4>
          <p className="text-slate-500 mt-1 text-sm">{suggestion.description}</p>
        </div>
      </div>
      
      <Link href={suggestion.link} className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-sm w-full sm:w-auto justify-center">
        {suggestion.linkText} <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
