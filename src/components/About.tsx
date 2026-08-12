import React from 'react';
import { User, CircuitBoard } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', alignItems: 'center' }} className="about-grid">
          
          {/* Text Content */}
          <div>
            <div className="section-tag">
              <User size={14} /> ABOUT ME
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.5rem' }}>
              <p>
                I’m a final-year Electronics and Communication student, passionate about data science and the intersection of hardware and software. I love exploring how these elements come together to solve real-world problems. I’m focused on continuous learning and eager to contribute to the tech community.
              </p>
            </div>
          </div>

          {/* Visual Hardware Spec Box with Profile Photo */}
          <div>
            <div className="card-hardware" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <img
                  src="/ishaan.jpeg"
                  alt="Ishaan Bhimajiyani"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-cyan)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CircuitBoard size={18} style={{ color: 'var(--accent-cyan)' }} />
                    Engineer Focus Profile
                  </h3>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>FIELD OF SPECIFICATION</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Degree Focus</span>
                  <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>ECE Student</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Primary Core</span>
                  <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>RTL / Digital Design</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Physical ASIC Target</span>
                  <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Sky130 / OpenLane</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>ISA Architecture</span>
                  <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>RISC-V (RV64)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Long-term Trajectory</span>
                  <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)' }}>AI Hardware & Compute</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
};
