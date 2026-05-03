import AuthGuard from "@/components/auth/AuthGuard";

export default function EligibilityLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
