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
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);
  const dragDistance = useRef(0);
  const pullXRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pullXRef.current = pullX;
  }, [pullX]);

  // Responsive sizing — vinyl takes up much more of the viewport
  useEffect(() => {
    function updateSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);

      if (mobile) {
        setVinylSize(Math.min(vw * 0.65, 250));
        setMaxX(100);
      } else {
        const size = Math.min(Math.max(vh * 0.8, 400), 600);
        setVinylSize(size);
        const sleeveW = size * 1.12;
        const sleeveRight = vw / 2 + sleeveW / 2;
        const available = vw - sleeveRight - size * 0.1;
        setMaxX(Math.max(available, size * 0.6));
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

  // Pointer drag — NO snapping, stays where you leave it
  // Small moves (< 5px) count as a click → flip the record
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest(".label-link")) return;
      draggingRef.current = true;
      dragStartX.current = isMobile ? e.clientY : e.clientX;
      dragStartVal.current = pullXRef.current;
      dragDistance.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [isMobile],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const d = isMobile
        ? e.clientY - dragStartX.current
        : e.clientX - dragStartX.current;
      dragDistance.current = Math.abs(d);
      const next = clamp(dragStartVal.current + (isMobile ? d * 0.5 : d));
      pullXRef.current = next;
      setPullX(next);
    },
    [clamp, isMobile],
  );

  const onPointerUp = useCallback((e?: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (dragDistance.current < 5 && fullyOut) {
      // On mobile, only flip when the tap lands on the vinyl disc itself
      if (isMobile && e && !(e.target as HTMLElement).closest(".vinyl")) return;
      setFlipped((f) => !f);
    }
  }, [fullyOut, isMobile]);

  // Mobile: prevent native page scroll until the record is fully pulled out
  useEffect(() => {
    if (!isMobile) return;
    const prevent = (e: TouchEvent) => {
      if (pullXRef.current < maxX) e.preventDefault();
    };
    document.addEventListener("touchmove", prevent, { passive: false });
    return () => document.removeEventListener("touchmove", prevent);
  }, [isMobile, maxX]);

  // Wheel to pull — also no snap
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const speed = isMobile ? 0.3 : 0.5;
      const next = Math.max(
        0,
        Math.min(maxX, pullXRef.current + delta * speed),
      );
      pullXRef.current = next;
      setPullX(next);
    };

    scene.addEventListener("wheel", onWheel, { passive: false });
    return () => scene.removeEventListener("wheel", onWheel);
  }, [maxX]);

  // Lock page scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const sleeveSize = vinylSize * 1.12;

  return (
    <main
      className="vinyl-home"
      ref={sceneRef}
      onPointerDown={isMobile ? onPointerDown : undefined}
      onPointerMove={isMobile ? onPointerMove : undefined}
      onPointerUp={isMobile ? onPointerUp : undefined}
      onPointerCancel={isMobile ? onPointerUp : undefined}
      style={isMobile ? { touchAction: "none" } : undefined}
    >
      <RainbowStripe />

      <div className="home-sunburst" />

      <div className={`turntable${isMobile ? " turntable-mobile" : ""}`}>
        {/* ── Decorated Sleeve ── */}
        <div
          className="sleeve"
          style={{
            width: isMobile ? Math.min(vinylSize * 1.15, 300) : sleeveSize,
            height: isMobile ? Math.min(vinylSize * 1.15, 300) : sleeveSize,
            ...(isMobile
              ? {
                  transform: `scale(${1 - (pullX / maxX) * 0.5}) perspective(1200px) rotateY(3deg)`,
                  opacity: 1 - (pullX / maxX) * 0.7,
                  transition: draggingRef.current
                    ? "none"
                    : "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
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
                  transform: `translate(-50%, -50%) scale(${0.4 + (pullX / maxX) * 0.6})`,
                  transition: draggingRef.current
                    ? "none"
                    : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  zIndex: pullX > maxX * 0.3 ? 4 : 2,
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
            className={`vinyl${fullyOut ? " vinyl-spinning" : ""}`}
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
            Click vinyl to flip
          </div>
        </div>
      </div>

      {/* Pull hint */}
      <div className="pull-hint" style={{ opacity: pullX < 20 ? 1 : 0 }}>
        <span className="pull-arrow">
          {isMobile
            ? "Swipe down to pull the record out↓"
            : "Drag or scroll to pull the record out →"}
        </span>
      </div>

      <RainbowStripe reverse />
    </main>
  );
}
