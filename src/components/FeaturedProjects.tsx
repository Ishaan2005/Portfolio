import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { ArrowUpRight, ExternalLink, Grid2x2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS, SCRAP_WALL_ITEMS } from '../data/portfolioData';
import type { Project } from '../types';
import {
  ROW,
  SHAPES,
  approach,
  cellKind,
  f,
  pitchFor,
  wrap,
} from './bunkum/bunkumEngine';
import { WaveformDoodle } from './bunkum/StudioIllustrations';

const POOL_C = 10;
const POOL_R = 6;

const ACCENT_BG: Record<NonNullable<Project['accent']>, string> = {
  cobalt: '#2731e8',
  tomato: '#ff4a2e',
  butter: '#ffe98a',
  pistachio: '#b9e27c',
};

const ACCENT_TEXT: Record<NonNullable<Project['accent']>, string> = {
  cobalt: '#ffe98a',
  tomato: '#fff8dc',
  butter: '#0c0c10',
  pistachio: '#0c0c10',
};

export function FeaturedProjects() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<'preview' | 'grid'>('grid');
  const [focus, setFocus] = useState(0);

  const st = useRef({
    W: 900,
    gx: 0,
    gy: 0,
    dragX: 0,
    dragY: 0,
    scrollDrift: 0,
    dragging: false,
    still: false,
    visible: true,
    last: 0,
    raf: 0,
    focus: 0,
    cells: [] as HTMLElement[],
    imgs: [] as HTMLElement[],
    caps: [] as HTMLElement[],
    kinds: [] as number[],
    mode: 'grid' as 'preview' | 'grid',
    cache: new WeakMap<object, Record<string, string>>(),
  });

  const put = useCallback(
    (el: HTMLElement | undefined, prop: string, val: string) => {
      if (!el) return;
      const c = st.current.cache;
      let m = c.get(el);
      if (!m) c.set(el, (m = {}));
      if (m[prop] === val) return;
      m[prop] = val;
      el.style[prop as 'transform'] = val;
    },
    []
  );

  const scheduleRef = useRef<() => void>(() => {});

  const frame = useCallback(
    (now: number) => {
      const cur = st.current;
      cur.raf = 0;
      if (!cur.visible) return;

      const dt = cur.last ? Math.min(64, now - cur.last) : 16;
      cur.last = now;

      if (cur.mode === 'grid' && !cur.still && !cur.dragging) {
        cur.scrollDrift += dt * 0.014;
      }

      const pitch = pitchFor(cur.W);
      const ph = pitch * ROW;
      const targetY = cur.dragY - cur.scrollDrift;

      cur.gx = cur.still ? cur.dragX : approach(cur.gx, cur.dragX, dt, 90);
      cur.gy = cur.still ? targetY : approach(cur.gy, targetY, dt, 90);

      const ox = wrap(cur.gx, pitch);
      const oy = wrap(cur.gy, ph);
      const c0 = Math.floor(-cur.gx / pitch);
      const r0 = Math.floor(-cur.gy / ph);

      for (let r = 0; r < POOL_R; r++) {
        for (let c = 0; c < POOL_C; c++) {
          const k = r * POOL_C + c;
          const cell = cur.cells[k];
          if (!cell) continue;
          const lr = r0 + r - 1;
          const shift = lr & 1 ? pitch * 0.5 : 0;
          put(
            cell,
            'transform',
            `translate3d(${f(ox + (c - 1) * pitch + shift - pitch * 0.5)}px,${f(
              oy + (r - 1) * ph
            )}px,0)`
          );
          const kind = cellKind(c0 + c - 1, lr, SCRAP_WALL_ITEMS.length);
          if (cur.kinds[k] !== kind) {
            cur.kinds[k] = kind;
            const item = SCRAP_WALL_ITEMS[kind];
            put(cur.imgs[k], 'backgroundImage', `url(${item.image})`);
            put(
              cur.imgs[k],
              'aspectRatio',
              SHAPES[(kind + Math.abs(lr) + 6) % SHAPES.length]
            );
            if (cur.caps[k]) cur.caps[k].textContent = item.tag;
            cell.setAttribute('data-k', String(kind));
          }
        }
      }

      if (
        cur.mode === 'grid' &&
        (!cur.still ||
          Math.abs(cur.gx - cur.dragX) > 0.3 ||
          Math.abs(cur.gy - targetY) > 0.3)
      ) {
        scheduleRef.current();
      }
    },
    [put]
  );

  const schedule = useCallback(() => {
    if (!st.current.raf && typeof window !== 'undefined') {
      st.current.raf = window.requestAnimationFrame(frame);
    }
  }, [frame]);

  useEffect(() => {
    scheduleRef.current = schedule;
  }, [schedule]);

  useEffect(() => {
    st.current.mode = mode;
    st.current.focus = focus;
    schedule();
  }, [mode, focus, schedule]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cur = st.current;

    const rm = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (rm) cur.still = rm.matches;

    const measure = () => {
      cur.W = stage.offsetWidth || 900;
      cur.cells = Array.from(
        stage.querySelectorAll('[data-cell]')
      ) as HTMLElement[];
      cur.imgs = cur.cells.map(
        (c) => c.querySelector('.bkm-cell-img') as HTMLElement
      );
      cur.caps = cur.cells.map(
        (c) => c.querySelector('.bkm-cell-cap') as HTMLElement
      );
      cur.kinds = [];
      const pitch = pitchFor(cur.W);
      for (const c of cur.cells) {
        put(c, 'width', `${f(pitch)}px`);
        put(c, 'height', `${f(pitch * ROW)}px`);
      }
      schedule();
    };

    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(stage);
    window.addEventListener('resize', measure, { passive: true });

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((list) => {
            cur.visible = list.some((x) => x.isIntersecting);
            if (cur.visible) schedule();
          })
        : null;
    io?.observe(stage);

    return () => {
      ro?.disconnect();
      io?.disconnect();
      window.removeEventListener('resize', measure);
      if (cur.raf) window.cancelAnimationFrame(cur.raf);
      cur.raf = 0;
    };
  }, [put, schedule]);

  const onWallPointerDown = (ev: ReactPointerEvent<HTMLDivElement>) => {
    if (
      st.current.mode !== 'grid' ||
      (ev.pointerType === 'mouse' && ev.button !== 0)
    ) {
      return;
    }
    const cur = st.current;
    cur.dragging = false;
    const sx = ev.clientX;
    const sy = ev.clientY;
    const bx = cur.dragX;
    const by = cur.dragY;

    const move = (e: PointerEvent) => {
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (!cur.dragging && Math.abs(dx) + Math.abs(dy) > 5) cur.dragging = true;
      cur.dragX = bx + dx;
      cur.dragY = by + dy;
      schedule();
    };

    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.setTimeout(() => {
        cur.dragging = false;
        schedule();
      }, 0);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  const openScrapByIndex = (idx: number) => {
    const item = SCRAP_WALL_ITEMS[idx];
    const proj = PROJECTS.find((p) => p.id === item?.projectId);
    const href = proj?.demoUrl || proj?.githubUrl;
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
  };

  const activeScrap = SCRAP_WALL_ITEMS[focus] ?? SCRAP_WALL_ITEMS[0];
  const activeProject =
    PROJECTS.find((p) => p.id === activeScrap.projectId) ?? PROJECTS[0];

  return (
    <section
      id="archive"
      className="bkm-section bkm-speck-light"
      aria-labelledby="bkm-archive-heading"
    >
      <div className="bkm-inner">
        <div className="bkm-sec-head">
          <div>
            <div className="bkm-sticker-tag" style={{ marginBottom: 12 }}>
              02 · HARDWARE SCRAPBOOK
            </div>
            <h2 id="bkm-archive-heading" className="bkm-h2">
              Project Archive
            </h2>
          </div>
        </div>

        {/* Bunkum Scrap Wall Archive Interactive Stage */}
        <div className="bkm-arch-shell">
          <div className="bkm-arch-topbar">
            <div
              className="bkm-mode-tabs"
              role="tablist"
              aria-label="Archive view mode"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'grid'}
                data-active={mode === 'grid'}
                className="bkm-mode-btn"
                onClick={() => setMode('grid')}
              >
                <span
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                >
                  <Grid2x2 size={12} aria-hidden="true" />
                  Scrap Wall (Drag)
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'preview'}
                data-active={mode === 'preview'}
                className="bkm-mode-btn"
                onClick={() => setMode('preview')}
              >
                Spotlight
              </button>
            </div>
          </div>

          <div
            ref={stageRef}
            className="bkm-arch bkm-stars"
            data-mode={mode}
            onPointerDown={onWallPointerDown}
          >
            {/* Endless draggable/pannable Bunkum Scrap Wall Grid */}
            <div className="bkm-grid" aria-hidden={mode !== 'grid'}>
              {Array.from({ length: POOL_C * POOL_R }, (_, k) => (
                <button
                  key={k}
                  type="button"
                  className="bkm-cell"
                  data-cell=""
                  data-k="0"
                  data-cursor="Open Project"
                  tabIndex={mode === 'grid' && k < 12 ? 0 : -1}
                  aria-label="Open project link"
                  onClick={(ev) => {
                    if (st.current.dragging) return;
                    const kind = Number(
                      ev.currentTarget.getAttribute('data-k') || 0
                    );
                    openScrapByIndex(kind);
                  }}
                >
                  <span className="bkm-cell-card">
                    <i className="bkm-cell-img" />
                    <span className="bkm-cell-cap">Scrap</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Spotlight Preview Mode */}
            <div className="bkm-pv">
              <div className="bkm-pv-stage">
                <div className="bkm-pv-thumbs">
                  {SCRAP_WALL_ITEMS.slice(0, 3).map((item, idx) => (
                    <button
                      key={item.projectId}
                      type="button"
                      className="bkm-pv-thumb"
                      data-selected={focus === idx}
                      data-cursor={item.tag}
                      aria-label={`Spotlight ${item.label}`}
                      style={{ backgroundImage: `url(${item.image})` }}
                      onClick={() => setFocus(idx)}
                      tabIndex={mode === 'preview' ? 0 : -1}
                    />
                  ))}
                </div>

                <a
                  href={activeProject.demoUrl || activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bkm-pvbig bkm-hit"
                  style={{ backgroundImage: `url(${activeScrap.image})` }}
                  aria-label={`Open ${activeProject.title} (${activeProject.demoUrl ? 'Live Demo' : 'GitHub'})`}
                  data-cursor={activeProject.demoUrl ? 'Live Demo' : 'GitHub'}
                  tabIndex={mode === 'preview' ? 0 : -1}
                />

                <div className="bkm-pv-thumbs">
                  {SCRAP_WALL_ITEMS.slice(3).map((item, offset) => {
                    const idx = offset + 3;
                    return (
                      <button
                        key={item.projectId}
                        type="button"
                        className="bkm-pv-thumb"
                        data-selected={focus === idx}
                        data-cursor={item.tag}
                        aria-label={`Spotlight ${item.label}`}
                        style={{ backgroundImage: `url(${item.image})` }}
                        onClick={() => setFocus(idx)}
                        tabIndex={mode === 'preview' ? 0 : -1}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="bkm-pv-mobile-thumbs" aria-label="Select project preview">
                {SCRAP_WALL_ITEMS.map((item, idx) => (
                  <button
                    key={item.projectId}
                    type="button"
                    className="bkm-pv-thumb"
                    data-selected={focus === idx}
                    aria-label={`Spotlight ${item.label}`}
                    style={{ backgroundImage: `url(${item.image})` }}
                    onClick={() => setFocus(idx)}
                    tabIndex={mode === 'preview' ? 0 : -1}
                  />
                ))}
              </div>

              <div className="bkm-pvcap bkm-mono">
                <span>{activeProject.title}</span>
                {activeProject.demoUrl && (
                  <>
                    <span>·</span>
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'var(--blue)',
                        color: 'var(--butter)',
                        padding: '4px 10px',
                        borderRadius: 999,
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  </>
                )}
                <span>·</span>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <GithubIcon size={12} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Scrapbook Cards Grid (Easy browsing on desktop & mobile) */}
        <div className="bkm-scrap-grid">
          {PROJECTS.map((project, index) => {
            const accent = project.accent ?? 'cobalt';
            const isWide = index < 2;
            return (
              <article
                key={project.id}
                className={`bkm-scrap-card ${isWide ? 'is-wide' : ''}`}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      className="bkm-mono"
                      style={{
                        padding: '4px 10px',
                        borderRadius: 999,
                        border: '1.5px solid var(--ink)',
                        background: ACCENT_BG[accent],
                        color: ACCENT_TEXT[accent],
                        fontWeight: 700,
                      }}
                    >
                      {project.scrapCode} · {project.year}
                    </span>
                  </div>

                  <div
                    className="bkm-scrap-media"
                    style={{ background: project.imageBg || 'var(--paper)' }}
                  >
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <WaveformDoodle style={{ width: '75%', height: 'auto' }} />
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(19px, 1.8vw, 23px)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      marginBottom: 4,
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <div
                      className="bkm-mono"
                      style={{ color: 'var(--blue)', marginBottom: 10 }}
                    >
                      {project.subtitle}
                    </div>
                  )}

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.48,
                      fontWeight: 600,
                      color: 'var(--muted)',
                      marginBottom: 14,
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bkm-tag-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    paddingTop: 12,
                    borderTop: '1.5px dashed rgba(12, 12, 16, 0.25)',
                  }}
                >
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bkm-btn bkm-btn-cobalt"
                      style={{ height: 38, padding: '0 14px', fontSize: 13 }}
                      data-cursor="Live Demo"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bkm-btn bkm-btn-secondary"
                    style={{ height: 38, padding: '0 14px', fontSize: 13 }}
                    aria-label={`View ${project.title} on GitHub`}
                    data-cursor="GitHub"
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
