import React, { useState, useEffect } from 'react';
import { Building2, Server, Calendar } from 'lucide-react';
import type { WorkExperienceItem } from '../types';

export const WorkExperience: React.FC = () => {
  const fullTitle = 'Internships & Professional Experience';
  const [typedTitle, setTypedTitle] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (typedTitle.length < fullTitle.length) {
      timer = setTimeout(() => {
        setTypedTitle(fullTitle.slice(0, typedTitle.length + 1));
      }, 35);
    } else {
      setIsTypingDone(true);
    }
    return () => clearTimeout(timer);
  }, [typedTitle]);

  const experiences: WorkExperienceItem[] = [
    {
      id: 'ongc',
      role: 'Summer Intern',
      company: 'ONGC (Oil and Natural Gas Corporation)',
      period: 'May 2025 – June 2025',
      location: 'Ahmedabad',
      domain: 'Industrial Automation & Networking',
      imageUrl: `${import.meta.env.BASE_URL}images/ongc.jpg`,
      description:
        'Interned at ONGC, where I explored real-world industrial automation and networking. I worked with SCADA systems and RTUs, and gained hands-on experience with MODBUS, PROFIBUS, and FOUNDATION Fieldbus protocols. I configured VLANs, and set up Inter-VLAN and Intra-VLAN routing on Cisco 1941 routers and Catalyst switches. I also set up PXE boot and built offline YUM repositories on Rocky Linux.',
      technologies: [
        'SCADA & RTU',
        'MODBUS',
        'PROFIBUS',
        'FOUNDATION Fieldbus',
        'Cisco 1941',
        'Catalyst Switches',
        'VLAN / Inter-VLAN Routing',
        'PXE Boot',
        'YUM Repositories',
        'Rocky Linux',
      ],
    },
    {
      id: 'ishan-tech',
      role: 'Network Monitoring Intern',
      company: 'Ishan Technologies',
      period: 'Feb 2026 – July 2026',
      location: 'Ahmedabad',
      domain: 'ISP Network Infrastructure & Monitoring',
      imageUrl: `${import.meta.env.BASE_URL}images/certi.png`,
      description:
        "Worked at the center of an ISP as a network monitoring intern, monitoring and helping manage company’s network. Collaborated with network engineers and system administrators. Applied basic automation using Python scripts. Helped maintain and improve the Zabbix based monitoring system, along with data pre-processing. Provided testing inputs for the newly implemented N-ticketing module.",
      technologies: [
        'ISP Network Monitoring',
        'Zabbix',
        'Python Automation',
        'Data Pre-Processing',
        'System Administration',
        'N-Ticketing Module',
        'Network Operations',
      ],
    },
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title" style={{ minHeight: '1.2em' }}>
            {typedTitle}
            {!isTypingDone && <span className="typing-cursor">|</span>}
          </h2>
          <p className="section-subtitle">
            Hands-on work in industrial automation, SCADA networks, ISP operations, Zabbix system monitoring, and Linux administration.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="card-hardware"
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem',
                borderLeft: '3px solid var(--accent-cyan)',
              }}
            >
              <div>
                {/* Header Tag Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.725rem',
                      color: 'var(--accent-cyan)',
                      background: 'var(--accent-cyan-dim)',
                      border: '1px solid var(--border-cyan)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    {exp.role.toUpperCase()}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.725rem',
                      color: 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    {exp.id === 'ongc' ? <Building2 size={13} /> : <Server size={13} />}
                    {exp.domain}
                  </span>
                </div>

                {/* Internship Banner Image / Certificate */}
                {exp.imageUrl && (
                  <div
                    style={{
                      width: '100%',
                      height: '185px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '0.85rem',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      background: exp.id === 'ishan-tech' ? 'var(--bg-code)' : 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: exp.id === 'ishan-tech' ? '6px' : '0',
                    }}
                  >
                    <img
                      src={exp.imageUrl}
                      alt={`${exp.company} Internship`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: exp.id === 'ishan-tech' ? 'contain' : 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        borderRadius: exp.id === 'ishan-tech' ? '4px' : '0',
                      }}
                    />
                  </div>
                )}

                {/* Company Name */}
                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-main)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.25,
                  }}
                >
                  {exp.company}
                </h3>

                {/* Dates & Location Metadata */}
                <div
                  className="mono"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                    marginBottom: '0.65rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  {exp.period && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-cyan)' }}>
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                  )}
                  {exp.location && <span>• Location: {exp.location}</span>}
                </div>

                {/* Experience Detail */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                  }}
                >
                  {exp.description}
                </p>
              </div>

              {/* Technologies Badges */}
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.35rem',
                  }}
                >
                  Tools & Protocols Used
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
