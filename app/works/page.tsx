"use client";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import TextReveal from "../components/TextReveal";
import Counter from "../components/Counter";
import Marquee from "../components/Marquee";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Works() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="works-page-hero">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline style={{ opacity: 0.15 }}>
            <source src="/videos/laptopOpening.mp4" type="video/mp4" />
          </video>
          <div className="works-hero-overlay" />
        </div>
        <div className="works-hero-content">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Portfolio
          </motion.p>

          <motion.h1
            className="works-hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Built from scratch.
            <br />
            <em>Every time.</em>
          </motion.h1>

          <motion.p
            className="works-hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Custom coded websites — no templates, no shortcuts
          </motion.p>
        </div>
      </section>

      <motion.div
        className="works-stats"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="works-stat" variants={statItem}>
          <span className="works-stat-num">100%</span>
          <span className="works-stat-label">Custom Code</span>
        </motion.div>
        <div className="works-stat-divider" />
        <motion.div className="works-stat" variants={statItem}>
          <span className="works-stat-num">1</span>
          <span className="works-stat-label">Live Project</span>
        </motion.div>

        <div className="works-stat-divider" />
        <motion.div className="works-stat" variants={statItem}>
          <span className="works-stat-num">∞</span>
          <span className="works-stat-label">Revisions</span>
        </motion.div>
      </motion.div>

      {/* ── Project Cards ── */}
      <section className="works-projects" aria-label="Projects">
        <div className="works-projects-inner">
          {/* motion.div with whileHover for the card lift effect */}
          <motion.div
            className="project-card"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 0 60px rgba(124,92,252,0.12)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="project-card-header">
              <div className="project-meta">
                <span className="project-number">01</span>
                <div className="project-tags">
                  <span className="project-tag">Photography</span>
                  <span className="project-tag">Business</span>
                  <span className="project-tag">Booking Website</span>
                </div>
              </div>
              <a
                href="https://www.aestheticsbystasiaphotography.com"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Visit Site <span>↗</span>
              </a>
            </div>

            <div className="project-card-title-row">
              <h2 className="project-title">Aesthetics By Stasia</h2>
              <span className="project-status live">Live</span>
            </div>

            <p className="project-desc">
              A full-service photography website to showcase the artist&apos;s
              vision and give future clients references and inspiration for
              their photoshoots. Complete with a contact form that sends session
              requests directly to the artist&apos;s email.
            </p>

            <div className="project-tech">
              <span className="tech-tag">HTML</span>
              <span className="tech-tag">CSS</span>
              <span className="tech-tag">JavaScript</span>
            </div>

            <div className="project-preview">
              <div className="project-preview-bar">
                <div className="preview-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="preview-url">
                  aestheticsbystasiaphotography.com
                </div>
                <a
                  href="https://www.aestheticsbystasiaphotography.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-open"
                >
                  Open ↗
                </a>
              </div>
              <iframe
                src="https://www.aestheticsbystasiaphotography.com"
                height="850px"
                width="100%"
                style={{ border: "none", display: "block" }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── More Coming ── */}
      <section className="works-coming">
        <div className="works-coming-inner">
          <motion.div
            className="coming-label"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What&apos;s Next
          </motion.div>

          <motion.h2
            className="coming-title"
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            More projects
            <br />
            <em>on the way</em>
          </motion.h2>

          <motion.p
            className="coming-sub"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            I&apos;m actively taking on new clients. Your project could be
            featured here next.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/contact" className="hero-cta">
              <span>Start a project</span>
            </Link>
          </motion.div>

          {/* stagger the coming cards */}
          <motion.div
            className="coming-cards"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="coming-card"
                variants={cardVariant}
                whileHover={{ y: -4, borderColor: "rgba(124,92,252,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="coming-card-icon">+</div>
                <div className="coming-card-text">Your project here</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="works-cta-banner">
        <div className="works-cta-inner">
          <motion.h2
            className="works-cta-title"
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Ready to build
            <br />
            <em>something great?</em>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/contact" className="hero-cta">
              <span>Let&apos;s talk</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
