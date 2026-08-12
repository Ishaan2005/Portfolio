import React from 'react';
import { X } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={`${import.meta.env.BASE_URL}images/Ishaan.jpeg`}
              alt="Ishaan Bhimajiyani"
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-cyan)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
              }}
            />
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', lineHeight: 1.2, marginBottom: '0.2rem' }}>
                Ishaan Bhimajiyani — Resume Overview
              </h2>
              <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                ECE ENGINEER · VLSI, RTL & COMPUTER ARCHITECTURE
              </div>
              <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                ishaanbhimaji@gmail.com · github.com/Ishaan2005
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#6e3f1f',
              border: '1px solid #522d14',
              color: '#ffffff',
              padding: '0.4rem 0.6rem',
              borderRadius: '14px 4px 14px 4px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(110,63,31,0.3)',
            }}
          >
            <X size={18} style={{ color: '#ffffff' }} />
          </button>
        </div>

        {/* Content Sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.9375rem', color: 'var(--text-body)' }}>
          
          {/* Summary */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: '8px' }}>
            <h3 className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Professional Summary
            </h3>
            <p style={{ lineHeight: 1.6 }}>
              Electronics and Communication Engineering student targeting VLSI, RTL / Digital Design, Computer Architecture, and AI Hardware. Focused on Verilog/SystemVerilog logic synthesis, RISC-V architectural exploration with gem5, and open-source ASIC physical design flows (OpenLane, Sky130 PDK).
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Education
            </h3>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '1.25rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1rem' }}>
                  Bachelor of Technology in Electronics & Communication Engineering
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Specializing in Digital System Design, VLSI Design, Computer Architecture, and Microprocessors.
              </p>
            </div>
          </div>

          {/* Internship & Work Experience */}
          <div>
            <h3 className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Internship & Professional Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '1rem 1.25rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Summer Intern — ONGC, Ahmedabad</strong>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Explored industrial automation, SCADA systems, RTUs, MODBUS/PROFIBUS/Fieldbus protocols, Cisco 1941 VLAN routing, and Rocky Linux PXE boot/YUM repo setups.
                </p>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '1rem 1.25rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Network Monitoring Intern — Ishan Technologies</strong>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  ISP network monitoring, Python automation, Zabbix system maintenance, data pre-processing, and N-ticketing module testing.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div>
            <h3 className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Core Technical Competencies
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>RTL & VLSI</strong>
                Verilog, RTL Design, FSMs, Timing, OpenLane, OpenROAD, Sky130 PDK
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>Computer Architecture</strong>
                RISC-V (RV64), gem5 Simulator, Cache Architecture, IPC Analysis, CPU Pipelines
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>Protocols & Datapaths</strong>
                AMBA APB3, UART (RTL→GDS), MAC Units, Register Files, Bus Interfaces
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>Programming & EDA</strong>
                Python, Linux, Git, Icarus Verilog, GTKWave, Yosys
              </div>
            </div>
          </div>

          {/* Key Projects Summary */}
          <div>
            <h3 className="mono" style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Key Featured Projects
            </h3>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-body)' }}>
              <li><strong>GDS Viewer:</strong> Interactive GDSII silicon layout visualizer inspired by Tiny Tapeout for Sky130 ASIC floorplan inspection.</li>
              <li><strong>AMBA APB3 Master / Slave:</strong> Synthesizable Verilog FSM protocol interface with PREADY wait-state support.</li>
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={onClose}
            className="mono"
            style={{
              color: '#ffffff',
              background: '#6e3f1f',
              border: '1px solid #522d14',
              borderRadius: '16px 5px 16px 5px',
              padding: '0.45rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(110,63,31,0.3)',
            }}
          >
            Close Viewer
          </button>
          <a
            href="https://github.com/Ishaan2005"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{
              color: '#ffffff',
              background: '#8c522b',
              border: '1px solid #522d14',
              borderRadius: '16px 5px 16px 5px',
              padding: '0.45rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 10px rgba(140,82,43,0.35)',
            }}
          >
            <GithubIcon size={14} />
            GitHub Profile
          </a>
        </div>

      </div>
    </div>
  );
};
