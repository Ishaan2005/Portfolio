import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--accent-cyan)' }}>
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
                style={{ fontSize: '1rem', color: 'var(--text-main)', wordBreak: 'break-all', textDecoration: 'none', fontWeight: 600 }}
              >
                {emailAddress}
              </a>
              <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                <GithubIcon size={20} />
                <span className="mono" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>GITHUB PROFILE</span>
              </div>
              <div className="mono" style={{ fontSize: '0.9375rem', color: 'var(--text-main)', fontWeight: 600 }}>
                github.com/Ishaan2005
              </div>
              <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                <LinkedinIcon size={20} />
                <span className="mono" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>LINKEDIN PROFILE</span>
              </div>
              <div className="mono" style={{ fontSize: '0.9375rem', color: 'var(--text-main)', fontWeight: 600 }}>
                linkedin.com/in/ishaan-bhimajiyani
              </div>
              <div className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                [Connect on LinkedIn]
              </div>
            </a>

          </div>

          {/* Right Column: Transmit Message Form */}
          <div className="card-hardware" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.35rem', textAlign: 'center' }}>
              Transmit Message
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your email and message below — Ishaan will receive your email directly.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-cyan)',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <CheckCircle2 size={42} style={{ color: 'var(--accent-cyan)' }} />
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  Message Transmitted!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  Your email client has opened with your message pre-loaded to be sent directly to <strong>{emailAddress}</strong>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ email: '', message: '' });
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
                  <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'var(--bg-surface)',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: '6px',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>

                {/* Field 2: Transmitting Message */}
                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    TRANSMITTING MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message, project opportunities, or inquiry for Ishaan..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'var(--bg-surface)',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: '6px',
                      color: 'var(--text-main)',
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
                    padding: '0.85rem',
                    fontSize: '0.95rem',
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
