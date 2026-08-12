import React from 'react';
import { GitBranch } from 'lucide-react';
import type { JourneyStep } from '../types';

export const EngineeringJourney: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      stage: '01',
      label: 'ECE Engineering',
      description: 'Undergraduate study in Electronics & Communication Engineering fundamentals, circuit analysis, and digital logic design.',
    },
    {
      stage: '02',
      label: 'Network & Systems Experience',
      description: 'Understanding low-level communication protocols, Linux system administration, and software-hardware interfaces.',
    },
    {
      stage: '03',
      label: 'VLSI / RTL Design',
      description: 'RTL specification in Verilog, OpenLane ASIC synthesis flow, Sky130 PDK physical design, and GDSII layout visualizers.',
    },
    {
      stage: '04',
      label: 'AI Hardware',
      description: 'Exploring domain-specific hardware accelerators, systolic arrays, and efficient arithmetic datapaths for AI workload compute.',
    },
  ];

  return (
    <section id="journey" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GitBranch size={14} /> TECHNICAL TIMELINE
          </div>
          <h2 className="section-title">
            Engineering Journey
          </h2>
          <p className="section-subtitle">
            Progressive focus from core electronics to specialized RTL synthesis, VLSI design, and next-generation AI hardware.
          </p>
        </div>

        {/* Timeline Pipeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            position: 'relative',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.stage}
              className="card-hardware"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                borderLeft: '3px solid var(--accent-cyan)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="mono" style={{ fontSize: '0.8125rem', color: 'var(--accent-cyan)', background: 'var(--accent-cyan-dim)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  STAGE {step.stage}
                </span>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {idx < steps.length - 1 ? 'PIPELINE STAGE' : 'FUTURE FOCUS'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {step.label}
              </h3>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
