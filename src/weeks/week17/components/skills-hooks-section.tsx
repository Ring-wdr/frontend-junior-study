'use client';

import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const SkillsHooksSection = () => {
  const { t, raw } = useTranslation('week17');
  const hooks = raw('skillsHooks.hookTypes');
  const skills = raw('skillsHooks.skillExamples');
  const skillFields = raw('skillsHooks.skillFields');

  return (
    <SectionCard
      badge={{ label: t('skillsHooks.badge'), color: 'green' }}
      description={t('skillsHooks.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('skillsHooks.skillsTitle')} icon iconColor="green">
          <InfoBox variant="green" title={t('skillsHooks.skillsInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('skillsHooks.skillsInfoDesc')}
            </p>
          </InfoBox>

          <h4 className="mt-4 font-bold text-sm text-green-800">
            {t('skillsHooks.skillExamplesTitle')}
          </h4>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <code className="text-xs font-bold text-green-700">
                    {skill.name}
                  </code>
                </div>
                <p className="text-xs text-gray-600">{skill.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            code={t('skillsHooks.skillCode')}
            language="markdown"
            className="mt-4 text-xs"
          />

          <h4 className="mt-4 font-bold text-sm text-green-800">
            {t('skillsHooks.skillFieldsTitle')}
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-gray-700">
            {skillFields.map((field) => (
              <li key={field.name}>
                <code className="font-bold text-green-700">{field.name}</code>
                {' — '}
                {field.desc}
              </li>
            ))}
          </ul>
        </SubSection>

        <SubSection title={t('skillsHooks.hooksTitle')} icon iconColor="orange">
          <InfoBox variant="orange" title={t('skillsHooks.hooksInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('skillsHooks.hooksInfoDesc')}
            </p>
          </InfoBox>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-50">
                  <th className="px-3 py-2 text-left font-semibold text-orange-800 border-b border-orange-200">
                    Hook
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-orange-800 border-b border-orange-200">
                    {t('skillsHooks.table.timing')}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-orange-800 border-b border-orange-200">
                    {t('skillsHooks.table.usage')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {hooks.map((hook, idx) => (
                  <tr
                    key={hook.name}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-orange-50/50'}
                  >
                    <td className="px-3 py-2 font-mono text-orange-700 border-b border-orange-100">
                      {hook.name}
                    </td>
                    <td className="px-3 py-2 text-gray-600 border-b border-orange-100">
                      {hook.timing}
                    </td>
                    <td className="px-3 py-2 text-gray-600 border-b border-orange-100">
                      {hook.usage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            {t('skillsHooks.hookTypesNote')}
          </p>

          <CodeBlock
            code={t('skillsHooks.hookConfigCode')}
            language="json"
            className="mt-4 text-xs"
          />
          <CodeBlock
            code={t('skillsHooks.hookScriptCode')}
            language="bash"
            className="mt-4 text-xs"
          />
        </SubSection>

        <SubSection
          title={t('skillsHooks.claudeMdTitle')}
          icon
          iconColor="blue"
        >
          <InfoBox variant="blue" title={t('skillsHooks.claudeMdInfoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('skillsHooks.claudeMdInfoDesc')}
            </p>
          </InfoBox>

          <CodeBlock
            code={t('skillsHooks.claudeMdCode')}
            language="markdown"
            className="mt-4 text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
