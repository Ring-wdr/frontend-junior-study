import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DragSection = () => {
  const { t } = useTranslation('week9');
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <SectionCard
      badge={{ label: t('drag.badge'), color: 'orange' }}
      title={t('drag.title')}
      description={t('drag.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('drag.basicDrag.title')} icon iconColor="orange">
          <CodeBlock
            code={`<motion.div drag>
  Drag me anywhere!
</motion.div>

// Or constrain to an axis:
<motion.div drag="x">Horizontal only</motion.div>
<motion.div drag="y">Vertical only</motion.div>`}
            className="text-xs"
          />

          <DemoBox label={t('drag.basicDrag.demoLabel')}>
            <div className="h-32 flex items-center justify-center">
              <motion.div
                drag
                dragMomentum={false}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold text-sm"
              >
                {t('drag.basicDrag.dragText')}
              </motion.div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('drag.dragConstraints.title')} icon iconColor="blue">
          <CodeBlock
            code={`// Using pixel values
<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
/>

// Or reference a parent element
const constraintsRef = useRef(null);

<motion.div ref={constraintsRef}>
  <motion.div drag dragConstraints={constraintsRef} />
</motion.div>`}
            className="text-xs"
          />

          <DemoBox label={t('drag.dragConstraints.demoLabel')}>
            <motion.div
              ref={constraintsRef}
              className="h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative"
            >
              <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold text-xs"
              >
                {t('drag.dragConstraints.boundText')}
              </motion.div>
            </motion.div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('drag.dragOptions.title')} icon iconColor="purple">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                {t('drag.dragOptions.dragElastic')}
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {t('drag.dragOptions.dragElasticDesc')}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                {t('drag.dragOptions.dragMomentum')}
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {t('drag.dragOptions.dragMomentumDesc')}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                {t('drag.dragOptions.dragTransition')}
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {t('drag.dragOptions.dragTransitionDesc')}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                {t('drag.dragOptions.dragDirectionLock')}
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {t('drag.dragOptions.dragDirectionLockDesc')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('drag.dragWithMomentum.title')} icon iconColor="green">
          <DemoBox label={t('drag.dragWithMomentum.demoLabel')}>
            <motion.div className="h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                dragMomentum={true}
                className="w-24 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold text-xs"
              >
                {t('drag.dragWithMomentum.swipeMe')}
              </motion.div>
            </motion.div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {t('drag.dragWithMomentum.note')}
            </p>
          </DemoBox>
        </SubSection>

        <SubSection title={t('drag.useCases.title')} icon iconColor="pink">
          <InfoBox variant="purple" title={t('drag.useCases.infoTitle')}>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>{t('drag.useCases.kanban')}</strong> {t('drag.useCases.kanbanDesc')}
              </li>
              <li>
                <strong>{t('drag.useCases.carousels')}</strong> {t('drag.useCases.carouselsDesc')}
              </li>
              <li>
                <strong>{t('drag.useCases.sliders')}</strong> {t('drag.useCases.slidersDesc')}
              </li>
              <li>
                <strong>{t('drag.useCases.reorderable')}</strong> {t('drag.useCases.reorderableDesc')}
              </li>
              <li>
                <strong>{t('drag.useCases.dismissible')}</strong> {t('drag.useCases.dismissibleDesc')}
              </li>
            </ul>
          </InfoBox>

          <CodeBlock
            code={`// Swipe to dismiss pattern
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, { offset, velocity }) => {
    if (Math.abs(offset.x) > 200 || Math.abs(velocity.x) > 500) {
      onDismiss();
    }
  }}
>
  Swipe to dismiss
</motion.div>`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
