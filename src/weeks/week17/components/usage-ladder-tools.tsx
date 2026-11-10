'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { StablePanels } from '../../../components/ui/stable-panels';
import {
  Bullets,
  ChipPanels,
  Code,
  DataTable,
  Label,
  Para,
  Tabs,
} from './usage-ladder-parts';

const Compare = () => {
  const { t, raw } = useTranslation('week17');
  const compare = raw('usageLadder.compare');
  const [criterion, setCriterion] = useState(0);

  return (
    <div>
      <p className="text-xs font-semibold text-gray-600">
        {t('usageLadder.ui.criterionLabel')}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {compare.table.rows.map((item, index) => (
          <button
            key={item[0]}
            type="button"
            aria-pressed={criterion === index}
            onClick={() => setCriterion(index)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              criterion === index
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-300'
            }`}
          >
            {item[0]}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <StablePanels index={criterion}>
          {compare.table.rows.map((item) => (
            <div
              key={item[0]}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div className="min-w-0 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <h5 className="text-sm font-bold text-blue-800">
                  {compare.table.headers[1]}
                </h5>
                <p className="mt-1 text-sm leading-relaxed text-gray-700 break-words">
                  {item[1]}
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-green-200 bg-green-50 p-3">
                <h5 className="text-sm font-bold text-green-800">
                  {compare.table.headers[2]}
                </h5>
                <p className="mt-1 text-sm leading-relaxed text-gray-700 break-words">
                  {item[2]}
                </p>
              </div>
            </div>
          ))}
        </StablePanels>
      </div>
      <Para>{compare.note}</Para>
    </div>
  );
};

const Teams = () => {
  const { raw } = useTranslation('week17');
  const s6 = raw('usageLadder.s6');
  return (
    <div>
      <Label>{s6.teamsTitle}</Label>
      <Para>{s6.teamsLead}</Para>
      <Code code={s6.teamsCode} language="json" />
      <Para>{s6.teamsNote}</Para>
    </div>
  );
};

const Herdr = () => {
  const { t, raw } = useTranslation('week17');
  const herdr = raw('usageLadder.herdr');
  const items = [
    { id: 'about', label: t('usageLadder.ui.aboutTitle') },
    { id: 'install', label: herdr.installTitle },
    { id: 'usage', label: herdr.usageTitle },
    { id: 'cli', label: herdr.cliTitle },
    { id: 'remote', label: herdr.remoteTitle },
  ];
  return (
    <ChipPanels items={items}>
      <div key="about">
        <Bullets items={herdr.about} />
      </div>
      <div key="install">
        <Code code={herdr.installCode} language="bash" />
      </div>
      <div key="usage">
        <Para>{herdr.usage}</Para>
        <DataTable
          headers={herdr.keysTable.headers}
          rows={herdr.keysTable.rows}
        />
      </div>
      <div key="cli">
        <Para>{herdr.cliLead}</Para>
        <Code code={herdr.cliCode} language="bash" />
        <Para>{herdr.cliNote}</Para>
        <Code code={herdr.skillCode} language="bash" />
        <Para>{herdr.skillNote}</Para>
      </div>
      <div key="remote">
        <Para>{herdr.remote}</Para>
      </div>
    </ChipPanels>
  );
};

const Orca = () => {
  const { t, raw } = useTranslation('week17');
  const orca = raw('usageLadder.orca');
  const items = [
    { id: 'about', label: t('usageLadder.ui.aboutTitle') },
    { id: 'install', label: orca.installTitle },
    { id: 'usage', label: orca.usageTitle },
    { id: 'cli', label: orca.cliTitle },
  ];
  return (
    <ChipPanels items={items}>
      <div key="about">
        <Bullets items={orca.about} />
      </div>
      <div key="install">
        <Code code={orca.installCode} language="bash" />
        <Para>{orca.installWarn}</Para>
      </div>
      <div key="usage">
        <Para>{orca.usage}</Para>
      </div>
      <div key="cli">
        <Para>{orca.cliLead}</Para>
        <Code code={orca.cliCode} language="bash" />
        <Para>{orca.skillNote}</Para>
        <Code code={orca.skillCode} language="bash" />
      </div>
    </ChipPanels>
  );
};

export const UsageLadderTools = () => {
  const { t } = useTranslation('week17');
  const [tool, setTool] = useState('teams');
  const items = [
    { id: 'teams', label: t('usageLadder.ui.teamsTab') },
    { id: 'herdr', label: t('usageLadder.herdr.title') },
    { id: 'orca', label: t('usageLadder.orca.title') },
    { id: 'compare', label: t('usageLadder.compare.title') },
    { id: 'google', label: t('usageLadder.google.title') },
  ];

  return (
    <Tabs
      items={items}
      value={tool}
      onChange={setTool}
      label={t('usageLadder.ui.toolsLabel')}
      idPrefix="usage-ladder-tool"
    >
      <Teams key="teams" />
      <Herdr key="herdr" />
      <Orca key="orca" />
      <Compare key="compare" />
      <InfoBox key="google" variant="gray">
        <p className="text-sm leading-relaxed">
          {t('usageLadder.google.body')}
        </p>
      </InfoBox>
    </Tabs>
  );
};
