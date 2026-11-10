'use client';

import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { CodeBlock } from '../../../components/ui/code-block';

export const AgentModePlan = () => {
  const { t } = useTranslation('week17');
  return (
    <div className="space-y-4">
      <InfoBox variant="purple" title={t('agentMode.planModeInfoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.planModeInfoDesc')}
        </p>
      </InfoBox>
      <CodeBlock
        code={t('agentMode.planModeCode')}
        language="bash"
        className="text-xs"
      />
    </div>
  );
};

export const AgentModeInterview = () => {
  const { t } = useTranslation('week17');
  return (
    <div className="space-y-4">
      <InfoBox variant="blue" title={t('agentMode.interviewModeInfoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.interviewModeInfoDesc')}
        </p>
      </InfoBox>
      <CodeBlock
        code={t('agentMode.interviewCode')}
        language="bash"
        className="text-xs"
      />
      <InfoBox variant="green" title={t('agentMode.interviewModeTipTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.interviewModeTipDesc')}
        </p>
      </InfoBox>
    </div>
  );
};

export const AgentModeCursor = () => {
  const { t } = useTranslation('week17');
  return (
    <div className="space-y-4">
      <InfoBox variant="purple" title={t('agentMode.cursorInfoTitle')}>
        <p className="text-sm leading-relaxed">
          {t('agentMode.cursorInfoDesc')}
        </p>
      </InfoBox>
      <CodeBlock
        code={t('agentMode.cursorCode')}
        language="markdown"
        className="text-xs"
      />
    </div>
  );
};
