'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { InfoBox } from '../../../components/info-box';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Chip, PrevNext } from './browser-automation-controls';

export const BrowserAutomationExplorer = () => {
  const { t, raw } = useTranslation('week17');
  const categories = raw('browserAutomation.explorer.categories');
  const securityItems = raw('browserAutomation.security.items');
  const [index, setIndex] = useState(0);
  const [view, setView] = useState(0);
  const overviewLabel = t('browserAutomation.overview.title');
  const securityLabel = t('browserAutomation.security.title');

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">
        {t('browserAutomation.explorer.pickLabel')}
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {categories.map((item, i) => (
          <Chip
            key={item.title}
            selected={i === index}
            onSelect={() => setIndex(i)}
          >
            {item.title}
          </Chip>
        ))}
      </div>

      <PrevNext
        index={index}
        total={categories.length}
        onChange={setIndex}
        prevLabel={t('browserAutomation.explorer.prev')}
        nextLabel={t('browserAutomation.explorer.next')}
      />

      <div className="mt-3 rounded-xl border border-blue-200 bg-white p-3 sm:p-4">
        <StablePanels index={index}>
          {categories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h4 className="font-bold text-sm text-blue-900 break-words">
                {category.title}
              </h4>

              <div className="flex flex-wrap gap-2">
                {[overviewLabel, category.detailTitle, securityLabel].map(
                  (label, i) => (
                    <Chip
                      key={label}
                      selected={i === view}
                      onSelect={() => setView(i)}
                    >
                      {label}
                    </Chip>
                  ),
                )}
              </div>

              <StablePanels index={view}>
                <dl
                  key="overview"
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                  <div className="min-w-0 rounded-lg bg-blue-50 p-2.5">
                    <dt className="text-[11px] font-semibold text-blue-700">
                      {t('browserAutomation.explorer.toolsLabel')}
                    </dt>
                    <dd className="mt-1 text-xs text-gray-700 break-words">
                      {category.tools}
                    </dd>
                  </div>
                  <div className="min-w-0 rounded-lg bg-blue-50 p-2.5">
                    <dt className="text-[11px] font-semibold text-blue-700">
                      {t('browserAutomation.explorer.loginLabel')}
                    </dt>
                    <dd className="mt-1 text-xs text-gray-700 break-words">
                      {category.login}
                    </dd>
                  </div>
                  <div className="min-w-0 rounded-lg bg-blue-50 p-2.5">
                    <dt className="text-[11px] font-semibold text-blue-700">
                      {t('browserAutomation.explorer.viewLabel')}
                    </dt>
                    <dd className="mt-1 text-xs text-gray-700 break-words">
                      {category.view}
                    </dd>
                  </div>
                </dl>

                <div key="detail">
                  <h5 className="font-bold text-sm text-purple-800">
                    {category.detailTitle}
                  </h5>
                  {category.hint !== '' && (
                    <p className="mt-1 text-xs text-gray-600">
                      {category.hint}
                    </p>
                  )}
                  <ul className="mt-2 space-y-3 text-sm text-gray-700">
                    {category.items.map((item) => (
                      <li key={item.name} className="break-words">
                        <span className="font-bold text-purple-700">
                          {item.name}
                        </span>
                        {': '}
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                  {category.note !== '' && (
                    <p className="mt-2 text-xs leading-relaxed text-gray-600">
                      {category.note}
                    </p>
                  )}
                </div>

                <InfoBox
                  key="security"
                  variant="orange"
                  title={t('browserAutomation.security.title')}
                >
                  <ul className="space-y-2 text-sm">
                    {category.security.map((id) => {
                      const item = securityItems[id];
                      return item ? (
                        <li key={item.name} className="break-words">
                          <span className="font-bold">{item.name}</span>
                          {': '}
                          {item.desc}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </InfoBox>
              </StablePanels>
            </div>
          ))}
        </StablePanels>
      </div>
    </div>
  );
};
