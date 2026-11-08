'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type ActorId = 'client' | 'browser' | 'auth' | 'api';

const actors: { id: ActorId; icon: string }[] = [
  { id: 'client', icon: '💻' },
  { id: 'browser', icon: '🌍' },
  { id: 'auth', icon: '🛡️' },
  { id: 'api', icon: '📦' },
];

export const OAuthSection = () => {
  const { t } = useTranslation('week12');
  const [flowStep, setFlowStep] = useState(0);

  const flowSteps: { step: number; title: string; actorId: ActorId }[] = [
    { step: 1, title: t('oauth.flow.step1'), actorId: 'client' },
    { step: 2, title: t('oauth.flow.step2'), actorId: 'browser' },
    { step: 3, title: t('oauth.flow.step3'), actorId: 'auth' },
    { step: 4, title: t('oauth.flow.step4'), actorId: 'auth' },
    { step: 5, title: t('oauth.flow.step5'), actorId: 'client' },
    { step: 6, title: t('oauth.flow.step6'), actorId: 'auth' },
    { step: 7, title: t('oauth.flow.step7'), actorId: 'api' },
  ];
  const actorLabels: Record<ActorId, string> = {
    client: t('oauth.flow.actorClient'),
    browser: t('oauth.flow.actorBrowser'),
    auth: t('oauth.flow.actorAuth'),
    api: t('oauth.flow.actorApi'),
  };
  const current = flowSteps[flowStep];

  return (
    <SectionCard
      badge={{ label: t('oauth.badge'), color: 'blue' }}
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

        <SubSection title={t('oauth.roles.title')} icon iconColor="purple">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                {t('oauth.roles.resourceOwner')}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {t('oauth.roles.resourceOwnerDesc')}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                {t('oauth.roles.client')}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {t('oauth.roles.clientDesc')}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                {t('oauth.roles.authServer')}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {t('oauth.roles.authServerDesc')}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                {t('oauth.roles.resourceServer')}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {t('oauth.roles.resourceServerDesc')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('oauth.flow.title')} icon iconColor="green">
          <DemoBox label={t('oauth.flow.demoLabel')}>
            <div className="space-y-6">
              {/* Visual Map */}
              <div className="relative h-48 bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-between px-3 sm:px-8 md:px-12 overflow-hidden">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0" />

                {/* Active Progress Line */}
                <div
                  className="absolute top-1/2 left-0 h-1 bg-green-500 transition-[width] duration-500 ease-out z-0"
                  style={{
                    width: `${(flowStep / (flowSteps.length - 1)) * 100}%`,
                  }}
                />

                {/* Actors / Nodes */}
                {actors.map((actor) => (
                  <div
                    key={actor.id}
                    className="relative z-10 flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl border-4 transition-all duration-300 ease-out bg-white ${
                        current.actorId === actor.id
                          ? 'border-green-500 scale-110 shadow-lg'
                          : 'border-gray-200 grayscale opacity-70'
                      }`}
                    >
                      {actor.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-600 text-center">
                      {actorLabels[actor.id]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step Description */}
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-green-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {t('oauth.flow.stepHeading', {
                    step: current.step,
                    actor: actorLabels[current.actorId],
                  })}
                </h4>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  key={flowStep}
                  className="text-gray-600 text-base sm:text-lg"
                >
                  {current.title}
                </motion.p>
                <div className="mt-4 flex gap-2 justify-center">
                  {flowSteps.map((s, i) => (
                    <div
                      key={s.step}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === flowStep ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFlowStep(Math.max(0, flowStep - 1))}
                  disabled={flowStep === 0}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {t('oauth.flow.prevButton')}
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
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {t('oauth.flow.nextButton')}
                </button>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('oauth.authUrl.title')} icon iconColor="orange">
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

        <SubSection title={t('oauth.tokenExchange.title')} icon iconColor="red">
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

          <InfoBox
            variant="orange"
            title={t('oauth.tokenExchange.securityNote')}
            className="mt-4"
          >
            <p className="text-sm">
              <Trans t={t} i18nKey="oauth.tokenExchange.securityDescription" />
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
