import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const { t } = useTranslation('main');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans text-gray-900">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {t('header.title')}
        </h1>
        <p className="text-lg text-gray-500">{t('header.description')}</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((week) => {
            const colors = getWeekColors(week);
            return (
              <Link
                key={week}
                to={`/week-${week}`}
                className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex flex-col items-start text-left space-y-2">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-md transition-colors ${colors.badge}`}
                  >
                    {t('week_badge', { count: week })}
                  </span>
                  <h2
                    className={`text-xl font-semibold transition-colors ${colors.title}`}
                  >
                    {t(`weeks.week${week}.title`)}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {t(`weeks.week${week}.description`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const getWeekColors = (week: number) => {
  if (week <= 7) {
    return {
      badge: 'text-blue-600 bg-blue-50 group-hover:bg-blue-100',
      title: 'group-hover:text-blue-600',
    };
  }

  switch (week) {
    case 8:
      return {
        badge: 'text-red-600 bg-red-50 group-hover:bg-red-100',
        title: 'group-hover:text-red-600',
      };
    case 9:
      return {
        badge: 'text-purple-600 bg-purple-50 group-hover:bg-purple-100',
        title: 'group-hover:text-purple-600',
      };
    case 10:
      return {
        badge: 'text-green-600 bg-green-50 group-hover:bg-green-100',
        title: 'group-hover:text-green-600',
      };
    case 11:
      return {
        badge: 'text-orange-600 bg-orange-50 group-hover:bg-orange-100',
        title: 'group-hover:text-orange-600',
      };
    case 12:
      return {
        badge: 'text-rose-600 bg-rose-50 group-hover:bg-rose-100',
        title: 'group-hover:text-rose-600',
      };
    case 13:
      return {
        badge: 'text-cyan-600 bg-cyan-50 group-hover:bg-cyan-100',
        title: 'group-hover:text-cyan-600',
      };
    case 14:
      return {
        badge: 'text-teal-600 bg-teal-50 group-hover:bg-teal-100',
        title: 'group-hover:text-teal-600',
      };
    case 15:
      return {
        badge: 'text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100',
        title: 'group-hover:text-indigo-600',
      };
    default:
      return {
        badge: 'text-blue-600 bg-blue-50 group-hover:bg-blue-100',
        title: 'group-hover:text-blue-600',
      };
  }
};
