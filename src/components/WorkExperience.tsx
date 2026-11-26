import { Building2, Calendar, GraduationCap, MapPin, Server } from 'lucide-react';
import {
  EDUCATION,
  WORK_EXPERIENCE,
} from '../data/portfolioData';

export function WorkExperience() {
  return (
    <section
      id="experience"
      className="bkm-section bkm-speck-light"
      aria-labelledby="bkm-exp-heading"
    >
      <div className="bkm-inner">
        <div className="bkm-sec-head">
          <h2 id="bkm-exp-heading" className="bkm-h2">
            Experience &amp; Education
          </h2>
        </div>

        {/* Education Editorial Banner */}
        <div className="bkm-edu-banner">
          <div style={{ maxWidth: '64ch' }}>
            <div
              className="bkm-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 8,
              }}
            >
              <GraduationCap size={15} aria-hidden="true" />
              <span>EDUCATION · {EDUCATION.graduation.toUpperCase()}</span>
            </div>
            <h3 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, lineHeight: 1.15 }}>
              {EDUCATION.degree}
            </h3>
            <p style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>
              {EDUCATION.institution} · {EDUCATION.minor}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, maxWidth: 420 }}>
            {EDUCATION.focus.map((item) => (
              <span
                key={item}
                className="bkm-chip"
                style={{ background: 'var(--paper)', color: 'var(--ink)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Internships Grid */}
        <div className="bkm-exp-grid">
          {WORK_EXPERIENCE.map((exp) => (
            <article key={exp.id} className="bkm-exp-card">
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span
                    className="bkm-mono"
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      border: '1.5px solid var(--ink)',
                      background: 'var(--butter)',
                      fontWeight: 700,
                    }}
                  >
                    {exp.role}
                  </span>
                  <span
                    className="bkm-mono"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      color: 'var(--blue)',
                    }}
                  >
                    {exp.id === 'ongc' ? (
                      <Building2 size={13} aria-hidden="true" />
                    ) : (
                      <Server size={13} aria-hidden="true" />
                    )}
                    {exp.domain}
                  </span>
                </div>

                {exp.imageUrl && (
                  <div
                    className="bkm-exp-img"
                    style={{
                      marginBottom: 14,
                      background: exp.id === 'ishan-tech' ? '#0d3b7d' : 'var(--paper)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: exp.id === 'ishan-tech' ? 12 : 0,
                    }}
                  >
                    <img
                      src={exp.imageUrl}
                      alt={`${exp.company} internship`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: exp.id === 'ishan-tech' ? 'contain' : 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                )}

                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
                  {exp.company}
                </h3>

                <div
                  className="bkm-mono"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                    marginBottom: 12,
                    color: 'var(--muted)',
                  }}
                >
                  {exp.period && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Calendar size={12} aria-hidden="true" />
                      {exp.period}
                    </span>
                  )}
                  {exp.location && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <MapPin size={12} aria-hidden="true" />
                      {exp.location}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.52,
                    fontWeight: 600,
                    color: 'var(--muted)',
                  }}
                >
                  {exp.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 12, borderTop: '1.5px dashed rgba(12, 12, 16, 0.25)' }}>
                {exp.technologies.map((tech) => (
                  <span key={tech} className="bkm-tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
