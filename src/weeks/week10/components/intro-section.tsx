'use client';

import { Cpu, Layers, Milestone, Zap } from 'lucide-react';
import { Trans, useTranslation } from '@/i18n/client';

export function IntroSection() {
  const { t } = useTranslation('week10');
  return (
    <div className="mt-4 space-y-5">
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
        <Trans t={t} i18nKey="intro.description" />
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start min-w-0">
          <div className="p-2 shrink-0 rounded-lg bg-white shadow-sm text-green-600">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {t('intro.features.timing.title')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('intro.features.timing.description')}
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start min-w-0">
          <div className="p-2 shrink-0 rounded-lg bg-white shadow-sm text-blue-600">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {t('intro.features.complex.title')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('intro.features.complex.description')}
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start min-w-0">
          <div className="p-2 shrink-0 rounded-lg bg-white shadow-sm text-purple-600">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {t('intro.features.beyond.title')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('intro.features.beyond.description')}
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3 items-start min-w-0">
          <div className="p-2 shrink-0 rounded-lg bg-white shadow-sm text-orange-600">
            <Milestone size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {t('intro.features.scroll.title')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('intro.features.scroll.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
