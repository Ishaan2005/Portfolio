import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROFILE } from '../data/portfolioData';
import {
  CELLS,
  FIRST_T,
  LAST_CELLS,
  LAST_GAP,
  LAST_STRETCH,
  LAST_VB_W,
  LAST_WORD,
  TAU_LETTER,
  T,
  VB_W,
  WORD,
  approach,
  baseFor,
  cellMid,
  cellX,
  f,
  glyph,
  lastBaseFor,
  letterMid,
  letterX,
  letsGo,
  pendulum,
  stretchTargets,
  vbH,
} from './bunkum/bunkumEngine';
import { StudioAnimal3D } from './bunkum/StudioAnimal3D';
import {
  ChipMascot,
  HandSignature,
  PinOneCritter,
} from './bunkum/StudioIllustrations';

interface HeroProps {
  onExploreProjects: () => void;
  onSay: (text: string) => void;
}

type El = HTMLElement | SVGElement;

export function Hero({ onExploreProjects, onSay }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const lastWordRef = useRef<HTMLDivElement | null>(null);
  const critterRef = useRef<SVGGElement | null>(null);
  const letterNodesRef = useRef<SVGPathElement[]>([]);
  const lastLetterNodesRef = useRef<SVGPathElement[]>([]);

  const clipId = 'bkm-word-clip-' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const lastClipId = 'bkm-last-clip-' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const [base, setBase] = useState(210);
  const [lastBase, setLastBase] = useState(108);

  const state = useRef({
    W: 0,
    H: 0,
    base: 210,
    wordX: 0,
    wordW: 1,
    centres: WORD.map(() => 0),
    hs: WORD.map(() => 210),
    tg: WORD.map(() => 210),
    lastBase: 108,
    lastWordX: 0,
    lastWordW: 1,
    lastCentres: LAST_WORD.map(() => 0),
    lastHs: LAST_WORD.map(() => 108),
    lastTg: LAST_WORD.map(() => 108),
    left: 0,
    last: 0,
    px: -1,
    py: -1,
    over: false,
    touching: false,
    fine: false,
    still: false,
    visible: true,
    ga: 0.12,
    gw: 0,
    pokes: 0,
    fall: 0,
    fy: 0,
    fvy: 0,
    fr: 0,
    hy: 0,
    raf: 0,
    cache: new WeakMap<object, Record<string, string>>(),
  });

  const put = useCallback((el: El | null | undefined, prop: string, val: string) => {
    if (!el) return;
    const c = state.current.cache;
    let m = c.get(el);
    if (!m) c.set(el, (m = {}));
    if (m[prop] === val) return;
    m[prop] = val;
    if (prop === 'd' || prop === 'transform@') {
      el.setAttribute(prop === 'transform@' ? 'transform' : prop, val);
    } else {
      (el.style as unknown as Record<string, string>)[prop] = val;
    }
  }, []);

  const scheduleRef = useRef<() => void>(() => {});

  const frame = useCallback(
    (now: number) => {
      const st = state.current;
      st.raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;

      const dt = st.last ? Math.min(64, now - st.last) : 16;
      st.last = now;
      const rect = sec.getBoundingClientRect();
      st.left = rect.left;

      const pointing = (st.over && st.fine) || st.touching;
      const px = !st.still && pointing ? st.px - st.left : null;
      stretchTargets(px, st.centres, st.W, st.base, st.tg);
      stretchTargets(
        px,
        st.lastCentres,
        Math.max(st.lastWordW * 1.15, 280),
        st.lastBase,
        st.lastTg,
        LAST_STRETCH
      );

      let busy = false;
      for (let i = 0; i < WORD.length; i++) {
        st.hs[i] = st.still
          ? st.tg[i]
          : approach(st.hs[i], st.tg[i], dt, TAU_LETTER);
        if (Math.abs(st.hs[i] - st.tg[i]) > 0.3) busy = true;
        put(
          letterNodesRef.current[i],
          'd',
          glyph(WORD[i], cellX(i), CELLS[i], st.hs[i], st.base, FIRST_T)
        );
      }
      for (let i = 0; i < LAST_WORD.length; i++) {
        st.lastHs[i] = st.still
          ? st.lastTg[i]
          : approach(st.lastHs[i], st.lastTg[i], dt, TAU_LETTER);
        if (Math.abs(st.lastHs[i] - st.lastTg[i]) > 0.3) busy = true;
        put(
          lastLetterNodesRef.current[i],
          'd',
          glyph(
            LAST_WORD[i],
            letterX(i, LAST_CELLS, LAST_GAP),
            LAST_CELLS[i],
            st.lastHs[i],
            st.lastBase
          )
        );
      }

      // Pin-1 Critter rides the bottom right stem of N and swings with Bunkum pendulum physics
      const nb = st.hs[WORD.length - 1] - 4;
      if (st.fall > 0) {
        st.fall += dt;
        st.fvy += 0.0026 * dt;
        st.fy += st.fvy * dt;
        st.fr += dt * 0.35;
        if (st.fall > 2200) {
          st.fall = 0;
          st.fy = 0;
          st.fvy = 0;
          st.fr = 0;
          st.hy = -(st.base * 1.8);
          st.ga = 0.4;
          st.gw = 0;
        }
        busy = true;
      } else if (!st.still) {
        st.hy = approach(st.hy, 0, dt, 140);
        const [na, nw] = pendulum(st.ga, st.gw, dt);
        st.ga = na;
        st.gw = nw;
        if (Math.abs(st.gw) > 0.01 || Math.abs(st.hy) > 0.5) busy = true;
      }
      put(
        critterRef.current,
        'transform@',
        `translate(${f(cellMid(WORD.length - 1))} ${f(nb + st.hy + st.fy)}) rotate(${f((st.ga * 180) / Math.PI + st.fr)})`
      );

      if (busy && st.visible) scheduleRef.current();
    },
    [put]
  );

  const schedule = useCallback(() => {
    const st = state.current;
    if (!st.raf && typeof window !== 'undefined') {
      st.raf = window.requestAnimationFrame(frame);
    }
  }, [frame]);

  useEffect(() => {
    scheduleRef.current = schedule;
  }, [schedule]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fp = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      state.current.still = rm.matches;
      state.current.fine = fp.matches;
      schedule();
    };
    sync();
    rm.addEventListener('change', sync);
    fp.addEventListener('change', sync);
    return () => {
      rm.removeEventListener('change', sync);
      fp.removeEventListener('change', sync);
    };
  }, [schedule]);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const st = state.current;
    letterNodesRef.current = Array.from(
      sec.querySelectorAll('[data-bkm-letter]')
    ) as SVGPathElement[];
    lastLetterNodesRef.current = Array.from(
      sec.querySelectorAll('[data-bkm-last-letter]')
    ) as SVGPathElement[];

    const measure = () => {
      st.W = sec.offsetWidth;
      st.H = window.innerHeight;
      const secRect = sec.getBoundingClientRect();
      const w = wordRef.current;
      if (w) {
        st.wordX = w.getBoundingClientRect().left - secRect.left;
        st.wordW = w.offsetWidth;
      }
      const scale = st.wordW / VB_W;
      st.centres = WORD.map((_, i) => st.wordX + cellMid(i) * scale);
      const b = baseFor(st.H, scale);
      if (b !== st.base) {
        st.base = b;
        st.hs = WORD.map(() => b);
        st.tg = WORD.map(() => b);
        setBase(b);
      }

      const lw = lastWordRef.current;
      if (lw) {
        st.lastWordX = lw.getBoundingClientRect().left - secRect.left;
        st.lastWordW = lw.offsetWidth;
      }
      const lastScale = st.lastWordW / LAST_VB_W;
      st.lastCentres = LAST_WORD.map(
        (_, i) => st.lastWordX + letterMid(i, LAST_CELLS, LAST_GAP) * lastScale
      );
      const lb = lastBaseFor(st.H, lastScale);
      if (lb !== st.lastBase) {
        st.lastBase = lb;
        st.lastHs = LAST_WORD.map(() => lb);
        st.lastTg = LAST_WORD.map(() => lb);
        setLastBase(lb);
      }
      schedule();
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(sec);
    window.addEventListener('resize', measure, { passive: true });

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((list) => {
            st.visible = list.some((x) => x.isIntersecting);
            if (st.visible) schedule();
          })
        : null;
    io?.observe(sec);

    return () => {
      ro?.disconnect();
      io?.disconnect();
      window.removeEventListener('resize', measure);
      if (st.raf) window.cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
  }, [schedule]);

  const onPointerMove = (ev: ReactPointerEvent<HTMLElement>) => {
    const st = state.current;
    st.px = ev.clientX;
    st.py = ev.clientY;
    if (ev.pointerType === 'mouse') st.over = true;
    schedule();
  };

  const onPointerLeave = (ev: ReactPointerEvent<HTMLElement>) => {
    if (ev.pointerType === 'mouse') {
      state.current.over = false;
      schedule();
    }
  };

  const onPointerDown = (ev: ReactPointerEvent<HTMLElement>) => {
    if (ev.pointerType !== 'mouse') {
      state.current.touching = true;
      state.current.px = ev.clientX;
      state.current.py = ev.clientY;
      schedule();
    }
  };

  const onPointerUp = (ev: ReactPointerEvent<HTMLElement>) => {
    if (ev.pointerType !== 'mouse') {
      state.current.touching = false;
      schedule();
    }
  };

  const boing = (ev: { currentTarget: Element }) => {
    const el = ev.currentTarget;
    el.removeAttribute('data-boing');
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => el.setAttribute('data-boing', ''))
    );
    onSay('Beep! Silicon chip booped.');
  };

  const poke = () => {
    const st = state.current;
    if (st.fall > 0) return;
    st.pokes += 1;
    if (letsGo(st.pokes) && !st.still) {
      st.fall = 1;
      st.fvy = -0.55;
      onSay('CLK buddy dropped off the N! Climbing back up...');
    } else {
      st.gw += (st.pokes % 2 ? 1 : -1) * (2.2 + Math.random());
      if (st.pokes === 3) onSay('Easy on the clock pin — holding on tight.');
    }
    schedule();
  };

  const pokeKey = (ev: ReactKeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      poke();
    }
  };

  const vbh = vbH(base);
  const lastVbh = vbH(lastBase, LAST_STRETCH);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bkm-hero-section bkm-speck"
      aria-label="Ishaan Bhimajiyani — ECE and Computer Architecture Portfolio"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Bunkum Interactive Wordmark Hero */}
      <div className="bkm-word-wrap">
        <div ref={wordRef} className="bkm-word bkm-word-main">
          <h1 className="bkm-sr">Ishaan Bhimajiyani</h1>
          <svg viewBox={`0 0 ${VB_W} ${vbh}`} aria-hidden="true">
            <clipPath id={clipId}>
              <rect x={-20} y={0} width={VB_W + 40} height={vbh + 320} />
            </clipPath>
            <g clipPath={`url(#${clipId})`}>
              {WORD.map((ch, i) => (
                <path
                  key={i}
                  data-bkm-letter=""
                  d={glyph(ch, cellX(i), CELLS[i], base, base, FIRST_T)}
                  strokeWidth={FIRST_T}
                />
              ))}
            </g>

            {/* Perched DIP-8 chip mascot nestled in the upper cup of H */}
            <g transform={`translate(${cellMid(2) - 24} 6)`}>
              <g
                className="bkm-perch bkm-hit"
                role="button"
                tabIndex={0}
                aria-label="Boop DIP-8 chip mascot"
                data-cursor="Boop IC"
                onClick={boing}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    boing(e);
                  }
                }}
              >
                <ChipMascot size={48} />
              </g>
            </g>

            {/* Pendulum CLK critter riding the N */}
            <g
              ref={critterRef}
              transform={`translate(${cellMid(WORD.length - 1)} ${base - 4})`}
            >
              <g
                className="bkm-hit"
                role="button"
                tabIndex={0}
                aria-label="Poke clock buddy"
                data-cursor="Poke CLK"
                onClick={poke}
                onKeyDown={pokeKey}
              >
                <PinOneCritter />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Editorial Subrow: Stretchy Surname, Role Tagline, Actions, 3D Dog, Portrait */}
      <div className="bkm-hero-subrow">
        <div className="bkm-hero-left">
          <div ref={lastWordRef} className="bkm-word bkm-word-sub">
            <svg viewBox={`0 0 ${LAST_VB_W} ${lastVbh}`} aria-hidden="true">
              <clipPath id={lastClipId}>
                <rect x={-20} y={0} width={LAST_VB_W + 40} height={lastVbh + 200} />
              </clipPath>
              <g clipPath={`url(#${lastClipId})`}>
                {LAST_WORD.map((ch, i) => (
                  <path
                    key={i}
                    data-bkm-last-letter=""
                    d={glyph(
                      ch,
                      letterX(i, LAST_CELLS, LAST_GAP),
                      LAST_CELLS[i],
                      lastBase,
                      lastBase
                    )}
                    strokeWidth={T}
                  />
                ))}
              </g>
            </svg>
          </div>
          <div className="bkm-role-badge">{PROFILE.tagline}</div>
          <p className="bkm-hero-desc">{PROFILE.heroDescription}</p>
          <div className="bkm-hero-actions">
            <button
              type="button"
              className="bkm-btn"
              data-magnet=""
              data-cursor="Archive"
              onClick={onExploreProjects}
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bkm-btn bkm-btn-secondary"
              data-magnet=""
              data-cursor="GitHub"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Simple Interactive 3D Papercraft Dog */}
        <div className="bkm-box-slot">
          <StudioAnimal3D />
        </div>

        <div className="bkm-hero-right">
          <div className="bkm-portrait-polaroid">
            <span className="bkm-tape" aria-hidden="true" />
            <img src={PROFILE.portraitHero} alt="Ishaan Bhimajiyani" decoding="async" />
          </div>
          <HandSignature className="bkm-sigfix" label="Ishaan Bhimajiyani hand-drawn signature" />
        </div>
      </div>
    </section>
  );
}
