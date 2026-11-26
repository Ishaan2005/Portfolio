import { ABOUT_EDITORIAL, PROFILE } from '../data/portfolioData';
import { LogicStarDoodle } from './bunkum/StudioIllustrations';

export function About() {
  return (
    <section
      id="about"
      className="bkm-section bkm-paper-tex"
      aria-labelledby="bkm-about-heading"
    >
      <LogicStarDoodle className="bkm-star" />

      <div className="bkm-inner">
        <div className="bkm-about-grid">
          {/* Editorial prose + heading aligned closely with bio */}
          <div>
            <h2
              id="bkm-about-heading"
              className="bkm-h2"
              style={{ marginBottom: 'clamp(18px, 2.6vh, 28px)' }}
            >
              About Me
            </h2>
            <div className="bkm-editorial-copy">
              {ABOUT_EDITORIAL.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* Scrapbook Portrait */}
          <div className="bkm-studio-card">
            <span className="bkm-tape" aria-hidden="true" />
            <img
              src={PROFILE.portraitAbout}
              alt="Ishaan Bhimajiyani"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
