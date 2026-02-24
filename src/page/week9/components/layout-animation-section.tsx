import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const LayoutAnimationSection = () => {
  const { t } = useTranslation('week9');
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([1, 2, 3, 4]);
  const [isGrid, setIsGrid] = useState(true);

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item !== id));
  };

  const resetItems = () => {
    setItems([1, 2, 3, 4]);
  };

  return (
    <SectionCard
      badge={{ label: t('layout.badge'), color: 'pink' }}
      title={t('layout.title')}
      description={t('layout.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('layout.magic.title')} icon iconColor="pink">
          <InfoBox variant="purple" title={t('layout.magic.infoTitle')}>
            <p className="text-sm leading-relaxed">
              <Trans
                t={t}
                i18nKey="layout.magic.content"
                components={{ code: <code /> }}
              />
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Just add layout prop - that's it!
<motion.div layout>
  {isExpanded ? "Large content here" : "Small"}
</motion.div>

// The element smoothly animates between
// any size/position changes automatically`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('layout.accordion.title')} icon iconColor="blue">
          <DemoBox label={t('layout.accordion.demoLabel')}>
            <motion.div
              layout
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 cursor-pointer text-white"
              style={{ borderRadius: 16 }}
            >
              <motion.h4 layout="position" className="font-bold">
                {t('layout.accordion.clickMe')}
              </motion.h4>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-blue-100"
                >
                  {t('layout.accordion.content')}
                </motion.p>
              )}
            </motion.div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('layout.listReordering.title')}
          icon
          iconColor="green"
        >
          <CodeBlock
            code={`// Each item needs layout prop
{items.map((item) => (
  <motion.div
    key={item.id}
    layout
    onClick={() => removeItem(item.id)}
  >
    {item.text}
  </motion.div>
))}

// When items are removed, remaining items
// smoothly slide into their new positions`}
            className="text-xs"
          />

          <DemoBox label={t('layout.listReordering.demoLabel')}>
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {items.map((item) => (
                  <motion.div
                    key={item}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => removeItem(item)}
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md cursor-pointer flex items-center justify-center text-white font-bold hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              {items.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  {t('layout.listReordering.allRemoved')}
                </p>
              )}
              <button
                type="button"
                onClick={resetItems}
                className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('layout.listReordering.reset')}
              </button>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('layout.gridListToggle.title')}
          icon
          iconColor="purple"
        >
          <DemoBox label={t('layout.gridListToggle.demoLabel')}>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setIsGrid(!isGrid)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t('layout.gridListToggle.switchTo')}{' '}
                {isGrid
                  ? t('layout.gridListToggle.list')
                  : t('layout.gridListToggle.grid')}
              </button>

              <motion.div
                layout
                className={`${isGrid ? 'grid grid-cols-4 gap-2' : 'flex flex-col gap-2'}`}
              >
                {[1, 2, 3, 4].map((num) => (
                  <motion.div
                    key={num}
                    layout
                    className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold ${
                      isGrid ? 'h-16' : 'h-12 px-4'
                    }`}
                  >
                    {t('layout.gridListToggle.item')} {num}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('layout.layoutPropOptions.title')}
          icon
          iconColor="orange"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('layout.layoutPropOptions.layout')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('layout.layoutPropOptions.layoutDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('layout.layoutPropOptions.layoutPosition')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('layout.layoutPropOptions.layoutPositionDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('layout.layoutPropOptions.layoutSize')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('layout.layoutPropOptions.layoutSizeDesc')}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                {t('layout.layoutPropOptions.layoutId')}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {t('layout.layoutPropOptions.layoutIdDesc')}
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
