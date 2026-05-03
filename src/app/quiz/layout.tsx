import AuthGuard from "@/components/auth/AuthGuard";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
