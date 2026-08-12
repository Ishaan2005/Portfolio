import React from 'react';

export const GithubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 18, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 18, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const CoffeeBeanIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
  size = 18,
  className,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <defs>
      <radialGradient id="preloaderBeanGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#d4955c" />
        <stop offset="55%" stopColor="#8c522b" />
        <stop offset="100%" stopColor="#4a2511" />
      </radialGradient>
    </defs>
    <path
      d="M12 2.5C7 2.5 3.2 6.5 3.2 12C3.2 17.5 7 21.5 12 21.5C17 21.5 20.8 17.5 20.8 12C20.8 6.5 17 2.5 12 2.5Z"
      fill="url(#preloaderBeanGrad)"
      stroke="#ffffff"
      strokeWidth="0.8"
    />
    <path
      d="M12.5 4.5C12.5 4.5 9.5 8.8 13.5 12.5C17.5 16.2 11.5 19.5 11.5 19.5"
      stroke="#281409"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M12.7 4.8C12.7 4.8 9.8 8.9 13.7 12.5C17.2 16 11.7 19.2 11.7 19.2"
      stroke="#ffdf9e"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
  </svg>
);



