import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const VariantsSection = () => {
  const { t } = useTranslation('week9');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SectionCard
      badge={{ label: t('variants.badge'), color: 'purple' }}
      title={t('variants.title')}
      description={t('variants.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('variants.whatAreVariants.title')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('variants.whatAreVariants.infoTitle')}
          >
            <p className="text-sm leading-relaxed">
              {t('variants.whatAreVariants.content')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>{t('variants.whatAreVariants.reusability')}</strong>{' '}
                {t('variants.whatAreVariants.reusabilityDesc')}
              </li>
              <li>
                <strong>{t('variants.whatAreVariants.propagation')}</strong>{' '}
                {t('variants.whatAreVariants.propagationDesc')}
              </li>
              <li>
                <strong>{t('variants.whatAreVariants.orchestration')}</strong>{' '}
                {t('variants.whatAreVariants.orchestrationDesc')}
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('variants.basicPattern.title')}
          icon
          iconColor="blue"
        >
          <CodeBlock
            code={`const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.div
  variants={boxVariants}
  initial="hidden"
  animate="show"
/>

// Instead of inline objects,
// you reference states by name!`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('variants.staggerChildren.title')}
          icon
          iconColor="green"
        >
          <CodeBlock
            code={`const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms delay between children
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.li variants={item} key={item.id}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>`}
            className="text-xs"
          />

          <DemoBox label={t('variants.staggerChildren.demoLabel')}>
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isVisible
                  ? t('variants.staggerChildren.reset')
                  : t('variants.staggerChildren.animateList')}
              </button>

              <motion.div
                key={isVisible ? 'visible' : 'hidden'}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex gap-3"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <motion.div
                    key={num}
                    variants={itemVariants}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                  >
                    {num}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('variants.variantPropagation.title')}
          icon
          iconColor="orange"
        >
          <InfoBox
            variant="orange"
            title={t('variants.variantPropagation.infoTitle')}
          >
            <p className="text-sm">
              {t('variants.variantPropagation.content')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Parent controls the animation state
<motion.div
  initial="rest"
  whileHover="hover"
  variants={parentVariants}
>
  {/* Children automatically inherit "rest" → "hover" */}
  <motion.span variants={childVariants}>
    Icon
  </motion.span>
  <motion.span variants={childVariants}>
    Label
  </motion.span>
</motion.div>

// No need to add whileHover to each child!`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('variants.orchestrationOptions.title')}
          icon
          iconColor="pink"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                {t('variants.orchestrationOptions.staggerChildren')}
              </p>
              <p className="text-xs text-pink-700 mt-1">
                {t('variants.orchestrationOptions.staggerChildrenDesc')}
              </p>
            </div>
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                {t('variants.orchestrationOptions.staggerDirection')}
              </p>
              <p className="text-xs text-pink-700 mt-1">
                {t('variants.orchestrationOptions.staggerDirectionDesc')}
              </p>
            </div>
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                {t('variants.orchestrationOptions.delayChildren')}
              </p>
              <p className="text-xs text-pink-700 mt-1">
                {t('variants.orchestrationOptions.delayChildrenDesc')}
              </p>
            </div>
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                {t('variants.orchestrationOptions.when')}
              </p>
              <p className="text-xs text-pink-700 mt-1">
                {t('variants.orchestrationOptions.whenDesc')}
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
