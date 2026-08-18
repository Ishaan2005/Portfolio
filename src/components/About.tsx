import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            About Me
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '1.75rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left Column: Bio Paragraph */}
          <div>
            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--text-body)',
              }}
            >
              I’m a final-year Electronics and Communication student, passionate about data science and the intersection of hardware and software. I enjoy exploring how these areas come together to solve real-world problems and build practical solutions. I’m focused on continuous learning and always eager to explore new technologies. Outside academics, my hobbies include cubing, reading, and tinkering with old computers and systems to understand how they work and bring them back to life.
            </p>
          </div>

          {/* Right Column: Photo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '300px',
                height: '350px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                border: '1.5px solid var(--border-subtle)',
                position: 'relative',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Ishaan.jpeg`}
                alt="Ishaan Bhimajiyani"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
};
