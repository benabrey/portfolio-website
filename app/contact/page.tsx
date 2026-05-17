"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { fadeUp, stagger, useMagnetic } from "../lib/animations";

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ── Spotlight that follows the cursor across the form card ──
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(168,85,247,0.10), transparent 60%)`;

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const handleCardMouseLeave = () => {
    mouseX.set(-400);
    mouseY.set(-400);
  };

  const magnetic = useMagnetic(0.3);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      const data = new FormData(formRef.current);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.2 }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <source src="/videos/laptop.mp4" type="video/mp4" />
          </motion.video>
          <div className="contact-hero-overlay" />
        </div>

        <motion.div
          className="contact-hero-content"
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="section-label" variants={fadeUp}>
            Contact
          </motion.div>

          <h1 className="contact-hero-title">
            {["Let's build something", "great together"].map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  variants={wordVariants}
                  style={{ display: "inline-block" }}
                >
                  {i === 1 ? <em>{line}</em> : line}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>
      </section>

      {/* ── Body ── */}
      <section
        className="contact-body"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Floating ambient orbs */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            top: "10%",
            left: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "5%",
            right: "-8%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.14), transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ── Form Card with animated gradient border ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              position: "relative",
              padding: 1.5,
              borderRadius: 28,
              background:
                "conic-gradient(from var(--gradient-angle, 0deg), rgba(168,85,247,0.6), rgba(236,72,153,0.4), rgba(168,85,247,0.6), rgba(255,255,255,0.05), rgba(168,85,247,0.6))",
              animation: "spin-gradient 8s linear infinite",
            }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="contact-form-card"
              style={{
                position: "relative",
                overflow: "hidden",
                background:
                  "linear-gradient(180deg, rgba(22,22,31,0.92), rgba(15,15,22,0.96))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: 26,
              }}
            >
              {/* Cursor spotlight */}
              <motion.div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: spotlight,
                  pointerEvents: "none",
                }}
              />

              {/* Subtle inner grain / noise overlay */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 20% 10%, rgba(168,85,247,0.06), transparent 50%), radial-gradient(circle at 80% 90%, rgba(236,72,153,0.05), transparent 50%)",
                  pointerEvents: "none",
                }}
              />

              {/* Header */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "2.25rem 2.25rem 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "var(--text-muted)",
                      margin: 0,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Start a project
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.05rem",
                      color: "var(--text)",
                      opacity: 0.85,
                      maxWidth: "32ch",
                    }}
                  >
                    Tell me what you want to build and I&apos;ll make it happen.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 0 4px rgba(16,185,129,0.2)",
                    }}
                  />
                  ACCEPTING PROJECTS
                </div>
              </div>

              {/* Form / Success */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "2rem 2.25rem 2.25rem",
                }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      style={{ padding: "3rem 1rem", textAlign: "center" }}
                    >
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        style={{ margin: "0 auto 1.5rem", display: "block" }}
                      >
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="var(--accent)"
                          strokeWidth="3"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                        <motion.path
                          d="M25 40 L36 51 L56 30"
                          stroke="var(--accent)"
                          strokeWidth="3.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.55,
                            ease: "easeOut",
                          }}
                        />
                      </svg>
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "2rem",
                          fontWeight: 800,
                          color: "var(--text)",
                        }}
                      >
                        Message sent
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 1.15, duration: 0.5 }}
                        style={{
                          marginTop: "0.5rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        I&apos;ll get back to you within 24 hours.
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.35, duration: 0.5 }}
                        onClick={() => setSubmitted(false)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          marginTop: "2rem",
                          background: "transparent",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                          padding: "0.75rem 1.5rem",
                          borderRadius: 999,
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        Send another message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      variants={stagger(0.07, 0.15)}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                      }}
                    >
                      <input
                        type="hidden"
                        name="access_key"
                        defaultValue="placeholder"
                      />
                      <input
                        type="hidden"
                        name="subject"
                        defaultValue="Contact Form — Websites By Ben"
                      />
                      <input
                        type="hidden"
                        name="to"
                        defaultValue="benabrey1417@gmail.com"
                      />

                      {/* Name + Email row */}
                      <motion.div
                        variants={fadeUp}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "1rem",
                        }}
                      >
                        <FieldBlock number="01" label="Name">
                          <input
                            className="form-input-bare"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                          />
                        </FieldBlock>
                        <FieldBlock number="02" label="Email">
                          <input
                            className="form-input-bare"
                            type="email"
                            name="email"
                            placeholder="hello@you.com"
                            required
                          />
                        </FieldBlock>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <FieldBlock number="03" label="Website Type">
                          <select
                            className="form-input-bare"
                            name="service"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select one
                            </option>
                            <option value="professional">
                              Professional / Freelance
                            </option>
                            <option value="business">Business</option>
                            <option value="personal">
                              Personal (ex. Blog)
                            </option>
                          </select>
                        </FieldBlock>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <FieldBlock number="04" label="Subject">
                          <input
                            className="form-input-bare"
                            type="text"
                            name="subject"
                            placeholder="What's it about?"
                            required
                          />
                        </FieldBlock>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <FieldBlock number="05" label="Project details">
                          <textarea
                            className="form-input-bare"
                            name="message"
                            placeholder="Tell me about your project, goals, timeline..."
                            rows={5}
                            style={{ resize: "vertical", minHeight: 120 }}
                          />
                        </FieldBlock>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "0.5rem",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        <motion.div
                          ref={magnetic.ref}
                          style={{
                            x: magnetic.x,
                            y: magnetic.y,
                            display: "inline-block",
                          }}
                          onMouseMove={magnetic.handleMouseMove}
                          onMouseLeave={magnetic.handleMouseLeave}
                          whileTap={{ scale: 0.96 }}
                        >
                          <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {loading ? (
                                <motion.span
                                  key="loading"
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.2 }}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                  }}
                                >
                                  <motion.span
                                    style={{
                                      width: 14,
                                      height: 14,
                                      borderRadius: "50%",
                                      border: "2px solid currentColor",
                                      borderTopColor: "transparent",
                                      display: "inline-block",
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                  />
                                  Sending…
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="idle"
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.2 }}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <span>Send Message</span>
                                  <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M3 8h10M9 4l4 4-4 4"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ── Individual numbered field block ── */
function FieldBlock({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "0.85rem 1rem",
        transition: "border-color 0.25s, background 0.25s",
      }}
      className="field-block"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "0.35rem",
        }}
      >
        <span style={{ color: "var(--accent)", opacity: 0.8 }}>{number}</span>
        <span>/</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
