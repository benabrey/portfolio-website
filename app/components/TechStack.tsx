'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/animations'

// ── Edit this list to match your real stack ──
const TECH_STACK = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript',      slug: 'javascript',      color: '#ffffff' },
      { name: 'TypeScript',      slug: 'typescript',      color: '#3178C6' },
      { name: 'HTML5',           slug: 'html5',           color: '#E34F26' },
      { name: 'CSS',             slug: 'css',             color: '#1572B6' },
      { name: 'PHP',             slug: 'php',             color: '#06B6D4' },
    ],
  },
  {
    category: 'Framework',
    items: [
      { name: 'React',           slug: 'react',           color: '#61DAFB' },
      { name: 'Next.js',         slug: 'nextdotjs',       color: '#ffffff' },
      { name: 'Framer Motion',   slug: 'framer',          color: '#A855F7' },
      { name: 'Tailwind CSS',    slug: 'tailwindcss',     color: '#06B6D4' },
      { name: 'Drupal',          slug: 'drupal',          color: '#61DAFB' },    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'GitHub',          slug: 'github',          color: '#ffffff' },
      { name: 'Jira',            slug: 'jira',            color: '#F24E1E' },
    ],
  },
  {
    category: 'Hosting & Backend',
    items: [
      { name: 'Vercel',          slug: 'vercel',          color: '#ffffff' },
      { name: 'Node.js',         slug: 'nodedotjs',       color: '#5FA04E' },
      { name: 'MySQL',           slug: 'mysql',           color: '#4479A1'}
    ],
  },
]

export default function TechStack() {
  return (
    <section className="tech-stack-section">
      {/* Section heading */}
      <motion.div
        variants={stagger(0.08, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
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
            color: 'var(--text-muted)',
            maxWidth: '40ch',
            margin: '1rem auto 0',
            fontSize: '1.05rem',
          }}
        >
          The tools I trust to build fast, accessible, modern sites — no
          page-builders, no shortcuts.
        </motion.p>
      </motion.div>

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {TECH_STACK.map((cat) => (
          <div key={cat.category}>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              {cat.category}
            </motion.h3>

            <motion.div
              variants={stagger(0.06, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '1rem',
              }}
            >
              {cat.items.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="tech-card"
                  style={
                    {
                      '--tech-color': tech.color,
                    } as React.CSSProperties
                  }
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
  )
}