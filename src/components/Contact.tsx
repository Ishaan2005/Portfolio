import { useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PROFILE, SCRAP_WALL_ITEMS } from '../data/portfolioData';
import { WaveformDoodle } from './bunkum/StudioIllustrations';

interface ContactProps {
  onSay: (text: string) => void;
  onViewArchive: () => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgbrpkb';

interface FormspreeErrorItem {
  field?: string;
  message?: string;
}

interface FormspreeResponse {
  ok?: boolean;
  error?: string;
  errors?: FormspreeErrorItem[];
}

export function Contact({ onSay, onViewArchive }: ContactProps) {
  const [composerOpen, setComposerOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', message: '' });
  const submitLockRef = useRef(false);

  const copyEmail = () => {
    const done = () => onSay('Copied email: ' + PROFILE.email);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email).then(done, () => onSay(PROFILE.email));
    } else {
      onSay(PROFILE.email);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitLockRef.current || isSubmitting) return;

    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    if (!trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please enter both your email address and a message.');
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = new FormData(e.currentTarget);
      payload.set('email', trimmedEmail);
      payload.set('message', trimmedMessage);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = (await response.json().catch(() => ({}))) as FormspreeResponse;

      if (!response.ok || data.ok === false) {
        const detailedError =
          data.errors
            ?.map((item) => item.message)
            .filter(Boolean)
            .join(', ') ||
          data.error ||
          'Unable to send your message right now. Please try again.';
        throw new Error(detailedError);
      }

      setFormData({ email: '', message: '' });
      setFormSubmitted(true);
      onSay(`Message sent to ${PROFILE.email}`);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Network error while sending your message. Please try again.';
      setErrorMessage(message);
      onSay('Could not send message');
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
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

        {/* Optional expandable quick message form (Formspree integration) */}
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
                  Message Transmitted
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 14 }}>
                  Your message has been delivered to <strong>{PROFILE.email}</strong>.
                </p>
                <button
                  type="button"
                  className="bkm-btn"
                  onClick={() => {
                    setFormSubmitted(false);
                    setErrorMessage('');
                    setFormData({ email: '', message: '' });
                  }}
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form
                action={FORMSPREE_ENDPOINT}
                method="POST"
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
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    readOnly={isSubmitting}
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      if (errorMessage) setErrorMessage('');
                      setFormData({ ...formData, email: e.target.value });
                    }}
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
                    name="message"
                    required
                    readOnly={isSubmitting}
                    rows={3}
                    placeholder="Share a role, RTL/architecture problem, or collaboration note..."
                    value={formData.message}
                    onChange={(e) => {
                      if (errorMessage) setErrorMessage('');
                      setFormData({ ...formData, message: e.target.value });
                    }}
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

                {errorMessage && (
                  <div
                    role="alert"
                    aria-live="polite"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '2px solid var(--ink)',
                      background: 'var(--tomato)',
                      color: 'var(--cream)',
                      fontSize: 13.5,
                      fontWeight: 700,
                    }}
                  >
                    <AlertCircle size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="bkm-btn bkm-btn-cobalt"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.78 : 1,
                      cursor: isSubmitting ? 'wait' : undefined,
                    }}
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Transmit Email'}</span>
                    {isSubmitting ? (
                      <Loader2
                        size={14}
                        style={{ animation: 'bkm-turn 0.9s linear infinite' }}
                        aria-hidden="true"
                      />
                    ) : (
                      <Send size={14} aria-hidden="true" />
                    )}
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
