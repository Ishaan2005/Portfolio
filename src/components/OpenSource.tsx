import React from 'react';
import { Terminal, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export const OpenSource: React.FC = () => {
  const openSourceFocus = [
    {
      title: 'Verilog Codes',
      description: 'Open-source digital logic repositories including UART, MAC datapaths, state machine controllers, and testbenches.',
      tags: ['Verilog', 'Simulation', 'GTKWave', 'Icarus Verilog'],
      url: 'https://github.com/Ishaan2005/Verilog_codes',
    },
    {
      title: 'AMBA APB3 Peripheral Bus Protocol',
      description: 'Open synthesizable AMBA APB3 master/slave interface implementation for SoC peripheral interconnection.',
      tags: ['AMBA APB3', 'Verilog', 'RTL', 'Bus Protocol'],
      url: 'https://github.com/Ishaan2005/AMBA-APB3-VerilogHDL',
    },
    {
      title: 'GDS Viewer (Tiny Tapeout Clone)',
      description: 'Open-source interactive GDSII silicon layout visualizer for inspecting ASIC physical chip layouts and Sky130 PDK layer stacks.',
      tags: ['GDSII', 'Sky130', 'TypeScript', 'ASIC Layout'],
      url: 'https://github.com/Ishaan2005/gds-viewer',
    },
  ];

  return (
    <section id="opensource" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GithubIcon size={14} /> TECHNOLOGY & EDA TOOLCHAINS
          </div>
          <h2 className="section-title">
            Technology & EDA Focus
          </h2>
          <p className="section-subtitle">
            Open-source hardware research, accessible silicon EDA toolchains, RISC-V microarchitectures, and digital logic implementations.
          </p>
        </div>

        {/* Grid of Open Source Focus Areas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.15rem',
          }}
        >
          {openSourceFocus.map((item) => (
            <div
              key={item.title}
              className="card-hardware"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                    <Terminal size={18} />
                    <span className="mono" style={{ fontSize: '0.75rem' }}>OPEN REPO</span>
                  </div>
                  <GithubIcon size={18} style={{ color: 'var(--text-dim)' }} />
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm mono"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Inspect Repository
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
