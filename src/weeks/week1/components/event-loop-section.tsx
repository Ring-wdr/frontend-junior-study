'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeTabs } from '../../../components/ui/code-tabs';
import { EventLoopVisualizer } from './event-loop-visualizer';

const DETAIL_CODES = [
  `async function run() {
  console.log(1);
  await null; // the rest of the function becomes a microtask
  console.log(3);
}

run();
console.log(2);
// 1 2 3

// Roughly the same as:
function run2() {
  console.log(1);
  return Promise.resolve(null).then(() => console.log(3));
}`,
  `function spin() {
  Promise.resolve().then(spin); // the microtask queue never empties
}
spin(); // the page freezes: no rendering, no clicks, no timers

function yieldEachTurn() {
  setTimeout(yieldEachTurn, 0); // one task per turn: rendering fits in between
}`,
  `// setTimeout: not tied to frames, may run twice in one or skip one
setTimeout(step, 16);

// requestAnimationFrame: once per frame, right before style and layout
function step(time) {
  box.style.transform = \`translateX(\${time / 10}px)\`;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);`,
  `setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

// nextTick → promise → timeout → immediate
// (the order of the last two is not guaranteed in the main module)`,
];

export const EventLoopSection = () => {
  const { t, raw } = useTranslation('week1');

  return (
    <SectionCard
      badge={{ label: t('eventLoop.badge'), color: 'blue' }}
      description={t('eventLoop.description')}
      testId="event-loop-section"
    >
      <div className="space-y-8">
        <EventLoopVisualizer />

        <InfoBox variant="blue" title={t('eventLoop.keyRule.title')}>
          {t('eventLoop.keyRule.content')}
        </InfoBox>

        <SubSection title={t('eventLoop.loop.title')} icon iconColor="blue">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            {raw('eventLoop.loop.steps').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </SubSection>

        <SubSection title={t('eventLoop.details.title')} icon iconColor="blue">
          <CodeTabs
            items={raw('eventLoop.details.items')}
            codes={DETAIL_CODES}
            ariaLabel={t('eventLoop.details.ariaLabel')}
            testId="event-loop-details"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
