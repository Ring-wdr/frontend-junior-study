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
      badge={{ label: 'Security', color: 'red' }}
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

        <SubSection title="SameSite Cookie Attribute" icon iconColor="blue">
          <DemoBox label="SameSite Values Explained">
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['Strict', 'Lax', 'None'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSameSiteValue(value)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      sameSiteValue === value
                        ? value === 'Strict'
                          ? 'bg-green-600 text-white'
                          : value === 'Lax'
                            ? 'bg-blue-600 text-white'
                            : 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  sameSiteExplanations[sameSiteValue].color === 'green'
                    ? 'bg-green-50 border-green-200'
                    : sameSiteExplanations[sameSiteValue].color === 'blue'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-red-50 border-red-200'
                }`}
              >
                <p className="text-sm mb-2">
                  {sameSiteExplanations[sameSiteValue].desc}
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Example:</strong>{' '}
                  {sameSiteExplanations[sameSiteValue].example}
                </p>
                <p className="text-xs">
                  <strong>Protection Level:</strong>{' '}
                  {sameSiteExplanations[sameSiteValue].protection}
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
