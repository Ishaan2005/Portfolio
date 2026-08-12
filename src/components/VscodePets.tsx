import React, { useState, useEffect } from 'react';

interface PetData {
  x: number;
  facingRight: boolean;
  isMoving: boolean;
  action: string;
  bubble: string | null;
}

export const VscodePets: React.FC = () => {
  const [cat, setCat] = useState<PetData>({
    x: 10,
    facingRight: true,
    isMoving: false,
    action: 'idle',
    bubble: null,
  });

  const [dog, setDog] = useState<PetData>({
    x: 65,
    facingRight: false,
    isMoving: false,
    action: 'idle',
    bubble: null,
  });

  const [treatDropped, setTreatDropped] = useState<boolean>(false);

  // Random Movement Loop for Cat
  useEffect(() => {
    const moveCat = () => {
      const targetX = Math.floor(Math.random() * 75) + 5; // 5% to 80%
      setCat((prev) => {
        const isRight = targetX > prev.x;
        return {
          ...prev,
          x: targetX,
          facingRight: isRight,
          isMoving: true,
          action: 'walking',
        };
      });

      // Stop walking after transit
      setTimeout(() => {
        setCat((prev) => ({
          ...prev,
          isMoving: false,
          action: 'idle',
        }));
      }, 3000);
    };

    const interval = setInterval(moveCat, Math.random() * 3000 + 4000);
    return () => clearInterval(interval);
  }, []);

  // Random Movement Loop for Dog
  useEffect(() => {
    const moveDog = () => {
      const targetX = Math.floor(Math.random() * 75) + 5;
      setDog((prev) => {
        const isRight = targetX > prev.x;
        return {
          ...prev,
          x: targetX,
          facingRight: isRight,
          isMoving: true,
          action: 'walking',
        };
      });

      setTimeout(() => {
        setDog((prev) => ({
          ...prev,
          isMoving: false,
          action: 'idle',
        }));
      }, 2800);
    };

    const interval = setInterval(moveDog, Math.random() * 3000 + 3500);
    return () => clearInterval(interval);
  }, []);

  const triggerCatTrick = () => {
    const tricks = ['jumping', 'backflip', 'spin'];
    const randomTrick = tricks[Math.floor(Math.random() * tricks.length)];
    const bubbles = ['Meow! 🐱', 'Purrr... ❤️', 'Coffee! ☕', 'Flip! 💫'];
    const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];

    setCat((prev) => ({
      ...prev,
      action: randomTrick,
      bubble: randomBubble,
    }));

    setTimeout(() => {
      setCat((prev) => ({
        ...prev,
        action: 'idle',
        bubble: null,
      }));
    }, 1500);
  };

  const triggerDogTrick = () => {
    const tricks = ['jumping', 'spin', 'happy'];
    const randomTrick = tricks[Math.floor(Math.random() * tricks.length)];
    const bubbles = ['Woof! 🐶', 'Wag wag! 🎾', 'Play! ✨', 'Coffee! ☕'];
    const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];

    setDog((prev) => ({
      ...prev,
      action: randomTrick,
      bubble: randomBubble,
    }));

    setTimeout(() => {
      setDog((prev) => ({
        ...prev,
        action: 'idle',
        bubble: null,
      }));
    }, 1500);
  };

  const handleDropTreat = () => {
    setTreatDropped(true);

    // Both pets run to center treat!
    setCat({
      x: 42,
      facingRight: true,
      isMoving: true,
      action: 'jumping',
      bubble: 'Coffee Treat! ☕',
    });

    setDog({
      x: 48,
      facingRight: false,
      isMoving: true,
      action: 'jumping',
      bubble: 'Yum! 🍖',
    });

    setTimeout(() => {
      setTreatDropped(false);
      setCat((prev) => ({ ...prev, isMoving: false, action: 'idle', bubble: null }));
      setDog((prev) => ({ ...prev, isMoving: false, action: 'idle', bubble: null }));
    }, 2200);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '42px',
        overflow: 'visible',
        marginBottom: '0.25rem',
        userSelect: 'none',
      }}
    >
      {/* Feed Coffee Treat Button */}
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          right: '4px',
          zIndex: 5,
        }}
      >
        <button
          onClick={handleDropTreat}
          className="mono"
          style={{
            fontSize: '0.6875rem',
            color: '#ffffff',
            background: '#6e3f1f',
            border: '1px solid #522d14',
            padding: '0.2rem 0.6rem',
            borderRadius: '14px 4px 14px 4px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(110,63,31,0.3)',
            transition: 'all 0.2s ease',
          }}
          title="Feed Coffee Treat to Pets!"
        >
          {treatDropped ? '❤️ Treat Active!' : '☕ Feed Treat'}
        </button>
      </div>

      {/* Walking Ledge Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '0',
          right: '0',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--border-cyan), transparent)',
          opacity: 0.7,
        }}
      />

      {/* Pet 1: Natural Random Walking Cat */}
      <div
        onClick={triggerCatTrick}
        style={{
          position: 'absolute',
          bottom: '2px',
          left: `${cat.x}%`,
          transform: `scaleX(${cat.facingRight ? 1 : -1})`,
          transition: cat.isMoving ? 'left 3s linear' : 'none',
          cursor: 'pointer',
          zIndex: 2,
        }}
        className={`pet-wrapper pet-cat ${cat.action}`}
      >
        {cat.bubble && (
          <div
            className="pet-speech-bubble"
            style={{ transform: `scaleX(${cat.facingRight ? 1 : -1}) translateX(-50%)` }}
          >
            {cat.bubble}
          </div>
        )}
        <div className={`pet-body-motion ${cat.isMoving ? 'is-stepping' : ''}`}>
          <svg viewBox="0 0 36 32" width="34" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6,8 10,2 12,9" fill="var(--accent-cyan)" />
            <polygon points="20,9 22,2 26,8" fill="var(--accent-cyan)" />
            <circle cx="16" cy="14" r="7" fill="var(--text-main)" />
            <circle cx="13.5" cy="13" r="1" fill="var(--bg-dark)" />
            <circle cx="18.5" cy="13" r="1" fill="var(--bg-dark)" />
            <polygon points="15.5,15 16.5,15 16,16" fill="var(--accent-cyan)" />
            <ellipse cx="16" cy="21" rx="9" ry="5" fill="var(--text-main)" />
            <path d="M24 21 C29 19, 31 13, 29 9" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" className="cat-tail" />
            <rect x="9" y="24" width="3.5" height="6" rx="1.5" fill="var(--accent-cyan)" className="leg leg-a" />
            <rect x="14" y="24" width="3.5" height="6" rx="1.5" fill="var(--text-muted)" className="leg leg-b" />
            <rect x="18.5" y="24" width="3.5" height="6" rx="1.5" fill="var(--accent-cyan)" className="leg leg-a" />
            <rect x="23" y="24" width="3.5" height="6" rx="1.5" fill="var(--text-muted)" className="leg leg-b" />
          </svg>
        </div>
      </div>

      {/* Pet 2: Natural Random Walking Dog */}
      <div
        onClick={triggerDogTrick}
        style={{
          position: 'absolute',
          bottom: '2px',
          left: `${dog.x}%`,
          transform: `scaleX(${dog.facingRight ? 1 : -1})`,
          transition: dog.isMoving ? 'left 2.8s linear' : 'none',
          cursor: 'pointer',
          zIndex: 2,
        }}
        className={`pet-wrapper pet-dog ${dog.action}`}
      >
        {dog.bubble && (
          <div
            className="pet-speech-bubble"
            style={{ transform: `scaleX(${dog.facingRight ? 1 : -1}) translateX(-50%)` }}
          >
            {dog.bubble}
          </div>
        )}
        <div className={`pet-body-motion ${dog.isMoving ? 'is-stepping' : ''}`}>
          <svg viewBox="0 0 36 32" width="34" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="7" cy="13" rx="2.5" ry="5" fill="var(--accent-cyan-light)" />
            <ellipse cx="25" cy="13" rx="2.5" ry="5" fill="var(--accent-cyan-light)" />
            <circle cx="16" cy="13" r="7" fill="var(--accent-cyan)" />
            <ellipse cx="16" cy="15" rx="3.5" ry="2.5" fill="var(--bg-dark)" />
            <circle cx="16" cy="14" r="1" fill="var(--text-main)" />
            <circle cx="13" cy="11" r="1" fill="var(--bg-dark)" />
            <circle cx="19" cy="11" r="1" fill="var(--bg-dark)" />
            <ellipse cx="16" cy="21" rx="8" ry="5.5" fill="var(--accent-cyan)" />
            <path d="M7 20 C4 17, 3 13, 5 11" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" className="dog-tail" />
            <rect x="9" y="24" width="3.5" height="6" rx="1.5" fill="var(--text-main)" className="leg leg-a" />
            <rect x="13.5" y="24" width="3.5" height="6" rx="1.5" fill="var(--accent-cyan-light)" className="leg leg-b" />
            <rect x="18.5" y="24" width="3.5" height="6" rx="1.5" fill="var(--text-main)" className="leg leg-a" />
            <rect x="23" y="24" width="3.5" height="6" rx="1.5" fill="var(--accent-cyan-light)" className="leg leg-b" />
          </svg>
        </div>
      </div>

      {/* Keyframes for Organic Stepping & Tricks */}
      <style>{`
        @keyframes stepA {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3.5px) rotate(-12deg); }
        }

        @keyframes stepB {
          0%, 100% { transform: translateY(-3.5px) rotate(12deg); }
          50% { transform: translateY(0); }
        }

        @keyframes bodyWalkBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }

        .is-stepping {
          animation: bodyWalkBob 0.3s infinite ease-in-out;
        }

        .is-stepping .leg-a {
          animation: stepA 0.3s infinite ease-in-out;
          transform-origin: top center;
        }

        .is-stepping .leg-b {
          animation: stepB 0.3s infinite ease-in-out;
          transform-origin: top center;
        }

        @keyframes petBackflip {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(180deg) scale(1.2); }
          100% { transform: translateY(0) rotate(360deg); }
        }

        @keyframes petSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.25); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes petJump {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-18px) scale(1.18); }
          60% { transform: translateY(-8px) scale(1.08); }
        }

        .pet-wrapper:hover {
          filter: drop-shadow(0 0 6px var(--accent-cyan));
        }

        .pet-wrapper.jumping { animation: petJump 1.2s ease-in-out !important; }
        .pet-wrapper.backflip { animation: petBackflip 1.2s ease-in-out !important; }
        .pet-wrapper.spin { animation: petSpin 1.2s ease-in-out !important; }

        .pet-speech-bubble {
          position: absolute;
          top: -26px;
          left: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-cyan);
          color: var(--accent-cyan);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          z-index: 10;
        }

        .cat-tail { transform-origin: bottom left; animation: wagTail 1.2s infinite ease-in-out; }
        .dog-tail { transform-origin: bottom right; animation: wagTail 0.6s infinite ease-in-out; }

        @keyframes wagTail {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(18deg); }
        }
      `}</style>
    </div>
  );
};
