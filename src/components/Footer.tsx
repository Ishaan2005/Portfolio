import React from 'react';
import { Cpu, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.75rem 0 1.25rem',
        marginTop: '2.5rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Left Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              <Cpu size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                Ishaan Bhimajiyani
              </div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                ECE Engineer · VLSI & Computer Architecture
              </div>
            </div>
          </div>

          {/* Right Scroll Top */}
          <button
            onClick={scrollToTop}
            className="btn btn-outline btn-sm mono"
            aria-label="Scroll back to top"
          >
            Back to Top
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginTop: '1rem',
            fontSize: '0.78rem',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Ishaan Bhimajiyani. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/Ishaan2005" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ishaan-bhimajiyani/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
              LinkedIn
            </a>
            <a href="mailto:ishaanbhimaji@gmail.com" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
