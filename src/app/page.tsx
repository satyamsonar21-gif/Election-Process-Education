import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Vote, MessageSquare, ShieldCheck, Users, BookText, Theater, Scale, History, CheckCircle } from "lucide-react";

const features = [
  { icon: BookOpen, iconBg: "bg-indigo-100", iconColor: "text-indigo-600", title: "Interactive Guide", description: "Step-by-step visual learning from voter registration to counting day in the Indian election system." },
  { icon: Vote, iconBg: "bg-purple-100", iconColor: "text-purple-600", title: "EVM Voting Simulation", description: "Experience a realistic mock EVM. Practice casting your vote with VVPAT verification." },
  { icon: Brain, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", title: "Knowledge Quiz", description: "Test your understanding with quizzes on Indian election laws, ECI guidelines, and NOTA." },
  { icon: MessageSquare, iconBg: "bg-amber-100", iconColor: "text-amber-600", title: "AI Chat Assistant", description: "Got questions? Our AI assistant provides instant answers about EVM, VVPAT, MCC, and more." },
  { icon: BookText, iconBg: "bg-sky-100", iconColor: "text-sky-600", title: "Election Glossary", description: "39+ essential terms — from Anti-Defection Law to VVPAT — explained in plain language." },
  { icon: ShieldCheck, iconBg: "bg-rose-100", iconColor: "text-rose-600", title: "Eligibility Checker", description: "Check if you're eligible to vote and get a polling-day document checklist." },
  { icon: Theater, iconBg: "bg-violet-100", iconColor: "text-violet-600", title: "Role-Play Scenarios", description: "Be the Presiding Officer, Counting Agent, or Election Commissioner in interactive scenarios." },
  { icon: Scale, iconBg: "bg-orange-100", iconColor: "text-orange-600", title: "Manifesto Guide", description: "Learn how to critically evaluate political manifestos and candidate credentials." },
  { icon: History, iconBg: "bg-teal-100", iconColor: "text-teal-600", title: "Election History", description: "Explore 18 Lok Sabha elections from 1951 to 2024 with turnout charts and milestones." },
];

const stats = [
  { value: "39+", label: "Glossary Terms" },
  { value: "10+", label: "Quiz Questions" },
  { value: "18", label: "Elections Tracked" },
  { value: "7", label: "Badges to Earn" },
  { value: "3", label: "Role-Play Scenarios" },
  { value: "100%", label: "Free & Offline" },
];

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />
        <div className="absolute top-10 right-[15%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-8">
            <Vote className="w-4 h-4" /> Indian Election Education Platform
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Demystifying{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              India&apos;s Elections
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            An interactive platform designed to educate citizens about how
            Indian democracy works — from voter registration to Lok Sabha result day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guide"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all">
              Start Learning <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/chat"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-indigo-700 bg-indigo-50 border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-100 shadow-sm transition-all">
              Ask AI <MessageSquare className="h-5 w-5" />
            </Link>
            <Link href="/simulation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-slate-700 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-sm transition-all">
              Try EVM Simulation <Vote className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-indigo-600">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Everything you need to vote confidently
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Our platform covers the complete Indian election journey with interactive tools and AI-powered assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title}
                  className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all group">
                  <div className={`${feature.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                    <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* India Focus Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Built for India&apos;s Democracy</h2>
            <p className="mt-4 text-lg text-slate-500">Focused entirely on the Indian election system — ECI, EVMs, VVPAT, and beyond.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Covers all 18 Lok Sabha elections (1951–2024)",
              "EVM & VVPAT simulation based on real ECI guidelines",
              "39+ glossary terms specific to Indian elections",
              "Role-play as Presiding Officer or Election Commissioner",
              "Voter eligibility checker with 12 valid ID proofs",
              "Manifesto evaluation using real Indian examples",
              "Links to official ECI, NVSP, MyNeta resources",
              "Quiz questions based on Indian constitutional provisions",
              "Data privacy — everything stored locally on your device",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to become an informed Indian voter?
          </h2>
          <p className="text-indigo-100 mb-10 text-lg leading-relaxed">
            Create a free account to track your learning progress, earn badges,
            save quiz scores, and participate in mock elections.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 transition-colors shadow-lg">
            Create Free Account <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
