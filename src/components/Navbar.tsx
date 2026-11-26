import { useEffect, useState, type CSSProperties } from 'react';
import { Menu, X } from 'lucide-react';
import type { BunkumTheme } from './bunkum/bunkumEngine';

interface NavbarProps {
  theme: BunkumTheme;
  onRotateTheme: () => void;
  onNavigate: (sectionId: string) => void;
}

const roll = (text: string) => (
  <span
    className="bkm-roll"
    aria-hidden="true"
    style={{ '--n': text.length } as CSSProperties}
  >
    {text.split('').map((ch, i) => (
      <span key={i} style={{ '--i': i } as CSSProperties}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ))}
  </span>
);

const NAV_ITEMS = [
  { id: 'about', label: 'About Me' },
  { id: 'archive', label: 'Archive' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;

export function Navbar({
  theme,
  onRotateTheme,
  onNavigate,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ids = ['hero', ...NAV_ITEMS.map((item) => item.id)];
    const onScroll = () => {
      const scrollY = window.scrollY + 140;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <div className="bkm-chrome">
      <nav className="bkm-nav" aria-label="Main navigation">
        <button
          type="button"
          className="bkm-pill bkm-brand"
          data-magnet=""
          data-cursor="Top"
          onClick={() => handleNav('hero')}
        >
          <span>ISHAAN</span>
          <small>ECE · 2026</small>
          <span className="bkm-sr">, back to top</span>
        </button>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="bkm-pill bkm-link"
            data-magnet=""
            data-active={activeSection === item.id}
            onClick={() => handleNav(item.id)}
          >
            {roll(item.label)}
            <span className="bkm-sr">{item.label}</span>
          </button>
        ))}

        <button
          type="button"
          className="bkm-pill bkm-badge"
          data-cursor={`Palette: ${theme.name}`}
          aria-label={`Switch studio colour palette (currently ${theme.name})`}
          onClick={onRotateTheme}
        >
          <svg viewBox="0 0 30 30" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <ellipse
                key={k}
                cx="15"
                cy="8.6"
                rx="3.6"
                ry="6"
                fill="currentColor"
                transform={`rotate(${k * 60} 15 15)`}
                opacity={k % 2 ? 0.58 : 1}
              />
            ))}
            <circle
              cx="15"
              cy="15"
              r="3.4"
              fill="var(--butter)"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>

        <button
          type="button"
          className="bkm-pill bkm-mobile-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="bkm-mobile-drawer" role="dialog" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="bkm-pill"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                background: activeSection === item.id ? 'var(--blue)' : 'var(--cream)',
                color: activeSection === item.id ? 'var(--butter)' : 'var(--ink)',
              }}
              onClick={() => handleNav(item.id)}
            >
              <span>{item.label}</span>
              <span className="bkm-mono">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
