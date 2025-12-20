import { Cpu, Layers, Milestone, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function IntroSection() {
  const { t } = useTranslation('week10');
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-green-600 to-lime-600">
          {t('intro.title')}
        </h2>
        <p
          className="text-gray-600 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: t('intro.description') }}
        ></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-green-600">
              <Zap size={24} />
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

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-blue-600">
              <Layers size={24} />
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

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-purple-600">
              <Cpu size={24} />
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

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-orange-600">
              <Milestone size={24} />
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
    </div>
  );
}
