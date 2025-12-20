import { Activity, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PerformanceSection() {
  const { t } = useTranslation('week10');
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <Activity size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('performance.title')}
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          {t('performance.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-green-200 bg-green-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-green-600" />
              <h3 className="font-bold text-green-900">
                {t('performance.good.title')}
              </h3>
            </div>
            <ul className="space-y-2 text-green-800 text-sm font-medium">
              <li>✓ transform: translate()</li>
              <li>✓ transform: scale()</li>
              <li>✓ transform: rotate()</li>
              <li>✓ opacity</li>
            </ul>
            <p className="mt-4 text-xs text-green-700">
              {t('performance.good.description')}
            </p>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-red-600" />
              <h3 className="font-bold text-red-900">
                {t('performance.bad.title')}
              </h3>
            </div>
            <ul className="space-y-2 text-red-800 text-sm font-medium">
              <li>❌ width, height</li>
              <li>❌ top, left, bottom, right</li>
              <li>❌ margin, padding</li>
              <li>❌ fontSize</li>
            </ul>
            <p className="mt-4 text-xs text-red-700">
              {t('performance.bad.description')}
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm">
          <AlertTriangle className="shrink-0" size={20} />
          <div>
            <strong>{t('performance.devtools.title')}</strong>{' '}
            {t('performance.devtools.description')}
          </div>
        </div>
      </div>
    </div>
  );
}
