import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ar', label: 'عربي', flag: '🇲🇦' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300',
            language === lang.code
              ? 'gradient-primary text-primary-foreground shadow-soft'
              : 'text-muted-foreground hover:text-foreground hover:bg-background'
          )}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};
