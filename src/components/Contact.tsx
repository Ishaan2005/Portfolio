import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const MascotCharacter: React.FC<{ activeField: 'none' | 'email' | 'message' }> = ({ activeField }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
        userSelect: 'none',
      }}
    >
      {/* Dynamic Speech Bubble */}
      <div
        className="mono"
        style={{
          background: '#6e3f1f',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '0.35rem 0.85rem',
          borderRadius: '12px',
          marginBottom: '0.5rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          textAlign: 'center',
        }}
      >
        {activeField === 'email' && '🙈 Privacy mode: Eyes closed while entering email!'}
        {activeField === 'message' && '👀 Eyes open! Listening intently to your message...'}
        {activeField === 'none' && '☕ Ready to transmit your message to Ishaan!'}
      </div>

      {/* Mascot Graphic */}
      <div style={{ transition: 'transform 0.3s ease' }}>
        <svg viewBox="0 0 80 80" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coffee Mug Body */}
          <rect x="15" y="25" width="50" height="48" rx="14" fill="#8c522b" stroke="#522d14" strokeWidth="2.5" />
          <path d="M65 38 C76 38, 76 52, 65 52" stroke="#8c522b" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Steam Rise */}
          <path d="M30 18 C32 10, 34 18, 36 10" stroke="#d4955c" strokeWidth="2" strokeLinecap="round" className="mascot-steam" />
          <path d="M42 16 C44 8, 46 16, 48 8" stroke="#d4955c" strokeWidth="2" strokeLinecap="round" className="mascot-steam" />
          <path d="M54 18 C56 10, 58 18, 60 10" stroke="#d4955c" strokeWidth="2" strokeLinecap="round" className="mascot-steam" />

          {/* Blush Cheeks */}
          <circle cx="25" cy="53" r="4" fill="#e27e4e" opacity="0.65" />
          <circle cx="55" cy="53" r="4" fill="#e27e4e" opacity="0.65" />

          {/* EYES ANIMATION LOGIC */}
          {activeField === 'email' ? (
            /* EYES CLOSED (Shy / Cover eyes for email privacy) */
            <g>
              <path d="M26 44 Q31 50 36 44" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M44 44 Q49 50 54 44" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Paws covering eyes */}
              <circle cx="25" cy="45" r="5" fill="#d4955c" stroke="#522d14" strokeWidth="1.5" />
              <circle cx="55" cy="45" r="5" fill="#d4955c" stroke="#522d14" strokeWidth="1.5" />
            </g>
          ) : activeField === 'message' ? (
            /* EYES WIDE OPEN & EAGER (Typing transmitting message) */
            <g>
              <circle cx="31" cy="43" r="7.5" fill="#ffffff" />
              <circle cx="32" cy="43" r="4" fill="#1b0e07" />
              <circle cx="33.5" cy="41" r="1.5" fill="#ffffff" />

              <circle cx="49" cy="43" r="7.5" fill="#ffffff" />
              <circle cx="48" cy="43" r="4" fill="#1b0e07" />
              <circle cx="49.5" cy="41" r="1.5" fill="#ffffff" />

              {/* Wide Happy Mouth */}
              <path d="M35 56 Q40 62 45 56" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="#522d14" />
            </g>
          ) : (
            /* IDLE EYES (Regular happy eyes) */
            <g>
              <circle cx="31" cy="44" r="5" fill="#ffffff" />
              <circle cx="31" cy="44" r="2.5" fill="#1b0e07" />

              <circle cx="49" cy="44" r="5" fill="#ffffff" />
              <circle cx="49" cy="44" r="2.5" fill="#1b0e07" />

              <path d="M36 55 Q40 58 44 55" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}
        </svg>
      </div>

      <style>{`
        @keyframes mascotSteam {
          0% { transform: translateY(0); opacity: 0.2; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-6px); opacity: 0; }
        }
        .mascot-steam { animation: mascotSteam 1.6s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<'none' | 'email' | 'message'>('none');
  const [formData, setFormData] = useState({ email: '', message: '' });

  const emailAddress = 'ishaanbhimaji@gmail.com';
  const githubUrl = 'https://github.com/Ishaan2005';
  const linkedinUrl = 'https://www.linkedin.com/in/ishaan-bhimajiyani/';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    // Trigger direct email dispatch via mailto link
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      `Portfolio Message from ${formData.email}`
    )}&body=${encodeURIComponent(
      `Sender Email: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} /> GET IN TOUCH
          </div>
          <h2 className="section-title">
            Engineering Inquiries & Contact
          </h2>
          <p className="section-subtitle">
            Open for discussions regarding VLSI design roles, RTL engineering, data science, or technical collaborations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.75rem' }} className="contact-grid">
          
          {/* Left Column: Direct Contact Info & Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            
            {/* Email Card */}
            <div className="card-hardware" style={{ padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#6e3f1f' }}>
                  <Mail size={20} />
                  <span className="mono" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>DIRECT EMAIL</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="btn btn-outline btn-sm mono"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.725rem' }}
                >
                  {copiedEmail ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="mono"
                style={{ fontSize: '1rem', color: '#2b1f17', wordBreak: 'break-all', textDecoration: 'none', fontWeight: 600 }}
              >
                {emailAddress}
              </a>
              <div className="mono" style={{ fontSize: '0.725rem', color: '#6e5a4c', marginTop: '0.35rem' }}>
                [Click to send email directly to Ishaan]
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hardware"
              style={{ padding: '1.5rem', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#6e3f1f', marginBottom: '0.5rem' }}>
                <GithubIcon size={20} />
                <span className="mono" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>GITHUB PROFILE</span>
              </div>
              <div className="mono" style={{ fontSize: '0.9375rem', color: '#2b1f17', fontWeight: 600 }}>
                github.com/Ishaan2005
              </div>
              <div className="mono" style={{ fontSize: '0.725rem', color: '#6e5a4c', marginTop: '0.35rem' }}>
                [Verilog & Digital Logic Repositories]
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hardware"
              style={{ padding: '1.5rem', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#6e3f1f', marginBottom: '0.5rem' }}>
                <LinkedinIcon size={20} />
                <span className="mono" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>LINKEDIN PROFILE</span>
              </div>
              <div className="mono" style={{ fontSize: '0.9375rem', color: '#2b1f17', fontWeight: 600 }}>
                linkedin.com/in/ishaan-bhimajiyani
              </div>
              <div className="mono" style={{ fontSize: '0.725rem', color: '#6e5a4c', marginTop: '0.35rem' }}>
                [Connect on LinkedIn]
              </div>
            </a>

          </div>

          {/* Right Column: Simplified Transmit Message Form + Mascot Character */}
          <div className="card-hardware" style={{ padding: '2rem' }}>
            {/* Animated Character reacting to focus */}
            <MascotCharacter activeField={activeField} />

            <h3 style={{ fontSize: '1.25rem', color: '#2b1f17', marginBottom: '0.35rem', textAlign: 'center' }}>
              Transmit Message
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6e5a4c', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your email and message below — Ishaan will receive your email directly.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  background: '#ede5d8',
                  border: '1px solid #8c522b',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <CheckCircle2 size={42} style={{ color: '#8c522b' }} />
                <h4 style={{ fontSize: '1.15rem', color: '#2b1f17', fontWeight: 600 }}>
                  Message Transmitted!
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#4a3b32', lineHeight: 1.5 }}>
                  Your email client has opened with your message pre-loaded to be sent directly to <strong>{emailAddress}</strong>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ email: '', message: '' });
                    setActiveField('none');
                  }}
                  className="btn btn-primary btn-sm mono"
                  style={{ marginTop: '0.5rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Field 1: Recruiter Email */}
                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: '#6e3f1f', marginBottom: '0.35rem', fontWeight: 600 }}>
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={formData.email}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField('none')}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setActiveField('email');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: '#ffffff',
                      border: '1.5px solid #c8b59e',
                      borderRadius: '6px',
                      color: '#2b1f17',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>

                {/* Field 2: Transmitting Message */}
                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: '#6e3f1f', marginBottom: '0.35rem', fontWeight: 600 }}>
                    TRANSMITTING MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message, project opportunities, or inquiry for Ishaan..."
                    value={formData.message}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField('none')}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      setActiveField('message');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: '#ffffff',
                      border: '1.5px solid #c8b59e',
                      borderRadius: '6px',
                      color: '#2b1f17',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    marginTop: '0.5rem',
                    background: '#6e3f1f',
                    borderColor: '#522d14',
                    color: '#ffffff',
                    fontWeight: 600,
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 12px rgba(110, 63, 31, 0.35)',
                  }}
                >
                  Transmit Email to Ishaan
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
};
