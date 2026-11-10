'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';

export const SkillsHooksClaudeMd = () => {
  const { t } = useTranslation('week17');

  return (
    <div>
      <InfoBox variant="blue" title={t('skillsHooks.claudeMd.infoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('skillsHooks.claudeMd.infoDesc')}
        </p>
      </InfoBox>
      <p className="mt-4 mb-2 font-mono text-[11px] font-semibold text-gray-500">
        {t('skillsHooks.ui.codeClaudeMd')}
      </p>
      <CodeBlock
        code={t('skillsHooks.claudeMd.code')}
        language="markdown"
        className="text-xs"
      />
    </div>
  );
};
