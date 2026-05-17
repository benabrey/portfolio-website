"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
}

function MarqueeInner({ items, speed = 1, separator = "✦" }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  let prevScrollY = useRef(0);

  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() + speed * (delta / 2000));
  });

  const content = [...items, ...items].map((item, i) => (
    <span
      key={i}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "0 1.5rem",
      }}
    >
      {item}
      <span style={{ color: "var(--accent)", opacity: 0.6 }}>{separator}</span>
    </span>
  ));

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <motion.div style={{ x, display: "inline-flex" }}>
        {content}
        {content}
      </motion.div>
    </div>
  );
}

export default function Marquee(props: MarqueeProps) {
  return (
    <div
      style={{
        padding: "1.5rem 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1rem, 2vw, 1.4rem)",
        letterSpacing: "0.06em",
        color: "var(--text-muted)",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <MarqueeInner {...props} />
    </div>
  );
}
