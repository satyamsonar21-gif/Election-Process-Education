import AuthGuard from "@/components/auth/AuthGuard";

export default function SimulationLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
