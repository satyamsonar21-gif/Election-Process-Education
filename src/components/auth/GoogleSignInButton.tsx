"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

export default function GoogleSignInButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Initialize offline user data helper
  const handleGoogleAuth = async (name: string, email: string, picture: string) => {
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("election_edu_users") || "[]");
      let user = users.find((u: any) => u.email === email);

      if (!user) {
        // Auto-register via Google
        user = {
          id: Date.now().toString(),
          name: name,
          email: email,
          picture: picture, // Save avatar
          password: "GOOGLE_SSO_USER", // Marker that this is an OAuth user
          role: "USER",
          createdAt: new Date().toISOString(),
        };
        users.push(user);
        localStorage.setItem("election_edu_users", JSON.stringify(users));

        // Initialize progress for new Google user
        localStorage.setItem(
          `progress_${user.email}`,
          JSON.stringify({ guideCompleted: false, lastStepId: "registration", quizScores: [], hasVoted: false })
        );
      } else if (picture && !user.picture) {
        // Update existing user with Google Avatar
        user.picture = picture;
        localStorage.setItem("election_edu_users", JSON.stringify(users));
      }

      // Create session
      localStorage.setItem(
        "election_edu_user",
        JSON.stringify({ name: user.name, email: user.email, role: user.role, picture: user.picture })
      );

      // Simulate network delay for smooth UI
      await new Promise((r) => setTimeout(r, 600));

      router.push("/dashboard");
    } catch (error) {
      console.error("Google Auth Error:", error);
      setLoading(false);
    }
  };

  // 1. REAL GOOGLE OAUTH FLOW
  if (clientId) {
    return (
      <div className="w-full flex justify-center">
        {loading ? (
          <div className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-xl bg-white shadow-sm">
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  const decoded: any = jwtDecode(credentialResponse.credential);
                  handleGoogleAuth(decoded.name, decoded.email, decoded.picture);
                }
              }}
              onError={() => {
                console.error("Google Login Failed");
              }}
              theme="outline"
              size="large"
              width="100%"
              shape="rectangular"
              text="continue_with"
            />
          </GoogleOAuthProvider>
        )}
      </div>
    );
  }

  // 2. OFFLINE MOCK FALLBACK (If no Client ID provided)
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => handleGoogleAuth("Demo Google User", "demo.google@example.com", "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser")}
      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-xl shadow-sm bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-semibold text-slate-700">Continue with Google</span>
        </>
      )}
    </button>
  );
}
