import { useEffect } from 'react';
import {
  BarChart2,
  Check,
  Code,
  Cpu,
  ExternalLink,
  Layers,
  X,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

export function ProjectModal({
  project,
  allProjects,
  onSelectProject,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const idx = allProjects.findIndex((p) => p.id === project.id);
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose();
      } else if (ev.key === 'ArrowRight' && idx >= 0) {
        onSelectProject(allProjects[(idx + 1) % allProjects.length]);
      } else if (ev.key === 'ArrowLeft' && idx >= 0) {
        onSelectProject(
          allProjects[(idx + allProjects.length - 1) % allProjects.length]
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, allProjects, onSelectProject, onClose]);

  if (!project) return null;

  const spec = project.specDetails;
  const idx = allProjects.findIndex((p) => p.id === project.id);

  return (
    <div
      className="bkm-lb"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div className="bkm-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 18,
            paddingBottom: 14,
            borderBottom: '2px dashed rgba(12, 12, 16, 0.25)',
          }}
        >
          <div>
            <div
              className="bkm-mono"
              style={{ color: 'var(--blue)', fontWeight: 700, marginBottom: 4 }}
            >
              {project.scrapCode || 'SPEC'} · TECHNICAL SPECIFICATION SHEET
            </div>
            <h2
              id="project-modal-title"
              style={{
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {idx >= 0 && (
              <>
                <button
                  type="button"
                  className="bkm-lbbtn"
                  aria-label="Previous project"
                  onClick={() =>
                    onSelectProject(
                      allProjects[(idx + allProjects.length - 1) % allProjects.length]
                    )
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  className="bkm-lbbtn"
                  aria-label="Next project"
                  onClick={() =>
                    onSelectProject(allProjects[(idx + 1) % allProjects.length])
                  }
                >
                  →
                </button>
              </>
            )}
            <button
              type="button"
              className="bkm-lbbtn"
              style={{ background: 'var(--tomato)', color: 'var(--cream)' }}
              aria-label="Close technical specification"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {project.imageUrl && (
            <div
              style={{
                width: '100%',
                maxHeight: 300,
                borderRadius: 14,
                border: '2px solid var(--ink)',
                background: project.imageBg || '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                overflow: 'hidden',
              }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: 272,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Technologies */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bkm-tag-pill"
                style={{ background: 'var(--butter)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div>
            <div
              className="bkm-mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--blue)',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              <Cpu size={14} aria-hidden="true" />
              <span>Architectural Overview</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.58, fontWeight: 600 }}>
              {spec?.overview || project.description}
            </p>
          </div>

          {/* Key Features */}
          {spec?.keyFeatures && spec.keyFeatures.length > 0 && (
            <div>
              <div
                className="bkm-mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--blue)',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                <Layers size={14} aria-hidden="true" />
                <span>Key Implementation Highlights</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {spec.keyFeatures.map((feat) => (
                  <div
                    key={feat}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--blue)',
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      <Check size={15} aria-hidden="true" />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flow & Metrics */}
          {spec?.flowOrMetrics && spec.flowOrMetrics.length > 0 && (
            <div>
              <div
                className="bkm-mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--blue)',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                <BarChart2 size={14} aria-hidden="true" />
                <span>Toolchain &amp; Flow Summary</span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 10,
                }}
              >
                {spec.flowOrMetrics.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: 'var(--cream)',
                      border: '2px solid var(--ink)',
                      borderRadius: 12,
                      padding: 10,
                    }}
                  >
                    <div className="bkm-mono" style={{ opacity: 0.7 }}>
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--blue)',
                        marginTop: 3,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RTL Excerpt */}
          {spec?.verilogSnippet && (
            <div>
              <div
                className="bkm-mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--blue)',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                <Code size={14} aria-hidden="true" />
                <span>RTL / Config Excerpt</span>
              </div>
              <pre
                style={{
                  background: 'var(--ink)',
                  color: 'var(--butter)',
                  border: '2px solid var(--ink)',
                  borderRadius: 12,
                  padding: 14,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  lineHeight: 1.5,
                  overflowX: 'auto',
                }}
              >
                <code>{spec.verilogSnippet}</code>
              </pre>
            </div>
          )}

          {/* Footer Links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              gap: 10,
              paddingTop: 14,
              borderTop: '2px dashed rgba(12, 12, 16, 0.25)',
            }}
          >
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bkm-btn bkm-btn-cobalt"
                style={{ height: 40, fontSize: 13 }}
              >
                <span>Launch Live Demo</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bkm-btn"
              style={{ height: 40, fontSize: 13 }}
            >
              <GithubIcon size={15} />
              <span>View on GitHub</span>
            </a>
            <button
              type="button"
              className="bkm-btn bkm-btn-secondary"
              style={{ height: 40, fontSize: 13 }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
