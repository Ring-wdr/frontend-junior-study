import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const JwtSessionSection = () => {
  const [activeComparison, setActiveComparison] = useState<'jwt' | 'session'>(
    'jwt',
  );

  const comparisons = {
    jwt: {
      title: 'JWT (Stateless)',
      pros: [
        'No server-side storage needed',
        'Scales horizontally easily',
        'Works well with microservices',
        'Can contain user claims',
      ],
      cons: [
        'Difficult to revoke (until expiry)',
        'Token size can be large',
        'Must handle token refresh',
        'Vulnerable if stored in localStorage',
      ],
      color: 'blue',
    },
    session: {
      title: 'Session (Stateful)',
      pros: [
        'Easy to revoke (delete from store)',
        'Small cookie size (just session ID)',
        'Better control over active sessions',
        'Can store complex session data',
      ],
      cons: [
        'Requires server-side storage',
        'Scaling requires shared session store',
        'Session lookup on every request',
        'Sticky sessions or Redis needed',
      ],
      color: 'green',
    },
  };

  return (
    <SectionCard
      badge={{ label: 'Concepts', color: 'orange' }}
      title="JWT vs Session Authentication"
      description="Understanding stateless vs stateful authentication approaches"
    >
      <div className="space-y-8">
        <SubSection title="JWT Structure" icon iconColor="blue">
          <InfoBox variant="blue" title="JSON Web Token">
            <p className="text-sm leading-relaxed">
              JWT is a self-contained token format with three Base64-encoded
              parts: <strong>Header.Payload.Signature</strong>
            </p>
          </InfoBox>

          <div className="mt-4 space-y-2">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-xs font-semibold text-red-800">
                Header (Algorithm & Type)
              </p>
              <code className="text-xs text-red-700">
                {`{"alg": "HS256", "typ": "JWT"}`}
              </code>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-xs font-semibold text-purple-800">
                Payload (Claims)
              </p>
              <code className="text-xs text-purple-700">
                {`{"sub": "123", "name": "John", "exp": 1700000000}`}
              </code>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-xs font-semibold text-blue-800">
                Signature (Verification)
              </p>
              <code className="text-xs text-blue-700">
                HMACSHA256(base64(header) + "." + base64(payload), secret)
              </code>
            </div>
          </div>
        </SubSection>

        <SubSection title="Comparison" icon iconColor="purple">
          <DemoBox label="JWT vs Session">
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveComparison('jwt')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeComparison === 'jwt'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  JWT
                </button>
                <button
                  type="button"
                  onClick={() => setActiveComparison('session')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeComparison === 'session'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Session
                </button>
              </div>

              <div
                className={`p-4 rounded-lg border ${activeComparison === 'jwt' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}
              >
                <h4
                  className={`font-semibold mb-3 ${activeComparison === 'jwt' ? 'text-blue-900' : 'text-green-900'}`}
                >
                  {comparisons[activeComparison].title}
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-2">
                      Pros
                    </p>
                    <ul className="space-y-1">
                      {comparisons[activeComparison].pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="text-xs flex items-start gap-1"
                        >
                          <span className="text-green-500">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-700 mb-2">
                      Cons
                    </p>
                    <ul className="space-y-1">
                      {comparisons[activeComparison].cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="text-xs flex items-start gap-1"
                        >
                          <span className="text-red-500">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Token Storage Best Practices" icon iconColor="red">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-red-500 text-xl">&#10005;</span>
              <div>
                <p className="font-semibold text-red-900 text-sm">
                  localStorage
                </p>
                <p className="text-xs text-red-700">
                  Vulnerable to XSS attacks - avoid for sensitive tokens
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-green-500 text-xl">&#10003;</span>
              <div>
                <p className="font-semibold text-green-900 text-sm">
                  HttpOnly Cookie
                </p>
                <p className="text-xs text-green-700">
                  Not accessible via JavaScript - recommended for tokens
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-200">
              <span className="text-blue-500 text-xl">&#8776;</span>
              <div>
                <p className="font-semibold text-blue-900 text-sm">
                  Memory (in-app state)
                </p>
                <p className="text-xs text-blue-700">
                  Safe but lost on refresh - use with refresh tokens
                </p>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection title="Refresh Token Pattern" icon iconColor="orange">
          <CodeBlock
            code={`// Token refresh implementation
async function refreshAccessToken() {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include', // Include refresh token cookie
  });

  if (!response.ok) {
    // Refresh token expired - redirect to login
    window.location.href = '/login';
    return null;
  }

  const { accessToken } = await response.json();
  return accessToken;
}

// Axios interceptor for automatic refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Modern Hybrid Approach" icon iconColor="green">
          <InfoBox variant="green" title="Best Practice">
            <p className="text-sm leading-relaxed">
              Modern apps often use a <strong>hybrid approach</strong>: JWT
              access tokens (short-lived, in memory) + HttpOnly refresh tokens
              (long-lived, in cookies). This combines JWT scalability with
              session-like revocation capabilities.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Hybrid token strategy
// 1. Access Token: Short-lived JWT (15 min)
//    - Stored in memory (React state/context)
//    - Sent in Authorization header
//    - Contains user claims

// 2. Refresh Token: Long-lived (7 days)
//    - Stored in HttpOnly, Secure, SameSite cookie
//    - Only sent to /api/auth/refresh endpoint
//    - Can be revoked server-side

// Server can maintain a token blacklist for compromised tokens
const revokedTokens = new Set();

function verifyToken(token) {
  if (revokedTokens.has(token.jti)) {
    throw new Error('Token has been revoked');
  }
  return jwt.verify(token, SECRET);
}`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
