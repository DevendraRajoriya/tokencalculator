"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LOCALES = [
  { code: "en", label: "English", flag: "🇺🇸", prefix: "" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", prefix: "/de" },
  { code: "fr", label: "Français", flag: "🇫🇷", prefix: "/fr" },
  { code: "es", label: "Español", flag: "🇪🇸", prefix: "/es" },
  { code: "ja", label: "日本語", flag: "🇯🇵", prefix: "/ja" },
  { code: "pt-BR", label: "Português", flag: "🇧🇷", prefix: "/pt-br" },
  { code: "ko", label: "한국어", flag: "🇰🇷", prefix: "/ko" },
  { code: "zh", label: "中文", flag: "🇨🇳", prefix: "/zh" },
];

function getCurrentLocale(pathname) {
  for (const locale of LOCALES) {
    if (locale.prefix && (pathname === locale.prefix || pathname.startsWith(locale.prefix + "/"))) {
      return locale;
    }
  }
  return LOCALES[0]; // English default
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [theme, setTheme] = useState("dark");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLocale = getCurrentLocale(pathname);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo" style={{ gap: '0.5rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.png"
            alt="Token Calculator logo"
            width={32}
            height={32}
            style={{ borderRadius: '6px', display: 'block', flexShrink: 0 }}
          />
          <div style={{ display: 'flex' }}>
            <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>token</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>calculator</span>
          </div>
        </a>
        
        <nav className="header__nav" aria-label="Main navigation">
          {/* Main Links - Desktop */}
          <div className="nav-links-desktop">
            <a href="/" className="header__link">Calculator</a>
            <a href="/llm-pricing-comparison" className="header__link">Pricing</a>
            <a href="/blog" className="header__link">Blog</a>
            <a href="/api/docs" className="header__link">API</a>
          </div>

          <div className="nav-divider" />

          {/* Right-side controls: always visible */}
          <div className="header__controls">
            {/* Lang Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="header__lang-btn"
                aria-label="Select language"
              >
                🌐 {currentLocale.code.toUpperCase()} <span style={{fontSize: '10px'}}>▾</span>
              </button>
              {langOpen && (
                <div className="header__lang-dropdown" style={{ minWidth: '140px' }}>
                  {LOCALES.map(locale => (
                    <a 
                      key={locale.code} 
                      href={locale.prefix || "/"} 
                      className="header__lang-option"
                      onClick={() => {
                        document.cookie = `NEXT_LOCALE=${locale.code === 'en' ? '' : locale.code};path=/;max-age=${365 * 24 * 60 * 60}`;
                      }}
                      style={{ 
                        fontWeight: currentLocale.code === locale.code ? 700 : 400,
                        background: currentLocale.code === locale.code ? 'var(--bg-tertiary)' : 'transparent',
                      }}
                    >
                      {locale.flag} {locale.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="header__theme-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            
            {/* Hamburger Menu Toggle - Mobile */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <a href="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Calculator</a>
          <a href="/llm-pricing-comparison" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="/blog" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <a href="/api/docs" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>API</a>
        </div>
      )}
    </header>
  );
}

