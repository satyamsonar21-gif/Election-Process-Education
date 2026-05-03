import AuthGuard from "@/components/auth/AuthGuard";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
