'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
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

const coreElementIcons = ['🌐', '📅', '💰', '➡️', '📝', '🕐'];

export const I18nBasicsSection = () => {
  const { t, raw } = useTranslation('week14');
  const [locale, setLocale] = useState<Locale>('ko');
  const [itemCount, setItemCount] = useState(1);

  const tDemo = (key: string, params?: Record<string, string | number>) => {
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
      badge={{ label: t('i18nBasics.badge'), color: 'blue' }}
      description={t('i18nBasics.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('i18nBasics.coreElements.title')}
          icon
          iconColor="blue"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {raw('i18nBasics.coreElements.elements').map((element, idx) => {
              return (
                <div
                  key={element.title}
                  className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{coreElementIcons[idx]}</span>
                    <span className="font-medium text-sm text-blue-900">
                      {element.title}
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">{element.desc}</p>
                </div>
              );
            })}
          </div>
        </SubSection>

        <SubSection
          title={t('i18nBasics.liveDemo.title')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('i18nBasics.liveDemo.label')}>
            <div className="space-y-4">
              {/* Locale Selector */}
              <div className="flex flex-wrap gap-2">
                {(['ko', 'en', 'ja'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocale(l)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200 ${
                      locale === l
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {t(`i18nBasics.liveDemo.locales.${l}`)}
                  </button>
                ))}
              </div>

              {/* Demo Card */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">{tDemo('greeting')}</h3>
                <p className="text-gray-600 mb-3">
                  {tDemo('welcome', { name: 'Kim' })}
                </p>

                {/* Pluralization Demo */}
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={itemCount}
                    onChange={(e) => setItemCount(Number(e.target.value))}
                    aria-label={t('i18nBasics.liveDemo.countLabel')}
                    className="flex-1 min-w-0"
                  />
                  <span className="text-sm font-medium min-w-[88px] text-right">
                    {locale === 'en' && itemCount !== 1
                      ? tDemo('items_plural', { count: itemCount })
                      : tDemo('items', { count: itemCount })}
                  </span>
                </div>

                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  {tDemo('button')}
                </button>
              </div>

              <div className="text-xs text-gray-500">
                {t('i18nBasics.liveDemo.currentLocale')}{' '}
                <code className="bg-gray-100 px-1 rounded">{locale}</code>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('i18nBasics.icuFormat.title')}
          icon
          iconColor="green"
        >
          <InfoBox variant="green" title={t('i18nBasics.icuFormat.infoTitle')}>
            <p className="text-sm mb-2">{t('i18nBasics.icuFormat.infoText')}</p>
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

        <SubSection
          title={t('i18nBasics.nextjsStructure.title')}
          icon
          iconColor="orange"
        >
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

        <SubSection
          title={t('i18nBasics.fileManagement.title')}
          icon
          iconColor="red"
        >
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-sm mb-2">
                {t('i18nBasics.fileManagement.namespaceTitle')}
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

            <InfoBox
              variant="red"
              title={t('i18nBasics.fileManagement.missingKeysTitle')}
            >
              <p className="text-xs">
                {t('i18nBasics.fileManagement.missingKeysText')}
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('i18nBasics.libraryComparison.title')}
          icon
          iconColor="purple"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">
                    {t('i18nBasics.libraryComparison.headers.library')}
                  </th>
                  <th className="p-2 text-left">
                    {t('i18nBasics.libraryComparison.headers.features')}
                  </th>
                  <th className="p-2 text-left">
                    {t('i18nBasics.libraryComparison.headers.useCase')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {raw('i18nBasics.libraryComparison.libraries').map(
                  (lib, idx) => (
                    <tr
                      key={lib.name}
                      className={`border-t ${idx === 1 ? 'bg-gray-50' : ''}`}
                    >
                      <td className="p-2 font-mono text-purple-600">
                        {lib.name}
                      </td>
                      <td className="p-2 text-xs">{lib.features}</td>
                      <td className="p-2 text-xs">{lib.useCase}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
