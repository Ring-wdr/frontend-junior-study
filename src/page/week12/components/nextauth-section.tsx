import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const NextAuthSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  const simulateLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  const simulateLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <SectionCard
      badge={{ label: 'Library', color: 'green' }}
      title="NextAuth.js (Auth.js)"
      description="Complete authentication solution for Next.js applications"
    >
      <div className="space-y-8">
        <SubSection title="What is NextAuth.js?" icon iconColor="green">
          <InfoBox variant="green" title="Full-featured Auth Solution">
            <p className="text-sm leading-relaxed">
              NextAuth.js (being rebranded to Auth.js) is a complete
              authentication solution for Next.js apps. It handles OAuth
              providers, credentials login, JWT/database sessions, and more.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Multiple Providers:</strong> Google, GitHub, Facebook,
                credentials, etc.
              </li>
              <li>
                <strong>Session Modes:</strong> JWT or database sessions
              </li>
              <li>
                <strong>Built-in Pages:</strong> Sign in, sign out, error pages
              </li>
              <li>
                <strong>SSR Support:</strong> Works with both client and server
                components
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Basic Setup" icon iconColor="blue">
          <CodeBlock
            code={`// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Optional: Use database sessions instead of JWT
  // session: { strategy: "database" },
  // adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Session Provider Setup" icon iconColor="purple">
          <CodeBlock
            code={`// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Using Session in Components" icon iconColor="orange">
          <CodeBlock
            code={`// Client Component
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.name}!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in</button>;
}

// Server Component
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function ServerComponent() {
  const session = await getServerSession(authOptions);

  if (!session) return <p>Not authenticated</p>;
  return <p>Hello, {session.user?.name}</p>;
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Session Demo" icon iconColor="red">
          <DemoBox label="Simulated Authentication">
            <div className="flex flex-col items-center gap-4">
              {isLoggedIn && user ? (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={simulateLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-gray-500">Not signed in</p>
                  <button
                    type="button"
                    onClick={simulateLogin}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              )}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Protecting Routes" icon iconColor="green">
          <CodeBlock
            code={`// Middleware-based protection (middleware.ts)
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};

// Or using getServerSession in page
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function ProtectedPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <div>Protected content</div>;
}`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
