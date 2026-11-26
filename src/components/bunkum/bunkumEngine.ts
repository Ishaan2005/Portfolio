/**
 * Pure geometry, easing, scroll beats, wordmark glyph physics,
 * 3D carton look-at, pendulum physics, and infinite scrap-wall math
 * adapted directly from the Bunkum Studio component engine.
 */

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Smootherstep: zero velocity at both ends. */
export const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * c * (c * (c * 6 - 15) + 10);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const span = (p: number, w: readonly [number, number]) =>
  clamp01((p - w[0]) / (w[1] - w[0]));

/** Frame-rate independent approach toward a target (tau in ms). */
export const approach = (cur: number, target: number, dt: number, tau: number) =>
  target + (cur - target) * Math.exp(-Math.max(0, dt) / tau);

/** 0 -> 1 while a stage is pinned inside its track; clamps outside it, never NaN. */
export const progressFrom = (top: number, length: number, stage: number) => {
  const travel = length - stage;
  if (!(travel > 0)) return 0;
  return clamp01((0 - top) / travel);
};

/** Where a sticky stage's top sits in the viewport, given its track's top. */
export const stageTopAt = (trackTop: number, length: number, stage: number) =>
  trackTop > 0 ? trackTop : Math.min(0, trackTop + length - stage);

// ---- Wordmarks: geometric letters whose stems lengthen under the pointer
export const WORD = ["I", "S", "H", "A", "A", "N"] as const;
export const T = 28; // stem thickness for last-name wordmark
export const FIRST_T = 18; // thinner stem thickness for smaller ISHAAN wordmark
export const CELLS = [44, 92, 94, 96, 96, 96] as const;
export const GAP = 8;
export const PAD = 0;

export const LAST_WORD = [
  "B",
  "H",
  "I",
  "M",
  "A",
  "J",
  "I",
  "Y",
  "A",
  "N",
  "I",
] as const;
export const LAST_CELLS = [90, 92, 46, 110, 92, 82, 46, 92, 92, 94, 46] as const;
export const LAST_GAP = 8;

export const wordWidth = (cells: readonly number[], gap = GAP) =>
  PAD * 2 + cells.reduce((a, b) => a + b, 0) + gap * (cells.length - 1);

export const letterX = (i: number, cells: readonly number[], gap = GAP) =>
  PAD + cells.slice(0, i).reduce((a, b) => a + b, 0) + gap * i;

export const letterMid = (i: number, cells: readonly number[], gap = GAP) =>
  letterX(i, cells, gap) + cells[i] / 2;

export const VB_W = wordWidth(CELLS, GAP);
export const LAST_VB_W = wordWidth(LAST_CELLS, LAST_GAP);

export const cellX = (i: number) => letterX(i, CELLS, GAP);
export const cellMid = (i: number) => letterMid(i, CELLS, GAP);

export const STRETCH = 1.5;
export const LAST_STRETCH = 1.42;
export const NEAR = 0.135;
export const FAR = 0.45;
export const TAU_LETTER = 105;

export const baseFor = (H: number, scale: number) =>
  scale > 0 ? Math.max(Math.min(Math.round((0.23 * H) / scale), 152), 102) : 145;

export const lastBaseFor = (H: number, scale: number) =>
  scale > 0 ? Math.max(Math.min(Math.round((0.125 * H) / scale), 178), 124) : 148;

export const vbH = (base: number, stretch = STRETCH) => Math.ceil(base * stretch + 6);

export const pullAt = (d: number, W: number) =>
  W > 0 ? clamp01((FAR * W - Math.abs(d)) / ((FAR - NEAR) * W)) : 0;

export const f = (n: number) => (Math.round(n * 10) / 10).toString();

/**
 * Generates an SVG stroke path for a letter in WORD.
 * Bowls, crossbars, and junctions stay anchored to `base` while vertical stems stretch to `h`.
 */
