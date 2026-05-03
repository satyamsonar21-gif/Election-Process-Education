"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, ShieldCheck, FileText, ExternalLink, RotateCcw } from "lucide-react";
import Link from "next/link";

const questions = [
  { id: "citizen", question: "Are you a citizen of India?", helper: "Only Indian citizens are eligible to vote in Indian elections." },
  { id: "age", question: "Are you 18 years of age or older (on the qualifying date — January 1 of the year)?", helper: "The 61st Amendment Act (1989) set the minimum voting age at 18 years." },
  { id: "sound_mind", question: "Are you of sound mind and not disqualified under any law?", helper: "Persons declared of unsound mind by a court, or disqualified for corrupt/illegal practices, are ineligible." },
  { id: "registered", question: "Are you registered on the Electoral Roll (Voter List)?", helper: "You must be registered to vote. If not, you can register online via the NVSP portal." },
];

const validIds = [
  { name: "Voter ID Card (EPIC)", desc: "The primary election ID issued by the ECI", essential: true },
  { name: "Aadhaar Card", desc: "12-digit unique ID issued by UIDAI", essential: false },
  { name: "Passport", desc: "Indian passport (valid or expired)", essential: false },
  { name: "Driving License", desc: "Valid driving license issued by RTO", essential: false },
  { name: "PAN Card", desc: "Permanent Account Number card", essential: false },
  { name: "Service ID (Govt.)", desc: "Photo ID issued by Central/State Government", essential: false },
  { name: "Student ID with Photo", desc: "ID issued by recognized educational institution", essential: false },
  { name: "Bank/Post Office Passbook", desc: "Passbook with photo", essential: false },
  { name: "MNREGA Job Card", desc: "National Rural Employment Guarantee card", essential: false },
  { name: "Health Insurance Smart Card", desc: "Issued under government health schemes", essential: false },
  { name: "Pension Document with Photo", desc: "Government-issued pension document", essential: false },
  { name: "MP/MLA/MLC ID Card", desc: "For elected representatives", essential: false },
];

export default function EligibilityPage() {
  const [step, setStep] = useState(0); // 0-3 questions, 4 = result
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const handleAnswer = (answer: boolean) => {
    const q = questions[step];
    setAnswers((prev) => ({ ...prev, [q.id]: answer }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // result
    }
  };

  const isEligible = Object.values({ ...answers, [questions[step]?.id]: answers[questions[step]?.id] }).every((v) => v === true) && Object.keys(answers).length === questions.length;

  const toggleDoc = (name: string) => {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const reset = () => { setStep(0); setAnswers({}); setCheckedDocs(new Set()); };

  // Questions screen
  if (step < questions.length) {
    const q = questions[step];
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Voter Eligibility Checker</h1>
            <p className="mt-3 text-lg text-slate-600">Answer a few questions to check if you're eligible to vote in Indian elections.</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {questions.map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i < step ? "bg-emerald-500" : i === step ? "bg-indigo-500" : "bg-slate-200"}`} />
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 animate-slide-up">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">Question {step + 1} of {questions.length}</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-relaxed">{q.question}</h2>
            <p className="text-sm text-slate-500 mb-8 bg-slate-50 rounded-xl p-4 border border-slate-100">{q.helper}</p>

            <div className="flex gap-4">
              <button onClick={() => handleAnswer(true)}
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-lg shadow-sm">
                Yes ✓
              </button>
              <button onClick={() => handleAnswer(false)}
                className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors text-lg shadow-sm">
                No ✗
              </button>
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mx-auto">
                <ArrowLeft className="w-4 h-4" /> Go back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result screen
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Result Card */}
        <div className={`rounded-3xl shadow-xl border p-8 sm:p-10 text-center mb-10 animate-slide-up ${isEligible ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isEligible ? "bg-emerald-100" : "bg-red-100"}`}>
            {isEligible ? <CheckCircle className="w-10 h-10 text-emerald-600" /> : <XCircle className="w-10 h-10 text-red-600" />}
          </div>
          <h2 className={`text-3xl font-extrabold mb-3 ${isEligible ? "text-emerald-800" : "text-red-800"}`}>
            {isEligible ? "You are eligible to vote! 🎉" : "You may not be eligible to vote"}
          </h2>
          <p className={`text-lg mb-6 ${isEligible ? "text-emerald-700" : "text-red-700"}`}>
            {isEligible
              ? "You meet all the criteria. Make sure you have a valid ID and know your polling booth!"
              : "Based on your answers, one or more eligibility criteria are not met."}
          </p>

          {/* Answers Summary */}
          <div className="text-left bg-white rounded-2xl p-5 mb-6 border border-slate-200">
            {questions.map((q) => (
              <div key={q.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                <span className="text-sm text-slate-700">{q.question.slice(0, 60)}...</span>
                {answers[q.id] ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
            {!answers.registered && (
              <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                Register on NVSP <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Document Checklist */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Valid ID Proofs for Polling Day</h3>
              <p className="text-sm text-slate-500">Carry any ONE of these documents to the polling booth</p>
            </div>
          </div>

          <div className="grid gap-2">
            {validIds.map((doc) => (
              <button key={doc.name} onClick={() => toggleDoc(doc.name)}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${checkedDocs.has(doc.name) ? "bg-emerald-50 border-emerald-300" : "bg-white border-slate-200 hover:border-indigo-200"}`}>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checkedDocs.has(doc.name) ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                  {checkedDocs.has(doc.name) && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 text-sm">{doc.name}</span>
                  {doc.essential && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">PRIMARY</span>}
                  <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-400 text-center">
            Source: <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Election Commission of India</a>
          </p>
        </div>
      </div>
    </div>
  );
}
