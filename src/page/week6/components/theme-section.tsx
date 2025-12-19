import { SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const ThemeSection = () => {
  return (
    <SectionCard
      badge={{ label: 'UX', color: 'purple' }}
      title="Theme Systems"
      description="Implementing Dark/Light modes and custom themes effectively."
    >
      <div className="space-y-8">
        <SubSection title="CSS Variables Strategy" icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            Define semantic color names mapped to CSS variables. Changing the
            class on <code>&lt;html&gt;</code> swaps the variable values.
          </p>
          <CodeBlock
            code={`/* globals.css */
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}`}
            language="css"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Tailwind Dark Mode" icon iconColor="purple">
          <p className="text-sm text-gray-700 mb-4">
            Tailwind supports dark mode out-of-the-box with the{' '}
            <code>dark:</code> prefix. It can use system preference (`media`) or
            a class selector (`class`).
          </p>
          <CodeBlock
            code={`// tailwind.config.js
module.exports = {
  darkMode: 'class', // manually toggle via class="dark" on html
  // ...
}`}
            language="javascript"
            className="text-xs"
          />
          <CodeBlock
            code={`<div class="bg-white dark:bg-slate-800 rounded-lg p-6 ring-1 ring-slate-900/5 shadow-xl">
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down.
  </p>
</div>`}
            language="html"
            className="text-xs mt-4"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
