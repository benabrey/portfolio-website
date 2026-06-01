"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";

const TECH_STACK = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", slug: "javascript", color: "#ffffff" },
      { name: "TypeScript", slug: "typescript", color: "#3178C6" },
      { name: "HTML5", slug: "html5", color: "#E34F26" },
      { name: "CSS", slug: "css", color: "#1572B6" },
      { name: "PHP", slug: "php", color: "#06B6D4" },
    ],
  },
  {
    category: "Framework",
    items: [
      { name: "React", slug: "react", color: "#61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
      { name: "Framer Motion", slug: "framer", color: "#A855F7" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
      { name: "Drupal", slug: "drupal", color: "#61DAFB" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "GitHub", slug: "github", color: "#ffffff" },
      { name: "Jira", slug: "jira", color: "#F24E1E" },
    ],
  },
  {
    category: "Hosting & Backend",
    items: [
      { name: "Vercel", slug: "vercel", color: "#ffffff" },
      { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
      { name: "MySQL", slug: "mysql", color: "#4479A1" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function TechStack() {
  return (
    <section className="tech-stack-section">
      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <motion.div className="section-label" variants={fadeUp}>
          Tech Stack
        </motion.div>
        <motion.h2 className="section-title" variants={fadeUp}>
          Built with the best
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{
            color: "var(--text-muted)",
            maxWidth: "40ch",
            margin: "1rem auto 0",
            fontSize: "1.05rem",
          }}
        >
          The tools I trust to build fast, accessible, modern sites — no
          page-builders, no shortcuts.
        </motion.p>
      </motion.div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {TECH_STACK.map((cat) => (
          <div key={cat.category}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              style={{
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {String(TECH_STACK.indexOf(cat) + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                /
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-sub)",
                }}
              >
                {cat.category}
              </span>
            </motion.div>

            {/* Cards with dramatic stagger */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "1rem",
                perspective: "800px",
              }}
            >
              {cat.items.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: `0 0 24px -4px ${tech.color}55`,
                    borderColor: tech.color,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="tech-card"
                  style={{ "--tech-color": tech.color } as React.CSSProperties}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}/ffffff`}
                    alt={tech.name}
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
