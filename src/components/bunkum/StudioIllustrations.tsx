import type { CSSProperties } from 'react';

/** Hand-drawn DIP-8 IC chip mascot that boops on click in the wordmark hero. */
export function ChipMascot({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* Top & bottom IC pins */}
      {[16, 26, 38, 48].map((x) => (
        <g key={x}>
          <rect
            x={x - 2}
            y={5}
            width={4}
            height={10}
            rx={1.5}
            fill="#ffe98a"
            stroke="#0c0c10"
            strokeWidth="2.2"
          />
          <rect
            x={x - 2}
            y={49}
            width={4}
            height={10}
            rx={1.5}
            fill="#ffe98a"
            stroke="#0c0c10"
            strokeWidth="2.2"
          />
        </g>
      ))}
      {/* Chip package */}
      <rect
        x={9}
        y={13}
        width={46}
        height={38}
        rx={8}
        fill="#ff4a2e"
        stroke="#0c0c10"
        strokeWidth="2.8"
      />
      {/* Notch */}
      <path
        d="M9 28a4 4 0 0 1 0 8"
        fill="#f6f1e3"
        stroke="#0c0c10"
        strokeWidth="2.4"
      />
      {/* Googly eyes */}
      <circle cx={26} cy={30} r={6} fill="#fff8dc" stroke="#0c0c10" strokeWidth="2.2" />
      <circle cx={40} cy={30} r={6} fill="#fff8dc" stroke="#0c0c10" strokeWidth="2.2" />
      <circle cx={27.5} cy={31} r={2.3} fill="#0c0c10" />
      <circle cx={41.5} cy={29} r={2.3} fill="#0c0c10" />
      {/* Little grin */}
      <path
        d="M27 40c3 3 9 3 12 0"
        stroke="#0c0c10"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Playful hanging Pin-1 probe buddy that swings on the Bunkum pendulum physics. */
export function PinOneCritter() {
  return (
    <svg
      x={-34}
      y={-8}
      width={68}
      height={84}
      viewBox="0 0 68 84"
      fill="none"
      aria-hidden="true"
    >
      {/* Wire antenna / tail */}
      <path
        d="M34 6v14"
        stroke="#0c0c10"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={34} cy={6} r={4} fill="#ffe98a" stroke="#0c0c10" strokeWidth="2.2" />
      {/* Body (rounded pistachio gate creature) */}
      <path
        d="M14 28c0-10 8-15 20-15s20 5 20 15v24c0 9-8 16-20 16S14 61 14 52V28z"
        fill="#b9e27c"
        stroke="#0c0c10"
        strokeWidth="2.8"
      />
      {/* Dangling little legs */}
      <path
        d="M24 67v9M44 67v9"
        stroke="#0c0c10"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Eyes */}
      <circle cx={26} cy={35} r={5.2} fill="#fff8dc" stroke="#0c0c10" strokeWidth="2.2" />
      <circle cx={42} cy={35} r={5.2} fill="#fff8dc" stroke="#0c0c10" strokeWidth="2.2" />
      <circle cx={27} cy={36} r={2} fill="#0c0c10" />
      <circle cx={41} cy={36} r={2} fill="#0c0c10" />
      {/* Mouth */}
      <path
        d="M29 47c2.5 2.4 7.5 2.4 10 0"
        stroke="#0c0c10"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Pin label */}
      <text
        x={34}
        y={59}
        textAnchor="middle"
        fill="#0c0c10"
        fontSize="8"
        fontWeight="700"
        fontFamily="BkmMono, monospace"
      >
        CLK
      </text>
    </svg>
  );
}

/** Hand-drawn starburst & probe sticker for editorial margins. */
export function LogicStarDoodle({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 6l12 31 32-11-16 29 27 19-33 7 8 33-30-16-24 23 2-34-33-5 25-22-14-31 32 10L60 6z"
        fill="#ffe98a"
        stroke="#0c0c10"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <circle cx="51" cy="54" r="3.5" fill="#0c0c10" />
      <circle cx="69" cy="54" r="3.5" fill="#0c0c10" />
      <path
        d="M49 67c5 5 17 5 22 0"
        stroke="#0c0c10"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn oscilloscope / digital timing waveform badge. */
export function WaveformDoodle({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 140 76"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="132"
        height="68"
        rx="12"
        fill="#fff8dc"
        stroke="#0c0c10"
        strokeWidth="3"
      />
      <path
        d="M16 50h14V24h18v26h16V24h18v26h14V24h20v26h10"
        stroke="#2731e8"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="116" cy="24" r="4.5" fill="#ff4a2e" stroke="#0c0c10" strokeWidth="2" />
    </svg>
  );
}

/** Hand-drawn ink signature inspired by Bunkum's SIG path. */
export function HandSignature({
  className,
  label = 'Ishaan signature',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 82"
      role="img"
      aria-label={label}
    >
      <path
        d="M18 58c4-18 8-34 7-42-2 12-3 30-1 43M34 38c6-10 18-10 16 0-2 8-14 10-12 18 2 6 14 4 19-4M66 16c-3 16-3 30-2 42 5-12 13-18 19-14 4 4 1 12 3 16M96 42c6-6 14-6 15 2 1 6-6 13-12 11-5-2-5-10 2-13 6-2 10 5 13 13M124 41c5-5 13-5 14 3 1 6-6 12-11 10-4-2-4-10 2-12 6-2 10 4 13 12M150 56c1-8 2-15 5-18 4 6 6 14 11 15 4 0 5-9 6-15M24 70c46-5 104-8 164-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