export function glyph(
  ch: string,
  ox: number,
  w: number,
  h: number,
  base: number,
  stroke = T
): string {
  h = Math.max(h, base);
  const a = ox + stroke / 2;
  const b = ox + w - stroke / 2;
  const top = stroke / 2;
  const bot = h - stroke / 2;
  const bb = base - stroke / 2;
  const r = (b - a) / 2;
  const cx = (a + b) / 2;

  switch (ch) {
    case "I":
      return `M${f(cx)} 0V${f(h)}`;

    case "S": {
      const ry = Math.min(r * 0.72, (bb - top) * 0.24);
      const midY = top + (bb - top) * 0.47;
      const y1 = midY - ry * 0.65;
      const y2 = midY + ry * 0.65;
      const topTick = Math.min(top + ry + 10, y1);
      const botTick = Math.max(bot - ry - 10, y2);
      return (
        `M${f(b)} ${f(topTick)}V${f(top + ry)}` +
        `A${f(r)} ${f(ry)} 0 0 0 ${f(a)} ${f(top + ry)}` +
        `V${f(y1)}` +
        `A${f(r)} ${f(midY - y1)} 0 0 0 ${f(cx)} ${f(midY)}` +
        `A${f(r)} ${f(y2 - midY)} 0 0 1 ${f(b)} ${f(y2)}` +
        `V${f(bot - ry)}` +
        `A${f(r)} ${f(ry)} 0 0 1 ${f(a)} ${f(bot - ry)}` +
        `V${f(botTick)}`
      );
    }

    case "H": {
      const mid = top + (bb - top) * 0.48;
      return `M${f(a)} 0V${f(h)}M${f(b)} 0V${f(h)}M${f(a)} ${f(mid)}H${f(b)}`;
    }

    case "A": {
      const archY = top + (bb - top) * 0.44;
      const barY = top + (bb - top) * 0.65;
      const apex = Math.min(10, r * 0.28);
      return (
        `M${f(a)} ${f(h)}V${f(archY)}` +
        `L${f(cx - apex)} ${f(top)}H${f(cx + apex)}` +
        `L${f(b)} ${f(archY)}V${f(h)}` +
        `M${f(a)} ${f(barY)}H${f(b)}`
      );
    }

    case "N":
      return (
        `M${f(a)} ${f(h)}V${f(top)}L${f(b)} ${f(bot)}` +
        `M${f(b)} ${f(h)}V0M${f(a)} ${f(top)}V0`
      );

    case "B": {
      const m = top + (bb - top) * 0.44;
      const bu = b - 7;
      const ru = Math.min(r * 0.9, (m - top) / 2);
      const rl = Math.min(r, (bot - m) / 2);
      return (
        `M${f(a)} 0V${f(h)}` +
        `M${f(a)} ${f(top)}H${f(bu - ru)}A${f(ru)} ${f(ru)} 0 0 1 ${f(bu)} ${f(top + ru)}V${f(m - ru)}A${f(ru)} ${f(ru)} 0 0 1 ${f(bu - ru)} ${f(m)}H${f(a)}` +
        `M${f(a)} ${f(m)}H${f(b - rl)}A${f(rl)} ${f(rl)} 0 0 1 ${f(b)} ${f(m + rl)}V${f(bot - rl)}A${f(rl)} ${f(rl)} 0 0 1 ${f(b - rl)} ${f(bot)}H${f(a)}`
      );
    }

    case "M": {
      const v = top + (bb - top) * 0.56;
      return (
        `M${f(a)} ${f(h)}V${f(top)}L${f(cx)} ${f(v)}L${f(b)} ${f(top)}V${f(h)}` +
        `M${f(a)} ${f(top)}V0M${f(b)} ${f(top)}V0`
      );
    }

    case "J": {
      const ry = Math.min(r * 0.85, (bb - top) * 0.34);
      const hookTop = Math.max(bot - ry - 10, top + (bb - top) * 0.52);
      return (
        `M${f(b)} 0V${f(bot - ry)}` +
        `A${f(r)} ${f(ry)} 0 0 1 ${f(a)} ${f(bot - ry)}` +
        `V${f(hookTop)}`
      );
    }

    case "Y": {
      const jy = top + (bb - top) * 0.54;
      return (
        `M${f(a)} 0V${f(top)}L${f(cx)} ${f(jy)}L${f(b)} ${f(top)}V0` +
        `M${f(cx)} ${f(jy)}V${f(h)}`
      );
    }
  }
  return "";
}

