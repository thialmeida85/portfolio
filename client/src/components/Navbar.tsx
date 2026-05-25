import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.design'), href: '/design' },
    { name: t('nav.video'), href: '/video' },
    { name: t('nav.vfx'), href: '/vfx' },
    { name: t('nav.coding'), href: '/coding' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-3xl shadow-[0_24px_80px_-55px_rgba(0,0,0,0.7)] transition-colors duration-300">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20 py-3 md:py-4 px-3 md:px-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent/90 via-accent to-accent/70 rounded-[18px] flex items-center justify-center shadow-[0_14px_40px_-18px_rgba(201,168,76,0.8)]">
                <span className="text-accent-foreground font-bold text-sm md:text-base">LP</span>
              </div>
              <span className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                Luxury Portfolio
              </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <LanguageSwitcher />
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-300 relative group">
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Language Switcher Mobile */}
          <div className="md:hidden mr-2">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-card/80 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-accent" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-3xl shadow-xl"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href} className="block text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-2" onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
