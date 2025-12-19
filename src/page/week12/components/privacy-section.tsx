import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const PrivacySection = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [password, setPassword] = useState('');

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return Math.min(strength, 5);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];

  return (
    <SectionCard
      badge={{ label: 'Best Practices', color: 'gray' }}
      title="Privacy & Security UX"
      description="Frontend considerations for user privacy and security"
    >
      <div className="space-y-8">
        <SubSection title="Data Minimization" icon iconColor="blue">
          <InfoBox variant="blue" title="Store Only What's Needed">
            <p className="text-sm leading-relaxed">
              Follow the principle of data minimization: only collect, store,
              and process data that is absolutely necessary. This reduces risk
              and helps with GDPR/CCPA compliance.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>Store tokens in HttpOnly cookies, not localStorage</li>
              <li>Don't store sensitive data in client-side state</li>
              <li>Clear sensitive data from memory after use</li>
              <li>Mask or truncate sensitive displays (e.g., •••• 4242)</li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title="Password Field Best Practices"
          icon
          iconColor="green"
        >
          <DemoBox label="Password Strength Indicator">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Enter Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  autoComplete="new-password"
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Enter a password"
                />
              </div>

              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded ${
                          i < passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-sm ${
                      passwordStrength <= 2 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    Strength:{' '}
                    {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                  </p>
                </div>
              )}
            </div>
          </DemoBox>

          <CodeBlock
            code={`// Password input best practices
<input
  type="password"
  autoComplete="new-password"  // For registration forms
  // autoComplete="current-password" // For login forms
  minLength={8}
  required
/>

// Show/hide password toggle
const [showPassword, setShowPassword] = useState(false);

<input
  type={showPassword ? "text" : "password"}
  autoComplete="current-password"
/>
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? "Hide" : "Show"}
</button>`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Secure Logout Implementation" icon iconColor="red">
          <CodeBlock
            code={`// Complete logout implementation
async function logout() {
  // 1. Call server to invalidate session/token
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  // 2. Clear client-side state
  setUser(null);
  setAccessToken(null);

  // 3. Clear any cached data
  queryClient.clear(); // React Query
  // or: dispatch({ type: 'RESET_STATE' }); // Redux

  // 4. Clear sensitive localStorage/sessionStorage
  localStorage.removeItem('user-preferences');
  sessionStorage.clear();

  // 5. Redirect to login page
  window.location.href = '/login';
  // Using window.location ensures full page reload,
  // clearing any in-memory state
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Session Timeout UX" icon iconColor="orange">
          <InfoBox variant="orange" title="User-Friendly Session Management">
            <p className="text-sm leading-relaxed">
              Implement session timeout warnings to prevent data loss and
              improve user experience. Warn users before their session expires.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Session timeout warning component
function SessionTimeoutWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Show warning 1 minute before session expires
    const warningTimeout = setTimeout(() => {
      setShowWarning(true);
    }, SESSION_DURATION - 60000);

    return () => clearTimeout(warningTimeout);
  }, []);

  const extendSession = async () => {
    await fetch('/api/auth/extend-session', {
      method: 'POST',
      credentials: 'include',
    });
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2>Session Expiring</h2>
        <p>Your session will expire in {timeLeft} seconds</p>
        <button onClick={extendSession}>Stay Logged In</button>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title="Two-Factor Authentication UX"
          icon
          iconColor="purple"
        >
          <DemoBox label="2FA Code Input Pattern">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center text-xl font-mono border-2 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="•"
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Auto-focus next input on entry for better UX
            </p>
          </DemoBox>

          <CodeBlock
            code={`// 2FA input with auto-focus
function TwoFactorInput({ onComplete }) {
  const inputRefs = useRef([]);
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (index, value) => {
    if (!/^\\d*$/.test(value)) return; // Only digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newCode.every(digit => digit) && newCode.length === 6) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={el => inputRefs.current[idx] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(idx, e.target.value)}
          onKeyDown={e => handleKeyDown(idx, e)}
        />
      ))}
    </div>
  );
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Privacy Compliance Checklist" icon iconColor="green">
          <div className="space-y-2">
            {[
              {
                item: 'Display cookie consent banner before setting non-essential cookies',
                category: 'GDPR/CCPA',
              },
              {
                item: 'Provide clear privacy policy link in footer',
                category: 'Legal',
              },
              {
                item: 'Allow users to download their data (data portability)',
                category: 'GDPR',
              },
              {
                item: 'Implement account deletion functionality',
                category: 'GDPR/CCPA',
              },
              {
                item: 'Log security-relevant events (login, password change)',
                category: 'Security',
              },
              {
                item: 'Mask sensitive data in logs and error messages',
                category: 'Security',
              },
              {
                item: 'Use HTTPS everywhere',
                category: 'Security',
              },
              {
                item: 'Implement rate limiting for auth endpoints',
                category: 'Security',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded"
              >
                <span className="text-green-500">✓</span>
                <div>
                  <p className="text-sm">{item.item}</p>
                  <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
