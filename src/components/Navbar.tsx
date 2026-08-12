import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'skills', 'experience', 'about', 'opensource', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Technology and EDA', href: '#opensource' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--header-height)',
        transition: 'all 0.25s ease',
        backgroundColor: scrolled ? 'var(--header-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '0.625rem',
          height: '100%',
        }}
      >
        {/* Desktop Nav Aligned to Left */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className="brown-nav-link"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '0.42rem 0.9rem',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? '#8c522b' : '#6e3f1f',
                  border: isActive ? '1px solid #d4955c' : '1px solid #522d14',
                  boxShadow: isActive
                    ? '0 3px 12px rgba(140, 82, 43, 0.45), inset 0 1px 0 rgba(255,255,255,0.25)'
                    : '0 2px 6px rgba(0, 0, 0, 0.18)',
                }}
              >
                {link.name}
              </a>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="brown-nav-link"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Cream & Cappuccino Light' : 'Dark Silicon'} mode`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#ffffff',
              background: '#6e3f1f',
              border: '1px solid #522d14',
              borderRadius: '6px',
              padding: '0.42rem 0.9rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={15} style={{ color: '#eab308' }} /> : <Moon size={15} style={{ color: '#ffffff' }} />}
            <span>{theme === 'dark' ? 'Cappuccino' : 'Silicon Dark'}</span>
          </button>
        </nav>

        {/* Mobile Actions: Theme switch + Hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }} className="mobile-actions">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{
              padding: '0.4rem 0.6rem',
              background: '#6e3f1f',
              border: '1px solid #522d14',
              color: '#ffffff',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? <Sun size={16} style={{ color: '#eab308' }} /> : <Moon size={16} style={{ color: '#ffffff' }} />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: '#6e3f1f',
              border: '1px solid #522d14',
              color: '#ffffff',
              padding: '0.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-active)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          }}
        >
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: '#ffffff',
                  background: isActive ? '#8c522b' : '#6e3f1f',
                  border: '1px solid #522d14',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  padding: '0.6rem 1rem',
                  display: 'block',
                }}
              >
                {link.name}
              </a>
            );
          })}
          
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: '0.6rem',
                background: '#6e3f1f',
                border: '1px solid #522d14',
                color: '#ffffff',
                borderRadius: '6px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Cream & Cappuccino' : 'Dark Silicon'}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .brown-nav-link:hover {
          background-color: #8c522b !important;
          color: #ffffff !important;
          border-color: #d4955c !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(140, 82, 43, 0.4) !important;
        }
        @media (max-width: 868px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
