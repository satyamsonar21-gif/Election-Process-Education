"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft, UserPlus, Megaphone, Vote, Calculator, Trophy, ExternalLink } from "lucide-react";

const guideSteps = [
  {
    id: "registration",
    title: "1. Voter Registration",
    icon: UserPlus,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    content: "The foundation of democracy begins with registering to vote. In India, any citizen aged 18 or above is eligible to vote.",
    details: [
      "You must be a citizen of India and at least 18 years old on the qualifying date",
      "Registration is done through Form 6 at the Electoral Registration Office or online via NVSP portal",
      "Once registered, you receive an EPIC (Elector's Photo Identity Card) — the Voter ID",
      "You can check your name on the electoral roll online at eci.gov.in",
    ],
    realWorldExample: "In the 2024 Indian General Elections, over 96.8 crore voters were registered — the largest electorate in the world!"
  },
  {
    id: "campaign",
    title: "2. Political Campaigning",
    icon: Megaphone,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    content: "Candidates and political parties present their vision and campaign to win the trust of voters through various means.",
    details: [
      "Parties release election manifestos outlining their policies and promises",
      "Campaigning includes rallies, door-to-door canvassing, TV debates, and social media outreach",
      "The Model Code of Conduct (MCC) comes into effect once elections are announced",
      "Campaigning must stop 48 hours before polling day (the 'silence period')",
    ],
    realWorldExample: "The Election Commission of India enforces strict spending limits — ₹95 lakh per Lok Sabha candidate and ₹40 lakh for Vidhan Sabha."
  },
  {
    id: "voting",
    title: "3. Voting Day",
    icon: Vote,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    content: "On election day, registered voters visit their assigned polling booths and cast their vote using Electronic Voting Machines (EVMs).",
    details: [
      "Polling usually takes place from 7 AM to 6 PM at designated stations",
      "Voters must carry valid photo ID (Voter ID, Aadhaar, Passport, etc.)",
      "Votes are cast using EVMs — each candidate has a button next to their name and party symbol",
      "VVPAT (Voter Verified Paper Audit Trail) provides a printed slip to verify your vote",
      "NOTA (None of the Above) is available as an option on every EVM",
    ],
    realWorldExample: "India uses over 50 lakh EVMs in a general election. Each EVM can record up to 2,000 votes and runs on a single battery!"
  },
  {
    id: "counting",
    title: "4. Vote Counting",
    icon: Calculator,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    content: "After polling concludes, EVMs are sealed and transported to counting centers under heavy security. Counting typically begins on a designated day.",
    details: [
      "EVMs are stored in strong rooms under 24/7 surveillance with CCTV",
      "Counting is done round by round — each round covers a set of EVMs",
      "VVPAT slips from randomly selected booths (5 per constituency) are matched against EVM results",
      "Candidates or their agents can be present during counting to observe",
    ],
    realWorldExample: "In the 2024 elections, counting for all 543 Lok Sabha seats was done on a single day — June 4th, 2024."
  },
  {
    id: "results",
    title: "5. Declaration of Results",
    icon: Trophy,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    content: "The candidate with the highest number of votes in each constituency is declared the winner. The party (or coalition) with a majority forms the government.",
    details: [
      "India follows First-Past-The-Post (FPTP) — the candidate with the most votes wins",
      "A party needs 272+ seats (out of 543) to form a majority government in the Lok Sabha",
      "The Returning Officer officially declares results for each constituency",
      "Winners are issued a Certificate of Election by the Election Commission",
    ],
    realWorldExample: "After results, the President invites the majority party/coalition leader to form the government and take oath as Prime Minister."
  }
];

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) setCurrentStep(currentStep + 1);
    // Save progress
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("election_edu_user") || "null");
      if (user) {
        const progress = JSON.parse(localStorage.getItem(`progress_${user.email}`) || "{}");
        progress.lastStepId = guideSteps[Math.min(currentStep + 1, guideSteps.length - 1)].id;
        if (currentStep + 1 >= guideSteps.length - 1) progress.guideCompleted = true;
        localStorage.setItem(`progress_${user.email}`, JSON.stringify(progress));
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const step = guideSteps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Interactive Election Guide
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Understand the Indian democratic process step-by-step
          </p>
        </div>

        {/* Timeline Progress */}
        <div className="relative mb-14">
          <div className="absolute top-5 left-[10%] right-[10%] h-1 bg-slate-200 rounded-full hidden sm:block" />
          <div
            className="absolute top-5 left-[10%] h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700 ease-out hidden sm:block"
            style={{ width: `${(currentStep / (guideSteps.length - 1)) * 80}%` }}
          />
          <div className="relative flex justify-between px-[5%]">
            {guideSteps.map((s, index) => {
              const Icon = s.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(index)}
                  className="flex flex-col items-center group cursor-pointer"
                  aria-label={`Go to step: ${s.title}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 z-10
                      ${isActive ? "border-indigo-300 bg-gradient-to-br " + s.color + " text-white scale-110 shadow-lg" :
                        isCompleted ? "border-indigo-500 bg-indigo-500 text-white" :
                        "border-slate-300 bg-white text-slate-400 hover:border-slate-400"}`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`mt-2 text-xs font-semibold hidden sm:block transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`}>
                    {s.title.split(".")[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className={`h-2 w-full bg-gradient-to-r ${step.color} transition-all duration-500`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-8 sm:p-10"
            >
              {/* Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${step.bgColor} ${step.iconColor} flex items-center justify-center`}>
                  <StepIcon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{step.title}</h2>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{step.content}</p>

              {/* Key Points */}
              <div className="space-y-3 mb-8">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Key Points</h3>
                {step.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Real-world Example */}
              <div className={`${step.bgColor} rounded-2xl p-5 border border-slate-100`}>
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className={`w-4 h-4 ${step.iconColor}`} />
                  <span className="text-sm font-bold text-slate-800">Real-World Fact</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{step.realWorldExample}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm font-semibold text-slate-500" aria-live="polite">
              {currentStep + 1} of {guideSteps.length}
            </span>
            <button
              onClick={nextStep}
              disabled={currentStep === guideSteps.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next step"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
