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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm md:text-base">LP</span>
              </div>
              <span className="text-lg md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                Luxury Portfolio
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <LanguageSwitcher />
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-300 relative group">
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              </Link>
            ))}
          </div>

          {/* Language Switcher Mobile */}
          <div className="md:hidden mr-2">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
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
            className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
