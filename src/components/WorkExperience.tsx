import React from 'react';
import { Briefcase, Building2, Server } from 'lucide-react';
import type { WorkExperienceItem } from '../types';

export const WorkExperience: React.FC = () => {
  const experiences: WorkExperienceItem[] = [
    {
      id: 'ongc',
      role: 'Summer Intern',
      company: 'ONGC (Oil and Natural Gas Corporation)',
      location: 'Ahmedabad',
      domain: 'Industrial Automation & Networking',
      imageUrl: `${import.meta.env.BASE_URL}ongc.jpg`,
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
      domain: 'ISP Network Infrastructure & Monitoring',
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
          <div className="section-tag">
            <Briefcase size={14} /> INDUSTRIAL & WORK EXPERIENCE
          </div>
          <h2 className="section-title">
            Internships & Professional Experience
          </h2>
          <p className="section-subtitle">
            Hands-on work in industrial automation, SCADA networks, ISP operations, Zabbix system monitoring, and Linux administration.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.15rem',
          }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="card-hardware"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                borderLeft: '4px solid var(--accent-cyan)',
              }}
            >
              <div>
                {/* Header Tag Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-cyan)',
                      background: 'var(--accent-cyan-dim)',
                      border: '1px solid var(--border-cyan)',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    {exp.role.toUpperCase()}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    {exp.id === 'ongc' ? <Building2 size={14} /> : <Server size={14} />}
                    {exp.domain}
                  </span>
                </div>

                {/* Optional ONGC Internship Banner Image */}
                {exp.imageUrl && (
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '1.25rem',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <img
                      src={exp.imageUrl}
                      alt={`${exp.company} Internship`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                )}

                {/* Company Name */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--text-main)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.25,
                  }}
                >
                  {exp.company}
                </h3>

                {exp.location && (
                  <div
                    className="mono"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-dim)',
                      marginBottom: '1rem',
                    }}
                  >
                    Location: {exp.location}
                  </div>
                )}

                {/* Experience Detail */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
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
                    fontSize: '0.725rem',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Tools & Protocols Used
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
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
