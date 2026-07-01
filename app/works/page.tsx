"use client";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Works() {
  return (
    <main className="mag-works">
      {/* ── Masthead / Hero ── */}
      <section className="mag-masthead">
        <div className="mag-masthead-inner">
          <motion.div
            className="mag-issue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            My Previous Works
          </motion.div>

          <motion.h1
            className="mag-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Portfolio
          </motion.h1>

          <motion.div
            className="mag-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="mag-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Sites hand-coded from scratch. No shortcuts.
          </motion.p>
        </div>
      </section>

      {/* ── Rainbow divider ── */}
      {/* <div className="rainbow-stripe">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
        <span className="s4" />
        <span className="s5" />
        <span className="s6" />
      </div> */}

      {/* ── Pull Quote / Manifesto ── */}
      <motion.section
        className="mag-pullquote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mag-pullquote-rule" />
        <motion.p
          className="mag-pullquote-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mag-pullquote-accent">
            Every pixel placed with intention.
          </span>
        </motion.p>
        <div className="mag-pullquote-rule" />
      </motion.section>
      {/* ── Rainbow divider ── */}
      <div className="rainbow-stripe">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
        <span className="s4" />
        <span className="s5" />
        <span className="s6" />
      </div>

      {/* ── Feature Spread — Project 01 ── */}
      <section className="mag-spread">
        <div className="mag-spread-inner">
          {/* Left column — editorial text */}
          <motion.div
            className="mag-spread-text"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span className="mag-project-num" variants={fadeIn}>
              No. 01
            </motion.span>

            <motion.span className="mag-credit" variants={fadeIn}>
              Photography / Business / Booking
            </motion.span>

            <motion.h2 className="mag-project-title" variants={slideIn}>
              Aesthetics
              <br />
              <span className="mag-project-title-accent">By Stasia</span>
            </motion.h2>

            <motion.div className="mag-column-rule" variants={fadeIn} />

            <motion.p className="mag-project-desc" variants={fadeUp}>
              A full-service photography website to showcase the artist&apos;s
              vision and give future clients references and inspiration for
              their photoshoots. Complete with a contact form that sends session
              requests directly to the artist&apos;s email.
            </motion.p>

            <motion.span className="mag-credit" variants={fadeIn}>
              Built with HTML, CSS, JavaScript
            </motion.span>

            <motion.div className="mag-project-links" variants={fadeUp}>
              <a
                href="https://www.aestheticsbystasiaphotography.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mag-visit"
              >
                Visit Site
              </a>
              <span className="mag-status">✦ Live</span>
            </motion.div>
          </motion.div>

          {/* Right column — browser preview */}
          <motion.div
            className="mag-spread-preview"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mag-browser">
              <div className="mag-browser-bar">
                <div className="mag-browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mag-browser-url">
                  aestheticsbystasiaphotography.com
                </div>
              </div>
              <iframe
                src="https://www.aestheticsbystasiaphotography.com"
                height="700px"
                width="100%"
                style={{ border: "none", display: "block" }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Rule ── */}
      <div className="rainbow-stripe">
        <span className="s6" />
        <span className="s5" />
        <span className="s4" />
        <span className="s3" />
        <span className="s2" />
        <span className="s1" />
      </div>

      {/* Project 02 */}
      <section className="mag-spread">
        <div className="mag-spread-inner">
          {/* Left column — editorial text */}
          <motion.div
            className="mag-spread-text"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span className="mag-project-num" variants={fadeIn}>
              No. 02
            </motion.span>

            <motion.span className="mag-credit" variants={fadeIn}>
              Speaking Engagements / Business / Booking
            </motion.span>

            <motion.h2 className="mag-project-title" variants={slideIn}>
              Complexity
              <br />
              <span className="mag-project-title-accent">Perspective</span>
            </motion.h2>

            <motion.div className="mag-column-rule" variants={fadeIn} />

            <motion.p className="mag-project-desc" variants={fadeUp}>
              A clean, accessible website for The Complexity Perspective, a
              consulting practice exploring systems thinking and complexity
              science. Built with a focus on accessibility and responsive
              design.
            </motion.p>

            <motion.span className="mag-credit" variants={fadeIn}>
              Built with HTML, CSS, JavaScript
            </motion.span>

            <motion.div className="mag-project-links" variants={fadeUp}>
              <a
                href="#"
                target=" "
                rel="noopener noreferrer"
                className="mag-visit"
              >
                Under Construction
              </a>
              <span className="mag-status">✦ Currently Building</span>
            </motion.div>
          </motion.div>

          {/* Right column — browser preview */}
          <motion.div
            className="mag-spread-preview"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mag-browser">
              <div className="mag-browser-bar">
                <div className="mag-browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mag-browser-url">complexityperspective.com</div>
              </div>
              <iframe
                src="https://complexityperspective.vercel.app/index.html"
                height="700px"
                width="100%"
                style={{ border: "none", display: "block" }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Rule ── */}
      <div className="rainbow-stripe">
        <span className="s6" />
        <span className="s5" />
        <span className="s4" />
        <span className="s3" />
        <span className="s2" />
        <span className="s1" />
      </div>

      {/* ── Back Page — What's Next ── */}
      <section className="mag-backpage">
        <div className="mag-backpage-inner">
          <motion.span
            className="mag-backpage-label"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            ✦ Coming Soon ✦
          </motion.span>

          <motion.h2
            className="mag-backpage-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Next
            <span className="mag-backpage-accent"> Issue</span>
          </motion.h2>

          <motion.p
            className="mag-backpage-sub"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            I&apos;m actively taking on new clients. Your project could be the
            next feature spread.
          </motion.p>

          <motion.div
            className="mag-coming-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="mag-coming-card"
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(217,91,41,0.35)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="mag-coming-icon">+</span>
                <span className="mag-coming-text">Your project here</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ marginTop: "2rem" }}
          >
            <Link href="/contact" className="mag-cta">
              Start a Project ✦
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="rainbow-stripe">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
        <span className="s4" />
        <span className="s5" />
        <span className="s6" />
      </div>
    </main>
  );
}
