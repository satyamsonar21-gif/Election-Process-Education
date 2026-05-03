import AuthGuard from "@/components/auth/AuthGuard";

export default function ScenariosLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
