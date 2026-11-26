import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { WorkExperience } from './components/WorkExperience';
import { THEMES, nextTheme } from './components/bunkum/bunkumEngine';
import { FONTS } from './components/bunkum/bunkumFonts';

export function App() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [toast, setToast] = useState({ text: '', on: false });

  const themeIdxRef = useRef(0);
  const toastTimer = useRef(0);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const ptr = useRef({
    fine: false,
    still: false,
    magnet: null as HTMLElement | null,
    magnetBox: null as DOMRect | null,
    label: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fp = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      ptr.current.still = rm.matches;
      ptr.current.fine = fp.matches;
    };
    sync();
    rm.addEventListener('change', sync);
    fp.addEventListener('change', sync);
    return () => {
      rm.removeEventListener('change', sync);
      fp.removeEventListener('change', sync);
    };
  }, []);

  const say = useCallback((text: string) => {
    setToast({ text, on: true });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(
      () => setToast((t) => ({ ...t, on: false })),
      2600
    );
  }, []);

  const releaseMagnet = () => {
    const st = ptr.current;
    const m = st.magnet;
    if (m) {
      m.style.transform = '';
      m.removeAttribute('data-near');
      const inner = m.firstElementChild as HTMLElement | null;
      if (inner && m.classList.contains('bkm-cta')) inner.style.transform = '';
    }
    st.magnet = null;
    st.magnetBox = null;
  };

  const onPointerMove = (ev: ReactPointerEvent<HTMLDivElement>) => {
    const st = ptr.current;
    if (ev.pointerType !== 'mouse' || !st.fine) return;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${ev.clientX.toFixed(
        1
      )}px,${ev.clientY.toFixed(1)}px,0)`;
    }

    const t = ev.target as Element;
    const hit = t.closest ? (t.closest('[data-cursor]') as HTMLElement | null) : null;
    const label = hit ? hit.getAttribute('data-cursor') || '' : '';
    if (label !== st.label) {
      st.label = label;
      if (labelRef.current) labelRef.current.textContent = label;
      if (cursorRef.current) {
        if (label) cursorRef.current.setAttribute('data-label', '');
        else cursorRef.current.removeAttribute('data-label');
      }
    }

    const mag =
      !st.still && t.closest
        ? (t.closest('[data-magnet]') as HTMLElement | null)
        : null;
    if (mag !== st.magnet) {
      releaseMagnet();
      if (mag) {
        st.magnet = mag;
        st.magnetBox = mag.getBoundingClientRect();
        mag.setAttribute('data-near', '');
      }
    }

    if (st.magnet && st.magnetBox) {
      const bx = st.magnetBox;
      const dx = ev.clientX - (bx.left + bx.width / 2);
      const dy = ev.clientY - (bx.top + bx.height / 2);
      st.magnet.style.transform = `translate(${(dx * 0.2).toFixed(1)}px,${(
        dy * 0.28
      ).toFixed(1)}px)`;
      const inner = st.magnet.firstElementChild as HTMLElement | null;
      if (inner && st.magnet.classList.contains('bkm-cta')) {
        inner.style.transform = `translate(${(dx * 0.1).toFixed(1)}px,${(
          dy * 0.14
        ).toFixed(1)}px)`;
      }
    }
  };

  const onPointerLeave = () => {
    ptr.current.label = '';
    cursorRef.current?.removeAttribute('data-label');
    releaseMagnet();
  };

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: ptr.current.still ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const rotateTheme = () => {
    const next = nextTheme(themeIdxRef.current);
    themeIdxRef.current = next;
    setThemeIdx(next);
    say(`Palette: ${THEMES[next].name}`);
  };

  const theme = THEMES[themeIdx];
  const themeVars = {
    '--hero-bg': theme.heroBg,
    '--hero-fg': theme.heroFg,
    '--hero-ink': theme.heroInk,
    '--accent': theme.accent,
    '--accent-fg': theme.accentFg,
    '--deep': theme.deep,
  } as CSSProperties;

  return (
    <div
      className="bkm-root"
      style={themeVars}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <style>{FONTS}</style>

      <Navbar
        theme={theme}
        onRotateTheme={rotateTheme}
        onNavigate={scrollToSection}
      />

      <main>
        <Hero
          onExploreProjects={() => scrollToSection('archive')}
          onSay={say}
        />

        <About />

        <FeaturedProjects />

        <WorkExperience />

        <Contact onSay={say} onViewArchive={() => scrollToSection('archive')} />
      </main>

      <Footer onBackToTop={() => scrollToSection('hero')} />

      <div
        className="bkm-toast"
        data-on={toast.on ? '' : undefined}
        role="status"
        aria-live="polite"
      >
        {toast.text}
      </div>

      <div ref={cursorRef} className="bkm-cursor" aria-hidden="true">
        <span ref={labelRef} className="bkm-clab bkm-mono" />
      </div>
    </div>
  );
}

export default App;
