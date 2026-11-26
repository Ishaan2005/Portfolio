import {
  Activity,
  CircuitBoard,
  Code2,
  Cpu,
  Layers,
  Terminal,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { WaveformDoodle } from './bunkum/StudioIllustrations';

const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu':
      return <Cpu size={18} aria-hidden="true" />;
    case 'Activity':
      return <Activity size={18} aria-hidden="true" />;
    case 'Layers':
      return <Layers size={18} aria-hidden="true" />;
    case 'CircuitBoard':
      return <CircuitBoard size={18} aria-hidden="true" />;
    case 'Code2':
      return <Code2 size={18} aria-hidden="true" />;
    case 'Terminal':
    default:
      return <Terminal size={18} aria-hidden="true" />;
  }
};

export function Skills() {
  return (
    <section
      id="skills"
      className="bkm-section bkm-paper-tex"
      aria-labelledby="bkm-skills-heading"
    >
      <div className="bkm-inner">
        <div className="bkm-sec-head">
          <div>
            <div className="bkm-sticker-tag" style={{ marginBottom: 12 }}>
              03 · WORKBENCH &amp; TOOLCHAIN
            </div>
            <h2 id="bkm-skills-heading" className="bkm-h2">
              Skills &amp; Tools<sup>( Silicon → Systems )</sup>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <WaveformDoodle style={{ width: 92, height: 'auto' }} />
            <p
              style={{
                maxWidth: '34ch',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--muted)',
              }}
            >
              From Verilog behavioral RTL and verification waveforms to OpenLane physical layouts, RISC-V exploration, and Linux tooling.
            </p>
          </div>
        </div>

        <div className="bkm-skills-wall">
          {SKILL_CATEGORIES.map((cat, index) => {
            const isDark = index === 3;
            return (
              <div
                key={cat.id}
                className={`bkm-skill-panel ${cat.featured ? 'is-featured' : ''} ${
                  isDark ? 'is-dark' : ''
                }`}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}
                  >
                    <span
                      className="bkm-mono"
                      style={{
                        opacity: 0.78,
                        color: isDark ? 'var(--butter)' : 'var(--blue)',
                      }}
                    >
                      {cat.code}
                    </span>
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        border: '1.5px solid currentColor',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getSkillIcon(cat.iconName)}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(19px, 1.7vw, 22px)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      marginBottom: 6,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      opacity: 0.82,
                      marginBottom: 14,
                    }}
                  >
                    {cat.summary}
                  </p>
                </div>

                <div className="bkm-skill-chips">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="bkm-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
