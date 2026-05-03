import AuthGuard from "@/components/auth/AuthGuard";

export default function ManifestoGuideLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
