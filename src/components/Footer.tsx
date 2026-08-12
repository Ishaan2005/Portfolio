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
        padding: '3rem 0 2rem',
        marginTop: '4rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Left Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              <Cpu size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                Ishaan Bhimajiyani
              </div>
              <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
                ECE Engineer · VLSI & Computer Architecture
              </div>
            </div>
          </div>

          {/* Center Hardware Telemetry Badge */}
          <div
            className="mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
              background: 'var(--bg-dark)',
              border: '1px solid var(--border-cyan)',
              padding: '0.4rem 0.875rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
              RTL: SYNTHESIZED
            </span>
            <span style={{ color: 'var(--border-active)' }}>|</span>
            <span>SKY130 PDK: LOADED</span>
          </div>

          {/* Right Scroll Top */}
          <button
            onClick={scrollToTop}
            className="btn btn-outline btn-sm mono"
            aria-label="Scroll back to top"
          >
            Back to Top
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Ishaan Bhimajiyani. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
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
