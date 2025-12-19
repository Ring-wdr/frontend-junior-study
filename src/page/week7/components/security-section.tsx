import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const SecuritySection = () => {
  return (
    <SectionCard
      badge={{ label: 'Security', color: 'orange' }}
      title="Sanitization & Security"
      description="Protecting against XSS, injection attacks, and secure form practices"
    >
      <div className="space-y-8">
        <SubSection
          title="Frontend Security Responsibility"
          icon
          iconColor="red"
        >
          <InfoBox
            variant="red"
            title="Critical Point: Server Validation is Essential"
          >
            <p className="text-sm mb-3">
              <strong>Frontend security is NOT enough.</strong> Always validate
              and sanitize on the server. Frontend security only improves UX,
              not protection.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Users can bypass frontend validation (disable JavaScript)</li>
              <li>Attackers can directly send requests to your API</li>
              <li>Frontend sanitization may have gaps or bugs</li>
              <li>
                <strong>Server is the final defense line</strong>
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>⚠️ Security Layers:</strong>
            </p>
            <div className="mt-2 text-sm space-y-1">
              <p>1️⃣ Frontend validation (UX, early error detection)</p>
              <p>2️⃣ Frontend sanitization (prevent XSS in display)</p>
              <p>3️⃣ Server validation (MANDATORY - data integrity)</p>
              <p>4️⃣ Server sanitization (MANDATORY - prevent injection)</p>
              <p>
                5️⃣ Database layer (prepared statements, parameterized queries)
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="XSS Prevention" icon iconColor="orange">
          <InfoBox variant="orange" title="What is XSS (Cross-Site Scripting)?">
            <p className="text-sm">
              Attacker injects malicious script into your site, which runs in
              other users' browsers, stealing data or performing actions on
              their behalf.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Common XSS Attack Vectors:
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

          <InfoBox variant="green" title="XSS Prevention Rules">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Default:</strong> Never use dangerouslySetInnerHTML
              </li>
              <li>
                <strong>React escapes:</strong> Always render text normally:{' '}
                <code>{'<div>{text}</div>'}</code>
              </li>
              <li>
                <strong>Rich content:</strong> Only use DOMPurify for innerHTML
              </li>
              <li>
                <strong>URLs:</strong> Validate and sanitize href attributes
              </li>
              <li>
                <strong>Event handlers:</strong> Never bind user input to
                onClick, etc.
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="DOMPurify Integration" icon iconColor="blue">
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

        <SubSection title="SQL Injection Prevention" icon iconColor="purple">
          <InfoBox variant="purple" title="Frontend's Role in SQL Injection">
            <p className="text-sm mb-3">
              <strong>Critical:</strong> SQL injection is primarily a backend
              concern. The frontend can only help with input validation and
              early filtering.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Frontend:</strong> Filter out suspicious patterns (alert
                user)
              </li>
              <li>
                <strong>Backend:</strong> ALWAYS use prepared
                statements/parameterized queries
              </li>
              <li>
                <strong>Backend:</strong> Never concatenate user input into SQL
                strings
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Frontend Validation:
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

        <SubSection title="CSRF Protection" icon iconColor="green">
          <InfoBox
            variant="green"
            title="What is CSRF (Cross-Site Request Forgery)?"
          >
            <p className="text-sm mb-3">
              Attacker tricks user into making unwanted requests to another
              site. Example: User logged into bank.com, attacker's page makes a
              transfer request.
            </p>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              CSRF Protection Pattern:
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

        <SubSection title="Security Checklist" icon iconColor="red">
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Server validates ALL form inputs (backend is final)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Never use <code>dangerouslySetInnerHTML</code> with user data
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Sanitize with DOMPurify for rich content display
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Use parameterized SQL queries (not string concatenation)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Implement CSRF tokens for state-changing requests
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">Use HTTPS for all form submissions</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Mark sensitive form fields with <code>autocomplete="off"</code>
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Hash passwords with bcrypt or similar (server-side)
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded border border-red-200">
              <span className="text-lg">☐</span>
              <p className="text-sm">
                Set <code>Content-Security-Policy</code> headers
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
