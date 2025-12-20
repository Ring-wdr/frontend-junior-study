import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OAuthSection = () => {
  const { t } = useTranslation('week12');
  const [flowStep, setFlowStep] = useState(0);

  const flowSteps = [
    {
      step: 1,
      title: t('oauth.flow.step1'),
      actor: t('oauth.flow.actorClient'),
    },
    {
      step: 2,
      title: t('oauth.flow.step2'),
      actor: t('oauth.flow.actorBrowser'),
    },
    { step: 3, title: t('oauth.flow.step3'), actor: t('oauth.flow.actorAuth') },
    { step: 4, title: t('oauth.flow.step4'), actor: t('oauth.flow.actorAuth') },
    {
      step: 5,
      title: t('oauth.flow.step5'),
      actor: t('oauth.flow.actorClient'),
    },
    { step: 6, title: t('oauth.flow.step6'), actor: t('oauth.flow.actorAuth') },
    {
      step: 7,
      title: t('oauth.flow.step7'),
      actor: t('oauth.flow.actorApi'),
    },
  ];

  return (
    <SectionCard
      badge={{ label: t('oauth.badge'), color: 'blue' }}
      title={t('oauth.title')}
      description={t('oauth.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('oauth.whatIs.title')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('oauth.whatIs.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('oauth.whatIs.infoDescription')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <Trans t={t} i18nKey="oauth.whatIs.listAuthNot" />
              </li>
              <li>
                <Trans t={t} i18nKey="oauth.whatIs.listAccessToken" />
              </li>
              <li>
                <Trans t={t} i18nKey="oauth.whatIs.listRefreshToken" />
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
          <DemoBox label="OAuth 2.0 Flow Interactive Map">
            <div className="space-y-6">
              {/* Visual Map */}
              <div className="relative h-48 bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-between px-8 md:px-16 overflow-hidden">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0" />

                {/* Active Progress Line */}
                <div
                  className="absolute top-1/2 left-0 h-1 bg-green-500 transition-all duration-500 z-0"
                  style={{
                    width: `${(flowStep / (flowSteps.length - 1)) * 100}%`,
                  }}
                />

                {/* Actors / Nodes */}
                {[
                  { id: 'client', label: 'Client App', icon: '💻' },
                  { id: 'browser', label: 'Browser', icon: '🌍' },
                  { id: 'auth', label: 'Auth Server', icon: '🛡️' },
                  { id: 'api', label: 'API', icon: '📦' },
                ].map((actor) => {
                  // Calculate simplified "active" state based on step instructions
                  // This is a rough mapping for visual effect
                  // Calculate simplified "active" state based on step instructions
                  // This is a rough mapping for visual effect

                  return (
                    <div
                      key={actor.id}
                      className="relative z-10 flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-4 transition-all duration-300 bg-white ${
                          flowSteps[flowStep].actor.includes(actor.label) ||
                          (actor.label === 'Browser' && flowStep === 1) // Highlight current actor
                            ? 'border-green-500 scale-125 shadow-lg'
                            : 'border-gray-200 grayscale opacity-70'
                        }`}
                      >
                        {actor.icon}
                      </div>
                      <span className="text-xs font-bold text-gray-600">
                        {actor.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Step Description */}
              <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Step {flowSteps[flowStep].step}: {flowSteps[flowStep].actor}
                </h4>
                <p className="text-gray-600 text-lg transition-all key={flowStep} animate-in fade-in slide-in-from-bottom-2">
                  {flowSteps[flowStep].title}
                </p>
                <div className="mt-4 flex gap-2 justify-center">
                  {flowSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${i === flowStep ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFlowStep(Math.max(0, flowStep - 1))}
                  disabled={flowStep === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  ← Previous Step
                </button>
                <div className="text-xs font-mono text-gray-400">
                  {flowStep + 1} / {flowSteps.length}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFlowStep(Math.min(flowSteps.length - 1, flowStep + 1))
                  }
                  disabled={flowStep === flowSteps.length - 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Next Step →
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
