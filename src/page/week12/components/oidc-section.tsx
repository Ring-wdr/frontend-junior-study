import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OidcSection = () => {
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
      badge={{ label: 'Identity', color: 'purple' }}
      title="OpenID Connect (OIDC)"
      description="Authentication layer built on top of OAuth 2.0"
    >
      <div className="space-y-8">
        <SubSection title="OAuth 2.0 vs OIDC" icon iconColor="purple">
          <InfoBox variant="purple" title="Key Difference">
            <p className="text-sm leading-relaxed mb-3">
              OAuth 2.0 handles <strong>authorization</strong> (access
              delegation), while OpenID Connect adds{' '}
              <strong>authentication</strong> (user identity verification).
            </p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-900 text-sm">
                  OAuth 2.0
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  "Can this app access my calendar?"
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-900 text-sm">OIDC</p>
                <p className="text-xs text-gray-600 mt-1">
                  "Who is this user?"
                </p>
              </div>
            </div>
          </InfoBox>
        </SubSection>

        <SubSection title="ID Token" icon iconColor="blue">
          <InfoBox variant="blue">
            <p className="text-sm leading-relaxed">
              OIDC introduces the <strong>ID Token</strong>, a signed JWT
              containing user identity claims like email, name, and user ID.
              This token proves who the user is.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium">Standard Claims in ID Token:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { claim: 'sub', desc: 'Subject (unique user ID)' },
                { claim: 'email', desc: 'User email address' },
                { claim: 'name', desc: 'Full name' },
                { claim: 'iss', desc: 'Token issuer' },
                { claim: 'aud', desc: 'Token audience (client ID)' },
                { claim: 'exp', desc: 'Expiration time' },
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

        <SubSection title="ID Token Decoder" icon iconColor="green">
          <DemoBox label="Decode JWT ID Token">
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded text-xs font-mono break-all">
                {sampleIdToken}
              </div>

              <button
                type="button"
                onClick={decodeJwt}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Decode Token
              </button>

              {decodedJwt && (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-xs font-semibold text-blue-800 mb-2">
                      Header
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
                      Payload (Claims)
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

        <SubSection title="OIDC Scopes" icon iconColor="orange">
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

        <SubSection title="OIDC Flow Summary" icon iconColor="red">
          <div className="space-y-3">
            {[
              {
                num: 1,
                text: 'Request authorization with openid scope',
              },
              {
                num: 2,
                text: 'User authenticates at identity provider',
              },
              {
                num: 3,
                text: 'Receive authorization code',
              },
              {
                num: 4,
                text: 'Exchange code for access_token AND id_token',
              },
              {
                num: 5,
                text: 'Validate and decode ID token for user info',
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
              Libraries like <strong>NextAuth.js</strong> handle all these steps
              automatically. You rarely need to implement OIDC manually.
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
