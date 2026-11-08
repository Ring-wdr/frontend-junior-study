'use client';

import { Trans, useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const VitestSetupSection = () => {
  const { t } = useTranslation('week8');

  return (
    <SectionCard
      badge={{ label: t('vitest.badge'), color: 'purple' }}
      description={t('vitest.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('vitest.jest.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('vitest.jest.description')}
            </p>

            <InfoBox variant="blue" title={t('vitest.jest.strengths.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="vitest.jest.strengths.mature" />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.jest.strengths.builtin" />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.jest.strengths.familiar" />
                </li>
              </ul>
            </InfoBox>

            <InfoBox variant="red" title={t('vitest.jest.weaknesses.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="vitest.jest.weaknesses.slow" />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.jest.weaknesses.complex" />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('vitest.vitest.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('vitest.vitest.description')}
            </p>

            <InfoBox variant="green" title={t('vitest.vitest.strengths.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="vitest.vitest.strengths.fast" />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.vitest.strengths.compatible" />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.vitest.strengths.modern" />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.vitest.strengths.watch" />
                </li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="orange"
              title={t('vitest.vitest.considerations.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="vitest.vitest.considerations.newer" />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="vitest.vitest.considerations.viteDependent"
                  />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title={t('vitest.comparison.title')} icon iconColor="blue">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      {t('vitest.comparison.feature')}
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      {t('vitest.comparison.jest')}
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      {t('vitest.comparison.vitest')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('vitest.comparison.performance')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      🟡 {t('vitest.comparison.moderate')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ⚡ {t('vitest.comparison.veryFast')}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('vitest.comparison.apiCompatibility')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ✅ {t('vitest.comparison.full')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ✅ {t('vitest.comparison.jestLike')}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('vitest.comparison.setupComplexity')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      🟡 {t('vitest.comparison.moderate')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ✅ {t('vitest.comparison.simple')}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('vitest.comparison.communitySize')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">⭐⭐⭐⭐⭐</td>
                    <td className="px-4 py-2 text-gray-600">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {t('vitest.comparison.hmrSupport')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ❌ {t('vitest.comparison.no')}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      ✅ {t('vitest.comparison.yes')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('vitest.setup.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('vitest.setup.description')}
            </p>

            <CodeBlock
              code={`// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use global describe/it instead of importing
    environment: 'jsdom', // For React component testing
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`}
              className="text-xs"
            />

            <CodeBlock
              code={`// src/test/setup.ts
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with RTL matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('vitest.migration.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('vitest.migration.description')}
            </p>

            <InfoBox
              variant="blue"
              title={t('vitest.migration.checklist.title')}
            >
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>{t('vitest.migration.checklist.install')}</strong>{' '}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    npm install -D vitest @vitest/ui
                  </code>
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="vitest.migration.checklist.createConfig"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="vitest.migration.checklist.updatePackage"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="vitest.migration.checklist.replaceJest"
                  />
                </li>
                <li>
                  <Trans t={t} i18nKey="vitest.migration.checklist.runTests" />
                </li>
              </ol>
            </InfoBox>

            <CodeBlock
              code={`// Before (Jest)
import { jest } from '@jest/globals';
const mockFn = jest.fn();

// After (Vitest)
import { vi } from 'vitest';
const mockFn = vi.fn();`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('vitest.recommendation.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 sm:p-6 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700 mb-4">
                <Trans t={t} i18nKey="vitest.recommendation.newProjects" />
              </p>
              <p className="text-sm text-gray-700">
                <Trans t={t} i18nKey="vitest.recommendation.existingProjects" />
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
