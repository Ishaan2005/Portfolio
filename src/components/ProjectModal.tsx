import React from 'react';
import { X, Cpu, Check, Layers, Code, BarChart2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const spec = project.specDetails;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div>
            <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
              TECHNICAL SPECIFICATION SHEET
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Project Preview Image */}
          {project.imageUrl && (
            <div
              style={{
                width: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: project.imageBg || 'var(--bg-code)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.65rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '280px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Technology Badges */}
          <div>
            <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Technologies & Tools
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag tech-tag-highlight">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Cpu size={14} style={{ color: 'var(--accent-cyan)' }} /> Architectural Overview
            </div>
            <p style={{ color: 'var(--text-body)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {spec?.overview || project.description}
            </p>
          </div>

          {/* Key Features */}
          {spec?.keyFeatures && spec.keyFeatures.length > 0 && (
            <div>
              <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Layers size={14} style={{ color: 'var(--accent-cyan)' }} /> Key Implementation Highlights
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {spec.keyFeatures.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-body)' }}>
                    <span style={{ color: 'var(--accent-cyan)', marginTop: '2px' }}>
                      <Check size={14} />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          {spec?.flowOrMetrics && spec.flowOrMetrics.length > 0 && (
            <div>
              <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <BarChart2 size={14} style={{ color: 'var(--accent-cyan)' }} /> Performance & Synthesis Metrics
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                {spec.flowOrMetrics.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.75rem' }}>
                    <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                      {item.label}
                    </div>
                    <div className="mono" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verilog / Spec snippet code block */}
          {spec?.verilogSnippet && (
            <div>
              <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Code size={14} style={{ color: 'var(--accent-cyan)' }} /> RTL Module Excerpt
              </div>
              <pre
                className="mono"
                style={{
                  background: 'var(--bg-code)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '1rem',
                  fontSize: '0.8125rem',
                  color: 'var(--text-body)',
                  overflowX: 'auto',
                }}
              >
                <code>{spec.verilogSnippet}</code>
              </pre>
            </div>
          )}

          {/* Modal Footer Links */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Launch Live Demo
                <ExternalLink size={14} />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <GithubIcon size={16} />
              View on GitHub
            </a>
            <button onClick={onClose} className="btn btn-outline btn-sm">
              Close Spec
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
