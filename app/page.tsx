"use client";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const GROOVE_COUNT = 50;

function Grooves() {
  const circles = [];
  for (let i = 0; i < GROOVE_COUNT; i++) {
    const r = 18 + i * 2.5;
    circles.push(
      <circle
        key={i}
        cx="150"
        cy="150"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="0.5"
      />,
    );
  }
  return (
    <svg className="groove-svg" viewBox="0 0 300 300" aria-hidden="true">
      {circles}
    </svg>
  );
}

function RainbowStripe({ reverse = false }: { reverse?: boolean }) {
  const order = reverse
    ? ["s6", "s5", "s4", "s3", "s2", "s1"]
    : ["s1", "s2", "s3", "s4", "s5", "s6"];
  return (
    <div className="rainbow-stripe">
      {order.map((c) => (
        <span key={c} className={c} />
      ))}
    </div>
  );
}

function SleeveRainbow() {
  return (
    <div className="sleeve-rainbow">
      <span style={{ background: "#B7410E" }} />
      <span style={{ background: "#D95B29" }} />
      <span style={{ background: "#DAA520" }} />
      <span style={{ background: "#CC8F00" }} />
      <span style={{ background: "#6B8E23" }} />
      <span style={{ background: "#5C3D1E" }} />
    </div>
  );
}

