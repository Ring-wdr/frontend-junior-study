import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const VitestSetupSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Jest vs Vitest', color: 'purple' }}
      title="Jest vs Vitest: Choosing Your Test Runner"
      description="Understanding the differences and when to use each."
    >
      <div className="space-y-8">
        <SubSection title="Jest: The Industry Standard" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Jest is the most widely used testing framework for JavaScript. It
              provides everything out-of-the-box: test runner, assertion
              library, mocking utilities, and coverage reporting.
            </p>

            <InfoBox variant="blue" title="Jest Strengths">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Mature ecosystem:</strong> Well-documented, tons of
                  Stack Overflow answers
                </li>
                <li>
                  <strong>Built-in tools:</strong> No need for external
                  libraries
                </li>
                <li>
                  <strong>Familiar syntax:</strong> Many developers know it
                </li>
              </ul>
            </InfoBox>

            <InfoBox variant="red" title="Jest Weaknesses">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Slower:</strong> Transform overhead makes tests
                  sometimes slow
                </li>
                <li>
                  <strong>Complex configuration:</strong> Can require setup for
                  modern tooling
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title="Vitest: The Modern Alternative"
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Vitest is a modern testing framework built on Vite. It offers
              Jest-compatible APIs but with significantly better performance.
            </p>

            <InfoBox variant="green" title="Vitest Strengths">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>⚡ Super fast:</strong> Leverages Vite's ES modules
                  and instant HMR
                </li>
                <li>
                  <strong>Jest compatible:</strong> Same syntax, easy migration
                </li>
                <li>
                  <strong>Modern tooling:</strong> Works seamlessly with modern
                  build tools
                </li>
                <li>
                  <strong>Watch mode:</strong> Intelligent, fast feedback
                </li>
              </ul>
            </InfoBox>

            <InfoBox variant="orange" title="Vitest Considerations">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Newer:</strong> Smaller community, but growing fast
                </li>
                <li>
                  <strong>Vite dependent:</strong> Requires Vite-based project
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Head-to-Head Comparison" icon iconColor="blue">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      Feature
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      Jest
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-800">
                      Vitest
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      Performance
                    </td>
                    <td className="px-4 py-2 text-gray-600">🟡 Moderate</td>
                    <td className="px-4 py-2 text-gray-600">⚡ Very Fast</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      API Compatibility
                    </td>
                    <td className="px-4 py-2 text-gray-600">✅ Full</td>
                    <td className="px-4 py-2 text-gray-600">✅ Jest-like</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      Setup Complexity
                    </td>
                    <td className="px-4 py-2 text-gray-600">🟡 Moderate</td>
                    <td className="px-4 py-2 text-gray-600">✅ Simple</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      Community Size
                    </td>
                    <td className="px-4 py-2 text-gray-600">⭐⭐⭐⭐⭐</td>
                    <td className="px-4 py-2 text-gray-600">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      HMR Support
                    </td>
                    <td className="px-4 py-2 text-gray-600">❌ No</td>
                    <td className="px-4 py-2 text-gray-600">✅ Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title="Setting Up Vitest" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              If you're starting a new project with Vite, Vitest is the
              recommended choice.
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

        <SubSection title="Migrating from Jest to Vitest" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Migration is usually straightforward since Vitest is
              Jest-compatible.
            </p>

            <InfoBox variant="blue" title="Migration Checklist">
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Install Vitest:</strong>{' '}
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    npm install -D vitest @vitest/ui
                  </code>
                </li>
                <li>
                  <strong>Create vitest.config.ts:</strong> Use config above
                </li>
                <li>
                  <strong>Update package.json:</strong> Change test script to
                  use vitest
                </li>
                <li>
                  <strong>Replace jest.fn() with vi.fn():</strong> Usually just
                  import change
                </li>
                <li>
                  <strong>Run tests:</strong> Most should pass without changes
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

        <SubSection title="Recommendation" icon iconColor="purple">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700 mb-4">
                <strong>For new projects:</strong> Use Vitest if you're already
                using Vite. You'll get better performance and faster feedback
                loops.
              </p>
              <p className="text-sm text-gray-700">
                <strong>For existing Jest projects:</strong> Keep Jest unless
                you're planning to migrate to Vite anyway. The effort isn't
                worth it for small projects.
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
