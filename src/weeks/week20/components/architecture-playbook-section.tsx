'use client';

import { useTranslation } from '@/i18n/client';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';
import { ArchitectureGenerator } from './architecture-generator';

type ChecklistItem = {
  title: string;
  desc: string;
};

export const ArchitecturePlaybookSection = () => {
  const { t, raw } = useTranslation('week20');
  const checklist = raw('playbook.checklist');
  const rollout = raw('playbook.rollout');

  return (
    <SectionCard
      badge={{ label: t('playbook.badge'), color: 'indigo' }}
      description={t('playbook.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('playbook.contractTitle')} icon iconColor="purple">
          <CodeBlock
            language="typescript"
            code={`// packages/contracts/src/events.ts
export type MfeEventMap = {
  'mfe:user:login': { userId: string; roles: string[] };
  'mfe:cart:changed': { count: number; totalPrice: number };
};

export type EventName = keyof MfeEventMap;

export interface PublishOptions<T extends EventName> {
  name: T;
  payload: MfeEventMap[T];
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('playbook.checklistTitle')} icon iconColor="green">
          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-indigo-100 bg-indigo-50 p-4"
              >
                <h4 className="text-sm font-semibold text-indigo-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-indigo-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('playbook.rolloutTitle')} icon iconColor="orange">
          <ol className="space-y-2 text-sm text-gray-700 list-decimal pl-5">
            {rollout.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </SubSection>

        <SubSection title={t('playbook.generatorTitle')} icon iconColor="blue">
          <DemoBox label={t('playbook.generatorLabel')}>
            <ArchitectureGenerator />
          </DemoBox>
        </SubSection>

        <InfoBox variant="purple" title={t('playbook.finalNoteTitle')}>
          <p>{t('playbook.finalNote')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
