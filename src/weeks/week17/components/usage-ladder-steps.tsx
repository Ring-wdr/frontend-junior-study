'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import {
  Bullets,
  Checklist,
  ChipPanels,
  Code,
  DataTable,
  Label,
  Para,
  Tabs,
} from './usage-ladder-parts';
import { UsageLadderTools } from './usage-ladder-tools';

const Does = ({ step }: { step: number }) => {
  const { raw } = useTranslation('week17');
  const labels = raw('usageLadder.labels');
  const s1 = raw('usageLadder.s1');
  const s2 = raw('usageLadder.s2');
  const s3 = raw('usageLadder.s3');
  const s4 = raw('usageLadder.s4');
  const s5 = raw('usageLadder.s5');
  const s6 = raw('usageLadder.s6');

  switch (step) {
    case 0:
      return (
        <div>
          <Para>{s1.does}</Para>
          <Label>{labels.habits}</Label>
          <Bullets items={s1.habits} />
        </div>
      );
    case 1:
      return (
        <div>
          <Para>{s2.rulesLead}</Para>
          <DataTable
            headers={s2.rulesTable.headers}
            rows={s2.rulesTable.rows}
          />
          <Para>{s2.rulesNote}</Para>
          <div className="mt-3">
            <InfoBox variant="green" title={s2.claudeAgentsTitle}>
              <p className="text-sm leading-relaxed">{s2.claudeAgentsBody}</p>
            </InfoBox>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <Para>{s3.planLead}</Para>
          <Para>{s3.planNote}</Para>
        </div>
      );
    case 3:
      return (
        <div>
          <Para>{s4.lead}</Para>
          <Code code={s4.promptCode} language="text" />
        </div>
      );
    case 4:
      return (
        <ChipPanels
          items={[
            { id: 'worktree', label: s5.worktreeTitle },
            { id: 'bg', label: s5.bgTitle },
            { id: 'cloud', label: s5.cloudTitle },
          ]}
        >
          <div key="worktree">
            <Para>{s5.worktreeLead}</Para>
            <div className="mt-3">
              <InfoBox variant="orange" title={s5.cautionTitle}>
                <p className="text-sm leading-relaxed">{s5.caution}</p>
              </InfoBox>
            </div>
          </div>
          <div key="bg">
            <Para>{s5.bgLead}</Para>
            <Para>{s5.bgStates}</Para>
          </div>
          <div key="cloud">
            <Bullets items={s5.cloud} />
          </div>
        </ChipPanels>
      );
    default:
      return (
        <div>
          <Para>{s6.lead}</Para>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-gray-700 break-words">
            {s6.kinds.map((kind) => (
              <li key={kind}>{kind}</li>
            ))}
          </ol>
        </div>
      );
  }
};

const Command = ({ step }: { step: number }) => {
  const { raw } = useTranslation('week17');
  const s1 = raw('usageLadder.s1');
  const s2 = raw('usageLadder.s2');
  const s3 = raw('usageLadder.s3');
  const s4 = raw('usageLadder.s4');
  const s5 = raw('usageLadder.s5');

  switch (step) {
    case 0:
      return <Code code={s1.code} language="bash" />;
    case 1:
      return (
        <div>
          <Code code={s2.claudeImportCode} language="markdown" />
          <Para>{s2.skillsLead}</Para>
          <Code code={s2.skillPathsCode} language="text" />
          <Code code={s2.skillFileCode} language="yaml" />
          <Para>{s2.skillUse}</Para>
        </div>
      );
    case 2:
      return (
        <div>
          <Code code={s3.planCode} language="bash" />
          <Para>{s3.verifyLead}</Para>
          <Code code={s3.verifyCode} language="text" />
          <Para>{s3.headlessLead}</Para>
          <Code code={s3.headlessCode} language="bash" />
          <Para>{s3.hookNote}</Para>
        </div>
      );
    case 3:
      return (
        <div>
          <Para>{s4.locationsLead}</Para>
          <DataTable
            headers={s4.locationsTable.headers}
            rows={s4.locationsTable.rows}
          />
          <Para>{s4.exampleLead}</Para>
          <Code code={s4.exampleCode} language="markdown" />
          <Para>{s4.notes}</Para>
        </div>
      );
    case 4:
      return (
        <ChipPanels
          items={[
            { id: 'worktree', label: s5.worktreeTitle },
            { id: 'bg', label: s5.bgTitle },
          ]}
        >
          <div key="worktree">
            <Code code={s5.worktreeCode} language="bash" />
            <Para>{s5.toolLead}</Para>
            <Code code={s5.toolCode} language="bash" />
            <Para>{s5.cursorNote}</Para>
          </div>
          <div key="bg">
            <Code code={s5.bgCode} language="bash" />
          </div>
        </ChipPanels>
      );
    default:
      return <UsageLadderTools />;
  }
};

const WhenUp = ({ step }: { step: number }) => {
  const { t, raw } = useTranslation('week17');
  const s1 = raw('usageLadder.s1');
  const s2 = raw('usageLadder.s2');
  const s3 = raw('usageLadder.s3');
  const s4 = raw('usageLadder.s4');
  const s5 = raw('usageLadder.s5');
  const s6 = raw('usageLadder.s6');

  switch (step) {
    case 0:
      return <Para>{s1.when}</Para>;
    case 1:
      return <Para>{s2.when}</Para>;
    case 2:
      return <Para>{s3.when}</Para>;
    case 3:
      return <Para>{s4.when}</Para>;
    case 4:
      return <Para>{s5.when}</Para>;
    default:
      return (
        <div>
          <Label>{s6.whenLabel}</Label>
          <div className="mt-2">
            <Checklist
              items={s6.when}
              hint={t('usageLadder.ui.checklistHint')}
              doneLabel={t('usageLadder.ui.done')}
            />
          </div>
        </div>
      );
  }
};

const Mistakes = ({ step }: { step: number }) => {
  const { raw } = useTranslation('week17');
  const s1 = raw('usageLadder.s1');
  const s2 = raw('usageLadder.s2');
  const s3 = raw('usageLadder.s3');
  const s4 = raw('usageLadder.s4');
  const s5 = raw('usageLadder.s5');
  const s6 = raw('usageLadder.s6');
  const lists = [
    s1.mistakes,
    s2.mistakes,
    s3.mistakes,
    s4.mistakes,
    s5.mistakes,
    s6.mistakes,
  ];

  return <Bullets items={lists[step]} />;
};

export const UsageLadderStepContent = ({
  step,
  tab,
  onTabChange,
}: {
  step: number;
  tab: string;
  onTabChange: (id: string) => void;
}) => {
  const { t, raw } = useTranslation('week17');
  const labels = raw('usageLadder.labels');
  const items = [
    { id: 'does', label: labels.does },
    {
      id: 'command',
      label: step === 5 ? t('usageLadder.ui.toolsTab') : labels.command,
    },
    { id: 'whenUp', label: labels.whenUp },
    { id: 'mistakes', label: labels.mistakes },
  ];

  return (
    <Tabs
      items={items}
      value={tab}
      onChange={onTabChange}
      label={t('usageLadder.ui.tabsLabel')}
      idPrefix={`usage-ladder-step-${step}`}
    >
      <Does key="does" step={step} />
      <Command key="command" step={step} />
      <WhenUp key="whenUp" step={step} />
      <Mistakes key="mistakes" step={step} />
    </Tabs>
  );
};
