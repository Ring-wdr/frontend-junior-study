import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const TailwindSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Industry Standard', color: 'blue' }}
      title="Tailwind CSS"
      description="A utility-first CSS framework for rapidly building custom user interfaces."
    >
      <div className="space-y-8">
        <SubSection title="Utility-First" icon iconColor="blue">
          <p className="text-sm text-gray-700 mb-4">
            Instead of writing custom CSS, you use pre-existing classes directly
            in your HTML. This leads to very fast development cycles and
            consistent UI.
          </p>
          <CodeBlock
            code={`<!-- Traditional CSS -->
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<!-- Tailwind CSS -->
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>`}
            language="html"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Key Features" icon iconColor="blue">
          <InfoBox variant="blue" title="Why distinct?">
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>JIT Engine:</strong> Generates styles on demand, keeping
                bundle sizes tiny.
              </li>
              <li>
                <strong>Standardization:</strong> spacing, colors, and sizes are
                pre-defined (or customized in config).
              </li>
              <li>
                <strong>Responsiveness:</strong> <code>md:flex</code>,{' '}
                <code>lg:grid</code> prefixes make responsive design trivial.
              </li>
              <li>
                <strong>Dark Mode:</strong> <code>dark:bg-black</code> prefix
                handles theme switching.
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
