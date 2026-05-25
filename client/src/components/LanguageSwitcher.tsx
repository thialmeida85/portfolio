import { motion } from 'framer-motion';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div className="flex gap-2 p-1 bg-card border border-border rounded-lg">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors relative ${
            language === lang.code
              ? 'text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {language === lang.code && (
            <motion.div
              layoutId="language-bg"
              className="absolute inset-0 bg-accent rounded -z-10"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}
