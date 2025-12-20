import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { useTranslation } from 'react-i18next';

export const SecuritySection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('security.badge'), color: 'orange' }}
      title={t('security.title')}
      description={t('security.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('security.frontendResponsibility.title')}
          icon
          iconColor="red"
        >
          <InfoBox
            variant="red"
            title={t('security.frontendResponsibility.criticalPoint.title')}
          >
            <p className="text-sm mb-3">
              {t('security.frontendResponsibility.criticalPoint.intro')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t('security.frontendResponsibility.criticalPoint.bypassFrontend')}</li>
              <li>{t('security.frontendResponsibility.criticalPoint.directRequests')}</li>
              <li>{t('security.frontendResponsibility.criticalPoint.gaps')}</li>
              <li>
                {t('security.frontendResponsibility.criticalPoint.serverFinalDefense')}
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>{t('security.frontendResponsibility.securityLayers.title')}</strong>
            </p>
            <div className="mt-2 text-sm space-y-1">
              <p>{t('security.frontendResponsibility.securityLayers.layer1')}</p>
              <p>{t('security.frontendResponsibility.securityLayers.layer2')}</p>
              <p>{t('security.frontendResponsibility.securityLayers.layer3')}</p>
              <p>{t('security.frontendResponsibility.securityLayers.layer4')}</p>
              <p>
                {t('security.frontendResponsibility.securityLayers.layer5')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('security.xssPrevention.title')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('security.xssPrevention.whatIsXSS.title')}>
            <p className="text-sm">
              {t('security.xssPrevention.whatIsXSS.description')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('security.xssPrevention.commonVectors')}
            </p>
            <CodeBlock
              code={`// ❌ VULNERABLE: Directly displaying user input
const CommentDisplay = ({ comment }) => {
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
};

// Input: <img src=x onerror="alert('Hacked!')">
// Result: Script executes in user's browser!

// ✅ SAFE: React escapes by default
const CommentDisplay = ({ comment }) => {
  return <div>{comment}</div>;
};

// Input: <img src=x onerror="alert('Hacked!')">
// Result: Text displayed safely, no script execution

// ✅ SAFE: Use sanitization library for rich content
import DOMPurify from 'dompurify';

const RichCommentDisplay = ({ comment }) => {
  const sanitizedHtml = DOMPurify.sanitize(comment);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

// DOMPurify removes dangerous scripts while keeping safe HTML`}
              className="text-xs"
            />
          </div>

          <InfoBox variant="green" title={t('security.xssPrevention.preventionRules.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('security.xssPrevention.preventionRules.default')}
              </li>
              <li>
                {t('security.xssPrevention.preventionRules.reactEscapes')}
              </li>
              <li>
                {t('security.xssPrevention.preventionRules.richContent')}
              </li>
              <li>
                {t('security.xssPrevention.preventionRules.urls')}
              </li>
              <li>
                {t('security.xssPrevention.preventionRules.eventHandlers')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('security.domPurifyIntegration.title')} icon iconColor="blue">
          <CodeBlock
            code={`import DOMPurify from 'dompurify';

// Configure DOMPurify for your needs
const cleanConfig = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'a', 'br'],
  ALLOWED_ATTR: ['href', 'title'],
  KEEP_CONTENT: true,
};

// Sanitize user input before displaying
const sanitizeUserContent = (html: string): string => {
  return DOMPurify.sanitize(html, cleanConfig);
};

// Example: User bio display
const UserBio = ({ bio }: { bio: string }) => {
  const safeBio = sanitizeUserContent(bio);

  return (
    <div
      className="user-bio"
      dangerouslySetInnerHTML={{ __html: safeBio }}
    />
  );
};

// Rich text editor form
const RichTextForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Sanitize on frontend for display preview
    const preview = sanitizeUserContent(data.content);

    // Send raw data to server
    // Server will sanitize again before storing
    submitToServer(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register('content')}
        placeholder="Enter rich text content"
      />
      <button type="submit">Save</button>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('security.sqlInjectionPrevention.title')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('security.sqlInjectionPrevention.frontendRole.title')}>
            <p className="text-sm mb-3">
              {t('security.sqlInjectionPrevention.frontendRole.critical')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('security.sqlInjectionPrevention.frontendRole.frontend')}
              </li>
              <li>
                {t('security.sqlInjectionPrevention.frontendRole.backend')}
              </li>
              <li>
                {t('security.sqlInjectionPrevention.frontendRole.neverConcat')}
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('security.sqlInjectionPrevention.frontendValidation')}
            </p>
            <CodeBlock
              code={`// Zod schema to catch obvious SQL injection attempts
const userSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(50)
    // Reject common SQL injection patterns
    .refine(
      (val) => !/(DROP|DELETE|INSERT|UPDATE|SELECT|;|--|\\/\\*|\\*\\/)/i.test(val),
      'Username contains invalid characters'
    ),

  email: z
    .string()
    .email()
    .refine(
      (val) => !/(;|--|'|"|\\\\)/i.test(val),
      'Email contains invalid characters'
    ),
});

// Server-side (Node.js/Express example) - CRITICAL!
app.post('/api/user', async (req, res) => {
  const { username, email } = req.body;

  try {
    // ❌ WRONG: Vulnerable to SQL injection
    // const query = \`INSERT INTO users VALUES ('\${username}', '\${email}')\`;
    // db.query(query);

    // ✅ CORRECT: Use parameterized query
    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.query(query, [username, email]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('security.csrfProtection.title')} icon iconColor="green">
          <InfoBox
            variant="green"
            title={t('security.csrfProtection.whatIsCSRF.title')}
          >
            <p className="text-sm mb-3">
              {t('security.csrfProtection.whatIsCSRF.description')}
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('security.csrfProtection.protectionPattern')}
            </p>
            <CodeBlock
              code={`// Server generates CSRF token
app.get('/csrf-token', (req, res) => {
  const token = generateSecureToken();
  req.session.csrfToken = token;
  res.json({ token });
});

// Frontend includes token in form submission
const CSRFProtectedForm = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/csrf-token')
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.token));
  }, []);

  const onSubmit = async (data: any) => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }}>
      {/* CSRF token automatically included in request */}
      <input type="hidden" value={csrfToken} name="csrf" />
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
};

// Server validates CSRF token
app.post('/api/submit', (req, res) => {
  if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
    return res.status(403).json({ error: 'CSRF validation failed' });
  }
  // Process form...
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('security.securityChecklist.title')} icon iconColor="red">
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.serverValidates')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.noDangerouslySet')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.useDOMPurify')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.parameterizedSQL')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.implementCSRF')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">{t('security.securityChecklist.useHTTPS')}</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.autocompleteOff')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.hashPasswords')}
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                {t('security.securityChecklist.cspHeaders')}
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
