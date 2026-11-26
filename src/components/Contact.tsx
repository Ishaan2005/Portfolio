import { useState, type CSSProperties, type FormEvent } from 'react';
import { CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PROFILE, SCRAP_WALL_ITEMS } from '../data/portfolioData';
import { WaveformDoodle } from './bunkum/StudioIllustrations';

interface ContactProps {
  onSay: (text: string) => void;
  onViewArchive: () => void;
}

export function Contact({ onSay, onViewArchive }: ContactProps) {
  const [composerOpen, setComposerOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: '', message: '' });

  const copyEmail = () => {
    const done = () => onSay('Copied email: ' + PROFILE.email);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email).then(done, () => onSay(PROFILE.email));
    } else {
      onSay(PROFILE.email);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `Portfolio Message from ${formData.email}`
    )}&body=${encodeURIComponent(
      `Sender Email: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
    onSay('Opening your mail client...');
  };

  const fanItems = [SCRAP_WALL_ITEMS[0], SCRAP_WALL_ITEMS[1], SCRAP_WALL_ITEMS[3]];

  return (
    <section
      id="contact"
      className="bkm-foot bkm-cobalt-band"
      style={{ paddingBottom: 0 }}
      aria-labelledby="bkm-contact-heading"
    >
      <div className="bkm-foot-inner">
        <h2 id="bkm-contact-heading" className="bkm-big">
          Got an interesting
          <br />
          hardware problem?
        </h2>

        {/* Bunkum Fanned 3-card interactive deck */}
        <button
          type="button"
          className="bkm-fan"
          data-cursor="Projects"
          aria-label="Scroll to project archive"
          onClick={onViewArchive}
        >
          <i
            style={
              {
                backgroundImage: `url(${fanItems[0].image})`,
                '--r': '-7deg',
              } as CSSProperties
            }
          />
          <i
            style={
              {
                backgroundImage: `url(${fanItems[1].image})`,
                '--r': '6deg',
              } as CSSProperties
            }
          />
          <i
            style={
              {
                backgroundImage: `url(${fanItems[2].image})`,
                '--r': '-1deg',
              } as CSSProperties
            }
          />
          <WaveformDoodle className="bkm-fan-doodle" />
        </button>

        <p className="bkm-sub">
          Always up for conversations around RTL design, FPGA prototyping, ASIC flows, computer architecture, AI hardware, or engineering opportunities.
        </p>

        {/* Bunkum Magnetic Pill CTAs */}
        <div className="bkm-ctas">
          <button
            type="button"
            className="bkm-pill bkm-cta"
            data-magnet=""
            data-cursor="Write note"
            onClick={() => setComposerOpen((v) => !v)}
          >
            <span>
              <Mail size={16} aria-hidden="true" />
              {composerOpen ? 'Hide Message Form' : 'Send a Message'}
            </span>
          </button>

          <button
            type="button"
            className="bkm-pill bkm-cta bkm-ghost"
            data-magnet=""
            data-cursor="Copy email"
            onClick={copyEmail}
          >
            <span>
              <Copy size={15} aria-hidden="true" />
              {PROFILE.email}
            </span>
          </button>

          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bkm-pill bkm-cta bkm-ghost"
            data-magnet=""
            data-cursor="LinkedIn"
          >
            <span>
              <LinkedinIcon size={16} />
              LinkedIn
            </span>
          </a>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bkm-pill bkm-cta bkm-ghost"
            data-magnet=""
            data-cursor="GitHub"
          >
            <span>
              <GithubIcon size={16} />
              GitHub
            </span>
          </a>
        </div>

        {/* Optional expandable quick message form (preserves existing portfolio mailto form) */}
        {composerOpen && (
          <div className="bkm-note-drawer">
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <CheckCircle2
                  size={34}
                  style={{ color: 'var(--blue)', margin: '0 auto 8px' }}
                  aria-hidden="true"
                />
                <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 6 }}>
                  Message Ready in Mail Client
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 14 }}>
                  Your message has been prepared for <strong>{PROFILE.email}</strong>.
                </p>
                <button
                  type="button"
                  className="bkm-btn"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ email: '', message: '' });
                  }}
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div className="bkm-mono" style={{ color: 'var(--blue)', fontWeight: 700 }}>
                  Direct Note → {PROFILE.email}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="bkm-mono"
                    style={{ display: 'block', marginBottom: 4 }}
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: 10,
                      border: '2px solid var(--ink)',
                      background: 'var(--cream)',
                      color: 'var(--ink)',
                      font: 'inherit',
                      fontSize: '16px',
                      lineHeight: 1.4,
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="bkm-mono"
                    style={{ display: 'block', marginBottom: 4 }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    placeholder="Share a role, RTL/architecture problem, or collaboration note..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      borderRadius: 10,
                      border: '2px solid var(--ink)',
                      background: 'var(--cream)',
                      color: 'var(--ink)',
                      font: 'inherit',
                      fontSize: '16px',
                      lineHeight: 1.4,
                      resize: 'vertical',
                    }}
                  />
                </div>
                <div>
                  <button type="submit" className="bkm-btn bkm-btn-cobalt">
                    <span>Transmit Email</span>
                    <Send size={14} aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
