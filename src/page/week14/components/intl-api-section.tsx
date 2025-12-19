import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Locale = 'ko-KR' | 'en-US' | 'de-DE' | 'ja-JP' | 'ar-SA';

export const IntlApiSection = () => {
  const [locale, setLocale] = useState<Locale>('ko-KR');
  const [number] = useState(1234567.89);
  const [date] = useState(new Date());

  const localeOptions: { value: Locale; label: string; flag: string }[] = [
    { value: 'ko-KR', label: '한국어', flag: '🇰🇷' },
    { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { value: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'ja-JP', label: '日本語', flag: '🇯🇵' },
    { value: 'ar-SA', label: 'العربية', flag: '🇸🇦' },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale).format(num);
  };

  const formatCurrency = (num: number, currency: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(num);
  };

  const formatDate = (d: Date, style: 'short' | 'medium' | 'long' | 'full') => {
    return new Intl.DateTimeFormat(locale, { dateStyle: style }).format(d);
  };

  const formatTime = (d: Date) => {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(d);
  };

  const formatRelativeTime = (value: number, unit: Intl.RelativeTimeFormatUnit) => {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
      value,
      unit,
    );
  };

  return (
    <SectionCard
      badge={{ label: 'Intl', color: 'green' }}
      title="JavaScript Intl API"
      description="브라우저 내장 국제화 API로 날짜, 숫자, 통화 포맷팅"
    >
      <div className="space-y-8">
        <SubSection title="Intl API Overview" icon iconColor="green">
          <InfoBox variant="green" title="Built-in Internationalization">
            <p className="text-sm">
              JavaScript의 <code>Intl</code> 객체는 브라우저에 내장된 강력한
              국제화 API입니다. 라이브러리 없이도 날짜, 숫자, 통화, 복수형 등을
              로케일에 맞게 포맷팅할 수 있습니다.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="Interactive: 로케일별 포맷팅" icon iconColor="blue">
          <DemoBox label="Select Locale to See Differences">
            <div className="space-y-4">
              {/* Locale Selector */}
              <div className="flex gap-2 flex-wrap">
                {localeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLocale(opt.value)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition flex items-center gap-1 ${
                      locale === opt.value
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Number Formatting */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    NumberFormat
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">숫자:</span>
                      <span className="font-mono">{formatNumber(number)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">USD:</span>
                      <span className="font-mono">
                        {formatCurrency(number, 'USD')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">KRW:</span>
                      <span className="font-mono">
                        {formatCurrency(number, 'KRW')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">EUR:</span>
                      <span className="font-mono">
                        {formatCurrency(number, 'EUR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date Formatting */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    DateTimeFormat
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Short:</span>
                      <span className="font-mono">
                        {formatDate(date, 'short')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Medium:</span>
                      <span className="font-mono">
                        {formatDate(date, 'medium')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Long:</span>
                      <span className="font-mono text-xs">
                        {formatDate(date, 'long')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-mono">{formatTime(date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Relative Time */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  RelativeTimeFormat
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: -1, unit: 'day' as const },
                    { value: 0, unit: 'day' as const },
                    { value: 1, unit: 'day' as const },
                    { value: -2, unit: 'week' as const },
                    { value: 3, unit: 'month' as const },
                  ].map((item) => (
                    <span
                      key={`${item.value}-${item.unit}`}
                      className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                    >
                      {formatRelativeTime(item.value, item.unit)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Intl.NumberFormat" icon iconColor="purple">
          <CodeBlock
            code={`// Basic number formatting
new Intl.NumberFormat('de-DE').format(1234567.89)
// → "1.234.567,89"

new Intl.NumberFormat('en-US').format(1234567.89)
// → "1,234,567.89"

// Currency formatting
new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW'
}).format(15000)
// → "₩15,000"

new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(99.99)
// → "$99.99"

// Percentage
new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1
}).format(0.856)
// → "85.6%"

// Compact notation
new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short'
}).format(1500000)
// → "1.5M"`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Intl.DateTimeFormat" icon iconColor="orange">
          <CodeBlock
            code={`// Date formatting
new Intl.DateTimeFormat('ko-KR').format(new Date())
// → "2024. 1. 15."

new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long'
}).format(new Date())
// → "Monday, January 15, 2024 at 3:30:00 PM GMT+9"

// Custom format
new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Seoul'
}).format(new Date())

// Intl.RelativeTimeFormat
new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })
  .format(-1, 'day')
// → "어제"

new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  .format(-1, 'day')
// → "yesterday"`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="기타 유용한 Intl API" icon iconColor="red">
          <div className="space-y-3">
            {[
              {
                api: 'Intl.ListFormat',
                example: 'new Intl.ListFormat("en").format(["a", "b", "c"])',
                result: '"a, b, and c"',
              },
              {
                api: 'Intl.PluralRules',
                example: 'new Intl.PluralRules("en").select(1)',
                result: '"one"',
              },
              {
                api: 'Intl.Collator',
                example: '["ä", "a", "z"].sort(new Intl.Collator("de").compare)',
                result: '["a", "ä", "z"]',
              },
              {
                api: 'Intl.Segmenter',
                example: 'Segment text into words/sentences',
                result: 'Text analysis',
              },
            ].map((item) => (
              <div
                key={item.api}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <code className="text-sm font-mono text-blue-600">
                  {item.api}
                </code>
                <div className="text-xs font-mono text-gray-600 mt-1">
                  {item.example}
                </div>
                <div className="text-xs text-green-600 mt-1">→ {item.result}</div>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
