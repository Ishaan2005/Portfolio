import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { VscodePets } from './VscodePets';

export const Hero: React.FC = () => {
  const techStack = [
    'Verilog',
    'OpenRoad',
    'Linux',
    'Python',
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Text & Hero Action */}
          <div>
            {/* Status Pill */}
            <div
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                background: 'var(--accent-cyan-dim)',
                border: '1px solid var(--border-cyan)',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                marginBottom: '0.85rem',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 6px var(--accent-cyan)' }} />
              ELECTRONICS & COMMUNICATION ENGINEERING
            </div>

            {/* Main Name & Headline */}
            <h1
              style={{
                marginBottom: '0.65rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-main)',
              }}
            >
              Ishaan Bhimajiyani
            </h1>

            <h2
              style={{
                fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                fontWeight: 500,
                color: 'var(--text-main)',
                lineHeight: 1.3,
                marginBottom: '0.75rem',
              }}
            >
              ECE Engineer building at the intersection of Digital Design, VLSI and Computer Architecture.
            </h2>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                maxWidth: '520px',
              }}
            >
              Focused on RTL design, RISC-V, computer architecture and open-source silicon workflows.
            </p>

            {/* Call to Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a href="#projects" className="btn btn-primary">
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href="https://github.com/Ishaan2005"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
            </div>

            {/* Technical Stack Pills */}
            <div>
              <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Technical Stack & EDA Toolchain
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {techStack.map((tech) => (
                  <span key={tech} className="tech-tag tech-tag-highlight">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Photo Display with VSCode Pets Animated Ledge Above */}
          <div>
            {/* VSCode Pets Walking Playground Above Photo */}
            <VscodePets />

            {/* Photo Container */}
            <div
              style={{
                width: '100%',
                height: '420px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
                position: 'relative',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Ishaan.jpeg`}
                alt="Ishaan Bhimajiyani"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
