import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OAuthSection = () => {
  const [flowStep, setFlowStep] = useState(0);

  const flowSteps = [
    { step: 1, title: 'User clicks "Login with Google"', actor: 'Client App' },
    { step: 2, title: 'Redirect to Authorization Server', actor: 'Browser' },
    { step: 3, title: 'User authenticates & consents', actor: 'Auth Server' },
    { step: 4, title: 'Auth code sent to redirect URI', actor: 'Auth Server' },
    { step: 5, title: 'Exchange code for tokens', actor: 'Client App' },
    { step: 6, title: 'Access Token received', actor: 'Auth Server' },
    {
      step: 7,
      title: 'Use token to access resources',
      actor: 'Resource Server',
    },
  ];

  return (
    <SectionCard
      badge={{ label: 'Protocol', color: 'blue' }}
      title="OAuth 2.0 Fundamentals"
      description="Understanding authorization delegation for third-party access"
    >
      <div className="space-y-8">
        <SubSection title="What is OAuth 2.0?" icon iconColor="blue">
          <InfoBox variant="blue" title="Authorization Protocol">
            <p className="text-sm leading-relaxed">
              OAuth 2.0 is a standard protocol for delegating access to
              third-party services. For example, when your app needs access to a
              user's Google Calendar, OAuth 2.0 provides a secure way to obtain
              an access token from Google.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Authorization, not Authentication:</strong> OAuth 2.0
                handles permission delegation, not user identity verification
              </li>
              <li>
                <strong>Access Tokens:</strong> Short-lived credentials for
                accessing protected resources
              </li>
              <li>
                <strong>Refresh Tokens:</strong> Long-lived tokens to obtain new
                access tokens without re-authentication
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Key Roles in OAuth 2.0" icon iconColor="purple">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                Resource Owner
              </p>
              <p className="text-xs text-blue-700 mt-1">
                The user who owns the data
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">Client</p>
              <p className="text-xs text-blue-700 mt-1">
                Your application requesting access
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                Authorization Server
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Issues tokens (e.g., Google OAuth)
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                Resource Server
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Hosts protected resources (API)
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Authorization Code Flow" icon iconColor="green">
          <DemoBox label="OAuth 2.0 Flow Visualization">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {flowSteps.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFlowStep(idx)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      flowStep === idx
                        ? 'bg-green-600 text-white'
                        : flowStep > idx
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[100px]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {flowSteps[flowStep].actor}
                  </span>
                  <span className="text-sm font-semibold">
                    Step {flowSteps[flowStep].step}
                  </span>
                </div>
                <p className="text-gray-700">{flowSteps[flowStep].title}</p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setFlowStep(Math.max(0, flowStep - 1))}
                  disabled={flowStep === 0}
                  className="px-3 py-1 text-sm bg-gray-100 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFlowStep(Math.min(flowSteps.length - 1, flowStep + 1))
                  }
                  disabled={flowStep === flowSteps.length - 1}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Authorization URL Example" icon iconColor="orange">
          <CodeBlock
            code={`// OAuth 2.0 Authorization Request
const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', 'YOUR_CLIENT_ID');
authUrl.searchParams.set('redirect_uri', 'https://yourapp.com/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'openid email profile');
authUrl.searchParams.set('state', 'random_csrf_token');

// Redirect user to authorization server
window.location.href = authUrl.toString();

// After user authorizes, they're redirected back with:
// https://yourapp.com/callback?code=AUTH_CODE&state=random_csrf_token`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Token Exchange" icon iconColor="red">
          <CodeBlock
            code={`// Exchange authorization code for tokens (server-side)
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET', // Keep secret on server!
    code: authorizationCode,
    grant_type: 'authorization_code',
    redirect_uri: 'https://yourapp.com/callback',
  }),
});

const tokens = await tokenResponse.json();
// {
//   access_token: "ya29.a0...",
//   refresh_token: "1//0g...",
//   expires_in: 3600,
//   token_type: "Bearer",
//   id_token: "eyJhbGci..." // If using OIDC
// }`}
            className="text-xs"
          />

          <InfoBox variant="orange" title="Security Note" className="mt-4">
            <p className="text-sm">
              The <code>client_secret</code> must never be exposed to the
              frontend. Token exchange should always happen on a secure backend
              server.
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
