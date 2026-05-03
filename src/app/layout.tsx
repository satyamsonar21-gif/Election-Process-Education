import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ChatAssistant from "@/components/chat/ChatAssistant";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ElectionEdu — Indian Election Education Platform",
  description:
    "An interactive platform to educate Indian citizens about the election process. Step-by-step guides, EVM simulation, quizzes, glossary, role-play scenarios, and AI-powered assistance — all focused on India's democratic system.",
  keywords: [
    "Indian election",
    "EVM",
    "VVPAT",
    "NOTA",
    "Election Commission of India",
    "Lok Sabha",
    "voter education",
    "voting simulation",
    "election glossary",
    "democracy",
    "quiz",
    "manifesto",
  ],
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Accessibility: skip-to-content link for keyboard users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 transition-colors">
            <Navbar />
            <main id="main-content" className="flex-grow" role="main">
              {children}
            </main>
            <Footer />
            <ChatAssistant />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
