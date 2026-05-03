"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Vote, Brain, User, LogOut, Menu, X, ChevronDown, BookText, ShieldCheck, Theater, Scale, History, Newspaper, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { href: "/guide", label: "Guide", icon: BookOpen },
  { href: "/chat", label: "AI Assistant", icon: MessageSquare },
  { href: "/simulation", label: "Simulation", icon: Vote },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/news", label: "News", icon: Newspaper },
];

const moreLinks = [
  { href: "/glossary", label: "Election Glossary", icon: BookText },
  { href: "/eligibility", label: "Eligibility Checker", icon: ShieldCheck },
  { href: "/scenarios", label: "Role-Play Scenarios", icon: Theater },
  { href: "/manifesto-guide", label: "Manifesto Guide", icon: Scale },
  { href: "/history", label: "Election History", icon: History },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; picture?: string } | null>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Read auth from localStorage after mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("election_edu_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }

    // Listen for storage changes (login/logout from other tabs)
    const onStorage = () => {
      try {
        const raw = localStorage.getItem("election_edu_user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Re-check auth on route change (handles login/register redirects)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("election_edu_user");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("election_edu_user");
    setUser(null);
    window.location.href = "/";
  };

  const isActive = (href: string) => pathname === href;
  const isMoreActive = moreLinks.some((l) => pathname === l.href);

  return (
    <nav
      className="bg-white/90 backdrop-blur-lg border-b border-slate-200/80 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="ElectionEdu Home">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Vote className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 hidden sm:block">ElectionEdu</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${isActive(href) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"}`}
                  aria-current={isActive(href) ? "page" : undefined}>
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${isMoreActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"}`}
                  aria-expanded={moreOpen} aria-haspopup="true">
                  More <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>

                {moreOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                    {moreLinks.map(({ href, label, icon: Icon }) => (
                      <Link key={href} href={href} onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isActive(href) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"}`}>
                        <Icon className="h-4 w-4" /> {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${isActive("/dashboard") ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"}`}
                  aria-current={isActive("/dashboard") ? "page" : undefined}>
                  {user.picture ? <img src={user.picture} alt={user.name} className="w-5 h-5 rounded-full object-cover" /> : <User className="h-4 w-4" />}
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" aria-label="Sign out" title="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg transition-colors">Log in</Link>
                <Link href="/register" className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">Get Started</Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-in" role="menu">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(href) ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"}`} role="menuitem">
                <Icon className="h-5 w-5" /> {label}
              </Link>
            ))}

            <div className="border-t border-slate-100 my-2" />
            <p className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">More Resources</p>
            {moreLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(href) ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"}`} role="menuitem">
                <Icon className="h-5 w-5" /> {label}
              </Link>
            ))}

            <div className="border-t border-slate-100 my-2" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50" role="menuitem">
                  <User className="h-5 w-5" /> Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full" role="menuitem">
                  <LogOut className="h-5 w-5" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50" role="menuitem">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" role="menuitem">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
