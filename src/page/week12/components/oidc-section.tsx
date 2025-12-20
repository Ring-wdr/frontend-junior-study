import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OidcSection = () => {
  const { t } = useTranslation('week12');
  const [decodedJwt, setDecodedJwt] = useState<{
    header: object;
    payload: object;
  } | null>(null);

  const sampleIdToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJzdWIiOiIxMTAwMTEwMDExMDAxMTAwMTEiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDAwMzYwMH0.signature';

  const decodeJwt = () => {
    const parts = sampleIdToken.split('.');
    setDecodedJwt({
      header: JSON.parse(atob(parts[0])),
      payload: JSON.parse(atob(parts[1])),
    });
  };

  return (
    <SectionCard
      badge={{ label: t('oidc.badge'), color: 'purple' }}
      title={t('oidc.title')}
      description={t('oidc.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('oidc.difference.title')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('oidc.difference.infoTitle')}>
            <p className="text-sm leading-relaxed mb-3">
              {t('oidc.difference.infoDescription')}
            </p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-900 text-sm">
                  {t('oidc.difference.oauth')}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {t('oidc.difference.oauthExample')}
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-900 text-sm">{t('oidc.difference.oidc')}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {t('oidc.difference.oidcExample')}
                </p>
              </div>
            </div>
          </InfoBox>
        </SubSection>

        <SubSection title={t('oidc.idToken.title')} icon iconColor="blue">
          <InfoBox variant="blue">
            <p className="text-sm leading-relaxed">
              {t('oidc.idToken.infoDescription')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium">{t('oidc.idToken.claimsTitle')}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { claim: 'sub', desc: t('oidc.idToken.sub') },
                { claim: 'email', desc: t('oidc.idToken.email') },
                { claim: 'name', desc: t('oidc.idToken.name') },
                { claim: 'iss', desc: t('oidc.idToken.iss') },
                { claim: 'aud', desc: t('oidc.idToken.aud') },
                { claim: 'exp', desc: t('oidc.idToken.exp') },
              ].map((item) => (
                <div
                  key={item.claim}
                  className="bg-gray-50 p-2 rounded border text-xs"
                >
                  <code className="text-blue-600">{item.claim}</code>
                  <span className="text-gray-500 ml-1">- {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </SubSection>

        <SubSection title={t('oidc.decoder.title')} icon iconColor="green">
          <DemoBox label={t('oidc.decoder.demoLabel')}>
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded text-xs font-mono break-all">
                {sampleIdToken}
              </div>

              <button
                type="button"
                onClick={decodeJwt}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                {t('oidc.decoder.decodeButton')}
              </button>

              {decodedJwt && (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-xs font-semibold text-blue-800 mb-2">
                      {t('oidc.decoder.header')}
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <CodeBlock
                        language="json"
                        code={JSON.stringify(decodedJwt.header, null, 2)}
                      />
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-xs font-semibold text-green-800 mb-2">
                      {t('oidc.decoder.payload')}
                    </p>
                    <div className="overflow-hidden rounded-lg">
                      <CodeBlock
                        language="json"
                        code={JSON.stringify(decodedJwt.payload, null, 2)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('oidc.scopes.title')} icon iconColor="orange">
          <CodeBlock
            code={`// OIDC requires the 'openid' scope
const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('scope', 'openid email profile');
//                        ^^^^^^ Required for OIDC

// Common OIDC Scopes:
// - openid: Required, enables OIDC and returns ID token
// - profile: Access to name, picture, etc.
// - email: Access to email and email_verified claims
// - address: Access to address claims
// - phone: Access to phone_number claims`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('oidc.flowSummary.title')} icon iconColor="red">
          <div className="space-y-3">
            {[
              {
                num: 1,
                text: t('oidc.flowSummary.step1'),
              },
              {
                num: 2,
                text: t('oidc.flowSummary.step2'),
              },
              {
                num: 3,
                text: t('oidc.flowSummary.step3'),
              },
              {
                num: 4,
                text: t('oidc.flowSummary.step4'),
              },
              {
                num: 5,
                text: t('oidc.flowSummary.step5'),
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded"
              >
                <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">
                  {step.num}
                </span>
                <span className="text-sm">{step.text}</span>
              </div>
            ))}
          </div>

          <InfoBox variant="gray" className="mt-4">
            <p className="text-sm">
              {t('oidc.flowSummary.infoDescription')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
