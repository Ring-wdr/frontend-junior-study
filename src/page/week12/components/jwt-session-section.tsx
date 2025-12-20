import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const JwtSessionSection = () => {
  const { t } = useTranslation('week12');
  const [activeComparison, setActiveComparison] = useState<'jwt' | 'session'>(
    'jwt',
  );

  const comparisons = {
    jwt: {
      title: t('jwt.comparison.jwtTitle'),
      pros: t('jwt.comparison.jwtPros', { returnObjects: true }) as string[],
      cons: t('jwt.comparison.jwtCons', { returnObjects: true }) as string[],
      color: 'blue',
    },
    session: {
      title: t('jwt.comparison.sessionTitle'),
      pros: t('jwt.comparison.sessionPros', { returnObjects: true }) as string[],
      cons: t('jwt.comparison.sessionCons', { returnObjects: true }) as string[],
      color: 'green',
    },
  };

  return (
    <SectionCard
      badge={{ label: t('jwt.badge'), color: 'orange' }}
      title={t('jwt.title')}
      description={t('jwt.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('jwt.structure.title')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('jwt.structure.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('jwt.structure.infoDescription')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-2">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-xs font-semibold text-red-800">
                {t('jwt.structure.header')}
              </p>
              <code className="text-xs text-red-700">
                {`{"alg": "HS256", "typ": "JWT"}`}
              </code>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-xs font-semibold text-purple-800">
                {t('jwt.structure.payload')}
              </p>
              <code className="text-xs text-purple-700">
                {`{"sub": "123", "name": "John", "exp": 1700000000}`}
              </code>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-xs font-semibold text-blue-800">
                {t('jwt.structure.signature')}
              </p>
              <code className="text-xs text-blue-700">
                HMACSHA256(base64(header) + "." + base64(payload), secret)
              </code>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('jwt.comparison.title')} icon iconColor="purple">
          <DemoBox label={t('jwt.comparison.demoLabel')}>
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
                      {t('jwt.comparison.prosLabel')}
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
                      {t('jwt.comparison.consLabel')}
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

        <SubSection title={t('jwt.storage.title')} icon iconColor="red">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-red-500 text-xl">&#10005;</span>
              <div>
                <p className="font-semibold text-red-900 text-sm">
                  {t('jwt.storage.localStorage')}
                </p>
                <p className="text-xs text-red-700">
                  {t('jwt.storage.localStorageDesc')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
              <span className="text-green-500 text-xl">&#10003;</span>
              <div>
                <p className="font-semibold text-green-900 text-sm">
                  {t('jwt.storage.httpOnly')}
                </p>
                <p className="text-xs text-green-700">
                  {t('jwt.storage.httpOnlyDesc')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-200">
              <span className="text-blue-500 text-xl">&#8776;</span>
              <div>
                <p className="font-semibold text-blue-900 text-sm">
                  {t('jwt.storage.memory')}
                </p>
                <p className="text-xs text-blue-700">
                  {t('jwt.storage.memoryDesc')}
                </p>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('jwt.refresh.title')} icon iconColor="orange">
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

        <SubSection title={t('jwt.hybrid.title')} icon iconColor="green">
          <InfoBox variant="green" title={t('jwt.hybrid.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('jwt.hybrid.infoDescription')}
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
