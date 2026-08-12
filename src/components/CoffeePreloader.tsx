import React, { useState, useEffect } from 'react';

interface CoffeePreloaderProps {
  onComplete: () => void;
}

const PUNS = [
  {
    title: 'Compiling coffee beans into Verilog RTL...',
    subtitle: '1 cup of Espresso per 100M clock cycles ☕⚡',
  },
  {
    title: 'Overclocking coffee grinder for maximum FLOPS!',
    subtitle: 'Floating-point Latte Operations per Second ☕💻',
  },
  {
    title: 'Java is great, but Espresso runs bare-metal on RISC-V!',
    subtitle: 'Zero OS overhead, 100% caffeine voltage 🚀',
  },
  {
    title: 'Synthesizing dark roast... 0 timing violations!',
    subtitle: 'Maximum clock frequency locked on Sky130 PDK 🔬',
  },
  {
    title: 'Debugging logic gates: logic 0 (decaf) ➔ logic 1 (espresso)!',
    subtitle: 'Filtering race conditions, one roasted bean at a time ☕',
  },
  {
    title: 'SystemVerilog assertion: assert property (caffeine_level > 9000);',
    subtitle: 'Verification passed! No stack overflow detected ⚡',
  },
  {
    title: 'ASIC Taped out... Cappuccino successfully brewed!',
    subtitle: 'Silicon architecture initialized & online ☕✨',
  },
];

export const CoffeePreloader: React.FC<CoffeePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [punIndex, setPunIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Exact 10 seconds simulation (100 steps * 100ms = 10,000ms = 10 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => handleFinish(), 300);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Rotate text puns every 2.5s (4 puns across 10s video)
  useEffect(() => {
    const punInterval = setInterval(() => {
      setPunIndex((prev) => (prev + 1) % PUNS.length);
    }, 2500);

    return () => clearInterval(punInterval);
  }, []);

  const handleFinish = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '2rem 1.5rem',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        userSelect: 'none',
      }}
    >
      {/* Opaque Full-Resolution loading.mp4 Video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <video
          src={`${import.meta.env.BASE_URL}loading.mp4`}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="mono"
        style={{
          position: 'absolute',
          top: '1.75rem',
          right: '1.75rem',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          color: '#ffffff',
          padding: '0.45rem 1.1rem',
          borderRadius: '20px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.25s ease',
        }}
      >
        Skip ☕ ➔
      </button>

      {/* Compact & Almost Transparent Puns Card Floating over Video */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.875rem',
          maxWidth: '460px',
          width: '100%',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '12px',
          padding: '1.1rem 1.4rem',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          marginBottom: '0.5rem',
        }}
      >
        {/* Minimal Progress Line */}
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div
            className="mono"
            style={{
              fontSize: '0.75rem',
              color: '#f5c596',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
              fontWeight: 600,
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}
          >
            BREWING RTL & CAFFEINE · {progress}%
          </div>

          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #8c522b, #d4955c, #ffdf9e)',
                borderRadius: '4px',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>

        {/* Compact Coffee & Engineering Puns Display */}
        <div
          style={{
            minHeight: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '1.025rem',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.35,
              marginBottom: '0.2rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)',
            }}
          >
            "{PUNS[punIndex].title}"
          </div>
          <div
            className="mono"
            style={{
              fontSize: '0.75rem',
              color: '#f0ded0',
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.95)',
            }}
          >
            {PUNS[punIndex].subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};
