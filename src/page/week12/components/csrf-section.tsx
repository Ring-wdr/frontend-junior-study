import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const CsrfSection = () => {
  const [sameSiteValue, setSameSiteValue] = useState<'Strict' | 'Lax' | 'None'>(
    'Lax',
  );
  const [bankBalance, setBankBalance] = useState(1000);
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);

  const handleAttack = () => {
    // Attack simulation logic based on SameSite policy
    // Strict: Blocks all cross-site
    // Lax: Blocks cross-site POST (which this simulates)
    // None: Allows it
    if (sameSiteValue === 'None') {
      setBankBalance((prev) => prev - 100);
      setLastTransaction('Unauthorized Transfer: -$100');
    } else {
      setLastTransaction('Blocked by SameSite Policy 🛡️');
    }

    // Auto clear message
    setTimeout(() => setLastTransaction(null), 2000);
  };

  const sameSiteExplanations = {
    Strict: {
      desc: 'Cookie is only sent in first-party context. Never sent with cross-site requests.',
      example: 'User clicks link from email to your site - NO cookie sent',
      protection:
        'Maximum protection but may break legitimate cross-site navigation',
      color: 'green',
    },
    Lax: {
      desc: 'Cookie sent with top-level navigation (GET) but not with cross-site POST/AJAX.',
      example:
        'Link from other site works, but form POST from other site blocked',
      protection:
        'Good balance of security and usability (default in modern browsers)',
      color: 'blue',
    },
    None: {
      desc: 'Cookie sent with all requests including cross-site. Requires Secure flag.',
      example: 'Used for cross-site widgets, embedded content, OAuth callbacks',
      protection: 'No CSRF protection - requires other measures',
      color: 'red',
    },
  };

  return (
    <SectionCard
      badge={{ label: 'Security', color: 'purple' }}
      title="CSRF & SameSite Cookies"
      description="Protecting against Cross-Site Request Forgery attacks"
    >
      <div className="space-y-8">
        <SubSection title="What is CSRF?" icon iconColor="red">
          <InfoBox variant="red" title="Cross-Site Request Forgery">
            <p className="text-sm leading-relaxed">
              CSRF exploits the trust a website has in a user's browser. An
              attacker tricks users into making unwanted requests using their
              existing authentication cookies.
            </p>
          </InfoBox>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm font-semibold mb-3">Attack Scenario:</p>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500">1.</span>
                User logs into bank.com (session cookie stored)
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">2.</span>
                User visits malicious site with hidden form
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">3.</span>
                Form auto-submits POST to bank.com/transfer
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">4.</span>
                Browser includes bank.com cookies automatically
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">5.</span>
                Bank processes the unauthorized transfer
              </li>
            </ol>
          </div>
        </SubSection>

        <SubSection title="Interactive CSRF Simulator" icon iconColor="blue">
          <DemoBox label="Attack Playground">
            <div className="space-y-6">
              {/* Configuration */}
              <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-2">
                  {(['Strict', 'Lax', 'None'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSameSiteValue(value)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        sameSiteValue === value
                          ? value === 'Strict'
                            ? 'bg-green-600 text-white shadow-lg scale-105'
                            : value === 'Lax'
                              ? 'bg-blue-600 text-white shadow-lg scale-105'
                              : 'bg-red-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      SameSite={value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Victim Website */}
                <div className="border-4 border-blue-100 rounded-xl overflow-hidden shadow-sm relative">
                  <div className="bg-blue-600 text-white px-4 py-2 text-sm font-bold flex justify-between items-center">
                    <span>🏦 Bank.com</span>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded">
                      Authenticated
                    </span>
                  </div>
                  <div className="p-6 space-y-4 bg-white h-full">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">Your Balance</p>
                      <p className="text-3xl font-bold text-gray-800">
                        ${bankBalance}
                      </p>
                    </div>

                    {lastTransaction && (
                      <div
                        className={`p-3 rounded text-sm text-center font-bold animate-pulse ${lastTransaction.includes('Blocked') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {lastTransaction}
                      </div>
                    )}
                  </div>
                </div>

                {/* Attacker Website */}
                <div className="border-4 border-red-100 rounded-xl overflow-hidden shadow-sm relative">
                  <div className="bg-gray-800 text-white px-4 py-2 text-sm font-bold flex justify-between items-center">
                    <span>💀 Evil-Site.com</span>
                  </div>
                  <div className="p-6 space-y-4 bg-gray-50 h-full flex flex-col justify-center items-center">
                    <p className="text-center font-bold text-gray-800 text-lg">
                      CONGRATULATIONS!
                    </p>
                    <p className="text-center text-sm text-gray-600">
                      You won a free iPhone! Click below to claim.
                    </p>

                    <button
                      type="button"
                      onClick={handleAttack}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform w-full animate-bounce"
                    >
                      🎁 CLAIM PRIZE
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      (Hidden: POST /transfer to Bank.com)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                <p>
                  <strong>Current Protection:</strong>{' '}
                  {sameSiteExplanations[sameSiteValue].desc}
                  {sameSiteValue !== 'None' ? (
                    <span className="text-green-600 font-bold ml-2">
                      CSRF Attack Blocked.
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold ml-2">
                      Vulnerable! Cookie sent.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Setting Secure Cookies" icon iconColor="purple">
          <CodeBlock
            code={`// Server-side cookie setting (Next.js API route)
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();

  cookieStore.set('session', sessionToken, {
    httpOnly: true,      // Not accessible via JavaScript
    secure: true,        // Only sent over HTTPS
    sameSite: 'lax',     // CSRF protection
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

// Express.js example
res.cookie('session', sessionToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours in ms
});`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="CSRF Token Protection" icon iconColor="orange">
          <InfoBox variant="orange">
            <p className="text-sm leading-relaxed">
              For additional protection, especially with SameSite=None, use CSRF
              tokens. NextAuth.js handles this automatically for its forms.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// CSRF Token Pattern

// 1. Generate token on page load
<form action="/api/transfer" method="POST">
  <input type="hidden" name="csrf_token" value={csrfToken} />
  <input type="text" name="amount" />
  <button type="submit">Transfer</button>
</form>

// 2. Server validates token on every state-changing request
export async function POST(request: Request) {
  const formData = await request.formData();
  const csrfToken = formData.get('csrf_token');

  // Verify token matches session's CSRF token
  if (!verifyCSRFToken(session.csrfToken, csrfToken)) {
    return new Response('Invalid CSRF token', { status: 403 });
  }

  // Process the request...
}

// 3. NextAuth.js includes CSRF protection automatically
// Check getCsrfToken() for API calls
import { getCsrfToken } from "next-auth/react";

const csrfToken = await getCsrfToken();`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Cookie Security Checklist" icon iconColor="green">
          <div className="space-y-2">
            {[
              {
                attr: 'HttpOnly',
                desc: 'Prevents JavaScript access (XSS protection)',
                required: true,
              },
              {
                attr: 'Secure',
                desc: 'Only transmitted over HTTPS',
                required: true,
              },
              {
                attr: 'SameSite=Lax',
                desc: 'CSRF protection with good UX balance',
                required: true,
              },
              {
                attr: 'Path=/',
                desc: 'Limit cookie scope as needed',
                required: false,
              },
              {
                attr: 'Domain',
                desc: 'Specify domain for subdomains',
                required: false,
              },
              {
                attr: 'Max-Age/Expires',
                desc: 'Set appropriate expiration',
                required: true,
              },
            ].map((item) => (
              <div
                key={item.attr}
                className={`flex items-center gap-3 p-2 rounded ${item.required ? 'bg-green-50' : 'bg-gray-50'}`}
              >
                <span
                  className={`text-sm ${item.required ? 'text-green-500' : 'text-gray-400'}`}
                >
                  {item.required ? '✓' : '○'}
                </span>
                <div>
                  <code className="text-sm font-semibold">{item.attr}</code>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
