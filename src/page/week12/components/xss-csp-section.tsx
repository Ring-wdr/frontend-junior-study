import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const XssCspSection = () => {
  const { t } = useTranslation('week12');
  const [unsafeInput, setUnsafeInput] = useState(
    '<script>alert("XSS")</script>',
  );
  const sanitizeHtml = (input: string) => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return (
    <SectionCard
      badge={{ label: t('xss.badge'), color: 'purple' }}
      title={t('xss.title')}
      description={t('xss.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('xss.whatIs.title')} icon iconColor="red">
          <InfoBox variant="red" title={t('xss.whatIs.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('xss.whatIs.infoDescription')}
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">{t('xss.whatIs.stored')}</p>
              <p className="text-xs text-red-700 mt-1">
                {t('xss.whatIs.storedDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('xss.whatIs.reflected')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('xss.whatIs.reflectedDesc')}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-sm font-semibold text-yellow-900">{t('xss.whatIs.dom')}</p>
              <p className="text-xs text-yellow-700 mt-1">
                {t('xss.whatIs.domDesc')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('xss.sanitization.title')} icon iconColor="blue">
          <DemoBox label={t('xss.sanitization.demoLabel')}>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${unsafeInput.includes('<script>') ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {t('xss.sanitization.serverStatus')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUnsafeInput('')}
                    className="text-xs text-gray-500 hover:text-gray-900 underline"
                  >
                    {t('xss.sanitization.resetButton')}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="malicious-input"
                    className="text-sm font-bold text-gray-700"
                  >
                    {t('xss.sanitization.inputLabel')}
                  </label>
                  <textarea
                    id="malicious-input"
                    value={unsafeInput}
                    onChange={(e) => setUnsafeInput(e.target.value)}
                    className="w-full p-3 border rounded-lg text-sm font-mono h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t('xss.sanitization.inputPlaceholder')}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setUnsafeInput('<script>alert("Hacked!")</script>')
                      }
                      className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      {t('xss.sanitization.payload1Button')}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setUnsafeInput('<img src=x onerror=alert(1) />')
                      }
                      className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
                    >
                      {t('xss.sanitization.payload2Button')}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      {t('xss.sanitization.vulnerableOutput')}
                    </div>
                    <div className="p-3 border-2 border-red-100 bg-red-50/50 rounded-lg h-32 overflow-auto relative">
                      {/* We simulate the execution for safety reasons instead of actually running it */}
                      {unsafeInput.includes('<script>') ||
                      unsafeInput.includes('onerror') ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 backdrop-blur-[1px]">
                          <div className="bg-white p-4 rounded shadow-xl border border-red-200 animate-bounce">
                            <p className="font-bold text-red-600 flex items-center gap-2">
                              ⚠️ {t('xss.sanitization.scriptExecuted')}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {t('xss.sanitization.xssSuccessful')}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm">{unsafeInput}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-bold text-green-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-600" />
                      {t('xss.sanitization.safeOutput')}
                    </div>
                    <div className="p-3 border-2 border-green-100 bg-green-50/50 rounded-lg h-32 overflow-auto font-mono text-sm text-green-800 whitespace-pre-wrap">
                      {sanitizeHtml(unsafeInput)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('xss.react.title')} icon iconColor="green">
          <InfoBox variant="green" title={t('xss.react.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('xss.react.infoDescription')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// SAFE: React automatically escapes this
const userInput = '<script>alert("XSS")</script>';
return <div>{userInput}</div>; // Renders as text, not executed

// DANGEROUS: Bypasses protection - avoid if possible
return <div dangerouslySetInnerHTML={{ __html: userInput }} />;

// If you MUST use dangerouslySetInnerHTML, sanitize first:
import DOMPurify from 'dompurify';

const sanitized = DOMPurify.sanitize(userInput);
return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('xss.csp.title')}
          icon
          iconColor="purple"
        >
          <InfoBox variant="purple" title={t('xss.csp.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('xss.csp.infoDescription')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// next.config.js - Setting CSP headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",           // Only allow same-origin by default
      "script-src 'self' 'unsafe-inline'", // Scripts from same origin
      "style-src 'self' 'unsafe-inline'",  // Styles from same origin
      "img-src 'self' data: https:",  // Images from self, data URIs, HTTPS
      "font-src 'self'",              // Fonts from same origin
      "connect-src 'self' https://api.example.com", // API connections
      "frame-ancestors 'none'",       // Prevent clickjacking
    ].join('; ')
  }
];

module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: securityHeaders,
    }];
  }
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('xss.directives.title')} icon iconColor="orange">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                directive: 'default-src',
                desc: t('xss.directives.defaultSrc'),
              },
              { directive: 'script-src', desc: t('xss.directives.scriptSrc') },
              { directive: 'style-src', desc: t('xss.directives.styleSrc') },
              { directive: 'img-src', desc: t('xss.directives.imgSrc') },
              { directive: 'connect-src', desc: t('xss.directives.connectSrc') },
              { directive: 'font-src', desc: t('xss.directives.fontSrc') },
              { directive: 'frame-src', desc: t('xss.directives.frameSrc') },
              { directive: 'frame-ancestors', desc: t('xss.directives.frameAncestors') },
            ].map((item) => (
              <div
                key={item.directive}
                className="bg-gray-50 p-2 rounded border text-xs"
              >
                <code className="text-purple-600">{item.directive}</code>
                <p className="text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('xss.checklist.title')} icon iconColor="green">
          <div className="space-y-2">
            {[
              t('xss.checklist.item1'),
              t('xss.checklist.item2'),
              t('xss.checklist.item3'),
              t('xss.checklist.item4'),
              t('xss.checklist.item5'),
              t('xss.checklist.item6'),
              t('xss.checklist.item7'),
              t('xss.checklist.item8'),
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded"
              >
                <span className="text-green-500">✓</span>
                {item}
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('xss.otherHeaders.title')} icon iconColor="blue">
          <CodeBlock
            code={`// Additional security headers for Next.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload' // HSTS
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY' // Prevent clickjacking
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff' // Prevent MIME sniffing
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
