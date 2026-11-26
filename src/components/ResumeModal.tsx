import { useEffect } from 'react';
import { X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { EDUCATION, PROFILE, PROJECTS, WORK_EXPERIENCE } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="bkm-lb"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div className="bkm-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            marginBottom: 18,
            paddingBottom: 14,
            borderBottom: '2px dashed rgba(12, 12, 16, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={PROFILE.portraitAbout}
              alt={PROFILE.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                border: '2.5px solid var(--ink)',
                flexShrink: 0,
              }}
            />
            <div>
              <h2 id="resume-modal-title" style={{ fontSize: 22, fontWeight: 800 }}>
                {PROFILE.name} — Resume Overview
              </h2>
              <div className="bkm-mono" style={{ color: 'var(--blue)', fontWeight: 700, marginTop: 2 }}>
                {PROFILE.tagline}
              </div>
              <div className="bkm-mono" style={{ opacity: 0.72, marginTop: 2 }}>
                {PROFILE.email} · github.com/Ishaan2005
              </div>
            </div>
          </div>

          <button
            type="button"
            className="bkm-lbbtn"
            style={{ background: 'var(--tomato)', color: 'var(--cream)' }}
            aria-label="Close resume overview"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              background: 'var(--cream)',
              border: '2px solid var(--ink)',
              borderRadius: 14,
              padding: 16,
            }}
          >
            <h3 className="bkm-mono" style={{ color: 'var(--blue)', marginBottom: 6 }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, fontWeight: 600 }}>
              Electronics and Communication Engineering student at {EDUCATION.institution} ({EDUCATION.graduation}, {EDUCATION.minor}) targeting RTL / Digital Design, FPGA, ASIC workflows, Computer Architecture, and AI Hardware. Focused on Verilog/SystemVerilog logic synthesis, RISC-V architectural exploration with gem5, and open-source ASIC physical design flows (OpenLane, OpenROAD, Sky130 PDK).
            </p>
          </div>

          <div
            style={{
              background: 'var(--pistachio)',
              border: '2px solid var(--ink)',
              borderRadius: 14,
              padding: 16,
            }}
          >
            <h3 className="bkm-mono" style={{ marginBottom: 6 }}>
              Education
            </h3>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {EDUCATION.degree} — {EDUCATION.institution}
            </div>
            <div className="bkm-mono" style={{ marginTop: 3 }}>
              {EDUCATION.minor} · {EDUCATION.graduation}
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 600, marginTop: 6 }}>
              Specializing in Digital System Design, VLSI Design, Computer Architecture, and Microprocessors.
            </p>
          </div>

          <div>
            <h3 className="bkm-mono" style={{ color: 'var(--blue)', marginBottom: 8 }}>
              Internships &amp; Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {WORK_EXPERIENCE.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    background: 'var(--cream)',
                    border: '2px solid var(--ink)',
                    borderRadius: 12,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <strong style={{ fontSize: 15 }}>
                      {exp.role} — {exp.company}
                    </strong>
                    <span className="bkm-mono">{exp.period}</span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--muted)', fontWeight: 600 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="bkm-mono" style={{ color: 'var(--blue)', marginBottom: 8 }}>
              Core Technical Competencies
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 10,
              }}
            >
              <div style={{ background: 'var(--cream)', border: '2px solid var(--ink)', borderRadius: 12, padding: 12 }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>RTL &amp; VLSI</strong>
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  Verilog, RTL Design, FSMs, Timing, OpenLane, OpenROAD, Sky130 PDK
                </span>
              </div>
              <div style={{ background: 'var(--cream)', border: '2px solid var(--ink)', borderRadius: 12, padding: 12 }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>Computer Architecture</strong>
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  RISC-V (RV64), gem5 Simulator, Cache Architecture, IPC Analysis, CPU Pipelines
                </span>
              </div>
              <div style={{ background: 'var(--cream)', border: '2px solid var(--ink)', borderRadius: 12, padding: 12 }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>Protocols &amp; Datapaths</strong>
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  AMBA APB3, STP FSM, UART (RTL→GDS), FIFO Buffers, MAC Units, Register Files
                </span>
              </div>
              <div style={{ background: 'var(--cream)', border: '2px solid var(--ink)', borderRadius: 12, padding: 12 }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>Programming &amp; EDA</strong>
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  Python, Linux, Git, Icarus Verilog, GTKWave, Yosys, ModelSim
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="bkm-mono" style={{ color: 'var(--blue)', marginBottom: 8 }}>
              Featured Engineering Projects
            </h3>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, fontWeight: 600 }}>
              {PROJECTS.map((proj) => (
                <li key={proj.id}>
                  <strong>{proj.title}:</strong> {proj.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            gap: 10,
            marginTop: 18,
            paddingTop: 14,
            borderTop: '2px dashed rgba(12, 12, 16, 0.25)',
          }}
        >
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bkm-btn bkm-btn-secondary"
            style={{ height: 40, fontSize: 13 }}
          >
            <LinkedinIcon size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bkm-btn bkm-btn-cobalt"
            style={{ height: 40, fontSize: 13 }}
          >
            <GithubIcon size={15} />
            <span>GitHub Profile</span>
          </a>
          <button
            type="button"
            className="bkm-btn"
            style={{ height: 40, fontSize: 13 }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
