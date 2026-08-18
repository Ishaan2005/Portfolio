import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'experience', 'about', 'contact'];
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
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
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
                className="nav-item-link"
                style={{
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '0.42rem 0.9rem',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'var(--accent-cyan-dim)' : 'transparent',
                  border: isActive ? '1px solid var(--border-cyan)' : '1px solid transparent',
                  boxShadow: isActive
                    ? '0 2px 10px rgba(6, 182, 212, 0.2)'
                    : 'none',
                }}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Mobile Actions: Hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }} className="mobile-actions">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
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
            boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
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
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-main)',
                  background: isActive ? 'var(--accent-cyan-dim)' : 'var(--bg-surface)',
                  border: isActive ? '1px solid var(--border-cyan)' : '1px solid var(--border-subtle)',
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
        </div>
      )}

      <style>{`
        .nav-item-link:hover {
          color: var(--accent-cyan) !important;
          background-color: var(--accent-cyan-dim) !important;
          border-color: var(--border-cyan) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 868px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
