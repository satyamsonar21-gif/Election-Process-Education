"use client";

import { useState, useEffect } from "react";
import { Brain, CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, Sparkles } from "lucide-react";

/* ─── Inline Quiz Data ─── */
const quizData = [
  {
    id: "basics",
    title: "Election Basics",
    difficulty: "BEGINNER",
    questions: [
      {
        question: "What is the minimum voting age in India?",
        options: ["16 years", "18 years", "21 years", "25 years"],
        correctAnswer: "18 years",
        explanation: "The 61st Amendment Act (1989) reduced the voting age from 21 to 18 years to encourage youth participation in democracy."
      },
      {
        question: "What does EVM stand for?",
        options: ["Electronic Voting Machine", "Electoral Voting Method", "Election Validation Mechanism", "Electronic Validation Machine"],
        correctAnswer: "Electronic Voting Machine",
        explanation: "EVMs are used in Indian elections since 1982 (pilot) and nationwide since 2004. They ensure fast, accurate, and tamper-proof voting."
      },
      {
        question: "Who conducts elections in India?",
        options: ["The Prime Minister", "The Supreme Court", "The Election Commission of India", "The Parliament"],
        correctAnswer: "The Election Commission of India",
        explanation: "The ECI is an autonomous constitutional body (Article 324) responsible for free and fair elections across India."
      },
      {
        question: "What is NOTA?",
        options: ["A political party", "None Of The Above — a ballot option", "A voting machine brand", "A constituency name"],
        correctAnswer: "None Of The Above — a ballot option",
        explanation: "NOTA was introduced in 2013 following a Supreme Court ruling, allowing voters to reject all candidates without revealing their identity."
      },
      {
        question: "How many seats are in the Lok Sabha?",
        options: ["245", "435", "543", "650"],
        correctAnswer: "543",
        explanation: "The Lok Sabha has 543 elected members. A party needs a minimum of 272 seats (simple majority) to form the government."
      }
    ]
  },
  {
    id: "process",
    title: "Election Process & Rules",
    difficulty: "INTERMEDIATE",
    questions: [
      {
        question: "What is the 'Model Code of Conduct' (MCC)?",
        options: ["A law passed by Parliament", "Guidelines for candidates and parties during elections", "A training manual for election officers", "Rules for counting votes"],
        correctAnswer: "Guidelines for candidates and parties during elections",
        explanation: "The MCC is a set of guidelines issued by the ECI to ensure fair campaigning. It comes into effect the moment elections are announced."
      },
      {
        question: "When must election campaigning stop before polling day?",
        options: ["24 hours", "48 hours", "72 hours", "1 week"],
        correctAnswer: "48 hours",
        explanation: "Campaigning must stop 48 hours before polling ends. This 'silence period' lets voters reflect without influence."
      },
      {
        question: "What is VVPAT?",
        options: ["A type of ballot paper", "Voter Verified Paper Audit Trail", "Virtual Voting Application Technology", "A voter registration form"],
        correctAnswer: "Voter Verified Paper Audit Trail",
        explanation: "VVPAT allows voters to verify their vote by displaying a printed slip for 7 seconds after pressing the EVM button."
      },
      {
        question: "What is the First-Past-The-Post (FPTP) system?",
        options: ["The first voter wins a prize", "The candidate with the most votes wins", "Proportional representation", "A run-off election system"],
        correctAnswer: "The candidate with the most votes wins",
        explanation: "In FPTP, the candidate with the highest number of votes in a constituency wins, regardless of whether they have a majority."
      },
      {
        question: "What document is issued to the winning candidate?",
        options: ["Victory Letter", "Certificate of Election", "Election Trophy", "Winner's Mandate"],
        correctAnswer: "Certificate of Election",
        explanation: "The Returning Officer issues a Certificate of Election to the winning candidate, which is required to take oath as a member of Parliament/Assembly."
      }
    ]
  }
];