/** Target height of every letter for a pointer at x px (null = resting). */
export function stretchTargets(
  px: number | null,
  centres: number[],
  W: number,
  base: number,
  out: number[],
  stretch = STRETCH
) {
  for (let i = 0; i < centres.length; i++) {
    out[i] =
      px === null
        ? base
        : base * (1 + (stretch - 1) * pullAt((centres[i] ?? 0) - px, W));
  }
  return out;
}

// ---- 3D Carton look-at & idle spin
export const LOOK = 140;
export const TAU_LOOK = 300;
export const SPIN = 7;

export const lookAt = (nx: number, ny: number) => ({
  rx: -LOOK * Math.max(-1, Math.min(1, ny)),
  ry: LOOK * Math.max(-1, Math.min(1, nx)),
});

/** Damped pendulum physics (used for the perched Pin-1 mascot). */
export function pendulum(
  a: number,
  w: number,
  dtMs: number
): [number, number] {
  let t = Math.min(64, Math.max(0, dtMs)) / 1000;
  while (t > 0) {
    const h = Math.min(t, 1 / 120);
    w += (-11 * Math.sin(a) - 1.4 * w) * h;
    a += w * h;
    t -= h;
  }
  return [a, w];
}

export const LET_GO = 5;
export const letsGo = (pokes: number) => pokes > 0 && pokes % LET_GO === 0;

// ---- Bunkum Studio Color Rotator Themes (Warm Paper default + Bunkum studio accents)
export interface BunkumTheme {
  name: string;
  heroBg: string;
  heroFg: string;
  heroInk: string;
  accent: string;
  accentFg: string;
  deep: string;
  paper: string;
  ink: string;
  muted: string;
  isDarkHero: boolean;
}

export const THEMES: readonly BunkumTheme[] = [
  {
    name: "Cobalt",
    heroBg: "#2731e8",
    heroFg: "#ffe98a",
    heroInk: "#ffe98a",
    accent: "#ffe98a",
    accentFg: "#0d137a",
    deep: "#0d137a",
    paper: "#f6f1e3",
    ink: "#0c0c10",
    muted: "#4a483f",
    isDarkHero: true,
  },
  {
    name: "Warm Paper",
    heroBg: "#f6f1e3",
    heroFg: "#0c0c10",
    heroInk: "#2731e8",
    accent: "#2731e8",
    accentFg: "#ffe98a",
    deep: "#0d137a",
    paper: "#f6f1e3",
    ink: "#0c0c10",
    muted: "#4a483f",
    isDarkHero: false,
  },
  {
    name: "Tomato",
    heroBg: "#ff4a2e",
    heroFg: "#fff8dc",
    heroInk: "#3d0702",
    accent: "#3d0702",
    accentFg: "#fff8dc",
    deep: "#3d0702",
    paper: "#f6f1e3",
    ink: "#0c0c10",
    muted: "#4a483f",
    isDarkHero: true,
  },
  {
    name: "Pistachio",
    heroBg: "#b9e27c",
    heroFg: "#1d3a12",
    heroInk: "#0f2208",
    accent: "#1d3a12",
    accentFg: "#f6f1e3",
    deep: "#0f2208",
    paper: "#f6f1e3",
    ink: "#0c0c10",
    muted: "#4a483f",
    isDarkHero: false,
  },
] as const;

export const nextTheme = (i: number) => (i + 1) % THEMES.length;

// ---- Scrap Wall Archive grid math
export const pitchFor = (W: number) =>
  W < 640 ? W / 3.4 : W < 1000 ? W / 5.5 : W / 8.5;

export const wrap = (x: number, m: number) =>
  m > 0 ? ((x % m) + m) % m : 0;

export const cellKind = (c: number, r: number, n: number) =>
  (((c * 7 + r * 11 + (r & 1 ? 3 : 0)) % n) + n) % n;

export const ROW = 1.42;
export const SHAPES = ["4/3", "1/1", "4/5", "3/4", "5/4", "1/1"] as const;
