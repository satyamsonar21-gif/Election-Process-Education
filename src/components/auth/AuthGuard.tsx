"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Lock, Vote, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * AuthGuard — wraps protected pages and redirects unauthenticated users to /login.
 * Shows a polished "login required" screen instead of a blank flash.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const user = localStorage.getItem("election_edu_user");
    if (user) {
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-md w-full text-center animate-slide-up">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Login Required</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              You need to sign in to access this page. Create a free account to start learning about India&apos;s election process.
            </p>
            <div className="space-y-3">
              <Link
                href={`/login`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Create Free Account
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Vote className="w-3 h-3" />
              <span>ElectionEdu — Indian Election Education</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
