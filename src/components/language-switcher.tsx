import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        type="button"
        onClick={() => changeLanguage('ko')}
        className={cn(
          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
          i18n.language === 'ko'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700',
        )}
      >
        KO
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={cn(
          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
          i18n.language === 'en'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700',
        )}
      >
        EN
      </button>
    </div>
  );
}
