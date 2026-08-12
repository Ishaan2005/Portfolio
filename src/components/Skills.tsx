import React from 'react';
import { Cpu, Layers, Terminal, CheckCircle } from 'lucide-react';
import type { SkillCategory } from '../types';

export const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'RTL & Digital Design',
      iconName: 'Cpu',
      skills: ['Verilog', 'RTL Design', 'FSMs', 'Timing'],
    },
    {
      title: 'VLSI',
      iconName: 'Layers',
      skills: ['OpenLane', 'OpenROAD', 'Sky130', 'RTL-to-GDS', 'Physical Design'],
    },
    {
      title: 'Programming & Systems',
      iconName: 'Terminal',
      skills: ['Python', 'Linux', 'Git'],
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu size={20} style={{ color: 'var(--accent-cyan)' }} />;
      case 'Layers':
        return <Layers size={20} style={{ color: 'var(--accent-cyan)' }} />;
      case 'Terminal':
        return <Terminal size={20} style={{ color: 'var(--accent-cyan)' }} />;
      default:
        return <Cpu size={20} style={{ color: 'var(--accent-cyan)' }} />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ margin: '0 auto 0.875rem' }}>
            <Cpu size={14} /> TECHNICAL COMPETENCIES
          </div>
          <h2 className="section-title">
            Engineering & Toolchain Skills
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Focused competencies across digital hardware design, physical silicon synthesis, and core system tools.
          </p>
        </div>

        {/* Skill Category Grid - Centered 3 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 320px))',
            justifyContent: 'center',
            gap: '1.15rem',
            maxWidth: '1050px',
            margin: '0 auto',
          }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="card-hardware"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Category Title & Icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(category.iconName)}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>
                  {category.title}
                </h3>
              </div>

              {/* Skill Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                    }}
                  >
                    <span className="mono" style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                      {skill}
                    </span>
                    <CheckCircle size={14} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
