import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { approach, f } from './bunkumEngine';

interface VoxelProps {
  w: number;
  h: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  className?: string;
  front?: ReactNode;
  back?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  top?: ReactNode;
  bottom?: ReactNode;
}

function Voxel({
  w,
  h,
  d,
  x = 0,
  y = 0,
  z = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  className = '',
  front,
  back,
  left,
  right,
  top,
  bottom,
}: VoxelProps) {
  return (
    <div
      className={`bkm-voxel ${className}`}
      style={
        {
          '--vw': w,
          '--vh': h,
          '--vd': d,
          transform: `translate3d(calc(var(--u) * ${x}), calc(var(--u) * ${y}), calc(var(--u) * ${z})) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        } as CSSProperties
      }
    >
      <div className="bkm-vface bkm-vf">{front}</div>
      <div className="bkm-vface bkm-vb">{back}</div>
      <div className="bkm-vface bkm-vr">{right}</div>
      <div className="bkm-vface bkm-vl">{left}</div>
      <div className="bkm-vface bkm-vt">{top}</div>
      <div className="bkm-vface bkm-vbt">{bottom}</div>
    </div>
  );
}

/** Simple interactive 3D papercraft studio dog with floppy ears and wagging tail. */
export function StudioAnimal3D() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const headRigRef = useRef<HTMLDivElement | null>(null);
  const [happy, setHappy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const happyTimerRef = useRef(0);

  const anim = useRef({
    dragYaw: 0,
    dragPitch: 0,
    vx: 0,
    vy: 0,
    idlePhase: 0,
    lookX: 0,
    lookY: 0,
    targetLookX: 0,
    targetLookY: 0,
    dragging: false,
    moved: false,
    lastX: 0,
    lastY: 0,
    still: false,
    visible: true,
    lastTs: 0,
    raf: 0,
  });

  const frameRef = useRef<(ts: number) => void>(() => {});

  const kick = useCallback(() => {
    if (!anim.current.raf && typeof window !== 'undefined') {
      anim.current.raf = window.requestAnimationFrame((t) => frameRef.current(t));
    }
  }, []);

  useEffect(() => {
    const st = anim.current;
    frameRef.current = (now: number) => {
      st.raf = 0;
      if (!st.visible) return;
      const dt = st.lastTs ? Math.min(64, now - st.lastTs) : 16;
      st.lastTs = now;

      if (!st.still && !st.dragging) {
        st.idlePhase += dt * 0.0014;
        st.dragYaw = approach(st.dragYaw + st.vx, 0, dt, 1100);
        st.dragPitch = approach(st.dragPitch + st.vy, 0, dt, 900);
        st.vx *= Math.pow(0.92, dt / 16);
        st.vy *= Math.pow(0.92, dt / 16);
      }

      st.lookX = st.still ? 0 : approach(st.lookX, st.targetLookX, dt, 160);
      st.lookY = st.still ? 0 : approach(st.lookY, st.targetLookY, dt, 160);

      const baseYaw = st.still ? -18 : -16 + Math.sin(st.idlePhase) * 18;
      const totalYaw = baseYaw + st.dragYaw + st.lookY * 0.65;
      const totalPitch = -6 + st.dragPitch + st.lookX * 0.5;

      if (rigRef.current) {
        rigRef.current.style.transform = `rotateX(${f(totalPitch)}deg) rotateY(${f(totalYaw)}deg)`;
      }
      if (headRigRef.current) {
        headRigRef.current.style.transform = `rotateX(${f(st.lookX * 0.45)}deg) rotateY(${f(
          st.lookY * 0.55
        )}deg)`;
      }

      if (!st.still && (st.visible || st.dragging)) {
        kick();
      }
    };
    kick();
  }, [kick]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const st = anim.current;

    const rm = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (rm) st.still = rm.matches;
    const onRm = () => {
      if (!rm) return;
      st.still = rm.matches;
      kick();
    };
    rm?.addEventListener('change', onRm);

    const onWinMove = (ev: PointerEvent) => {
      if (st.still || st.dragging) return;
      const rect = stage.getBoundingClientRect();
      const nx = Math.max(
        -1,
        Math.min(1, (ev.clientX - (rect.left + rect.width / 2)) / Math.max(window.innerWidth * 0.45, 220))
      );
      const ny = Math.max(
        -1,
        Math.min(1, (ev.clientY - (rect.top + rect.height / 2)) / Math.max(window.innerHeight * 0.45, 220))
      );
      st.targetLookX = -ny * 10;
      st.targetLookY = nx * 20;
    };
    window.addEventListener('pointermove', onWinMove, { passive: true });

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((entries) => {
            st.visible = entries.some((e) => e.isIntersecting);
            if (st.visible) {
              st.lastTs = 0;
              kick();
            }
          })
        : null;
    io?.observe(stage);

    return () => {
      rm?.removeEventListener('change', onRm);
      window.removeEventListener('pointermove', onWinMove);
      io?.disconnect();
      if (st.raf) window.cancelAnimationFrame(st.raf);
      st.raf = 0;
      window.clearTimeout(happyTimerRef.current);
    };
  }, [kick]);

  const bounce = () => {
    setHappy(true);
    window.clearTimeout(happyTimerRef.current);
    happyTimerRef.current = window.setTimeout(() => setHappy(false), 950);
  };

  const onPointerDown = (ev: ReactPointerEvent<HTMLDivElement>) => {
    if (ev.button !== 0 && ev.pointerType === 'mouse') return;
    const st = anim.current;
    st.dragging = true;
    st.moved = false;
    st.lastX = ev.clientX;
    st.lastY = ev.clientY;
    st.vx = 0;
    st.vy = 0;
    setDragging(true);
    ev.currentTarget.setPointerCapture(ev.pointerId);
    kick();
  };

  const onPointerMove = (ev: ReactPointerEvent<HTMLDivElement>) => {
    const st = anim.current;
    if (!st.dragging) return;
    const dx = ev.clientX - st.lastX;
    const dy = ev.clientY - st.lastY;
    if (Math.abs(dx) + Math.abs(dy) > 2) st.moved = true;
    st.lastX = ev.clientX;
    st.lastY = ev.clientY;
    st.dragYaw += dx * 0.75;
    st.dragPitch = Math.max(-36, Math.min(36, st.dragPitch - dy * 0.45));
    st.vx = dx * 0.18;
    st.vy = -dy * 0.1;
    if (rigRef.current) {
      const baseYaw = st.still ? -18 : -16 + Math.sin(st.idlePhase) * 18;
      rigRef.current.style.transform = `rotateX(${f(-6 + st.dragPitch)}deg) rotateY(${f(
        baseYaw + st.dragYaw
      )}deg)`;
    }
  };

  const onPointerUp = (ev: ReactPointerEvent<HTMLDivElement>) => {
    const st = anim.current;
    if (!st.dragging) return;
    st.dragging = false;
    setDragging(false);
    try {
      ev.currentTarget.releasePointerCapture(ev.pointerId);
    } catch {
      // Ignore release errors if capture was already dropped
    }
    if (!st.moved) bounce();
    kick();
  };

  const onKeyDown = (ev: ReactKeyboardEvent<HTMLDivElement>) => {
    const st = anim.current;
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      bounce();
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      st.dragYaw -= 32;
      kick();
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      st.dragYaw += 32;
      kick();
    }
  };

  return (
    <div className="bkm-animal-wrap">
      <div
        ref={stageRef}
        className="bkm-animal-stage"
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D dog"
        data-petted={happy ? 'true' : undefined}
        data-dragging={dragging ? 'true' : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className="bkm-animal-shadow" aria-hidden="true" />
        <div className="bkm-animal-hop">
          <div ref={rigRef} className="bkm-animal-rig">
            {/* Seated Dog Torso with Collar & Tag */}
            <Voxel
              w={0.98}
              h={0.88}
              d={1.06}
              y={0.44}
              z={-0.06}
              className="bkm-dog-cream"
              front={
                <div className="bkm-dog-chest">
                  <span className="bkm-dog-collar" />
                  <span className="bkm-dog-tag" />
                  <span className="bkm-dog-belly" />
                </div>
              }
              left={<div className="bkm-dog-spot-tomato" />}
              back={<div className="bkm-dog-spot-butter" />}
              top={<div className="bkm-dog-collar-top" />}
            />

            {/* Four 3D Paws */}
            <Voxel
              w={0.26}
              h={0.22}
              d={0.34}
              x={-0.29}
              y={0.78}
              z={0.5}
              className="bkm-dog-butter"
              front={<span className="bkm-paw-toes" />}
            />
            <Voxel
              w={0.26}
              h={0.22}
              d={0.34}
              x={0.29}
              y={0.78}
              z={0.5}
              className="bkm-dog-cream"
              front={<span className="bkm-paw-toes" />}
            />
            <Voxel
              w={0.28}
              h={0.26}
              d={0.36}
              x={-0.45}
              y={0.76}
              z={-0.34}
              className="bkm-dog-tomato"
            />
            <Voxel
              w={0.28}
              h={0.26}
              d={0.36}
              x={0.45}
              y={0.76}
              z={-0.34}
              className="bkm-dog-cream"
            />

            {/* Wagging 3D Puppy Tail */}
            <div className="bkm-dog-tail-pivot">
              <Voxel
                w={0.18}
                h={0.52}
                d={0.18}
                x={0.2}
                y={-0.24}
                z={-0.06}
                rx={-24}
                rz={12}
                className="bkm-dog-tomato"
              />
              <Voxel
                w={0.2}
                h={0.28}
                d={0.2}
                x={0.28}
                y={-0.56}
                z={-0.18}
                rx={-38}
                rz={16}
                className="bkm-dog-butter"
              />
            </div>

            {/* Articulated 3D Dog Head + Snout + Floppy Ears */}
            <div ref={headRigRef} className="bkm-dog-head-rig">
              <Voxel
                w={1.2}
                h={0.9}
                d={0.94}
                y={-0.38}
                z={0.08}
                className="bkm-dog-cream"
                front={
                  <div className="bkm-dog-face">
                    <span className="bkm-dog-eye-patch" />
                    <div className="bkm-dog-eyes">
                      <span className="bkm-dog-eye">
                        <span className="bkm-dog-pupil" />
                      </span>
                      <span className="bkm-dog-eye">
                        <span className="bkm-dog-pupil" />
                      </span>
                    </div>
                  </div>
                }
                top={<div className="bkm-dog-crown-patch" />}
              />

              {/* 3D Protruding Dog Snout & Nose */}
              <Voxel
                w={0.5}
                h={0.28}
                d={0.28}
                x={0}
                y={-0.16}
                z={0.62}
                className="bkm-dog-cream"
                front={
                  <svg viewBox="0 0 50 28" className="bkm-dog-muzzle-svg" aria-hidden="true">
                    <rect x="18" y="4" width="14" height="9" rx="4.5" fill="#0c0c10" />
                    <path d="M25 13v4M16 17c3 4 7 4 9 0c2 4 6 4 9 0" fill="none" stroke="#0c0c10" strokeWidth="2.3" strokeLinecap="round" />
                  </svg>
                }
                top={<div className="bkm-dog-snout-top" />}
              />

              {/* Left & Right 3D Floppy Puppy Ears */}
              <Voxel
                w={0.24}
                h={0.54}
                d={0.38}
                x={-0.72}
                y={-0.28}
                z={0.08}
                rz={8}
                className="bkm-dog-tomato"
              />
              <Voxel
                w={0.24}
                h={0.54}
                d={0.38}
                x={0.72}
                y={-0.28}
                z={0.08}
                rz={-8}
                className="bkm-dog-butter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
