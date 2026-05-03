import EmbeddedChatAssistant from "@/components/chat/EmbeddedChatAssistant";
import { Sparkles, Shield, Zap, Brain } from "lucide-react";

export const metadata = {
  title: "AI Chat Assistant | ElectionEdu",
  description:
    "Ask any questions about the Indian election process to our AI assistant powered by GPT-4o.",
};

export default function ChatPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-5">
            <Sparkles className="w-4 h-4" /> AI-Powered Assistant
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ask{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              ElectionEdu AI
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about EVMs, the Model Code of Conduct, voter
            registration, or anything else about Indian elections? Our AI
            assistant provides instant, accurate answers.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 shadow-sm">
              <Zap className="w-4 h-4 text-amber-500" /> Instant Answers
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 shadow-sm">
              <Shield className="w-4 h-4 text-emerald-500" /> Fact-Checked
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 shadow-sm">
              <Brain className="w-4 h-4 text-indigo-500" /> Powered by GPT-4o
            </div>
          </div>
        </div>

        {/* Chat Component */}
        <EmbeddedChatAssistant />
      </div>
    </div>
  );
}
