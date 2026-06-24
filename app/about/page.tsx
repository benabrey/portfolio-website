"use client";
import "../styles/about.css";
import { motion, type Variants } from "framer-motion";
import TechStack from "../components/TechStack";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

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

export default function page() {
  return (
    <main>
      <section className="about section" aria-label="About me">
        <motion.div
          className="contact-side-badge"
          variants={fadeUp}
          style={{ marginBottom: "10px", textAlign: "center" }}
        >
          ✦ Side D ✦
        </motion.div>
        <RainbowStripe />
        <div className="about reveal">
          <div className="about-image-wrap">
            <img src="/images/BenAbout.jpg" loading="lazy" alt="me" />
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-body">
              I am a 3rd year computer science student with a passion for UI/UX
              design and making websites as functional and aesthetic as
              possible.
            </p>
            <a href="/works" className="hero-cta">
              <span>View My Previous Works</span>
            </a>
          </div>
        </div>
      </section>

      <RainbowStripe />

      <section className="about techstack">
        <div className="techstack reveal">
          <TechStack />
        </div>
      </section>
    </main>
  );
}
