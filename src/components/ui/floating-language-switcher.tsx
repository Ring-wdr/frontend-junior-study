import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export function FloatingLanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center gap-2 px-4 py-3',
        'bg-white text-gray-900',
        'rounded-full shadow-lg border border-gray-200',
        'hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        'font-medium text-sm',
      )}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-blue-600" />
      <span>{i18n.language === 'ko' ? '한글' : 'English'}</span>
    </button>
  );
}
