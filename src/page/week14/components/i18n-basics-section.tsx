import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Locale = 'ko' | 'en' | 'ja';

const translations: Record<Locale, Record<string, string>> = {
  ko: {
    greeting: '안녕하세요',
    welcome: '{name}님, 환영합니다!',
    items: '{count}개의 아이템',
    items_plural: '{count}개의 아이템',
    button: '클릭하세요',
  },
  en: {
    greeting: 'Hello',
    welcome: 'Welcome, {name}!',
    items: '{count} item',
    items_plural: '{count} items',
    button: 'Click me',
  },
  ja: {
    greeting: 'こんにちは',
    welcome: '{name}さん、ようこそ！',
    items: '{count}個のアイテム',
    items_plural: '{count}個のアイテム',
    button: 'クリックしてください',
  },
};

export const I18nBasicsSection = () => {
  const [locale, setLocale] = useState<Locale>('ko');
  const [itemCount, setItemCount] = useState(1);

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[locale][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return (
    <SectionCard
      badge={{ label: 'i18n', color: 'blue' }}
      title="국제화(i18n) 기초"
      description="글로벌 서비스를 위한 다국어 지원 아키텍처"
    >
      <div className="space-y-8">
        <SubSection title="국제화의 핵심 요소" icon iconColor="blue">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🌐', title: '언어 (Translation)', desc: '텍스트 번역' },
              {
                icon: '📅',
                title: '날짜/시간',
                desc: '지역별 포맷 (MM/DD vs DD/MM)',
              },
              {
                icon: '💰',
                title: '숫자/통화',
                desc: '1,000 vs 1.000, $100 vs 100원',
              },
              { icon: '➡️', title: 'RTL 지원', desc: '아랍어, 히브리어 등' },
              {
                icon: '📝',
                title: '복수형',
                desc: '1 item vs 2 items',
              },
              { icon: '🕐', title: '타임존', desc: 'UTC, KST, PST 등' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-blue-50 p-3 rounded-lg border border-blue-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{item.icon}</span>
                  <span className="font-medium text-sm text-blue-900">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-blue-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Interactive: 다국어 전환" icon iconColor="purple">
          <DemoBox label="Live Translation Demo">
            <div className="space-y-4">
              {/* Locale Selector */}
              <div className="flex gap-2">
                {(['ko', 'en', 'ja'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocale(l)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                      locale === l
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {l === 'ko' ? '한국어' : l === 'en' ? 'English' : '日本語'}
                  </button>
                ))}
              </div>

              {/* Demo Card */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">{t('greeting')}</h3>
                <p className="text-gray-600 mb-3">
                  {t('welcome', { name: 'Kim' })}
                </p>

                {/* Pluralization Demo */}
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={itemCount}
                    onChange={(e) => setItemCount(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium min-w-[100px]">
                    {locale === 'en' && itemCount !== 1
                      ? t('items_plural', { count: itemCount })
                      : t('items', { count: itemCount })}
                  </span>
                </div>

                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {t('button')}
                </button>
              </div>

              <div className="text-xs text-gray-500">
                현재 로케일:{' '}
                <code className="bg-gray-100 px-1 rounded">{locale}</code>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="ICU Message Format" icon iconColor="green">
          <InfoBox variant="green" title="Industry Standard">
            <p className="text-sm mb-2">
              ICU Message Format은 복수형, 선택형 메시지 처리의 업계 표준입니다.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// ICU Message Format Examples

// Pluralization
{count, plural,
  =0 {No items}
  one {# item}
  other {# items}
}

// Select
{gender, select,
  male {He likes this}
  female {She likes this}
  other {They like this}
}

// Nested
{count, plural,
  =0 {No messages}
  one {{name} sent you a message}
  other {{name} sent you # messages}
}`}
            className="text-xs mt-3"
          />
        </SubSection>

        <SubSection title="Next.js i18n 구조" icon iconColor="orange">
          <CodeBlock
            code={`// App Router: [locale]/layout.tsx
import { getDictionary } from './dictionaries';

export default async function Layout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <I18nProvider dictionary={dict} locale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

// dictionaries.ts
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ko: () => import('./dictionaries/ko.json').then((m) => m.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof typeof dictionaries]();`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="번역 파일 관리 전략" icon iconColor="red">
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-sm mb-2">
                Namespace 기반 분리 (권장)
              </h4>
              <div className="font-mono text-xs bg-white p-3 rounded border">
                <div className="text-gray-600">locales/</div>
                <div className="text-gray-600 pl-4">├── en/</div>
                <div className="text-blue-600 pl-8">│ ├── common.json</div>
                <div className="text-blue-600 pl-8">│ ├── auth.json</div>
                <div className="text-blue-600 pl-8">│ └── errors.json</div>
                <div className="text-gray-600 pl-4">└── ko/</div>
                <div className="text-blue-600 pl-8"> ├── common.json</div>
                <div className="text-blue-600 pl-8"> ├── auth.json</div>
                <div className="text-blue-600 pl-8"> └── errors.json</div>
              </div>
            </div>

            <InfoBox variant="red" title="번역 누락 체크">
              <p className="text-xs">
                Jest + JSON Schema를 활용해 번역 키 누락을 CI에서 자동 검증하세요.
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="i18n 라이브러리 비교" icon iconColor="purple">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">라이브러리</th>
                  <th className="p-2 text-left">특징</th>
                  <th className="p-2 text-left">적합한 경우</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 font-mono text-purple-600">react-intl</td>
                  <td className="p-2 text-xs">ICU 완벽 지원, FormatJS</td>
                  <td className="p-2 text-xs">대규모 엔터프라이즈</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-2 font-mono text-purple-600">i18next</td>
                  <td className="p-2 text-xs">유연한 플러그인 시스템</td>
                  <td className="p-2 text-xs">범용적 사용</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2 font-mono text-purple-600">
                    next-intl
                  </td>
                  <td className="p-2 text-xs">Next.js 최적화</td>
                  <td className="p-2 text-xs">Next.js 프로젝트</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
