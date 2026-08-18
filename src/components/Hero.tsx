import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Hero: React.FC = () => {
  const techStack = [
    'Verilog',
    'OpenRoad',
    'Linux',
    'Python',
  ];

  const fullName = 'Ishaan Bhimajiyani';
  const fullHeadline = 'ECE Engineer building at the intersection of Digital Design, VLSI and Computer Architecture.';

  const [typedName, setTypedName] = useState('');
  const [typedHeadline, setTypedHeadline] = useState('');
  const [phase, setPhase] = useState<'name' | 'headline' | 'done'>('name');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'name') {
      if (typedName.length < fullName.length) {
        timer = setTimeout(() => {
          setTypedName(fullName.slice(0, typedName.length + 1));
        }, 50);
      } else {
        timer = setTimeout(() => {
          setPhase('headline');
        }, 220);
      }
    } else if (phase === 'headline') {
      if (typedHeadline.length < fullHeadline.length) {
        timer = setTimeout(() => {
          setTypedHeadline(fullHeadline.slice(0, typedHeadline.length + 1));
        }, 22);
      } else {
        setPhase('done');
      }
    }

    return () => clearTimeout(timer);
  }, [typedName, typedHeadline, phase]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Text & Hero Action */}
          <div>
            {/* Main Name */}
            <h1
              style={{
                marginBottom: '0.45rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-main)',
                minHeight: '1.15em',
              }}
            >
              {typedName}
              {phase === 'name' && <span className="typing-cursor">|</span>}
            </h1>

            {/* Headline */}
            <h2
              style={{
                fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                fontWeight: 500,
                color: 'var(--text-main)',
                lineHeight: 1.3,
                marginBottom: '0.65rem',
                minHeight: '2.6em',
              }}
            >
              {typedHeadline}
              {phase === 'headline' && <span className="typing-cursor">|</span>}
            </h2>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                marginBottom: '1.15rem',
                maxWidth: '520px',
                lineHeight: 1.55,
              }}
            >
              Focused on RTL design, RISC-V, computer architecture and open-source silicon workflows.
            </p>

            {/* Call to Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.35rem' }}>
              <a href="#projects" className="btn btn-primary">
                View Projects
                <ArrowRight size={15} />
              </a>
              <a
                href="https://github.com/Ishaan2005"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
            </div>

            {/* Technical Stack Pills */}
            <div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Technical Stack & EDA Toolchain
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {techStack.map((tech) => (
                  <span key={tech} className="tech-tag tech-tag-highlight">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Photo Display */}
          <div>
            <div
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                border: '1.5px solid var(--border-subtle)',
                position: 'relative',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/front.jpeg`}
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
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          display: inline-block;
          color: var(--accent-cyan);
          font-weight: 300;
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
