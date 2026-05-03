import Link from "next/link";
import { Vote } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Vote className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">ElectionEdu</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering Indian citizens through accessible, engaging, and
              comprehensive education about the democratic process.
            </p>
          </div>

          {/* Core Features */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/guide" className="hover:text-indigo-400 transition-colors">Election Guide</Link></li>
              <li><Link href="/simulation" className="hover:text-indigo-400 transition-colors">Voting Simulation</Link></li>
              <li><Link href="/quiz" className="hover:text-indigo-400 transition-colors">Knowledge Quiz</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/glossary" className="hover:text-indigo-400 transition-colors">Election Glossary</Link></li>
              <li><Link href="/eligibility" className="hover:text-indigo-400 transition-colors">Eligibility Checker</Link></li>
              <li><Link href="/scenarios" className="hover:text-indigo-400 transition-colors">Role-Play Scenarios</Link></li>
              <li><Link href="/manifesto-guide" className="hover:text-indigo-400 transition-colors">Manifesto Guide</Link></li>
              <li><Link href="/history" className="hover:text-indigo-400 transition-colors">Election History</Link></li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Official Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                  Election Commission of India ↗
                </a>
              </li>
              <li>
                <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                  Register to Vote (NVSP) ↗
                </a>
              </li>
              <li>
                <a href="https://www.myneta.info" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                  MyNeta.info (ADR) ↗
                </a>
              </li>
              <li>
                <a href="https://prsindia.org" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                  PRS Legislative Research ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
          &copy; {new Date().getFullYear()} ElectionEdu — Indian Election Education Platform. Built for education
          purposes only. Not affiliated with the Election Commission of India.
        </div>
      </div>
    </footer>
  );
}