export default function QuizPage() {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuiz = selectedQuizIndex !== null ? quizData[selectedQuizIndex] : null;

  const handleSelect = (option: string) => {
    if (!isSubmitted) setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuiz) return;
    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) setScore((s) => s + 1);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (!currentQuiz) return;
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      // Save score to localStorage
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("election_edu_user") || "null");
        if (user) {
          const progress = JSON.parse(localStorage.getItem(`progress_${user.email}`) || "{}");
          if (!progress.quizScores) progress.quizScores = [];
          progress.quizScores.push({ quizId: currentQuiz.id, score: score + (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer ? 1 : 0), total: currentQuiz.questions.length, date: new Date().toISOString() });
          localStorage.setItem(`progress_${user.email}`, JSON.stringify(progress));
        }
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const backToQuizList = () => {
    setSelectedQuizIndex(null);
    resetQuiz();
  };

  /* ─── Quiz Selection Screen ─── */
  if (selectedQuizIndex === null) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Knowledge Quiz</h1>
            <p className="mt-3 text-lg text-slate-600">Test your understanding of the Indian election process</p>
          </div>

          <div className="grid gap-6">
            {quizData.map((quiz, index) => (
              <button
                key={quiz.id}
                onClick={() => setSelectedQuizIndex(index)}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{quiz.title}</h2>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${quiz.difficulty === "BEGINNER" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{quiz.questions.length} questions</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Quiz Finished Screen ─── */
  if (quizFinished && currentQuiz) {
    const finalScore = score;
    const total = currentQuiz.questions.length;
    const percentage = Math.round((finalScore / total) * 100);
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center border border-slate-100 animate-slide-up">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Quiz Completed!</h2>
          <p className="text-slate-500 mb-6">Here&apos;s how you did on <strong>{currentQuiz.title}</strong></p>
          
          {/* Score Ring */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.91" fill="none"
                stroke={percentage >= 80 ? "#22c55e" : percentage >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="3"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900">{finalScore}</span>
              <span className="text-xs text-slate-500">out of {total}</span>
            </div>
          </div>

          <p className="text-lg font-semibold mb-8">
            {percentage >= 80 ? "🎉 Excellent! You're a democracy expert!" :
             percentage >= 50 ? "👍 Good job! Keep learning!" :
             "📚 Keep practicing! Review the guide for more info."}
          </p>

          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Retake Quiz
            </button>
            <button
              onClick={backToQuizList}
              className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Back to All Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Active Quiz Screen ─── */
  const question = currentQuiz!.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / currentQuiz!.questions.length) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={backToQuizList} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-1 transition-colors">
              ← Back to quizzes
            </button>
            <h1 className="text-2xl font-bold text-slate-900">{currentQuiz!.title}</h1>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Question</span>
            <div className="text-2xl font-extrabold text-indigo-600">
              {currentQuestionIndex + 1}
              <span className="text-slate-300 text-lg font-normal"> / {currentQuiz!.questions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-10">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3" role="radiogroup" aria-label="Answer options">
            {question.options.map((option, idx) => {
              let btnClass = "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ";
              let icon = null;
              const letters = ["A", "B", "C", "D"];

              if (!isSubmitted) {
                btnClass += selectedAnswer === option
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                  : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
              } else {
                if (option === question.correctAnswer) {
                  btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
                  icon = <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
                } else if (selectedAnswer === option) {
                  btnClass += "border-red-400 bg-red-50 text-red-700";
                  icon = <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
                } else {
                  btnClass += "border-slate-200 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={isSubmitted}
                  className={btnClass + " flex items-center gap-4"}
                  role="radio"
                  aria-checked={selectedAnswer === option}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${selectedAnswer === option && !isSubmitted ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {letters[idx]}
                  </span>
                  <span className="flex-1">{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isSubmitted && (
            <div className="mt-8 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-indigo-900 text-sm">Explanation</h3>
              </div>
              <p className="text-sm text-indigo-800 leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                {currentQuestionIndex < currentQuiz!.questions.length - 1 ? "Next Question" : "See Results"}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
