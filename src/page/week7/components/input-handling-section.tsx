import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { useTranslation } from 'react-i18next';

export const InputHandlingSection = () => {
  const { t } = useTranslation('week7');

  return (
    <SectionCard
      badge={{ label: t('inputHandling.badge'), color: 'orange' }}
      title={t('inputHandling.title')}
      description={t('inputHandling.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('inputHandling.emojiProblem.title')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('inputHandling.emojiProblem.whyTricky.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('inputHandling.emojiProblem.whyTricky.multipleChars')}
              </li>
              <li>
                {t('inputHandling.emojiProblem.whyTricky.lengthIssue')}
              </li>
              <li>
                {t('inputHandling.emojiProblem.whyTricky.composed')}
              </li>
              <li>
                {t('inputHandling.emojiProblem.whyTricky.lengthValidation')}
              </li>
              <li>{t('inputHandling.emojiProblem.whyTricky.substringOps')}</li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('inputHandling.emojiProblem.correctCounting')}
            </p>
            <CodeBlock
              code={`// ❌ WRONG: Using string.length
const emoji = '👨‍👩‍👧‍👦';
console.log(emoji.length); // 25 (wrong!)

// ✅ CORRECT: Use Array.from() or spread operator
console.log(Array.from(emoji).length); // 1 (correct!)
console.log([...emoji].length); // 1 (correct!)

// ✅ CORRECT: Use Intl.Segmenter (modern)
const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
const chars = [...segmenter.segment(emoji)].length; // 1

// Validation helper
const getCharacterCount = (str: string): number => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(str)].length;
  }
  // Fallback for older browsers
  return [...str].length;
};`}
              className="text-xs"
            />
          </div>

          <InfoBox variant="blue" title={t('inputHandling.emojiProblem.practicalExample.title')}>
            <CodeBlock
              code={`// Input field with emoji support
<input
  maxLength={50}
  onChange={(e) => {
    const charCount = getCharacterCount(e.target.value);
    if (charCount > 50) {
      // Truncate correctly using Array.from()
      const chars = Array.from(e.target.value);
      e.target.value = chars.slice(0, 50).join('');
    }
  }}
  placeholder="Enter text (max 50 characters)"
/>`}
              className="text-xs"
            />
          </InfoBox>
        </SubSection>

        <SubSection title={t('inputHandling.unicodeNormalization.title')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('inputHandling.unicodeNormalization.whatIsNormalization.title')}>
            <p className="text-sm mb-3">
              {t('inputHandling.unicodeNormalization.whatIsNormalization.intro')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('inputHandling.unicodeNormalization.whatIsNormalization.singleCodepoint')}
              </li>
              <li>
                {t('inputHandling.unicodeNormalization.whatIsNormalization.composed')}
              </li>
              <li>{t('inputHandling.unicodeNormalization.whatIsNormalization.lookIdentical')}</li>
              <li>{t('inputHandling.unicodeNormalization.whatIsNormalization.causesFails')}</li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('inputHandling.unicodeNormalization.normalizationForms')}
            </p>
            <CodeBlock
              code={`// NFC (Composed) - Recommended for storage
// Most compact, what browsers typically use
const nfc = 'café'.normalize('NFC');

// NFD (Decomposed) - Used for analysis
const nfd = 'café'.normalize('NFD');

// Example: String comparison issue
const user1 = 'café'; // NFC
const user2 = 'café'; // NFD

console.log(user1 === user2); // false ❌

// Solution: Always normalize before comparison
console.log(
  user1.normalize('NFC') === user2.normalize('NFC')
); // true ✅

// Best practice: Normalize on input
const normalizeInput = (value: string): string => {
  return value.normalize('NFC');
};

// In form schema (Zod)
const userSchema = z.object({
  username: z
    .string()
    .transform((val) => val.normalize('NFC'))
    .refine((val) => val.length > 0, 'Username required'),
});`}
              className="text-xs"
            />
          </div>

          <InfoBox variant="green" title={t('inputHandling.unicodeNormalization.whenToNormalize.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('inputHandling.unicodeNormalization.whenToNormalize.beforeStoring')}
              </li>
              <li>
                {t('inputHandling.unicodeNormalization.whenToNormalize.beforeComparing')}
              </li>
              <li>
                {t('inputHandling.unicodeNormalization.whenToNormalize.beforeSearching')}
              </li>
              <li>
                {t('inputHandling.unicodeNormalization.whenToNormalize.onDisplay')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('inputHandling.whitespaceTrimming.title')} icon iconColor="green">
          <InfoBox variant="green" title={t('inputHandling.whitespaceTrimming.whitespaceTypes.title')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                {t('inputHandling.whitespaceTrimming.whitespaceTypes.regularSpace')}
              </li>
              <li>
                {t('inputHandling.whitespaceTrimming.whitespaceTypes.nonBreakingSpace')}
              </li>
              <li>
                {t('inputHandling.whitespaceTrimming.whitespaceTypes.tab')}
              </li>
              <li>
                {t('inputHandling.whitespaceTrimming.whitespaceTypes.zeroWidth')}
              </li>
              <li>
                {t('inputHandling.whitespaceTrimming.whitespaceTypes.lineBreak')}
              </li>
            </ul>
          </InfoBox>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              {t('inputHandling.whitespaceTrimming.trimmingStrategies')}
            </p>
            <CodeBlock
              code={`// Basic trim (handles U+0020 tabs, newlines)
const basic = '  hello world  '.trim();

// Trim all Unicode whitespace
const trimAllWhitespace = (str: string): string => {
  return str.replace(/^\\s+|\\s+$/gu, '');
};

// Trim and normalize internal whitespace
const cleanWhitespace = (str: string): string => {
  return str
    .trim()
    .replace(/\\s+/g, ' ') // Replace multiple spaces with single space
    .normalize('NFC');
};

// In form validation
const schema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Min 3 characters')
    .transform((val) => val.normalize('NFC')),

  email: z
    .string()
    .toLowerCase()
    .trim()
    .email(),
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('inputHandling.botPrevention.title')} icon iconColor="purple">
          <InfoBox variant="purple" title={t('inputHandling.botPrevention.honeypot.title')}>
            <p className="text-sm">
              {t('inputHandling.botPrevention.honeypot.description')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Honeypot field in form
const BotProtectedForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Check honeypot field
    if (data.website) {
      // Likely a bot
      console.warn('Possible bot submission detected');
      return;
    }

    // Continue with legitimate submission
    submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <input {...register('email')} placeholder="Email" />
      <input {...register('message')} placeholder="Message" />

      {/* Honeypot field - hidden from users */}
      <input
        {...register('website')}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

// Server-side validation (CRITICAL!)
app.post('/submit-form', (req, res) => {
  // Always validate on server
  if (req.body.website) {
    return res.status(400).json({ error: 'Invalid submission' });
  }
  // Process form...
});`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('inputHandling.completeSanitization.title')}
          icon
          iconColor="purple"
        >
          <CodeBlock
            code={`// Comprehensive input cleaning function
const cleanFormInput = (value: string): string => {
  return value
    .trim()                      // Remove leading/trailing whitespace
    .normalize('NFC')            // Normalize unicode
    .replace(/\\s+/g, ' ')       // Collapse multiple spaces
    .replace(/[\\x00-\\x1F\\x7F-\\x9F]/g, ''); // Remove control characters
};

// In Zod schema
const contactSchema = z.object({
  name: z.string()
    .transform(cleanFormInput)
    .pipe(z.string().min(2).max(100)),

  email: z.string()
    .toLowerCase()
    .trim()
    .email()
    .max(255),

  message: z.string()
    .transform(cleanFormInput)
    .min(10, 'Message too short')
    .max(1000, 'Message too long'),
});

// In React Hook Form
const ContactForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Your name" />
      <input {...register('email')} type="email" placeholder="Email" />
      <textarea {...register('message')} placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
};`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
