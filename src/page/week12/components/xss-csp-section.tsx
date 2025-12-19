import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const XssCspSection = () => {
  const [unsafeInput, setUnsafeInput] = useState(
    '<script>alert("XSS")</script>',
  );
  const [sanitizedOutput, setSanitizedOutput] = useState('');

  const sanitizeHtml = (input: string) => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleSanitize = () => {
    setSanitizedOutput(sanitizeHtml(unsafeInput));
  };

  return (
    <SectionCard
      badge={{ label: 'Security', color: 'purple' }}
      title="XSS & Content Security Policy"
      description="Defending against Cross-Site Scripting attacks"
    >
      <div className="space-y-8">
        <SubSection title="What is XSS?" icon iconColor="red">
          <InfoBox variant="red" title="Cross-Site Scripting">
            <p className="text-sm leading-relaxed">
              XSS allows attackers to inject malicious scripts into web pages
              viewed by other users. These scripts can steal cookies, session
              tokens, or perform actions as the victim.
            </p>
          </InfoBox>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">Stored XSS</p>
              <p className="text-xs text-red-700 mt-1">
                Malicious script saved in database, affects all users viewing
                the content
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                Reflected XSS
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Script injected via URL parameters, executed immediately
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-sm font-semibold text-yellow-900">DOM XSS</p>
              <p className="text-xs text-yellow-700 mt-1">
                Client-side JavaScript manipulates DOM with untrusted data
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Input Sanitization Demo" icon iconColor="blue">
          <DemoBox label="HTML Escaping">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  User Input (potentially malicious):
                </label>
                <textarea
                  value={unsafeInput}
                  onChange={(e) => setUnsafeInput(e.target.value)}
                  className="w-full p-2 border rounded text-sm font-mono h-20"
                />
              </div>

              <button
                type="button"
                onClick={handleSanitize}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Sanitize HTML
              </button>

              {sanitizedOutput && (
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-xs font-semibold text-green-800 mb-2">
                    Safe Output (Escaped):
                  </p>
                  <code className="text-xs text-green-700 break-all">
                    {sanitizedOutput}
                  </code>
                </div>
              )}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="React's Built-in Protection" icon iconColor="green">
          <InfoBox variant="green" title="Automatic Escaping">
            <p className="text-sm leading-relaxed">
              React automatically escapes values embedded in JSX, providing
              built-in XSS protection. However,{' '}
              <code>dangerouslySetInnerHTML</code> bypasses this protection.
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
          title="Content Security Policy (CSP)"
          icon
          iconColor="purple"
        >
          <InfoBox variant="purple" title="Defense in Depth">
            <p className="text-sm leading-relaxed">
              CSP is an HTTP header that tells browsers which sources of content
              are trusted. Even if XSS is injected, CSP can prevent it from
              executing.
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

        <SubSection title="CSP Directives Reference" icon iconColor="orange">
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                directive: 'default-src',
                desc: 'Fallback for other directives',
              },
              { directive: 'script-src', desc: 'JavaScript sources' },
              { directive: 'style-src', desc: 'CSS sources' },
              { directive: 'img-src', desc: 'Image sources' },
              { directive: 'connect-src', desc: 'Fetch/XHR/WebSocket' },
              { directive: 'font-src', desc: 'Font file sources' },
              { directive: 'frame-src', desc: 'iframe sources' },
              { directive: 'frame-ancestors', desc: 'Who can embed this page' },
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

        <SubSection title="XSS Prevention Checklist" icon iconColor="green">
          <div className="space-y-2">
            {[
              'Never use dangerouslySetInnerHTML with untrusted data',
              'Use DOMPurify to sanitize any HTML that must be rendered',
              'Validate and sanitize all user inputs server-side',
              'Implement Content Security Policy headers',
              'Use HttpOnly cookies for sensitive tokens',
              'Avoid inline event handlers (onclick, onerror, etc.)',
              'Keep dependencies updated to patch XSS vulnerabilities',
              'Use React/frameworks that escape by default',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded"
              >
                <span className="text-green-500">✓</span>
                {item}
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Other Security Headers" icon iconColor="blue">
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
