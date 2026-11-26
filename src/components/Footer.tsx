import type { CSSProperties } from 'react';
import { FOOTER_BADGES, PROFILE } from '../data/portfolioData';
import { HandSignature } from './bunkum/StudioIllustrations';

interface FooterProps {
  onBackToTop: () => void;
}

export function Footer({ onBackToTop }: FooterProps) {
  return (
    <footer
      className="bkm-foot bkm-cobalt-band"
      style={{ paddingTop: 12, borderTop: 0 }}
      aria-label="Footer"
    >
      <div className="bkm-foot-inner">
        {/* Bunkum Badge Strip Marquee */}
        <div className="bkm-strip" aria-label="Core engineering topics">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1}>
              {FOOTER_BADGES.map((badge, idx) => (
                <span
                  key={`${dup}-${badge.label}`}
                  className="bkm-badge-token"
                  style={
                    {
                      '--t': `${((idx % 5) - 2) * 3}deg`,
                    } as CSSProperties
                  }
                >
                  <span style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.1 }}>
                    {badge.label}
                  </span>
                  <span className="bkm-mono" style={{ fontSize: 9, opacity: 0.78, marginTop: 3 }}>
                    {badge.sub}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Legal & Signature Row */}
        <div className="bkm-legal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <HandSignature
              className="bkm-sig"
              label="Ishaan Bhimajiyani signature"
            />
          </div>

          <div
            className="bkm-mono bkm-foot-links"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 10,
              color: 'var(--butter)',
            }}
          >
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bkm-foot-link"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bkm-foot-link"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="bkm-foot-link"
            >
              Email
            </a>
            <button
              type="button"
              className="bkm-top bkm-mono bkm-foot-link"
              data-cursor="To top"
              onClick={onBackToTop}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
