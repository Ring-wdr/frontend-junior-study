import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const MotionBasicsSection = () => {
  const { t } = useTranslation('week9');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SectionCard
      badge={{ label: t('motionBasics.badge'), color: 'blue' }}
      title={t('motionBasics.title')}
      description={t('motionBasics.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('motionBasics.whatIsMotionDiv.title')}
          icon
          iconColor="blue"
        >
          <InfoBox
            variant="blue"
            title={t('motionBasics.whatIsMotionDiv.infoTitle')}
          >
            <p className="text-sm leading-relaxed">
              <Trans
                t={t}
                i18nKey="motionBasics.whatIsMotionDiv.content"
                components={{ code: <code /> }}
              />
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>{t('motionBasics.whatIsMotionDiv.declarative')}</strong>{' '}
                {t('motionBasics.whatIsMotionDiv.declarativeDesc')}
              </li>
              <li>
                <strong>{t('motionBasics.whatIsMotionDiv.stateDriven')}</strong>{' '}
                {t('motionBasics.whatIsMotionDiv.stateDrivenDesc')}
              </li>
              <li>
                <strong>{t('motionBasics.whatIsMotionDiv.composable')}</strong>{' '}
                {t('motionBasics.whatIsMotionDiv.composableDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('motionBasics.basicProperties.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <CodeBlock
              code={`import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}   // Starting state
  animate={{ opacity: 1, y: 0 }}     // End state
  transition={{ duration: 0.4 }}     // How to animate
/>

// Key properties:
// - initial: Animation starting point
// - animate: Target animation state
// - transition: Timing and easing configuration
// - exit: Animation when component unmounts`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('motionBasics.demo.title')} icon iconColor="green">
          <DemoBox label={t('motionBasics.demo.label')}>
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isVisible
                  ? t('motionBasics.demo.hide')
                  : t('motionBasics.demo.show')}{' '}
                {t('motionBasics.demo.element')}
              </button>

              <div className="h-24 flex items-center justify-center">
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
                  >
                    {t('motionBasics.demo.hello')}
                  </motion.div>
                )}
              </div>
            </div>
          </DemoBox>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>{t('motionBasics.demo.note')}</strong>{' '}
              <Trans
                t={t}
                i18nKey="motionBasics.demo.noteDesc"
                components={{ code: <code /> }}
              />
            </p>
          </div>
        </SubSection>

        <SubSection
          title={t('motionBasics.animatableProps.title')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('motionBasics.animatableProps.transform')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('motionBasics.animatableProps.transformDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('motionBasics.animatableProps.visual')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('motionBasics.animatableProps.visualDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('motionBasics.animatableProps.layout')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('motionBasics.animatableProps.layoutDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('motionBasics.animatableProps.filter')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('motionBasics.animatableProps.filterDesc')}
              </p>
            </div>
          </div>

          <InfoBox
            variant="green"
            title={t('motionBasics.animatableProps.performanceTip')}
          >
            <p className="text-sm">
              <Trans
                t={t}
                i18nKey="motionBasics.animatableProps.performanceTipDesc"
              />
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