export default function Home() {
  const [pullX, setPullX] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [maxX, setMaxX] = useState(300);
  const [vinylSize, setVinylSize] = useState(340);
  const [isMobile, setIsMobile] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);
  const dragDistance = useRef(0);
  const pullXRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pullXRef.current = pullX;
  }, [pullX]);

  useEffect(() => {
    function updateSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);

      if (mobile) {
        setVinylSize(Math.min(vw * 0.88, 420));
        setMaxX(120);
      } else {
        const size = Math.min(Math.max(vh * 0.8, 400), 600);
        setVinylSize(size);
        const sleeveW = size * 1.12;
        setMaxX(Math.max(sleeveW * 0.55));
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const fullyOut = pullX > maxX * 0.5;

  const clamp = useCallback(
    (x: number) => Math.max(0, Math.min(maxX, x)),
    [maxX],
  );

  // ── Desktop drag on record-track ──────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".label-link")) return;
    draggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartVal.current = pullXRef.current;
    dragDistance.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const d = e.clientX - dragStartX.current;
      dragDistance.current = Math.abs(d);
      const next = clamp(dragStartVal.current + d);
      pullXRef.current = next;
      setPullX(next);
    },
    [clamp],
  );

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (dragDistance.current < 5 && fullyOut) {
      setFlipped((f) => !f);
    }
  }, [fullyOut]);

  // ── Mobile: tap sleeve to reveal, tap vinyl to flip ──
  useEffect(() => {
    if (!isMobile) return;

    const onTap = (e: TouchEvent) => {
      const target = e.target as HTMLElement;

      // Tap a nav link inside the record → let it navigate
      if (target.closest(".label-link")) return;

      // Tap the sleeve → reveal the record
      if (!revealed && target.closest(".sleeve")) {
        setRevealed(true);
        return;
      }

      if (revealed) {
        if (target.closest(".vinyl")) {
          setFlipped((f) => !f);
          return;
        }
        setRevealed(false);
        setFlipped(false);
      }
    };

    document.addEventListener("touchend", onTap, { passive: true });
    return () => document.removeEventListener("touchend", onTap);
  }, [isMobile, revealed]);

  // ── Desktop: wheel/trackpad drives vinyl, passes through at boundaries ────
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || isMobile) return;

    const onWheel = (e: WheelEvent) => {
      const raw = e.deltaY || e.deltaX;
      const current = pullXRef.current;

      // At boundary in the same direction → pass through to native page scroll
      if ((raw > 0 && current >= maxX) || (raw < 0 && current <= 0)) return;

      e.preventDefault();
      const next = Math.max(0, Math.min(maxX, current + raw * 0.5));
      pullXRef.current = next;
      setPullX(next);
    };

    scene.addEventListener("wheel", onWheel, { passive: false });
    return () => scene.removeEventListener("wheel", onWheel);
  }, [maxX, isMobile]);

  // ── Desktop: body scroll lock — open at maxX, reset+lock when back home ───
  useEffect(() => {
    if (isMobile) return;
    const atMax = pullX >= maxX;
    const atMin = pullX <= 0;
    if (atMax) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
      if (atMin) window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [pullX, maxX, isMobile]);

  const sleeveSize = vinylSize * 1.12;

  return (
    <main className="vinyl-home" ref={sceneRef}>
      <RainbowStripe />

      <div className="home-sunburst" />

      <div className={`turntable${isMobile ? " turntable-mobile" : ""}`}>
        {/* ── Decorated Sleeve ── */}
        <div
          className="sleeve"
          style={{
            width: isMobile ? Math.min(vinylSize * 1.15, 500) : sleeveSize,
            height: isMobile ? Math.min(vinylSize * 1.15, 500) : sleeveSize,
            ...(isMobile
              ? {
                  transform: revealed
                    ? "translateX(-110%) scale(0.8)"
                    : "translateX(0) scale(1)",
                  opacity: revealed ? 0 : 1,
                }
              : {}),
          }}
        >
          {/* Inner border */}
          <div className="sleeve-inner-border" />

          {/* Rainbow stripe across top */}
          <SleeveRainbow />

          {/* Corner decorations */}
          <span className="sleeve-corner sleeve-corner-tl">✦</span>
          <span className="sleeve-corner sleeve-corner-tr">✦</span>
          <span className="sleeve-corner sleeve-corner-bl">✦</span>
          <span className="sleeve-corner sleeve-corner-br">✦</span>

          {/* Stereo badge */}
          <div className="sleeve-stereo">Stereo</div>

          {/* LP marker */}
          <span className="sleeve-lp">LP</span>

          {/* Main content */}
          <motion.div
            className="sleeve-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ✦ Kelowna, BC ✦
          </motion.div>

          <motion.div
            className="sleeve-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            wURLd
          </motion.div>

          <motion.div
            className="sleeve-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Web Design
          </motion.div>

          <motion.div
            className="sleeve-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Custom coded, no templates
          </motion.div>

          {/* Bottom credits */}
          <div className="sleeve-credits">
            <span>Custom Coded</span>
            <span className="sleeve-credits-dot">·</span>
            <span>Hand Built</span>
            <span className="sleeve-credits-dot">·</span>
            <span>No Templates</span>
          </div>

          {/* Rainbow stripe across bottom */}
          <SleeveRainbow />

          <span className="sleeve-year">© 2026</span>
          <span className="sleeve-catalog">WRD-001</span>
        </div>

        {/* ── Draggable Record ── */}
        <div
          className={`record-track${isMobile ? " record-track-mobile" : ""}`}
          style={
            isMobile
              ? {
                  transform: revealed
                    ? "translate(-50%, -50%) scale(1)"
                    : "translate(-50%, -50%) scale(0.3)",
                  opacity: revealed ? 1 : 0,
                  zIndex: revealed ? 4 : 2,
                }
              : {
                  transform: `translateY(-50%) translateX(${pullX}px)`,
                  transition: draggingRef.current
                    ? "none"
                    : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }
          }
          onPointerDown={!isMobile ? onPointerDown : undefined}
          onPointerMove={!isMobile ? onPointerMove : undefined}
          onPointerUp={!isMobile ? onPointerUp : undefined}
          onPointerCancel={!isMobile ? onPointerUp : undefined}
        >
          <div
            className={`vinyl${fullyOut || (isMobile && revealed) ? " vinyl-spinning" : ""}`}
            style={{ width: vinylSize, height: vinylSize }}
          >
            <div className={`vinyl-inner${flipped ? " flipped" : ""}`}>
              {/* Side A */}
              <div className="vinyl-face vinyl-front">
                <Grooves />
                <div className="label-area label-front">
                  <span className="label-side-text">Side A</span>
                  <span className="label-title">wURLd</span>
                  <div className="label-links">
                    <Link href="/works" className="label-link">
                      Portfolio
                    </Link>
                    <Link href="/contact" className="label-link">
                      Contact
                    </Link>
                  </div>
                </div>
                <div className="vinyl-hole" />
              </div>

              {/* Side B */}
              <div className="vinyl-face vinyl-back">
                <Grooves />
                <div className="label-area label-back">
                  <span className="label-side-text label-side-b">Side B</span>
                  <span className="label-title label-title-b">wURLd</span>
                  <div className="label-links">
                    <Link href="/about" className="label-link label-link-b">
                      About
                    </Link>
                    <Link href="/works" className="label-link label-link-b">
                      Services
                    </Link>
                  </div>
                </div>
                <div className="vinyl-hole" />
              </div>
            </div>
          </div>

          <div className="flip-hint" style={{ opacity: fullyOut ? 1 : 0 }}>
            {isMobile ? "Tap vinyl to flip" : "Click vinyl to flip"}
          </div>
        </div>
      </div>

      {/* Pull hint */}
      <div
        className="pull-hint"
        style={{ opacity: (isMobile ? !revealed : pullX < 20) ? 1 : 0 }}
      >
        <span className="pull-arrow">
          {isMobile
            ? "Tap the sleeve to reveal the record"
            : "Drag or scroll to pull the record out →"}
        </span>
      </div>

      <RainbowStripe reverse />
    </main>
  );
}
