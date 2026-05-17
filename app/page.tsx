"use client";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./components/TextReveal";
import Marquee from "./components/Marquee";
import HowItWorks from "./components/HowItWorks";
import ServiceCard from "./components/ServiceCard";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  stagger,
  useMagnetic,
  type Variants,
} from "./lib/animations";

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [3, 1]);
  const heroScale = useTransform(scrollYProgress, [0,1], [1,0.92]);
  const heroBlur = useTransform(scrollYProgress, [0,1], ["blur(0px", "blur(8px)"]);
  const heroYSpring = useSpring(heroY, { stiffness: 80, damping: 20 });

  const magnetic = useMagnetic(0.4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        {/* Video background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            initial={{scale:1.1}}
            animate={{scale:1.18}}
            transition={{duration:20, ease:"linear", repeat:Infinity, repeatType:"mirror"}}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.15,
            }}
          >
            <source src="/videos/activelyCoding.mp4" type="video/mp4" />
          </motion.video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(22,22,31,0.5) 0%, var(--bg) 100%)"
                ,
            }}
          />
        </div>

        {/* Hero content — sits above the video */}
        <motion.div
          className="hero-section"
          style={{
            y: heroYSpring,
            opacity: heroOpacity,
            scale: heroScale,
            filter: heroBlur,
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.p
            className="hero-eyebrow"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Kelowna, BC
          </motion.p>

          <motion.h1
            className="hero-title"
            variants={stagger(0.08,0)}
            initial="hidden"
            animate="visible"
          >
            {["Websites ", "Made Right"].map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  marginRight: "0.25em",
                }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  variants={wordVariants}
                >
                  {i === 1 ? (
                    <motion.span
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent), var(--accent-2))",
                          backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition ={{ duration: 6, ease:"linear", repeat:Infinity}}
                    >
                      {word}
                    </motion.span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-sub"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            Custom coded websites, no pre-built services used
          </motion.p>

          <motion.div
            ref={magnetic.ref}
            style={{ x: magnetic.x, y: magnetic.y, display: "inline-block" }}
            onMouseMove={magnetic.handleMouseMove}
            onMouseLeave={magnetic.handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.65,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            whileTap={{ scale: 0.96 }}
          >
            <Link href="/contact" className="hero-cta">
              <motion.span
                style={{
                    x: useTransform(magnetic.x, (v: number) => v*0.4),
                    y: useTransform(magnetic.y, (v: number) => v*0.4),
                    display: "inline-block",
                }}
                >
                Connect now
                </motion.span>
            </Link>
          </motion.div> 
        </motion.div>
      </section>

      {/* ── Marquee separator ── */}
      <Marquee speed={-1} 
        items={[
          "Custom Code",
          "No Templates",
          "Kelowna BC",
          "Hand Built",
          "SEO Optimized",
          "Fast Delivery",
        ]}
      />

      {/* ── Services ── */}
      <section className="services" aria-label="Website Services">
        <div className="services-inner">
          <motion.div
            layout
            className="section-label"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Services
          </motion.div>

          <TextReveal
            text="Services Offered"
            as="h2"
            className="section-title"
            delay={0.2}
          />

          <motion.p
            className="services-sub"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Custom built for your needs — no overused templates
          </motion.p>

          <motion.div
          layout
            className="services-grid"
            variants={stagger(0.2,0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ServiceCard
              tag="Brand"
              tagColor="purple"
              title="Brand Website"
              desc="Grow your brand and maximize your reach with SEO-optimized, custom built sites."
              videoSrc="/videos/brand.mp4"
            />
            <ServiceCard
              tag="Personal"
              tagColor="pink"
              title="Personal Site"
              desc="Show off your projects, skills, and personality with a site built around you."
              videoSrc="/videos/personal.mp4"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Marquee separator ── */}
      <Marquee
        items={[
          "Tell Me Your Vision",
          "I Build It",
          "You Go Live",
          "Simple Process",
          "Professional Results",
        ]}
        speed={1}
      />

      {/* ── How It Works ── */}
      <HowItWorks />
    </main>
  );
}
