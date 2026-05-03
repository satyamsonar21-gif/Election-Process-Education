import AuthGuard from "@/components/auth/AuthGuard";

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
